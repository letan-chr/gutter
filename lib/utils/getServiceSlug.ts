import { ServiceType } from "@/types/types";

export function getServiceSlug(service: ServiceType): string | null {
  // 1️⃣ Primary slug
  if (typeof service.slug === "string" && service.slug.trim() !== "") {
    return service.slug;
  }

  // 2️⃣ Fallback to English translation slug
  const enTranslation = service.translations?.find(
    (t) => t.locale === "en" && typeof t.slug === "string"
  );

  return enTranslation?.slug ?? null;
}
