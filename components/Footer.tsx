import React from 'react'
import Container from '@/components/container'
import FooterTop from './FooterTop'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { categoriesData, quickLinksData } from '@/constants/data'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className=' bg-white border-t'>
        <Container>
          {/* <FooterTop/> */}
          <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='space-y-4 '>
              <Logo/>
              <p className='text-shop-warmterracotta text-sm'>
                Discover a wide range of handcrafted jewellery that reflect creativity,care and uniqueness in every creation.
              </p>
              <SocialMedia className='text-shop-dustyrosebrown/70'/>
            </div>
            <div>
              <p className='font-semibold text-shop-deepbeige'>Quick Links</p>
              <ul className='space-y-3 mt-4'>
                {quickLinksData?.map((item)=>(
                  <li key={item?.title}>
                    <Link href={item?.href} className='text-shop-dustyrosebrown/80 hover:text-shop-warmterracotta hoverEffect'>
                    {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
               <p className='font-semibold text-shop-deepbeige'>Categories</p>
              <ul className='space-y-3 mt-4'>
                {categoriesData?.map((item)=>(
                  <li key={item?.title}>
                    <Link href={`/category/${item?.href}`} className='text-shop-dustyrosebrown/80 hover:text-shop-warmterracotta hoverEffect'>
                    {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div></div>
          </div>
          <div className='py-6 border-t text-center text-sm text-shop-dustyrosebrown'>
            <div>
            © {new Date().getFullYear()}<Logo className='text-sm'/>.All rights reserved.
            </div>
          </div> 
        </Container>
    </footer>
  )
}

export default Footer