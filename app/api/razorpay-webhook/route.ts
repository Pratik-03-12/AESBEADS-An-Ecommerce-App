import crypto from "crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

type WebhookCartItem = {
  product: { _id: string; name?: string; price?: number };
  quantity: number;
};

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

  const parsedProducts: WebhookCartItem[] = Array.isArray(
    JSON.parse(notes.products || "[]"),
  )
    ? JSON.parse(notes.products || "[]")
    : [];

  if (!parsedProducts.length) {
    console.error("Webhook: No products found in notes");
    return NextResponse.json(
      { success: false, reason: "NO_PRODUCTS_IN_NOTES" },
      { status: 400 },
    );
  }

  const productIds = Array.from(
    new Set(
      parsedProducts
        .map((item) => item.product?._id)
        .filter((id): id is string => typeof id === "string"),
    ),
  );

  // Re-check stock at webhook time to avoid overselling
  const products = await client.fetch<
    { _id: string; stock?: number }[]
  >(`*[_id in $ids]{ _id, stock }`, { ids: productIds });

  const productMap = new Map(products.map((p) => [p._id, p] as const));

  const insufficient = parsedProducts.find((item) => {
    const product = productMap.get(item.product._id);
    const available = product?.stock ?? 0;
    return !product || available < item.quantity;
  });

  if (insufficient) {
    console.error("Webhook: Insufficient stock for product", {
      productId: insufficient.product._id,
    });
    return NextResponse.json(
      {
        success: false,
        reason: "INSUFFICIENT_STOCK_AT_CAPTURE",
        productId: insufficient.product._id,
      },
      { status: 409 },
    );
  }

  //CREATE INVOICE IN RAZORPAY
  const invoice = await razorpay.invoices.create({
    type: "invoice",
    customer: {
      name: notes.customerName,
      email: notes.customerEmail,
    },
    line_items: parsedProducts.map((item) => ({
      name: item.product.name,
      amount: (item.product.price ?? 0) * 100,
      currency: "INR",
      quantity: item.quantity,
    })),
    // email_notify: 1,
  });

  // ✅ UPDATE STOCK HERE (after re-check)
  const transaction = client.transaction();

  for (const item of parsedProducts) {
    transaction.patch(item.product._id, {
      dec: { stock: item.quantity },
    });
  }

  try {
    await transaction.commit();
  } catch (err) {
    console.error("Webhook: Stock update transaction failed", err);
    return NextResponse.json(
      { success: false, reason: "STOCK_UPDATE_FAILED" },
      { status: 500 },
    );
  }

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

      products: parsedProducts.map((item) => ({
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
