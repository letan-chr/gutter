import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Product from '@/components/pages/products/Product';

const page = () => {
  return (
    <>
      <Breadcrump 
        backgroundImage="/assets/images/breadcrump.jpg"
        title="Our Products"
        subtitle="Discover our premium range of high-quality gutter solutions"
      />
      <Product />
    </>
  )
}

export default page