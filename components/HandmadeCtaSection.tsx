"use client"

import Link from 'next/link'
import Container from '@/components/container'
import { motion } from 'framer-motion'

const HandmadeCtaSection = () => {
  return (
    <section aria-labelledby="handmade-cta" className="w-full py-12 md:py-16 bg-[--color-shop-light-pink]">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.4}} id="handmade-cta" className="text-4xl md:text-6xl font-semibold" style={{color:'var(--color-shop-deepbeige)'}}>About AESBEADS</motion.h2>
          <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.5, delay:0.05}} className="mt-4 text-base md:text-lg" style={{color:'var(--color-shop-warmterracotta)'}}>
            I offer a wide range of handcrafted jewelry, including necklaces, bracelets, earrings, and rings.Each piece is uniquely designed.AESBEADS, founded in 2022, is a handmade jewellery brand offering bracelets, necklaces, earrings, and rings etc. Each piece blends affordability, style, and quality, designed to make everyday wear elegant and special. With the tagline “Beads that whisper elegance,” AESBEADS reflects creativity, care, and uniqueness in every creation.
          </motion.p>
          <motion.div initial={{opacity:0, scale:0.98}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.4}} className="mt-8">
            <Link href="/shop" className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium hoverEffect shadow-sm" style={{backgroundColor:'var(--color-shop-coralpeach)', color:'#fff'}}>
              Shop Now
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default HandmadeCtaSection


