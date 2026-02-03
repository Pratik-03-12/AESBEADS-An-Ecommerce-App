"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "@/components/container";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "@/components/PriceFormatter";
import AddToCartButton from "@/components/AddToCartButton";
import Title from "@/components/Title";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const {
    favouriteProduct,
    removeFromFavourite,
    resetFavourite,
  } = useStore();

  const loadMore = () => {
    setVisibleProducts((prev) =>
      Math.min(prev + 5, favouriteProduct?.length ?? 0)
    );
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      resetFavourite();
      toast.success("Wishlist reset successfully");
    }
  };

  return (
    <div className="bg-shop_light_bg pb-10">
      <Container>
        <div className="flex items-center gap-2 py-5">
          <Heart className="text-shop-deepbeige" />
          <Title className="text-shop-deepbeige">My Wishlist</Title>
        </div>

        {favouriteProduct?.length > 0 ? (
          <>
            <div className="overflow-x-auto rounded-md border border-shop-beige6 bg-white">
              <table className="w-full border-collapse">
                <thead className="border-b border-shop-beige6">
                  <tr className="bg-shop-beige6/30">
                    <th className="p-2 text-left text-shop-deepbeige font-semibold">
                      Image
                    </th>
                    <th className="p-2 text-left text-shop-deepbeige font-semibold hidden md:table-cell">
                      Type
                    </th>
                    <th className="p-2 text-left text-shop-deepbeige font-semibold hidden md:table-cell">
                      Status
                    </th>
                    <th className="p-2 text-left text-shop-deepbeige font-semibold">
                      Price
                    </th>
                    <th className="p-2 text-center md:text-left text-shop-deepbeige font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {favouriteProduct
                    ?.slice(0, visibleProducts)
                    ?.map((product: Product) => (
                      <tr
                        key={product?._id}
                        className="border-b border-shop-beige6/50 last:border-b-0"
                      >
                        <td className="px-2 py-4 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              removeFromFavourite(product?._id);
                              toast.success("Product removed from wishlist");
                            }}
                            className="shrink-0 p-0.5 rounded text-shop-deepbeige hover:text-shop-coralpeach hover:bg-shop-beige6/50 hoverEffect"
                            aria-label="Remove from wishlist"
                          >
                            <X size={18} className="cursor-pointer" />
                          </button>
                          {product?.images && (
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border border-shop-beige6 rounded-md group hidden md:inline-flex overflow-hidden"
                            >
                              <Image
                                src={urlFor(product?.images[0]).url()}
                                alt="product image"
                                width={80}
                                height={80}
                                className="rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain bg-shop-beige6/30"
                              />
                            </Link>
                          )}
                          <p className="line-clamp-1 text-shop-deepbeige font-medium">
                            {product?.name}
                          </p>
                        </td>
                        <td className="p-2 capitalize text-shop-deepbeige/80 hidden md:table-cell">
                          {product?.variant}
                        </td>
                        <td
                          className={`p-2 w-24 font-medium text-sm hidden md:table-cell ${
                            (product?.stock as number) > 0
                              ? "text-shop-warmterracotta"
                              : "text-shop-coralpeach"
                          }`}
                        >
                          {(product?.stock as number) > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </td>
                        <td className="p-2">
                          <PriceFormatter
                            amount={product?.price as number}
                            className="text-shop-deepbeige font-semibold"
                          />
                        </td>
                        <td className="p-2">
                          <AddToCartButton
                            product={product}
                            className="w-full max-w-[140px]"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {visibleProducts < (favouriteProduct?.length ?? 0) && (
                <div className="my-5">
                  <Button
                    variant="outline"
                    onClick={loadMore}
                    className="border-shop-deepbeige text-shop-deepbeige hover:bg-shop-beige6 hover:border-shop-warmterracotta hover:text-shop-warmterracotta"
                  >
                    Load More
                  </Button>
                </div>
              )}
              {visibleProducts > 10 && (
                <div className="my-5">
                  <Button
                    onClick={() => setVisibleProducts(10)}
                    variant="outline"
                    className="border-shop-deepbeige text-shop-deepbeige hover:bg-shop-beige6 hover:border-shop-warmterracotta hover:text-shop-warmterracotta"
                  >
                    Load Less
                  </Button>
                </div>
              )}
            </div>

            {favouriteProduct?.length > 0 && (
              <Button
                onClick={handleResetWishlist}
                className="mb-5 font-semibold bg-shop-coralpeach/90 hover:bg-shop-coralpeach text-white border-shop-coralpeach"
                variant="outline"
                size="lg"
              >
                Reset Wishlist
              </Button>
            )}
          </>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center bg-white rounded-2xl border border-shop-beige6">
            <div className="relative mb-4">
              <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-shop-coralpeach/20" />
              <Heart
                className="h-12 w-12 text-shop-beige2"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-shop-deepbeige">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-shop-deepbeige/80">
                Items added to your wishlist will appear here
              </p>
            </div>
            <Button
              asChild
              className="rounded-full font-semibold bg-shop-warmterracotta/80 hover:bg-shop-warmterracotta border-shop-warmterracotta text-white hoverEffect"
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default WishListProducts;
