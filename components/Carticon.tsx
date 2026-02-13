"use client";
import useStore from '@/store'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Carticon = () => {
  const { items } = useStore();
  return (
    <Link
      href={"/cart"}
      className="group relative inline-flex items-center justify-center rounded-full p-1.5 text-shop-deepbeige hover:text-shop-coralpeach hover:bg-shop-beige6/70 transition-colors"
      aria-label="View cart"
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="absolute -top-0.5 -right-0.5 bg-amber-900 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {items?.length ? items.length : 0}
      </span>
    </Link>
  );
};

export default Carticon