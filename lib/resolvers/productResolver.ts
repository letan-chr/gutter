import { DEFAULT_LANGUAGE } from "@/lib/constants/constants";
import { resolveProductCategory } from "./productCategoryResolver";
import { Product } from "@/types/types";

export function resolveProduct(product: Product, locale: string): Product {
  const translations = product.translations ?? [];

  // 1️⃣ Active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ Fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...product,

    name: t?.name || product.name,
    slug: t?.slug || product.slug,
    description: t?.description ?? product.description,

    // resolve nested category
    category: product.category
      ? resolveProductCategory(product.category, locale)
      : null,

    // normalize
    translations: [],
  };
}
