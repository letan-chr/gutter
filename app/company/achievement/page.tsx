import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Achievement from '@/components/pages/company/achievements/Achievement';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  title="Our Achievements"
  subtitle="Celebrating milestones and successes that define our excellence"
/>
<Achievement />
</>
  )
}

export default page