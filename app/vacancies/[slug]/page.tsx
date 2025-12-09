import Breadcrump from '@/components/layouts/Breadcrump';
import VacancyDetails from '@/components/pages/company/vacancy/VacancyDetails';
import React from 'react'

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <>
      <Breadcrump 
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
        title={title}
        subtitle="Join our team and make a difference"
      />
      <VacancyDetails slug={slug} />
    </>
  )
}

export default page
