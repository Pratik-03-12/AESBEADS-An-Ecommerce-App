"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import useStore from "@/store";
import { Suspense, useEffect } from "react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import {motion} from "motion/react";

const SuccessPageContent = () => {
  const params = useSearchParams();

  const paymentId = params.get("payment_id");
  const orderId = params.get("order_id");
  const {resetCart} = useStore();

  useEffect((
  )=>{
    if(orderId){
      resetCart();
    }
  },[resetCart])
  return (
    <div className="py-5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl flex flex-col gap-8 shadow-2xl p-6 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-shop-deepbeige rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Check className="text-white w-10 h-10" />
        </motion.div>

        <h1 className="text-3xl font-bold text-shop-coralpeach mb-4">
          Order Confirmed!
        </h1>
        <div className="space-y-4 mb-4 text-left">
          <p className="text-shop-coralpeach/80">
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p className="text-shop-coralpeach/70">
            Order Id:{" "}
            <span className="text-shop-warmterracotta font-semibold">{orderId}</span>
          </p>
          <p className="text-shop-coralpeach/70">
            Payment Id:{" "}
            <span className="text-shop-warmterracotta font-semibold">{paymentId}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-shop-dustyrosebrown text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-lightGreen text-shop-dustyrosebrown border border-lightGreen rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-shop-dustyrosebrown text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};


export default SuccessPage;
