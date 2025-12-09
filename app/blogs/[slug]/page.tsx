import Breadcrump from '@/components/layouts/Breadcrump';
import BlogDetails from '@/components/pages/blog/BlogDetails';
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
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
        title={title}
        subtitle="Read our latest insights and updates"
      />
      <BlogDetails slug={slug} />
    </>
  )
}

export default page
