"use client";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import {
  LanguageContext,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from "@/components/shared/language-context";

export default function LanguageSwitcher() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  const { language, setLanguage } = context;

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as SupportedLanguage);
  };

  return (
    <div className="flex items-center space-x-2">
      <GlobeAltIcon className="h-6 w-6" />

      <select
        value={language}
        onChange={handleLanguageChange}
        className="border border-dark text-dark text-sm rounded px-2 py-2"
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, label]) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
