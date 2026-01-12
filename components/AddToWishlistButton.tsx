import { Product } from '@/sanity.types'
import { Heart } from 'lucide-react';
import React from 'react'
import { cn } from '@/lib/utils';

const AddToWishlistButton = ({
    product,
    className,
}:{
    product: Product;
    className?:string;
}) => {
  return (
    <div className={cn("absolute top-2 right-2 z-10",className)}>
        <button className='p-2.5 rounded-full hover:bg-shop-coralpeach hover:text-white hoverEffect bg-shop-beige6'>
            <Heart size={15}/>
        </button>
    </div>
  )
}

export default AddToWishlistButton