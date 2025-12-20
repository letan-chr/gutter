"use client";

import { getAllBlogs, getBlogBySlug } from "@/api/Api";
import Breadcrump from "@/components/layouts/Breadcrump";
import BlogDetails from "@/components/pages/blog/BlogDetails";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { resolveBlog } from "@/lib/resolvers/blogResolver";
import { Blog } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language: lang } = useLanguage();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    if (!normalizedSlug) return;

    async function fetchData() {
      try {
        // 1️⃣ Fetch blog by slug
        const blogRes = await getBlogBySlug(normalizedSlug);
        const resolvedBlog = resolveBlog(blogRes.data, lang);
        setBlog(resolvedBlog);

        // 2️⃣ Fetch all blogs
        const allBlogsRes = await getAllBlogs();
        const resolvedAll = allBlogsRes.data.map((b: Blog) =>
          resolveBlog(b, lang)
        );

        // 3️⃣ Related blogs (exclude current, limit 4)
        const related = resolvedAll
          .filter((b) => b.slug !== normalizedSlug)
          .slice(0, 4);

        setRelatedBlogs(related);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [normalizedSlug, lang]);

  if (!blog) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {lang === "en" ? "Post not found" : "ልጥፍ አልተገኘም"}
        </p>
      </div>
    );
  }

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
};

export default page;
