import CategoryProducts from '@/components/CategoryProducts';
import Container from '@/components/container';
import Title from '@/components/Title';
import { getCategories } from '@/sanity/queries';
import React from 'react'

const Categorypage = async({params}:{params:Promise<{slug:string}>;}) => {
  const categories = await getCategories();
  const {slug} = await params;
  return (
    <div className='py-10'>
      <Container>
        <Title>Products by Category:{" "}
          <span className='font-bold text-shop_orange capitalize tracking-wide'>{slug && slug}</span>
        </Title>
        <CategoryProducts categories={categories} slug={slug}/>
      </Container>
    </div>
  )
}

export default Categorypage;