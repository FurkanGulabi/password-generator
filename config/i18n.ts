export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export const localePrefix = "always"; // Default
