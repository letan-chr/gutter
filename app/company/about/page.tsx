import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import About from '@/components/pages/company/about/About';
const page = () => {
  return (
 <>
 <Breadcrump 
   backgroundImage="/assets/images/breadcrump.jpg"
   title="About Us"
   subtitle="Leading the industry with innovation, quality, and exceptional service"
 />
 <About />
 </>
  )
}

export default page