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
    const { customer, metadata } = verifyData.data;
    const customerEmail = customer.email;
    const customerName = metadata?.custom_fields?.find((f: any) => f.variable_name === "name")?.value || customer?.first_name || "Valued Customer";
    const customerPhone = metadata?.custom_fields?.find((f: any) => f.variable_name === "phone")?.value || "";

    // Extract cart items
    const cartItemsRaw = metadata?.custom_fields?.find((f: any) => f.variable_name === "cart_items")?.value;
    let cartItems = [];
    try {
      cartItems = cartItemsRaw ? JSON.parse(cartItemsRaw) : [];
    } catch (e) {
      console.error("Error parsing cart items:", e);
    }

    // Fallback for legacy single-book payments
    if (cartItems.length === 0) {
      const bookId = metadata?.custom_fields?.find((f: any) => f.variable_name === "book_id")?.value;
      const bookTitle = metadata?.custom_fields?.find((f: any) => f.variable_name === "book_title")?.value || "Your Book";
      if (bookId) cartItems.push({ id: bookId, title: bookTitle });
    }

    const results = [];
    for (const item of cartItems) {
      const { id: bookId, title: bookTitle } = item;
      const downloadUrl = `${req.nextUrl.origin}/api/books/download?id=${bookId}&ref=${reference}`;

      console.log(`Attempting to send email to ${customerEmail} for book "${bookTitle}" with URL: ${downloadUrl}`);
      // 1. Send Email
      const emailSent = await sendBookEmail(customerEmail, bookTitle, downloadUrl);
      console.log(`Email sent status for "${bookTitle}":`, emailSent);


      // 2. Log purchase to Firestore
      try {
        await addDoc(collection(db, "book_purchases"), {
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
          bookId,
          bookTitle,
          reference,
          amount: verifyData.data.amount / 100 / cartItems.length,
          status: "success",
          emailSent,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error("Firestore logging error:", e);
      }

      results.push({ bookTitle, downloadUrl, emailSent });
    }

    return NextResponse.json({
      success: true,
      items: results,
      bookTitle: results.length > 0 ? results[0].bookTitle : "Your Books",
      downloadUrl: results.length > 0 ? results[0].downloadUrl : "",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
