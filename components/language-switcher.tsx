"use client";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const flags = {
  en: "🇬🇧",
  tr: "🇹🇷",
} as const;

const labels = {
  en: "English",
  tr: "Türkçe",
} as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "tr" : "en";
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`));
  };

  const nextLocale = locale === "en" ? "tr" : "en";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLocale}
      className="fixed top-4 right-4 gap-2"
    >
      {flags[nextLocale]} {labels[nextLocale]}
    </Button>
  );
}
