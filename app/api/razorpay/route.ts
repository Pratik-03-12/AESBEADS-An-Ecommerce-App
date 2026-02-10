import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const {
    amount,
    orderNumber,
    userId,
    customerName,
    customerEmail,
    groupedItems,
    totalPrice,
    amountDiscount,
    address,
  }  = await req.json();

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "rcpt_" + Date.now(),
  
    notes: {
      orderNumber,
      userId,
      customerName,
      customerEmail,
      products: JSON.stringify(groupedItems),
      totalPrice,
      amountDiscount,
      address: JSON.stringify(address),
    },
  });
  return NextResponse.json(order);
}
