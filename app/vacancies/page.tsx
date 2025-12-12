import Breadcrump from '@/components/layouts/Breadcrump'
import React from 'react'
import Vacancy from '@/components/pages/company/vacancy/Vacancy'
const page = () => {
  return (
    <>
      <Breadcrump 
        backgroundImage="/assets/images/breadcrump.jpg"
        title="Career Opportunities"
        subtitle="Join our team and build your career with industry-leading professionals"
      />
      <Vacancy />
    </>
  )
}

export default page
