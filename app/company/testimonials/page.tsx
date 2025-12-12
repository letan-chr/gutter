import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Testimonial from '@/components/pages/company/testimonial/Testimonial';
const page = () => {
  return (
  <>
  <Breadcrump 
    backgroundImage="/assets/images/breadcrump.jpg"
    title="Testimonials"
    subtitle="Hear what our satisfied customers have to say about our services"
  />
  <Testimonial />
  </>
  )
}

export default page