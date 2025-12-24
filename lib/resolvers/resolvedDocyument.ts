import { Document } from "@/types/types";
import { Language } from "@/data/utils";
import { DEFAULT_LANGUAGE } from "@/lib/constants/constants";
import { resolveDocumentCategory } from "./resolveDocumentCategory";

export function resolveDocument(
  document: Document,
  locale: Language
): Document {
  const translations = document.translations ?? [];

  // 1️⃣ Active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ Fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...document,

    // localized fields
    name: t?.name || document.name,
    slug: t?.slug || document.slug,
    description: t?.description || document.description,

    // resolve category (localized)
    category: document.category
      ? resolveDocumentCategory(document.category, locale)
      : document.category,

    // normalize
    translations: [],
  };
}
