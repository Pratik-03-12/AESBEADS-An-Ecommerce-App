
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import Title from "./Title";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] border-shop-warmterracotta/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-shop-beige5">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()}
              alt="Product Image"
              loading="lazy"
              width={700}
              height={700}
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop-beige6 hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <AddToWishlistButton product={product} />
        {product?.status === "sale" && (
          <p className="absolute top-2 left-2 z-10 text-xs border-shop-deepbeige/50 px-2 rounded-full group-hover:border-shop-beige4 group-hover:text-shop-beige4 hoverEffect">
            Sale!
          </p>
        )}

        {product?.status === "new" && (
          <p className="absolute top-2 left-2 z-10 text-xs border-shop-deepbeige/50 px-2 rounded-full group-hover:border-shop-beige4 group-hover:text-shop-beige4 hoverEffect">
            New!
          </p>
        )}

        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border-shop-coralpeach p-1 rounded-full group-hover:border-shop-lightsalmonpink hover:text-shop-warmterracotta"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop-coralpeach group-hover:text-shop-lightsalmonpink hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-shop-beige6 ">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        <Link href={`/product/${product?.slug?.current}`}><Title className="text-sm line-clamp-1">{product?.name}</Title></Link>
        <div>
            <div className="flex items-center">
                {[...Array(5)].map((_,index)=>(
                    <StarIcon key={index} className={index<4 ?"text-shop-coralpeach" :"text-shop-beige6"}
                    fill={index<4?"#e2856c":"#ebd0c2"}/>
                ))}
            </div>
            <p className="text-shop-beige5 text-xs tracking-wide">5 Reviews</p>
        </div>
        <div className="flex items-center gap-2.5">
           <p className="font-medium">In Stock</p>
           <p className={`text-shop-beige2/80 font-semibold ${product?.stock === 0 ? "text-shop-coralpeach/80":"text-shop-beige2/80 font-semibold"}`}>
            {(product?.stock as number)>0?product?.stock:"unavailable"}</p>
        </div>
        <PriceView price={product?.price} discount={product?.discount} className="text-sm"/>
        <AddToCartButton product={product} className="w-36  rounded-full"/>
      </div>
    </div>
  );
};

export default ProductCard;
