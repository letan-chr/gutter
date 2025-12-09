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
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80"
        title={title}
        subtitle="Professional service tailored to your needs"
      />
      <ServiceDetails slug={slug} />
    </>
  )
}

export default page