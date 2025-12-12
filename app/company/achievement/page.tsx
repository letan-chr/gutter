import React from 'react'
import Breadcrump from '@/components/layouts/Breadcrump';
import Achievement from '@/components/pages/company/achievements/Achievement';
const page = () => {
  return (
<>
<Breadcrump 
  backgroundImage="/assets/images/breadcrump.jpg"
  title="Our Achievements"
  subtitle="Celebrating milestones and successes that define our excellence"
/>
<Achievement />
</>
  )
}

export default page