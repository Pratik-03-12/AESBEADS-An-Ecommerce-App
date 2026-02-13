"use client";

import Container from "@/components/container";
import Title from "@/components/Title";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Package, Truck, Clock } from "lucide-react";
import { ORDERS_BY_USER_QUERY } from "@/sanity/queries/query";

type OrderProduct = {
  product?: {
    _id: string;
    name?: string;
    price?: number;
    slug?: { current?: string };
    images?: { asset?: { _ref: string } }[];
  };
  quantity?: number;
  _key: string;
};

type Order = {
  _id: string;
  orderNumber?: string;
  status?:
    | "pending"
    | "processing"
    | "paid"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  orderDate?: string;
  totalPrice?: number;
  currency?: string;
  amountDiscount?: number;
  address?: {
    state?: string;
    zip?: string;
    city?: string;
    address?: string;
    name?: string;
  };
  invoice?: {
    hosted_invoice_url?: string;
    number?: string;
  };
  products?: OrderProduct[];
};

const getStatusLabel = (status?: Order["status"]) => {
  switch (status) {
    case "pending":
      return "Pending";
    case "processing":
      return "Processing";
    case "paid":
      return "Paid";
    case "shipped":
      return "Shipped";
    case "out_for_delivery":
      return "Out for Delivery";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return "Pending";
  }
};

const getStatusClasses = (status?: Order["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "processing":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "paid":
      return "bg-shop-beige6 text-shop-deepbeige border-shop-beige6";
    case "shipped":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "out_for_delivery":
      return "bg-shop-coralpeach/10 text-shop-coralpeach border-shop-coralpeach/30";
    case "delivered":
      return "bg-lightGreen text-shop-dustyrosebrown border-lightGreen";
    case "cancelled":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
  }
};

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (status !== "authenticated" || !session?.user) return;

      const userId = (session.user as any)?.id as string | undefined;
      if (!userId) return;

      setLoading(true);
      try {
        const data = await client.fetch<Order[]>(ORDERS_BY_USER_QUERY, { userId });
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-shop_light_bg">
        <p className="text-shop-coralpeach">Loading your account...</p>
      </div>
    );
  }

  if (status !== "authenticated" || !session?.user) {
    return <NoAccess />;
  }

  return (
    <div className="bg-shop_light_bg py-6 md:py-10 min-h-screen">
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <Package className="text-shop-deepbeige" />
          <Title>Your Orders</Title>
        </div>

        {loading && (
          <div className="min-h-[40vh] flex items-center justify-center">
            <p className="text-shop-coralpeach">Fetching your orders...</p>
          </div>
        )}

        {!loading && (!orders || orders.length === 0) && (
          <div className="min-h-[40vh] flex flex-col items-center justify-center bg-white rounded-xl border border-shop-beige6 px-6 py-10 text-center shadow-sm">
            <Package className="w-12 h-12 text-shop-beige6 mb-3" />
            <h2 className="text-xl font-semibold text-shop-deepbeige mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-shop-coralpeach/80 max-w-md">
              When you place an order, it will appear here with full tracking
              details and status updates.
            </p>
          </div>
        )}

        {!loading && orders && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => {
              const date = order.orderDate
                ? new Date(order.orderDate).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-shop-beige6 shadow-sm p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-shop-coralpeach/70">
                        Order
                      </p>
                      <p className="text-sm md:text-base font-semibold text-shop-deepbeige">
                        #{order.orderNumber}
                      </p>
                      {date && (
                        <p className="text-xs text-shop-coralpeach/70 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {date}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClasses(
                          order.status,
                        )}`}
                      >
                        {order.status === "shipped" ||
                        order.status === "out_for_delivery" ? (
                          <Truck className="w-3 h-3 mr-1" />
                        ) : (
                          <Package className="w-3 h-3 mr-1" />
                        )}
                        {getStatusLabel(order.status)}
                      </span>
                      {order.invoice?.hosted_invoice_url && (
                        <a
                          href={order.invoice.hosted_invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-shop-coralpeach hover:text-shop-warmterracotta hover:underline"
                        >
                          View Invoice
                        </a>
                      )}
                    </div>
                  </div>

                  {order.address && (
                    <div className="mb-4 text-xs md:text-sm text-shop-coralpeach/80">
                      <p className="font-semibold text-shop-deepbeige mb-0.5">
                        Shipping to: {order.address.name}
                      </p>
                      <p>
                        {order.address.address}, {order.address.city},{" "}
                        {order.address.state} {order.address.zip}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-shop-beige6 pt-4 mt-2 space-y-3">
                    {order.products?.map((item) => {
                      if (!item.product) return null;
                      const image = item.product.images?.[0];
                      return (
                        <div
                          key={item._key}
                          className="flex items-center gap-3 md:gap-4"
                        >
                          {image?.asset && (
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border">
                              <Image
                                src={urlFor(image).width(200).height(200).url()}
                                alt={item.product.name || "Product image"}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-shop-deepbeige line-clamp-1">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-shop-coralpeach/80">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <PriceFormatter
                              amount={
                                (item.product.price || 0) * (item.quantity || 0)
                              }
                              className="text-sm font-semibold text-shop-deepbeige"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-shop-beige6 pt-4 mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="text-xs md:text-sm text-shop-coralpeach/80">
                      {typeof order.amountDiscount === "number" &&
                        order.amountDiscount > 0 && (
                          <p>
                            Discount applied:{" "}
                            <span className="font-semibold text-shop-deepbeige">
                              <PriceFormatter amount={order.amountDiscount} />
                            </span>
                          </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wide text-shop-coralpeach/70">
                        Order Total
                      </span>
                      <PriceFormatter
                        amount={order.totalPrice || 0}
                        className="text-lg font-bold text-shop-deepbeige"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;

