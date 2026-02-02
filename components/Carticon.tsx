"use client";
import useStore from '@/store'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Carticon = () => {
  const {items} = useStore();
  return (
    <Link href={"/cart"} className='group relative'>
        <ShoppingBag className='w-5 h-5 hover:text-shop_orange hoverEffect'/>
        <span className='absolute -top-1 -right-1 bg-amber-900 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center'>{items?.length?items?.length:0}</span>
    </Link>
  )
}

export default Carticon