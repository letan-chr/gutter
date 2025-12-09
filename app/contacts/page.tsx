import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Contact from '@/components/pages/contacts/Contact';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
  title="Contact Us"
  subtitle="Get in touch with our team for expert advice and professional service"
/>
<Contact />
</>
  )
}

export default page