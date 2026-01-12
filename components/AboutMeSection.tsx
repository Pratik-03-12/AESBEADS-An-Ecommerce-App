"use client"

import Image from 'next/image'
import Container from '@/components/container'
import { motion } from 'framer-motion'
const AboutMeSection = () => {
  return (
    <section aria-labelledby="about-me" className="w-full py-10 md:py-14">
      <Container>
        {/* <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-8 md:gap-12 items-center"> */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.45}} className="rounded-xl overflow-hidden bg-[--color-shop-light-pink] shadow-md md:shadow-lg">
            {/* <div className="relative aspect-[4/5]">
              <Image src="/offers/author2.jpeg" alt="Portrait" fill className="object-cover" />
            </div> */}
          </motion.div>
          <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.45, delay:0.05}}>
            <h2 id="about-me" className="text-4xl md:text-5xl font-semibold tracking-tight" style={{color:'var(--color-shop-deepbeige)'}}>About Me</h2>
            <div className="mt-4 space-y-4 text-base leading-7" style={{color:'var(--color-shop-warmterracotta)'}}>
              <p>My name is Saranya Roy, and I’m a 17-year-old student and entrepreneur from India. I founded AESBEADS in 2022 as a sole proprietorship. Every single piece you see here is handmade with love — from designing and crafting jewellery to clicking photos, recording videos, editing, posting, promoting, and even talking to customers. I manage it all myself because this brand is my passion.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default AboutMeSection


