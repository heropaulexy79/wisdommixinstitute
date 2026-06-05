import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone, cartItems, amount } = body;

    if (!email || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Payment configuration error" }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wisdommixinstitute.com";
    const callbackUrl = `${appUrl}/books/purchase-success`;

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
            { 
              display_name: "Cart Items", 
              variable_name: "cart_items", 
              value: JSON.stringify(cartItems) 
            },
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
