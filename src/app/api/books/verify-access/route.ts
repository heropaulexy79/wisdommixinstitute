import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, limit, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id: bookId, ref: reference, deviceToken } = body;

    if (!bookId || !reference || !deviceToken) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const purchasesRef = collection(db, "book_purchases");
    const q = query(
      purchasesRef, 
      where("reference", "==", reference),
      where("bookId", "==", bookId),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Invalid purchase" }, { status: 403 });
    }

    const docSnapshot = querySnapshot.docs[0];
    const purchaseData = docSnapshot.data();

    // Device lock logic
    if (!purchaseData.deviceToken) {
      // First time access: register this device
      await updateDoc(docSnapshot.ref, {
        deviceToken: deviceToken,
        lastAccessed: new Date(),
      });
      return NextResponse.json({ success: true, message: "Device registered" });
    } else {
      // Subsequent access: check if device token matches
      if (purchaseData.deviceToken !== deviceToken) {
        return NextResponse.json({ 
          error: "This book is already registered to another device.",
          code: "DEVICE_MISMATCH" 
        }, { status: 403 });
      } else {
        // Valid access from same device
        await updateDoc(docSnapshot.ref, {
          lastAccessed: new Date(),
        });
        return NextResponse.json({ success: true });
      }
    }
  } catch (error) {
    console.error("Access verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
