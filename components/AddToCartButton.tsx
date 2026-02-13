"use client";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
interface Props {
  product: any;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const stock = typeof product?.stock === "number" ? product.stock : 0;
  const isOutOfStock = stock <= 0;
  const handleAddToCart = () => {
    if (stock > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`,
      );
    } else {
      toast.error("Can not add more than available stock");
    }
  };
  return (
    <div className="w-full h-12 items-center">
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-950">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full text-white bg-shop-warmterracotta/80 text-shadow-shop_light_bg shadow-none border border-shop-warmterracotta/80 font-semibold tracking-wide hover:text-white hover:bg-shop-warmterracotta hover:border-shop-warmterracotta hoverEffect",
            className,
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
