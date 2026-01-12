"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ImageOff } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { latestOffers, type Offer } from '@/constants/offers'
import Container from '@/components/container'

const OfferSlide = ({ offer }: { offer: Offer }) => {
  const [failed, setFailed] = useState(false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-6 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-10 bg-white shadow-sm">
      <div className="order-2 md:order-1 space-y-3">
        {offer.badge ? (
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs tracking-wide" style={{backgroundColor:'var(--color-shop-beige6)', color:'var(--color-shop-warmterracotta)'}}>
            {offer.badge}
          </span>
        ) : null}
        <p className="text-sm uppercase tracking-widest" style={{color:'var(--color-shop-warmterracotta)'}}>{offer.title}</p>
        <motion.p initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.35}} className="text-4xl sm:text-5xl md:text-6xl font-semibold" style={{color:'var(--color-shop-deepbeige)'}}>{offer.subtitle}</motion.p>
        <Link href={offer.href} className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium hover:bg-amber-900 hoverEffect" style={{backgroundColor:'var(--color-shop-coralpeach)', color:'#fff'}}>
          {offer.ctaLabel}
        </Link>
      </div>
      <div className="order-1 md:order-2 flex justify-center">
        <motion.div initial={{opacity:0, scale:0.96}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.35}} className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-72 md:w-72">
          {failed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg" style={{backgroundColor:'var(--color-shop-light-pink)', color:'var(--color-shop-deepbeige)'}}>
              <ImageOff className="h-10 w-10 opacity-70" />
              <span className="mt-2 text-xs opacity-80">Image unavailable</span>
            </div>
          ) : (
            <Image
              src={offer.image}
              alt={offer.subtitle || offer.title}
              fill
              className="object-contain"
              onError={() => setFailed(true)}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

const HomeOffersCarousel = () => {
  return (
    <section aria-labelledby="home-offers" className="w-full py-6 sm:py-8 md:py-10 bg-[--color-shop-light-pink]">
      <Container>
        <h2 id="home-offers" className="sr-only">Latest Offers</h2>
        <div className="relative">
          <Carousel className="px-4" opts={{align:"start"}} plugins={[Autoplay({delay:3500, stopOnInteraction:false})]}>
            <CarouselContent>
              {latestOffers.map((offer) => (
                <CarouselItem key={offer.id}>
                  <OfferSlide offer={offer} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </Container>
    </section>
  )
}

export default HomeOffersCarousel


