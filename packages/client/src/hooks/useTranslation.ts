import { useMemo } from 'react';
import { useSession } from '../context/SessionContext';
import { getTranslations, TranslationKey } from '../i18n/translations';

export function useTranslation() {
  const { language } = useSession();

  const t = useMemo(() => {
    const translations = getTranslations(language);
    
    return (key: TranslationKey, replacements?: Record<string, string | number>): string => {
      let text = translations[key] || key;
      
      if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
          text = text.replace(`{${placeholder}}`, String(value));
        });
      }
      
      return text;
    };
  }, [language]);

  return { t, language };
}
