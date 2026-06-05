import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("id");
  const reference = searchParams.get("ref");

  if (!bookId || !reference) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // VERIFICATION: Check if a successful purchase exists for this book and reference
    const purchasesRef = collection(db, "book_purchases");
    const q = query(
      purchasesRef, 
      where("reference", "==", reference),
      where("bookId", "==", bookId),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.warn(`Unauthorized download attempt for book ${bookId} with ref ${reference}`);
      return NextResponse.json({ error: "Invalid or unverified purchase" }, { status: 403 });
    }

    // Map bookId to specific PDF URLs from environment variables
    const bookPdfs: Record<string, string | undefined> = {
      "kingdom-power-and-blessing": process.env.BOOK_URL_KINGDOM_POWER,
      "leading-minds": process.env.BOOK_URL_LEADING_MINDS,
      "one-of-a-kind": process.env.BOOK_URL_ONE_OF_KIND,
      "the-rod-of-strength": process.env.BOOK_URL_ROD_OF_STRENGTH,
    };

    const pdfUrl = bookPdfs[bookId] || process.env.NEXT_PUBLIC_SAMPLE_BOOK_URL || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    // Prevent Referer leakage of the Paystack reference to the storage provider
    const response = NextResponse.redirect(pdfUrl);
    response.headers.set('Referrer-Policy', 'no-referrer');
    
    return response;
  } catch (error) {
    console.error("Download verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
