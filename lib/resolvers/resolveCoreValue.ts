import { CoreValue } from "@/types/types";
import { DEFAULT_LANGUAGE } from "../constants/constants";

export function resolveCoreValue(value: CoreValue, locale: string): CoreValue {
  const translations = value.translations ?? [];

  // 1️⃣ active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...value,

    title: t?.title || value.title,
    description: t?.description || value.description,

    // normalize
    translations: [],
  };
}
