import { NextRequest, NextResponse } from "next/server";
import { sendEventRegistrationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json({ error: "Missing payment reference" }, { status: 400 });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Payment configuration error" }, { status: 500 });
    }

    // Verify payment with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data?.status !== "success") {
      console.error(`Paystack verification failed for ref: ${reference}`);
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Extract customer and metadata
    const { customer, metadata } = verifyData.data;
    const customerEmail = customer?.email;
    const eventId = metadata?.eventId || "masterclass-2026";
    const eventTitle = eventId === "masterclass-2026" ? "2-Month Transformational Masterclass" : "Academy Event";
    const whatsappLink = "https://chat.whatsapp.com/EV8zxl9XGdDJYo5yDPd9dZ?s=cl&p=a&ilr=1&amv=3";
    if (customerEmail) {
      await sendEventRegistrationEmail(customerEmail, eventTitle, whatsappLink);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...verifyData.data,
        whatsappLink
      },
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
