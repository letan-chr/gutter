import Breadcrump from '@/components/layouts/Breadcrump'
import React from 'react'
import Vacancy from '@/components/pages/company/vacancy/Vacancy'
const page = () => {
  return (
    <>
      <Breadcrump 
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
        title="Career Opportunities"
        subtitle="Join our team and build your career with industry-leading professionals"
      />
      <Vacancy />
    </>
  )
}

export default page
