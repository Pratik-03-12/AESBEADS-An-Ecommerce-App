import { Heart} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FavouriteButton = () => {
  return (
    <Link href={"/cart"} className='group relative'>
        <Heart className='w-5 h-5 hover:text-shop_orange hoverEffect'/>
        <span className='absolute -top-1 -right-1 bg-amber-900 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center'>0</span>
    </Link>
  )
}

export default FavouriteButton