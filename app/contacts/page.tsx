import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Contact from '@/components/pages/contacts/Contact';
import Partners from '@/components/sections/Partners';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
  title="Contact Us"
  subtitle="Get in touch with our team for expert advice and professional service"
/>
<Contact />
<Partners />
</>
  )
}

export default page