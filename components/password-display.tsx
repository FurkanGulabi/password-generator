"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { PasswordStrength } from "./password-strength";

interface PasswordDisplayProps {
  password: string;
}

export function PasswordDisplay({ password }: PasswordDisplayProps) {
  const t = useTranslations();
  const [copying, setCopying] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopying(true);
      toast.success(t("toast.copied"));
      setTimeout(() => setCopying(false), 1000);
    } catch {
      toast.error(t("toast.error"));
    }
  };

  if (!password) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t("password.label")}</Label>
        <div className="flex gap-2">
          <Input type="text" value={password} readOnly className="font-mono" />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="icon"
            className="shrink-0 transition-all duration-200 ease-in-out"
          >
            <div className="relative w-4 h-4">
              <div
                className={`absolute inset-0 transition-transform duration-200 ${
                  copying ? "scale-0" : "scale-100"
                }`}
              >
                <Copy className="h-4 w-4" />
              </div>
              <div
                className={`absolute inset-0 transition-transform duration-200 ${
                  copying ? "scale-100" : "scale-0"
                }`}
              >
                <Check className="h-4 w-4" />
              </div>
            </div>
          </Button>
        </div>
      </div>
      <PasswordStrength password={password} />
    </div>
  );
}
