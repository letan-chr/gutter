import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Strategy from '@/components/pages/company/strategy/Strategy';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  title="Our Strategy"
  subtitle="Building the future with strategic vision and innovative solutions"
/>
<Strategy />
</>
  )
}

export default page