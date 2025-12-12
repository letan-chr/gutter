import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import ServiceDetails from '@/components/pages/service/ServiceDetails';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <>
      <Breadcrump 
        backgroundImage="/assets/images/breadcrump-for-service.jpg"
        title={title}
        subtitle="Professional service tailored to your needs"
      />
      <ServiceDetails slug={slug} />
    </>
  )
}

export default page