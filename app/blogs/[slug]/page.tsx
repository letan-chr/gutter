import { getAllBlogs, getBlogBySlug } from "@/api/Api";
import Breadcrump from "@/components/layouts/Breadcrump";
import BlogDetails from "@/components/pages/blog/BlogDetails";
import { Blog } from "@/types/types";

/**
 * Pre-generate all blog slugs at build time
 */
export async function generateStaticParams() {
  const res = await getAllBlogs();

  return res.data.map((blog: Blog) => ({
    slug: blog.slug,
  }));
}

/**
 * Blog details page (SERVER COMPONENT)
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const normalizedSlug = slug;

  try {
    // 1️⃣ Fetch RAW blog (no language resolving here)
    const blogRes = await getBlogBySlug(normalizedSlug);
    const blog = blogRes.data;

    // 2️⃣ Fetch RAW blogs for related posts
    const allBlogsRes = await getAllBlogs();
    const relatedBlogs = allBlogsRes.data
      .filter((b: Blog) => b.slug !== normalizedSlug)
      .slice(0, 4);

    return (
      <>
        {/* Breadcrump can still be simple or static */}
        <Breadcrump
          backgroundImage="/assets/images/breadcrump.jpg"
          title={blog.title}
          subtitle="Read our latest insights and updates"
        />

        {/* ⬇️ PASS RAW DATA */}
        <BlogDetails
          unResolvedPost={blog}
          unResolvedRelatedPosts={relatedBlogs}
        />
      </>
    );
  } catch {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">Post not found</p>
      </div>
    );
  }
}
