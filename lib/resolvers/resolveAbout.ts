import { AboutContent } from "@/types/types";
import { DEFAULT_LANGUAGE } from "../constants/constants";

export function resolveAboutContent(
  content: AboutContent,
  locale: string
): AboutContent {
  const translations = content.translations ?? [];

  // 1️⃣ active language
  let t = translations.find((tr) => tr.locale === locale);

  // 2️⃣ fallback to default language
  if (!t) {
    t = translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);
  }

  return {
    ...content,

    text: t?.text || content.text || "",
    mission: t?.mission || content.mission || "",
    vision: t?.vision || content.vision || "",

    // normalize response
    translations: [],
  };
}
