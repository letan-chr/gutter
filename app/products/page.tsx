import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Product from '@/components/pages/products/Product';

const page = () => {
  return (
    <>
      <Breadcrump 
        backgroundImage="https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        title="Our Products"
        subtitle="Discover our premium range of high-quality gutter solutions"
      />
      <Product />
    </>
  )
}

export default page