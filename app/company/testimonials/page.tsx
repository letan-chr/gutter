import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Testimonial from '@/components/pages/company/testimonial/Testimonial';
const page = () => {
  return (
  <>
  <Breadcrump 
    backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80"
    title="Testimonials"
    subtitle="Hear what our satisfied customers have to say about our services"
  />
  <Testimonial />
  </>
  )
}

export default page