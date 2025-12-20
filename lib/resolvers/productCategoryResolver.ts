import { DEFAULT_LANGUAGE } from "@/lib/constants/constants";
import { ProductCategory } from "@/types/types";

export function resolveProductCategory(
  category: ProductCategory,
  locale: string
): ProductCategory {
  const translations = category.translations ?? [];

  // 1️⃣ Active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ Fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...category,

    name: t?.name || category.name,
    slug: t?.slug || category.slug,
    description: t?.description ?? category.description,

    // normalize
    translations: [],
  };
}
