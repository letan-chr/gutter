"use client"

import { getAllBlogs } from '@/api/Api';
import Breadcrump from '@/components/layouts/Breadcrump';
import BlogDetails from '@/components/pages/blog/BlogDetails';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { resolveBlog } from '@/lib/resolvers/blogResolver';
import { Blog } from '@/types/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const { slug } = useParams();
  const {language: lang} = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
      async function fetchData() {
        try {
          const [blogsRes] = await Promise.all([
            getAllBlogs()
          ]);
  
          setBlogs(
            blogsRes.data.map((blog: Blog) => resolveBlog(blog, lang))
          );
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }, [lang]);

    const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;

    const blog = blogs.find((b) => b.slug === normalizedSlug);
    const relatedBlogs = blogs
      .filter((b) => b.slug !== normalizedSlug)
      .slice(0, 4);

    if (!blog) {
      return (
        <div className="py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {lang === "en" ? "Post not found" : "ልጥፍ አልተገኘም"}
          </p>
        </div>
      );
    }
  
  return (
    <>
      <Breadcrump
        backgroundImage="/assets/images/breadcrump.jpg"
        title={blog?.title}
        subtitle="Read our latest insights and updates"
      />
      <BlogDetails post={blog} relatedPosts={relatedBlogs} />
    </>
  );
}

export default page
