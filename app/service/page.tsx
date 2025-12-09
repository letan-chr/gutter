import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Service from '@/components/pages/service/Service';

const page = () => {
  return (
    <>
      <Breadcrump 
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80"
        title="Our Services"
        subtitle="Professional gutter installation, maintenance, and repair services"
      />
      <Service />
    </>
  )
}

export default page