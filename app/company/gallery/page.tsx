import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Gallery from '@/components/pages/company/gallery/Gallery';
const page = () => {
  return (
 <>
 <Breadcrump 
   backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
   title="Gallery"
   subtitle="Explore our portfolio of successful projects and installations"
 />
 <Gallery />
 </>
  )
}

export default page