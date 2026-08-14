import { NextRequest, NextResponse } from "next/server";
import { sendBookEmail, sendBookPreorderEmail } from "@/lib/email";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BOOKS } from "@/lib/products";

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

    // Extract metadata and customer info
    const { customer, metadata, amount: paidAmount } = verifyData.data;
    const customerEmail = customer.email;
    const customerName = metadata?.custom_fields?.find((f: any) => f.variable_name === "name")?.value || customer?.first_name || "Valued Customer";
    const customerPhone = metadata?.custom_fields?.find((f: any) => f.variable_name === "phone")?.value || "";
    const customerAddress = metadata?.custom_fields?.find((f: any) => f.variable_name === "address")?.value || "";

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
      if (bookId) cartItems.push({ id: bookId, bookId, title: bookTitle, format: "digital" });
    }

    // VALIDATION: Calculate expected total price based on format
    let expectedTotal = 0;
    for (const item of cartItems) {
      const rawBookId = item.bookId || item.id.replace(/-(digital|physical)$/, "");
      const format = item.format || "digital";
      const book = BOOKS.find(b => b.id === rawBookId);
      if (book) {
        expectedTotal += format === "physical" ? book.pricePhysical : book.priceDigital;
      } else {
        console.warn(`Unknown book ID in cart: ${rawBookId} for ref: ${reference}`);
        return NextResponse.json({ error: "Invalid item in cart" }, { status: 400 });
      }
    }

    if (paidAmount < expectedTotal * 100) {
      console.error(`PRICE MANIPULATION DETECTED: Paid ${paidAmount} kobo, expected ${expectedTotal * 100} kobo for ref: ${reference}`);
      return NextResponse.json({ error: "Incorrect payment amount" }, { status: 400 });
    }

    const results = [];
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    for (const item of cartItems) {
      const rawBookId = item.bookId || item.id.replace(/-(digital|physical)$/, "");
      const format = item.format || "digital";
      const { title: bookTitle } = item;
      const readUrl = format === "digital" ? `${baseUrl}/books/read?id=${rawBookId}&ref=${reference}` : "";

      // 1. Send Email according to format
      let emailSent = false;
      if (format === "physical") {
        emailSent = await sendBookPreorderEmail(customerEmail, bookTitle, customerAddress);
      } else {
        emailSent = await sendBookEmail(customerEmail, bookTitle, readUrl);
      }

      // 2. Log purchase to Firestore
      try {
        await setDoc(doc(db, "book_purchases", `${reference}_${item.id}`), {
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
          bookId: rawBookId,
          bookTitle,
          format,
          reference,
          amount: item.price || (paidAmount / 100 / cartItems.length),
          status: "success",
          preorderStatus: format === "physical" ? "pending_dispatch" : "fulfilled",
          emailSent,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error("Firestore logging error:", e);
      }

      results.push({ bookTitle, readUrl, format, emailSent });
    }

    console.log(`Successfully processed purchase for ref: ${reference}`);

    return NextResponse.json({
      success: true,
      items: results,
      bookTitle: results.length > 0 ? results[0].bookTitle : "Your Books",
      readUrl: results.length > 0 ? results[0].readUrl : "",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
