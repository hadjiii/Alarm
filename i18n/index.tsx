import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import fr from './locales/fr.json';
import en from './locales/en.json';

const i18n = new I18n({ fr, en });
i18n.locale = getLocales()[0].languageCode ?? 'fr';

export default i18n;
