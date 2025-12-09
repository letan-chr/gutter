import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import About from '@/components/pages/company/about/About';
const page = () => {
  return (
 <>
 <Breadcrump 
   backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
   title="About Us"
   subtitle="Leading the industry with innovation, quality, and exceptional service"
 />
 <About />
 </>
  )
}

export default page