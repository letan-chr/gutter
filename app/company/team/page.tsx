import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Team from '@/components/pages/company/Teams/Team';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  title="Our Team"
  subtitle="Meet the talented professionals who make excellence possible"
/>
<Team />
</>
  )
}

export default page