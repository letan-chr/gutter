import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Strategy from '@/components/pages/company/strategy/Strategy';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="/assets/images/breadcrump.jpg"
  title="Our Strategy"
  subtitle="Building the future with strategic vision and innovative solutions"
/>
<Strategy />
</>
  )
}

export default page