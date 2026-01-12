import React from 'react'
import Container from '@/components/container'
import HomeOffersCarousel from '@/components/HomeOffersCarousel'
import AboutMeSection from '@/components/AboutMeSection'
import HandmadeCtaSection from '@/components/HandmadeCtaSection'
import HomeCategories from '@/components/HomeCategories'
import { getCategories } from '@/sanity/queries'

const Home = async () => {
  const categories = await getCategories(6);
  console.log(categories);
  return (
    <div className="w-full" style={{backgroundColor:'var(--color-shop-light-pink)'}}>
      <Container>
        <HomeOffersCarousel/>
        <AboutMeSection/>
        <HandmadeCtaSection/>
        <HomeCategories categories = {categories}/>
      </Container>
      <div className="h-10 md:h-20" style={{backgroundColor:'var(--color-shop-light-pink)'}}></div>
    </div>
  )
}

export default Home