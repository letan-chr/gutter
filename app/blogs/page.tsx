import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Blog from '@/components/pages/blog/Blog';
const page = () => {
  return (
 <>
 <Breadcrump 
   backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
   title="Our Blog"
   subtitle="Stay updated with the latest news, insights, and industry trends"
 />
 <Blog />
 </>
 
  )
}

export default page