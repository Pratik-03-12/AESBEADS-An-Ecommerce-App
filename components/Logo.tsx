import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

const Logo = ({ className ,spanDesign}: { className?: string,spanDesign?:string }) => {
  return (
    <Link href={"/"} className='inline-flex'>
        <h2 className={cn("text-2xl font-black text-amber-800 tracking-wider uppercase hover:text-amber-900 hoverEffect group font-sans",className)}>
            A E S B E A D S
        </h2>
    </Link>
  )
}

export default Logo