"use client";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const t = useTranslations("password.strength");

  const calculateStrength = (pass: string): number => {
    if (!pass) return 0;

    let strength = 0;
    // Length check
    if (pass.length >= 8) strength += 25;
    // Contains lowercase
    if (/[a-z]/.test(pass)) strength += 25;
    // Contains uppercase
    if (/[A-Z]/.test(pass)) strength += 25;
    // Contains numbers or symbols
    if (/[0-9]|[^A-Za-z0-9]/.test(pass)) strength += 25;

    return strength;
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength <= 25) return t("weak");
    if (strength <= 50) return t("medium");
    if (strength <= 75) return t("strong");
    return t("veryStrong");
  };

  const strength = calculateStrength(password);
  const label = getStrengthLabel(strength);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{t("label")}</span>
        <span>{label}</span>
      </div>
      <Progress value={strength} className="h-2" />
    </div>
  );
}
