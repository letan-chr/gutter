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
        backgroundImage="/assets/images/breadcrump.jpg"
        title={title}
        subtitle="Premium quality gutter solutions for your home"
      />
      <ProductDetails slug={slug} />
    </>
  )
}

export default page