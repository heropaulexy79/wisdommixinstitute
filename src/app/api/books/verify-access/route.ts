import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id: bookId, ref: reference, deviceToken, resetDevice } = body;

    if (!bookId || !reference || !deviceToken) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const purchaseRef = doc(db, "book_purchases", `${reference}_${bookId}`);
    const docSnapshot = await getDoc(purchaseRef);
    
    if (!docSnapshot.exists()) {
      return NextResponse.json({ error: "Invalid purchase" }, { status: 403 });
    }

    const purchaseData = docSnapshot.data();

    // Device lock logic
    if (!purchaseData.deviceToken || resetDevice) {
      // First time access or reset requested: register this device
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
