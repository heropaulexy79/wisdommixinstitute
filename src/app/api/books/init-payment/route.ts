import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone, bookId, bookTitle, amount } = body;

    if (!email || !bookId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Payment configuration error" }, { status: 500 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const callbackUrl = `${origin}/books/purchase-success`;

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert to kobo
        currency: "NGN",
        callback_url: callbackUrl,
        metadata: {
          custom_fields: [
            { display_name: "Name", variable_name: "name", value: name },
            { display_name: "Phone", variable_name: "phone", value: phone },
            { display_name: "Book Title", variable_name: "book_title", value: bookTitle },
            { display_name: "Book ID", variable_name: "book_id", value: bookId },
          ],
        },
      }),
    });

    const data = await res.json();
    if (!data.status) {
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 400 });
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Book payment init error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
