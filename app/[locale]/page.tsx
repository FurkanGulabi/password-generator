"use client";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PasswordDisplay } from "@/components/password-display";
import { PasswordOptions } from "@/components/password-options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function HomePage() {
  const t = useTranslations();
  const [password, setPassword] = useState("");
  const [userInput, setUserInput] = useState("");
  const [length, setLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeSpaces, setIncludeSpaces] = useState(false);

  const generateSmartPassword = () => {
    if (!userInput) {
      setPassword(t("password.empty"));
      return;
    }

    // Convert input to lowercase for base
    let base = userInput.toLowerCase();

    // Randomly capitalize some letters (excluding first letter)
    const chars = base.split("");
    for (let i = 1; i < chars.length; i++) {
      if (Math.random() > 0.7 && includeUppercase) {
        chars[i] = chars[i].toUpperCase();
      }
    }
    base = chars.join("");

    // Insert numbers
    if (includeNumbers) {
      base = base
        .replace(/a/gi, "4")
        .replace(/e/gi, "3")
        .replace(/i/gi, "1")
        .replace(/o/gi, "0");
    }

    // Add spaces if enabled (before adding symbols)
    if (includeSpaces) {
      const words = base.split("");
      // Add spaces at random positions, but not at the start or end
      for (let i = 1; i < words.length - 1; i++) {
        if (Math.random() > 0.8) {
          words[i] = " " + words[i];
        }
      }
      base = words.join("");
    }

    // Add symbols at random positions
    if (includeSymbols) {
      const symbols = ["*", "!", "@", "#", "$"];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const position = Math.floor(Math.random() * base.length);
      base = base.slice(0, position) + randomSymbol + base.slice(position);
    }

    setPassword(base);
  };

  const generateRandomPassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const spaces = " ";

    let validChars = "";
    if (includeLowercase) validChars += lowercase;
    if (includeUppercase) validChars += uppercase;
    if (includeNumbers) validChars += numbers;
    if (includeSymbols) validChars += symbols;
    if (includeSpaces) validChars += spaces;

    if (validChars === "") {
      setPassword(t("password.noCharType"));
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * validChars.length);
      // Prevent spaces at the start and end of password
      if (i === 0 || i === length - 1) {
        while (validChars[randomIndex] === " ") {
          randomIndex = Math.floor(Math.random() * validChars.length);
        }
      }
      generatedPassword += validChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const handleOptionChange = (option: string, value: boolean) => {
    switch (option) {
      case "lowercase":
        setIncludeLowercase(value);
        break;
      case "uppercase":
        setIncludeUppercase(value);
        break;
      case "numbers":
        setIncludeNumbers(value);
        break;
      case "symbols":
        setIncludeSymbols(value);
        break;
      case "spaces":
        setIncludeSpaces(value);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LanguageSwitcher />
      <Card className="max-w-xl w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t("input.label")}</Label>
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={t("input.placeholder")}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label>{t("length.label", { length })}</Label>
            <Slider
              value={[length]}
              onValueChange={([value]) => setLength(value)}
              min={6}
              max={32}
              step={1}
              className="w-full"
            />
          </div>

          <PasswordOptions
            includeLowercase={includeLowercase}
            includeUppercase={includeUppercase}
            includeNumbers={includeNumbers}
            includeSymbols={includeSymbols}
            includeSpaces={includeSpaces}
            onOptionChange={handleOptionChange}
          />

          <div className="space-y-2">
            <Button onClick={generateSmartPassword} className="w-full mb-2">
              {t("buttons.smart")}
            </Button>
            <Button
              onClick={generateRandomPassword}
              variant="outline"
              className="w-full"
            >
              {t("buttons.random")}
            </Button>
          </div>

          <PasswordDisplay password={password} />
        </CardContent>
      </Card>
    </div>
  );
}
