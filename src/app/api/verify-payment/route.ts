import { NextRequest, NextResponse } from "next/server";
import { MENTORSHIP_PRICES } from "@/lib/products";

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

    // Verify payment with Paystack using the secret key (server-side only)
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
      console.error(`Payment verification failed for ref: ${reference}`);
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const paidAmount = verifyData.data.amount; // in kobo
    const expectedPrices = [
      MENTORSHIP_PRICES.SINGLE_SESSION * 100,
      MENTORSHIP_PRICES.DOUBLE_SESSION * 100
    ];

    // Check the amount paid is exactly one of the valid prices
    if (!expectedPrices.includes(paidAmount)) {
      console.warn(`Suspicious payment amount: ${paidAmount} kobo for ref: ${reference}`);
      return NextResponse.json({ error: "Incorrect payment amount" }, { status: 400 });
    }

    console.log(`Payment successful for ref: ${reference}`);

    // Return transaction details to the client (sanitized)
    return NextResponse.json({
      success: true,
      amount: paidAmount,
      paidAt: verifyData.data.paid_at,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
