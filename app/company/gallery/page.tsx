import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Gallery from '@/components/pages/company/gallery/Gallery';
const page = () => {
  return (
 <>
 <Breadcrump 
   backgroundImage="/assets/images/breadcrump.jpg"
   title="Gallery"
   subtitle="Explore our portfolio of successful projects and installations"
 />
 <Gallery />
 </>
  )
}

export default page