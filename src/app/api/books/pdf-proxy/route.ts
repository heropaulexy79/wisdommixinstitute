import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("id");
  const reference = searchParams.get("ref");
  const deviceToken = searchParams.get("token");

  if (!bookId || !reference || !deviceToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const purchaseRef = doc(db, "book_purchases", `${reference}_${bookId}`);
    const docSnapshot = await getDoc(purchaseRef);
    
    if (!docSnapshot.exists()) {
      return new NextResponse("Invalid purchase", { status: 403 });
    }

    const purchaseData = docSnapshot.data();

    // Verify token matches what's in the DB
    if (purchaseData.deviceToken !== deviceToken) {
      return new NextResponse("Unauthorized device", { status: 403 });
    }

    // Map bookId to specific PDF URLs from environment variables
    const bookPdfs: Record<string, string | undefined> = {
      "kingdom-power-and-blessing": process.env.BOOK_URL_KINGDOM_POWER,
      "leading-minds": process.env.BOOK_URL_LEADING_MINDS,
      "one-of-a-kind": process.env.BOOK_URL_ONE_OF_KIND,
      "the-rod-of-strength": process.env.BOOK_URL_ROD_OF_STRENGTH,
    };

    const pdfUrl = bookPdfs[bookId] || process.env.NEXT_PUBLIC_SAMPLE_BOOK_URL || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    // Fetch the PDF from the external source
    const pdfResponse = await fetch(pdfUrl);
    
    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }

    const arrayBuffer = await pdfResponse.arrayBuffer();

    // Serve the PDF as a buffer with appropriate headers
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=book.pdf",
        "Cache-Control": "no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });

  } catch (error) {
    console.error("PDF proxy error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
