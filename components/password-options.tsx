"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

interface PasswordOptionsProps {
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeSpaces: boolean;
  onOptionChange: (option: string, value: boolean) => void;
}

export function PasswordOptions({
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols,
  includeSpaces,
  onOptionChange,
}: PasswordOptionsProps) {
  const t = useTranslations("options");

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="lowercase"
          checked={includeLowercase}
          onCheckedChange={(checked) =>
            onOptionChange("lowercase", checked as boolean)
          }
        />
        <Label htmlFor="lowercase">{t("lowercase")}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="uppercase"
          checked={includeUppercase}
          onCheckedChange={(checked) =>
            onOptionChange("uppercase", checked as boolean)
          }
        />
        <Label htmlFor="uppercase">{t("uppercase")}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="numbers"
          checked={includeNumbers}
          onCheckedChange={(checked) =>
            onOptionChange("numbers", checked as boolean)
          }
        />
        <Label htmlFor="numbers">{t("numbers")}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="symbols"
          checked={includeSymbols}
          onCheckedChange={(checked) =>
            onOptionChange("symbols", checked as boolean)
          }
        />
        <Label htmlFor="symbols">{t("symbols")}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="spaces"
          checked={includeSpaces}
          onCheckedChange={(checked) =>
            onOptionChange("spaces", checked as boolean)
          }
        />
        <Label htmlFor="spaces">{t("spaces")}</Label>
      </div>
    </div>
  );
}
