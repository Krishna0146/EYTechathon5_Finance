import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translations
import eng from './locales/eng.json';
import tel from './locales/tel.json';
import hin from './locales/hin.json';

i18n.use(initReactI18next).init({
  resources: {
    eng: { translation: eng },
    tel: { translation: tel },
    hin: { translation: hin },
  },
  lng: Localization.locale.split('-')[0], // Detect device language
  fallbackLng: 'en', // Default language
  interpolation: {
    escapeValue: false, // React handles escaping by default
  },
});

export default i18n;
