import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone, date, time, amount, date2, time2 } = body;

    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
    if (!amount || (amount !== 30000 && amount !== 50000)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ error: "Payment not configured" }, { status: 500 });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const callbackUrl = `${origin}/mentorship/booking-success`;

    const customFields = [
      { display_name: "Name", variable_name: "name", value: name },
      { display_name: "Phone", variable_name: "phone", value: phone },
      { display_name: "Session 1 Date", variable_name: "date", value: date },
      { display_name: "Session 1 Time", variable_name: "time", value: time },
    ];

    if (amount === 50000 && date2 && time2) {
      customFields.push(
        { display_name: "Session 2 Date", variable_name: "date2", value: date2 },
        { display_name: "Session 2 Time", variable_name: "time2", value: time2 }
      );
    }

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
