import { Stat } from "@/types/types";
import { DEFAULT_LANGUAGE } from "../constants/constants";

export function resolveStat(stat: Stat, locale: string): Stat {
  const translations = stat.translations ?? [];

  let t =
    translations.find((tr) => tr.locale === locale) ||
    translations.find((tr) => tr.locale === DEFAULT_LANGUAGE);

  return {
    ...stat,
    name: t?.name || stat.name || "",
    value: t?.value || stat.value || "",
    translations: [],
  };
}
