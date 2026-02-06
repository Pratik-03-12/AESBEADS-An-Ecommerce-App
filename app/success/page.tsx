"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";

const SuccessPage = () => {
  const params = useSearchParams();

  const paymentId = params.get("payment_id");
  const orderId = params.get("order_id");

  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600">
          Your order has been placed successfully!
        </p>

        <div className="bg-white p-4 rounded-lg border">
          <p><strong>Payment ID:</strong> {paymentId}</p>
          <p><strong>Order ID:</strong> {orderId}</p>
        </div>

        <Link href="/">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    </Container>
  );
};

export default SuccessPage;
