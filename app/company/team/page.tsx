import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Team from '@/components/pages/company/Teams/Team';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="/assets/images/breadcrump.jpg"
  title="Our Team"
  subtitle="Meet the talented professionals who make excellence possible"
/>
<Team />
</>
  )
}

export default page