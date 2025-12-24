import { DocumentCategory } from "@/types/types";
import { DEFAULT_LANGUAGE } from "@/lib/constants/constants";

export function resolveDocumentCategory(
  category: DocumentCategory,
  locale: string
): DocumentCategory {
  const translations = category.translations ?? [];

  // 1️⃣ Active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ Fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...category,

    // localized fields
    name: t?.name || category.name,
    slug: t?.slug || category.slug,
    description: t?.description ?? category.description,

    // normalize
    translations: [],
  };
}
