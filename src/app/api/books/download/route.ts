import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("id");
  const reference = searchParams.get("ref");

  if (!bookId || !reference) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Ideally, you would verify the reference again here or use a signed token
  // For now, we'll map the bookId to a URL
  
  // This is a placeholder. In production, you would stream the file from Cloudflare R2
  // or redirect to a signed URL.
  const samplePdfUrl = process.env.NEXT_PUBLIC_SAMPLE_BOOK_URL || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return NextResponse.redirect(samplePdfUrl);
}
