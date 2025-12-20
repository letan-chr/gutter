import { BlogCategory } from "@/types/types";
import { DEFAULT_LANGUAGE } from "@/lib/constants/constants";

export function resolveBlogCategory(
  category: BlogCategory,
  locale: string
): BlogCategory {
  const translations = category.translations ?? [];

  // 1️⃣ Active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ Fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...category,

    title: t?.title || category.title,
    slug: t?.slug || category.slug,
    description: t?.description ?? category.description,

    // normalize
    translations: [],
  };
}
