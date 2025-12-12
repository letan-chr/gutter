import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Service from '@/components/pages/service/Service';

const page = () => {
  return (
    <>
      <Breadcrump 
        backgroundImage="/assets/images/breadcrump-for-service.jpg"
        title="Our Services"
        subtitle="Professional gutter installation, maintenance, and repair services"
      />
      <Service />
    </>
  )
}

export default page