import { ServiceType } from "@/types/types";
import { DEFAULT_LANGUAGE } from "../constants/constants";

export function resolveService(service: ServiceType, locale: string): ServiceType {
  const translations = service.translations ?? [];

  // 1️⃣ active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...service,

    title: t?.title || service.title || "",
    slug: t?.slug || service.slug || null,
    short_description: t?.short_description || service.short_description || "",
    description: t?.description || service.description || "",

    // normalize response
    translations: [],
  };
}
