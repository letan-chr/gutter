import { Blog } from "@/types/types";
import { DEFAULT_LANGUAGE } from "@/lib/constants/constants";
import { resolveBlogCategory } from "./blogCategoryResolver";

export function resolveBlog(blog: Blog, locale: string): Blog {
  const translations = blog.translations ?? [];

  // 1️⃣ Active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ Fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...blog,

    // localized content
    title: t?.title || blog.title,
    slug: t?.slug || blog.slug,
    content: t?.content || blog.content,
    excerpt: t?.excerpt || blog.excerpt,

    // resolve category (also localized)
    category: blog.category ? resolveBlogCategory(blog.category, locale) : null,

    // normalize
    translations: [],
  };
}
