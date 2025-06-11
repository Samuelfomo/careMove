// i18n/index.js
import { createI18n } from 'vue-i18n'
import fr from './locales/fr.js'
import en from './locales/en.js'

// Fonction pour détecter la langue du navigateur
function getBrowserLocale() {
  const navigatorLocale = navigator.languages
    ? navigator.languages[0]
    : navigator.language

  if (!navigatorLocale) {
    return 'fr'
  }

  const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0]
  return ['fr', 'en'].includes(trimmedLocale) ? trimmedLocale : 'fr'
}

// Fonction pour récupérer la langue depuis le localStorage
function getStoredLocale() {
  return localStorage.getItem('user-locale') || getBrowserLocale()
}

const i18n = createI18n({
  legacy: false, // utiliser la Composition API
  locale: getStoredLocale(), // langue par défaut
  fallbackLocale: 'fr', // langue de fallback
  globalInjection: true, // permettre l'utilisation de $t dans les templates
  messages: {
    fr,
    en
  }
})

// Fonction pour changer la langue et la sauvegarder
export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('user-locale', locale)
  document.documentElement.lang = locale
}

export default i18n
