import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Blog from '@/components/pages/blog/Blog';
const page = () => {
  return (
 <>
 <Breadcrump 
   backgroundImage="/assets/images/breadcrump.jpg"
   title="Our Blog"
   subtitle="Stay updated with the latest news, insights, and industry trends"
 />
 <Blog />
 </>
 
  )
}

export default page