"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavouriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favouriteProduct, addToFavourite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const availableItem = favouriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favouriteProduct]);

  const handleFavourite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavourite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-shop_orange hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-amber-900 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {favouriteProduct?.length?favouriteProduct.length:0}
          </span>
        </Link>
      ) : (
        <button onClick={handleFavourite} className="group relative hover:text-shop-warmterracotta hoverEffect border border-shop-deepbeige/70 hover:border-shop-warmterracotta p-1.5 rounded-sm">{
          existingProduct?(<Heart fill="#e2856c" className="text-shop-coralpeach/60 hover:text-shop-warmterracotta hoverEffect mt-.5 w-5 h-5"/>):(<Heart className="text-shop-coralpeach/60 hover:text-shop-warmterracotta hoverEffect mt-.5 w-5 h-5"/>)
        }
          
        </button>
      )}
    </>
  );
};

export default FavouriteButton;
