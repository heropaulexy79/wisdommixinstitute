import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("id");
  const reference = searchParams.get("ref");

  if (!bookId || !reference) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Map bookId to specific PDF URLs from environment variables
  const bookPdfs: Record<string, string | undefined> = {
    "kingdom-power-and-blessing": process.env.BOOK_URL_KINGDOM_POWER,
    "leading-minds": process.env.BOOK_URL_LEADING_MINDS,
    "one-of-a-kind": process.env.BOOK_URL_ONE_OF_KIND,
    "the-rod-of-strength": process.env.BOOK_URL_ROD_OF_STRENGTH,
  };

  const pdfUrl = bookPdfs[bookId] || process.env.NEXT_PUBLIC_SAMPLE_BOOK_URL || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return NextResponse.redirect(pdfUrl);
}
