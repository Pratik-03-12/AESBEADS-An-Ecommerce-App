"use client";
import { Product } from '@/sanity.types'
import React from 'react'
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
interface Props{
    product: Product | null |undefined;
    className?: string;
}


const AddToCartButton = ({product, className}:Props) => {
    const isOutOfStock = product?.stock === 0;
    const handleAddToCart =()=>{
      window.alert("Added to Cart");
    };
  return (
    <div className='flex-1'>
        <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn("w-full text-white bg-shop-warmterracotta/80 text-shadow-shop_light_bg shadow-none border border-shop-warmterracotta/80 font-semibold tracking-wide hover:text-white hover:bg-shop-warmterracotta hover:border-shop-warmterracotta hoverEffect",className
        )}>
            <ShoppingBag/>{isOutOfStock?"Out of Stock":"Add to Cart"}
        </Button>
    </div>
  )
}

export default AddToCartButton