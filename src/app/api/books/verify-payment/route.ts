import { NextRequest, NextResponse } from "next/server";
import { sendBookEmail } from "@/lib/email";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference } = body;
    console.log("Verifying payment for reference:", reference);


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
      console.error("Paystack verification failed or status not success:", verifyData);
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    console.log("Paystack verification successful. Data:", verifyData.data);


    // Extract metadata
    const customerEmail = verifyData.data.customer.email;
    const metadata = verifyData.data.metadata;
    const bookTitle = metadata?.custom_fields?.find((f: any) => f.variable_name === "book_title")?.value || "Your Book";
    const bookId = metadata?.custom_fields?.find((f: any) => f.variable_name === "book_id")?.value;
    const customerName = metadata?.custom_fields?.find((f: any) => f.variable_name === "name")?.value || customer?.first_name || "Valued Customer";
    const customerPhone = metadata?.custom_fields?.find((f: any) => f.variable_name === "phone")?.value || "";

    // In a real app, you would fetch this from a database or storage
    // For now, we use a placeholder link
    const downloadUrl = `${req.nextUrl.origin}/api/books/download?id=${bookId}&ref=${reference}`;

    console.log(`Attempting to send email to ${customerEmail} for book "${bookTitle}" with URL: ${downloadUrl}`);
    // 1. Send Email
    const emailSent = await sendBookEmail(customerEmail, bookTitle, downloadUrl);
    console.log("Email sent status:", emailSent);


    // 2. Log purchase to Firestore
    try {
      await addDoc(collection(db, "book_purchases"), {
        email: customerEmail,
        name: customerName,
        phone: customerPhone,
        bookId,
        bookTitle,
        reference,
        amount: verifyData.data.amount / 100,
        status: "success",
        emailSent,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Firestore logging error:", e);
    }

    return NextResponse.json({
      success: true,
      bookTitle,
      downloadUrl,
      emailSent,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
