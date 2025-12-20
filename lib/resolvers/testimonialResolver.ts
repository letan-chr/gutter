import { Testimonial } from "@/types/types";
import { DEFAULT_LANGUAGE } from "../constants/constants";

export function resolveTestimonial(
  testimonial: Testimonial,
  locale: string
): Testimonial {
  const translations = testimonial.translations ?? [];

  // 1️⃣ active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...testimonial,

    name: t?.name || testimonial.name || "",
    role: t?.role || testimonial.role || "",
    description: t?.description || testimonial.description || "",
    company: t?.company ?? testimonial.company ?? null,

    // normalize response
    translations: [],
  };
}
