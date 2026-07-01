import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone, eventId, amount } = body;

    if (!email || !eventId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ error: "Payment not configured" }, { status: 500 });

    const appUrl = req.nextUrl?.origin || process.env.NEXT_PUBLIC_APP_URL || "https://nexleadershipcommunity.com";
    const callbackUrl = `${appUrl}/events/purchase-success`;

    const customFields = [
      { display_name: "Name", variable_name: "name", value: name },
      { display_name: "Phone", variable_name: "phone", value: phone },
      { display_name: "Event ID", variable_name: "eventId", value: eventId },
    ];

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // NGN to kobo
        currency: "NGN",
        callback_url: callbackUrl,
        metadata: {
          custom_fields: customFields,
          eventId,
          type: "event_registration"
        },
      }),
    });

    const data = await res.json();
    if (!data.status) return NextResponse.json({ error: "Failed to initialize payment" }, { status: 400 });

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (err) {
    console.error("Init payment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
