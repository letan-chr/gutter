import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import ProductDetails from '@/components/pages/products/ProductDetails';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <>
      <Breadcrump 
        backgroundImage="https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        title={title}
        subtitle="Premium quality gutter solutions for your home"
      />
      <ProductDetails slug={slug} />
    </>
  )
}

export default page