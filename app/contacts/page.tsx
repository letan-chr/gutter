import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Contact from '@/components/pages/contacts/Contact';
import Partners from '@/components/sections/Partners';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="/assets/images/breadcrump.jpg"
  title="Contact Us"
  subtitle="Get in touch with our team for expert advice and professional service"
/>
<Contact />
<Partners />
</>
  )
}

export default page