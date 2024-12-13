"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function handleLocaleChange(nextLocale: string) {
    if (nextLocale !== locale) {
      startTransition(() => {
        router.push({ pathname }, { locale: nextLocale as Locale });
      });
    }
  }
  

  return (
    <div className="w-24">
      <Select
        defaultValue={locale}
        disabled={isPending}
        onValueChange={handleLocaleChange}
      >
        <SelectTrigger className="">
          <SelectValue placeholder={t("label")} />
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t("locale", { locale: cur })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
