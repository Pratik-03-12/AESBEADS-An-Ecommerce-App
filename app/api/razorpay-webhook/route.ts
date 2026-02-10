import crypto from "crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature")!;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "payment.captured") {
    return NextResponse.json({ ok: true });
  }

  const payment = event.payload.payment.entity;
  const notes = payment.notes || {};

  //CREATE INVOICE IN RAZORPAY
  const invoice = await razorpay.invoices.create({
    type: "invoice",
    customer: {
      name: notes.customerName,
      email: notes.customerEmail,
    },
    line_items: JSON.parse(notes.products).map((item: any) => ({
      name: item.product.name,
      amount: item.product.price * 100,
      currency: "INR",
      quantity: item.quantity,
    })),
    // email_notify: 1,
  });
  // notes will carry frontend metadata (we’ll add this in checkout)
  try {
    await client.create({
      _type: "order",

      orderNumber: notes.orderNumber,

      razorpayorderid: payment.order_id,
      razorpaypaymentid: payment.id,
      razorpaysignature: signature,

      userid: notes.userId,
      customername: notes.customerName,
      customeremail: notes.customerEmail,

      products: JSON.parse(notes.products).map((item: any) => ({
        _key: crypto.randomUUID(),
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        quantity: item.quantity,
      })),
      totalPrice: Number(notes.totalPrice),
      currency: "INR",
      amountDiscount: Number(notes.amountDiscount),

      address: JSON.parse(notes.address),

      invoice: {
        id: invoice.id,
        number: invoice.invoice_number,
        hosted_invoice_url: invoice.short_url,
      },
      status: "paid",
      orderDate: new Date().toISOString(),
    });
    console.log("Order saved in Sanity");
  } catch (err) {
    console.log("Sanity Write failed:", err);
  }

  return NextResponse.json({ success: true });
}
