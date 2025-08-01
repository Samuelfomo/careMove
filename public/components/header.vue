<template>
  <header class="fixed w-full z-50 flex flex-col">
    <div class="bg-white px-5 py-10 lg:px-14 flex justify-between items-center w-full flex-row shadow-sm h-16">
      <div class="relative lg:flex">
        <div class="absolute cursor-pointer flex z-50" @click="router.push('/')">
          <img :src="logo" alt="Logo" class="object-cover">
        </div>
        <!-- Espace réservé pour le logo -->
        <div class="w-28 h-28 invisible"></div>
      </div>
      <div class="lg:flex 2xl:grid justify-between items-center space-x-4 grid-cols-2 hidden w-full">
        <div class="flex items-center justify-center space-x-10 text-primary text-base">
<!--          <span class="cursor-pointer">{{ $t('nav.home') }}</span>-->
          <span class="cursor-pointer">{{ $t('nav.reservation') }}</span>
        </div>
        <div class="flex items-center justify-end space-x-10">
<!--          <div class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md pl-4" @click="router.push('/searchTrip')">-->
<!--            <IconSearch stroke="{2}" />-->
<!--            <input-->
<!--              type="text"-->
<!--              :placeholder="$t('nav.search')"-->
<!--              class="bg-white text-primary p-1 rounded-md focus:outline-none focus:border-none max-w-[8rem] placeholder:text-primary-900"-->
<!--            />-->
<!--          </div>-->

          <div class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 pl-4 pr-8 cursor-pointer">
            <IconSearch stroke="{2}" />
            <span class="text-nowrap" @click="router.push('/searchTrip')">{{ $t('nav.search') }}</span>
          </div>
          <div class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 px-4 cursor-pointer">
            <IconCirclePlus stroke="{2}" />
            <span class="text-nowrap" @click="router.push('/proposeTrip')">{{ $t('nav.publishTrip') }}</span>
          </div>

          <!-- Sélecteur de langue -->
          <div class="relative">
            <div
              class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
              @click="toggleLanguageDropdown"
              ref="languageSelector"
            >
              <IconLanguage :stroke="2" />
              <span class="text-sm font-medium text-nowrap">{{ getCurrentLanguageLabel() }}</span>
              <IconChevronDown :stroke="2" :class="{ 'rotate-180': isLanguageOpen }" class="transition-transform duration-200 text-nowrap" />
            </div>

            <!-- Dropdown langues -->
            <div
              v-if="isLanguageOpen"
              ref="languageDropdown"
              class="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[11rem] z-50"
            >
              <div
                v-for="lang in languages"
                :key="lang.code"
                @click="selectLanguage(lang.code)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center space-x-2"
                :class="{ 'bg-secondary-50 text-secondary-600': currentLocale === lang.code }"
              >
                <span>{{ lang.flag }}</span>
                <span>{{ $t(`language.${lang.code === 'fr' ? 'french' : lang.code === 'en' ? 'english' : 'spanish'}`) }}</span>
              </div>
            </div>
          </div>

          <!-- Menu utilisateur -->
          <div class="relative">
            <div
              class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 px-4 text-secondary-800 cursor-pointer hover:bg-gray-50 transition-colors text-nowrap"
              @click="toggleUserModal"
              ref="userMenuTrigger"
            >
              <IconUserCircle stroke="{2}" />
              <span>The Peace</span>
              <IconChevronDown :stroke="2" :class="{ 'rotate-180': isUserModalOpen }" class="transition-transform duration-200" />
            </div>

            <!-- Modal utilisateur -->
            <div
              v-if="isUserModalOpen"
              ref="userModal"
              class="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-4 min-w-[18rem] z-50"
            >
              <div class="px-4 py-2 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                  <IconUserCircle stroke="2" class="w-8 h-8 text-secondary-600" />
                  <div>
                    <p class="font-medium text-gray-900">The Peace</p>
                    <p class="text-sm text-gray-500">thepeace@gmail.com</p>
                  </div>
                </div>
              </div>

              <div class="py-2">
                <a @click="router.push('/profile')" class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors">
                  <IconUser :stroke="2" class="w-4 h-4" />
                  <span class="text-sm">{{ $t('user.profile') }}</span>
                </a>
                <a href="#" class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors">
                  <IconSettings :stroke="2" class="w-4 h-4" />
                  <span class="text-sm">{{ $t('user.settings') }}</span>
                </a>
                <a href="#" class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors">
                  <IconHistory :stroke="2" class="w-4 h-4" />
                  <span class="text-sm">{{ $t('user.myTrips') }}</span>
                </a>
              </div>

              <div class="border-t border-gray-100 pt-2 w-full flex justify-center items-center">
                <button
                  @click="handleLogin"
                  class="w-full flex items-center justify-center space-x-2 mx-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-600 transition-colors text-sm font-medium"
                >
                  <span>{{ $t('user.login') }}</span>
                  <IconLogin2 :stroke="2" class="w-4 h-4" />

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton pour afficher le menu mobile -->
      <button class="lg:hidden text-primary hover:text-secondary-500" @click="isDrawerOpen = !isDrawerOpen">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18"></path>
        </svg>
      </button>

      <!-- Drawer (Menu latéral pour mobile) -->
      <transition name="slide">
        <div v-if="isDrawerOpen" class="fixed inset-0 bg-primary bg-opacity-60 z-50 flex">
          <div class="w-full max-w-[300px] h-full p-5 shadow-lg transform transition-all bg-primary-900">
            <button class="py-2 w-full flex justify-between items-center" @click="isDrawerOpen = false">
              <img :src="logo" alt="logo ShareWuma " class="w-16 border rounded-xl border-primary-800 bg-slate-700/70">
              <span class="drop-shadow-[0_0_2px_blue] uppercase font-bold text-xl text-white">ShareWuma</span>
              <IconX class="text-white hover:text-secondary-400 h-8 w-8" />
            </button>

            <!-- Sélecteur de langue mobile -->
            <div class="py-4 border-b border-primary-700">
              <div class="flex items-center justify-between">
                <span class="text-white text-sm font-medium">{{ $t('language.french').includes('Language') ? 'Language' : 'Langue' }}</span>
                <select
                  :value="currentLocale"
                  @change="selectLanguage($event.target.value)"
                  class="bg-primary-800 text-white border border-primary-600 rounded px-2 py-1 text-sm"
                >
                  <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                    {{ lang.flag }} {{ $t(`language.${lang.code === 'fr' ? 'french' : lang.code === 'en' ? 'english' : 'spanish'}`) }}
                  </option>
                </select>
              </div>
            </div>

            <nav class="flex flex-col space-y-4 py-5">
              <router-link to="#" class="w-full h-full text-lg font-bold hover:text-secondary-400 flex justify-between py-3
            border-b items-center"
                           :class="[$route.name === 'values' ? activeDrawerClass : 'text-white']"
                           @click="OpenAboutUs"
              >
                <span>{{ $t('nav.reservation') }}</span>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24" viewBox="0 0 24 24"  fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                  <path v-if="viewaboutUs" d="M3 16l10 -10l10 10" />
                  <path v-if="viewaboutUs2" d="M2 9l10 11l10 -12" />
                </svg>
              </router-link>
              <router-link to="#" class="w-full h-full text-lg font-bold hover:text-secondary-400 flex justify-between py-3 border-b
            items-center"
                           :class="[$route.name === 'products' ? activeDrawerClass : 'text-white']"
                           @click="OpenProducts"
              >
                <span>{{ $t('nav.publishTrip') }}</span>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24" viewBox="0 0 24 24"  fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                  <path v-if="viewproducts" d="M3 16l10 -10l10 10" />
                  <path v-if="viewproducts2" d="M2 9l10 11l10 -12" />
                </svg>
              </router-link>
            </nav>

            <button
              type="button"
              @click="router.push('/connexion')"
              class="flex z-50 justify-center items-center gap-2 text-lg p-2 mt-2 font-montserrat font-semibold shadow-md rounded-xl bg-secondary hover:border hover:border-transparent text-white transition-transform duration-700 hover:scale-105"
              :class="[$route.name === '' ? 'border-secondary text-secondary' : 'text-gray-800']"
            >
              {{ $t('user.login') }}
              <IconLogin2 class="w-5 h-5" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRouter } from "vue-router"
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'
import { gsap } from 'gsap';

const router = useRouter()
const { locale } = useI18n()

import Logo from "@/assets/images/logo.svg"
import { IconSearch, IconCirclePlus, IconUserCircle, IconChevronDown, IconX, IconLanguage, IconUser, IconSettings, IconHistory, IconLogin, IconLogin2} from '@tabler/icons-vue';

const aboutUs = ref(false)
const products = ref(false)
const solutions = ref(false)
const viewaboutUs = ref(false)
const viewaboutUs2 = ref(true);
const viewproducts = ref(false)
const viewproducts2 = ref(true);

// Langues disponibles
const languages = ref([
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
]);

const logo = Logo;
const isDrawerOpen = ref(false);
const activeDrawerClass = ref('text-secondary');

// États pour les modals/dropdowns
const isLanguageOpen = ref(false);
const isUserModalOpen = ref(false);

// Refs pour les éléments DOM
const languageDropdown = ref(null);
const userModal = ref(null);
const languageSelector = ref(null);
const userMenuTrigger = ref(null);

// Computed pour la langue actuelle
const currentLocale = computed(() => locale.value);

// Méthodes existantes
const OpenAboutUs = () => {
  aboutUs.value = !aboutUs.value
  products.value = false
  solutions.value = false
  viewaboutUs.value = !viewaboutUs.value
  viewaboutUs2.value = !viewaboutUs2.value
}

const OpenProducts = () => {
  products.value = !products.value
  aboutUs.value = false
  solutions.value = false
  viewproducts.value = !viewproducts.value
  viewproducts2.value = !viewproducts2.value
}

// Nouvelles méthodes pour la langue
const getCurrentLanguageLabel = () => {
  const current = languages.value.find(lang => lang.code === currentLocale.value);
  return current ? `${current.flag} ${current.label}` : '🇫🇷 Français';
}

const toggleLanguageDropdown = async () => {
  if (isLanguageOpen.value) {
    // Fermer avec animation
    gsap.to(languageDropdown.value, {
      duration: 0.2,
      opacity: 0,
      y: -10,
      scale: 0.95,
      ease: "power2.out",
      onComplete: () => {
        isLanguageOpen.value = false;
      }
    });
  } else {
    // Ouvrir avec animation
    isLanguageOpen.value = true;
    await nextTick();

    if (languageDropdown.value) {
      gsap.fromTo(languageDropdown.value,
        {
          opacity: 0,
          y: -10,
          scale: 0.95
        },
        {
          duration: 0.3,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.7)"
        }
      );
    }
  }
}

const selectLanguage = (langCode) => {
  // Changer la langue via notre fonction utilitaire
  setLocale(langCode);

  // Animation de fermeture après sélection
  if (languageDropdown.value) {
    gsap.to(languageDropdown.value, {
      duration: 0.2,
      opacity: 0,
      y: -5,
      ease: "power2.out",
      onComplete: () => {
        isLanguageOpen.value = false;
      }
    });
  }
}

// Méthodes pour le modal utilisateur
const toggleUserModal = async () => {
  if (isUserModalOpen.value) {
    // Fermer avec animation
    gsap.to(userModal.value, {
      duration: 0.25,
      opacity: 0,
      y: -15,
      scale: 0.9,
      ease: "power2.out",
      onComplete: () => {
        isUserModalOpen.value = false;
      }
    });
  } else {
    // Ouvrir avec animation
    isUserModalOpen.value = true;
    await nextTick();

    if (userModal.value) {
      gsap.fromTo(userModal.value,
        {
          opacity: 0,
          y: -15,
          scale: 0.9
        },
        {
          duration: 0.4,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.7)"
        }
      );
    }
  }
}

const handleLogin = async () => {
  // Fermer le modal avec animation avant de rediriger
  if (userModal.value) {
    gsap.to(userModal.value, {
      duration: 0.2,
      opacity: 0,
      scale: 0.9,
      ease: "power2.out",
      onComplete: () => {
        isUserModalOpen.value = false;
        router.push('/connexion');
      }
    });
  }
}

// Fermer les dropdowns quand on clique ailleurs
const handleClickOutside = (event) => {
  if (languageSelector.value && !languageSelector.value.contains(event.target)) {
    if (isLanguageOpen.value) {
      toggleLanguageDropdown();
    }
  }

  if (userMenuTrigger.value && !userMenuTrigger.value.contains(event.target)) {
    if (isUserModalOpen.value) {
      toggleUserModal();
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Nettoyer l'event listener
import { onUnmounted } from 'vue';
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<!--<template>-->
<!--  <header class="fixed w-full z-50 flex flex-col">-->
<!--    <div class="bg-white px-5 py-10 lg:px-14 flex justify-between items-center w-full flex-row border-b shadow-sm h-16">-->
<!--      <div class="relative lg:flex">-->
<!--        <div class="absolute cursor-pointer flex z-50" @click="router.push('/')">-->
<!--          <img :src="logo" alt="Logo" class="object-cover">-->
<!--        </div>-->
<!--        &lt;!&ndash; Espace réservé pour le logo &ndash;&gt;-->
<!--        <div class="w-28 h-28 invisible"></div>-->
<!--      </div>-->
<!--      <div class="lg:grid grid-cols-2 hidden w-full">-->
<!--        <div class="flex items-center justify-center space-x-10 text-primary text-base">-->
<!--          <span class="cursor-pointer">Accueil</span>-->
<!--          <span class="cursor-pointer">Reservation</span>-->
<!--        </div>-->
<!--        <div class="flex items-center justify-end space-x-10">-->
<!--          <div class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md pl-4">-->
<!--            <IconSearch stroke="{2}" />-->
<!--            <input type="text" placeholder="Rechercher" class="bg-white text-primary p-1 rounded-md focus:outline-none focus:border-none max-w-[8rem] placeholder:text-primary-900" />-->
<!--          </div>-->

<!--          <div class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 px-4 cursor-pointer">-->
<!--            <IconCirclePlus stroke="{2}" />-->
<!--            <span>Publier un trajet</span>-->
<!--          </div>-->
<!--          &lt;!&ndash; Sélecteur de langue &ndash;&gt;-->
<!--          <div class="relative">-->
<!--            <div-->
<!--              class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 px-4 cursor-pointer hover:bg-gray-50 transition-colors"-->
<!--              @click="toggleLanguageDropdown"-->
<!--              ref="languageSelector"-->
<!--            >-->
<!--              <IconLanguage :stroke="2" />-->
<!--              <span class="text-sm font-medium">{{ getCurrentLanguageLabel() }}</span>-->
<!--              <IconChevronDown :stroke="2" :class="{ 'rotate-180': isLanguageOpen }" class="transition-transform duration-200" />-->
<!--            </div>-->

<!--            &lt;!&ndash; Dropdown langues &ndash;&gt;-->
<!--            <div-->
<!--              v-if="isLanguageOpen"-->
<!--              ref="languageDropdown"-->
<!--              class="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[11rem] z-50"-->
<!--            >-->
<!--              <div-->
<!--                v-for="lang in languages"-->
<!--                :key="lang.code"-->
<!--                @click="selectLanguage(lang.code)"-->
<!--                class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center space-x-2"-->
<!--                :class="{ 'bg-secondary-50 text-secondary-600': selectedLanguage === lang.code }"-->
<!--              >-->
<!--                <span>{{ lang.flag }}</span>-->
<!--                <span>{{ lang.label }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; Menu utilisateur &ndash;&gt;-->
<!--          <div class="relative">-->
<!--            <div-->
<!--              class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 px-4 text-secondary-800 cursor-pointer hover:bg-gray-50 transition-colors"-->
<!--              @click="toggleUserModal"-->
<!--              ref="userMenuTrigger"-->
<!--            >-->
<!--              <IconUserCircle stroke="{2}" />-->
<!--              <span>The Peace</span>-->
<!--              <IconChevronDown :stroke="2" :class="{ 'rotate-180': isUserModalOpen }" class="transition-transform duration-200" />-->
<!--            </div>-->

<!--            &lt;!&ndash; Modal utilisateur &ndash;&gt;-->
<!--            <div-->
<!--              v-if="isUserModalOpen"-->
<!--              ref="userModal"-->
<!--              class="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-4 min-w-[18rem] z-50"-->
<!--            >-->
<!--              <div class="px-4 py-2 border-b border-gray-100">-->
<!--                <div class="flex items-center space-x-3">-->
<!--                  <IconUserCircle stroke="2" class="w-8 h-8 text-secondary-600" />-->
<!--                  <div>-->
<!--                    <p class="font-medium text-gray-900">The Peace</p>-->
<!--                    <p class="text-sm text-gray-500">thepeace@gmail.com</p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="py-2">-->
<!--                <a href="#" class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors">-->
<!--                  <IconUser :stroke="2" class="w-4 h-4" />-->
<!--                  <span class="text-sm">Mon profil</span>-->
<!--                </a>-->
<!--                <a href="#" class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors">-->
<!--                  <IconSettings :stroke="2" class="w-4 h-4" />-->
<!--                  <span class="text-sm">Paramètres</span>-->
<!--                </a>-->
<!--                <a href="#" class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 transition-colors">-->
<!--                  <IconHistory :stroke="2" class="w-4 h-4" />-->
<!--                  <span class="text-sm">Mes trajets</span>-->
<!--                </a>-->
<!--              </div>-->

<!--              <div class="border-t border-gray-100 pt-2 w-full flex justify-center items-center">-->
<!--                <button-->
<!--                  @click="handleLogin"-->
<!--                  class="w-full flex items-center justify-center space-x-2 mx-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-600 transition-colors text-sm font-medium"-->
<!--                >-->
<!--                  <IconLogin :stroke="2" class="w-4 h-4" />-->
<!--                  <span>Connexion</span>-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Bouton pour afficher le menu mobile &ndash;&gt;-->
<!--      <button class="lg:hidden text-primary hover:text-secondary-500" @click="isDrawerOpen = !isDrawerOpen">-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"-->
<!--             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">-->
<!--          <path d="M3 12h18M3 6h18M3 18h18"></path>-->
<!--        </svg>-->
<!--      </button>-->

<!--      &lt;!&ndash; Drawer (Menu latéral pour mobile) &ndash;&gt;-->
<!--      <transition name="slide">-->
<!--        <div v-if="isDrawerOpen" class="fixed inset-0 bg-primary bg-opacity-60 z-50 flex">-->
<!--          <div class="w-full max-w-[300px] h-full p-5 shadow-lg transform transition-all bg-primary-900">-->
<!--            <button class="py-2 w-full flex justify-between items-center" @click="isDrawerOpen = false">-->
<!--              <img :src="logo" alt="logo ShareWuma " class="w-16 border rounded-xl border-primary-800 bg-slate-700/70">-->
<!--              <span class="drop-shadow-[0_0_2px_blue] uppercase font-bold text-xl text-white">ShareWuma</span>-->
<!--              <IconX class="text-white hover:text-secondary-400 h-8 w-8" />-->
<!--            </button>-->

<!--            &lt;!&ndash; Sélecteur de langue mobile &ndash;&gt;-->
<!--            <div class="py-4 border-b border-primary-700">-->
<!--              <div class="flex items-center justify-between">-->
<!--                <span class="text-white text-sm font-medium">Langue</span>-->
<!--                <select-->
<!--                  v-model="selectedLanguage"-->
<!--                  @change="selectLanguage($event.target.value)"-->
<!--                  class="bg-primary-800 text-white border border-primary-600 rounded px-2 py-1 text-sm"-->
<!--                >-->
<!--                  <option v-for="lang in languages" :key="lang.code" :value="lang.code">-->
<!--                    {{ lang.flag }} {{ lang.label }}-->
<!--                  </option>-->
<!--                </select>-->
<!--              </div>-->
<!--            </div>-->

<!--            <nav class="flex flex-col space-y-4 py-5">-->
<!--              <router-link to="#" class="w-full h-full text-lg font-bold hover:text-secondary-400 flex justify-between py-3-->
<!--            border-b items-center"-->
<!--                           :class="[$route.name === 'values' ? activeDrawerClass : 'text-white']"-->
<!--                           @click="OpenAboutUs"-->
<!--              >-->
<!--                <span>Faire une reservation</span>-->
<!--                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24" viewBox="0 0 24 24"  fill="none"-->
<!--                      stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
<!--                      stroke-linejoin="round">-->
<!--                  <path v-if="viewaboutUs" d="M3 16l10 -10l10 10" />-->
<!--                  <path v-if="viewaboutUs2" d="M2 9l10 11l10 -12" />-->
<!--                </svg>-->
<!--              </router-link>-->
<!--              <router-link to="#" class="w-full h-full text-lg font-bold hover:text-secondary-400 flex justify-between py-3 border-b-->
<!--            items-center"-->
<!--                           :class="[$route.name === 'products' ? activeDrawerClass : 'text-white']"-->
<!--                           @click="OpenProducts"-->
<!--              >-->
<!--                <span>Nos produits</span>-->
<!--                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24" viewBox="0 0 24 24"  fill="none"-->
<!--                      stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
<!--                      stroke-linejoin="round">-->
<!--                  <path v-if="viewproducts" d="M3 16l10 -10l10 10" />-->
<!--                  <path v-if="viewproducts2" d="M2 9l10 11l10 -12" />-->
<!--                </svg>-->
<!--              </router-link>-->
<!--            </nav>-->

<!--            <button-->
<!--              type="button"-->
<!--              @click="router.push('/connexion')"-->
<!--                    class="flex z-50 justify-center items-center gap-2 text-lg p-2 mt-2 font-montserrat font-semibold shadow-md rounded-xl bg-secondary hover:border hover:border-transparent text-white transition-transform duration-700 hover:scale-105"-->
<!--                    :class="[$route.name === '' ? 'border-secondary text-secondary' : 'text-gray-800']"-->
<!--            >-->
<!--              Connexion-->
<!--              <IconLogin2 class="w-5 h-5" />-->
<!--            </button>-->


<!--          </div>-->
<!--        </div>-->
<!--      </transition>-->
<!--    </div>-->
<!--  </header>-->

<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, nextTick } from 'vue';-->
<!--import { useRouter } from "vue-router"-->
<!--import { gsap } from 'gsap';-->
<!--const router = useRouter()-->
<!--import Logo from "@/assets/images/logo.svg"-->
<!--import { IconSearch, IconCirclePlus, IconUserCircle, IconChevronDown, IconX, IconLanguage, IconUser, IconSettings, IconHistory, IconLogin, IconLogin2} from '@tabler/icons-vue';-->

<!--const aboutUs = ref(false)-->
<!--const products = ref(false)-->
<!--const solutions = ref(false)-->
<!--const viewaboutUs = ref(false)-->
<!--const viewaboutUs2 = ref(true);-->
<!--const viewproducts = ref(false)-->
<!--const viewproducts2 = ref(true);-->

<!--// Langues disponibles-->
<!--const languages = ref([-->
<!--  { code: 'fr', label: 'Français', flag: '🇫🇷' },-->
<!--  { code: 'en', label: 'English', flag: '🇺🇸' },-->
<!--  { code: 'es', label: 'Español', flag: '🇪🇸' }-->
<!--]);-->

<!--let selectedLanguage = ref('fr');-->
<!--const logo = Logo;-->
<!--const isDrawerOpen = ref(false);-->
<!--const activeDrawerClass = ref('text-secondary');-->

<!--// États pour les modals/dropdowns-->
<!--const isLanguageOpen = ref(false);-->
<!--const isUserModalOpen = ref(false);-->

<!--// Refs pour les éléments DOM-->
<!--const languageDropdown = ref(null);-->
<!--const userModal = ref(null);-->
<!--const languageSelector = ref(null);-->
<!--const userMenuTrigger = ref(null);-->

<!--// Méthodes existantes-->
<!--const OpenAboutUs = () => {-->
<!--  aboutUs.value = !aboutUs.value-->
<!--  products.value = false-->
<!--  solutions.value = false-->
<!--  viewaboutUs.value = !viewaboutUs.value-->
<!--  viewaboutUs2.value = !viewaboutUs2.value-->
<!--}-->

<!--const OpenProducts = () => {-->
<!--  products.value = !products.value-->
<!--  aboutUs.value = false-->
<!--  solutions.value = false-->
<!--  viewproducts.value = !viewproducts.value-->
<!--  viewproducts2.value = !viewproducts2.value-->
<!--}-->

<!--// Nouvelles méthodes pour la langue-->
<!--const getCurrentLanguageLabel = () => {-->
<!--  const current = languages.value.find(lang => lang.code === selectedLanguage.value);-->
<!--  return current ? `${current.flag} ${current.label}` : '🇫🇷 Français';-->
<!--}-->

<!--const toggleLanguageDropdown = async () => {-->
<!--  if (isLanguageOpen.value) {-->
<!--    // Fermer avec animation-->
<!--    gsap.to(languageDropdown.value, {-->
<!--      duration: 0.2,-->
<!--      opacity: 0,-->
<!--      y: -10,-->
<!--      scale: 0.95,-->
<!--      ease: "power2.out",-->
<!--      onComplete: () => {-->
<!--        isLanguageOpen.value = false;-->
<!--      }-->
<!--    });-->
<!--  } else {-->
<!--    // Ouvrir avec animation-->
<!--    isLanguageOpen.value = true;-->
<!--    await nextTick();-->

<!--    if (languageDropdown.value) {-->
<!--      gsap.fromTo(languageDropdown.value,-->
<!--        {-->
<!--          opacity: 0,-->
<!--          y: -10,-->
<!--          scale: 0.95-->
<!--        },-->
<!--        {-->
<!--          duration: 0.3,-->
<!--          opacity: 1,-->
<!--          y: 0,-->
<!--          scale: 1,-->
<!--          ease: "back.out(1.7)"-->
<!--        }-->
<!--      );-->
<!--    }-->
<!--  }-->
<!--}-->

<!--const selectLanguage = (langCode) => {-->
<!--  selectedLanguage.value = langCode;-->

<!--  // Animation de fermeture après sélection-->
<!--  if (languageDropdown.value) {-->
<!--    gsap.to(languageDropdown.value, {-->
<!--      duration: 0.2,-->
<!--      opacity: 0,-->
<!--      y: -5,-->
<!--      ease: "power2.out",-->
<!--      onComplete: () => {-->
<!--        isLanguageOpen.value = false;-->
<!--      }-->
<!--    });-->
<!--  }-->

<!--  // Ici vous pouvez ajouter la logique pour changer la langue de l'application-->
<!--  console.log('Langue sélectionnée:', langCode);-->
<!--}-->

<!--// Méthodes pour le modal utilisateur-->
<!--const toggleUserModal = async () => {-->
<!--  if (isUserModalOpen.value) {-->
<!--    // Fermer avec animation-->
<!--    gsap.to(userModal.value, {-->
<!--      duration: 0.25,-->
<!--      opacity: 0,-->
<!--      y: -15,-->
<!--      scale: 0.9,-->
<!--      ease: "power2.out",-->
<!--      onComplete: () => {-->
<!--        isUserModalOpen.value = false;-->
<!--      }-->
<!--    });-->
<!--  } else {-->
<!--    // Ouvrir avec animation-->
<!--    isUserModalOpen.value = true;-->
<!--    await nextTick();-->

<!--    if (userModal.value) {-->
<!--      gsap.fromTo(userModal.value,-->
<!--        {-->
<!--          opacity: 0,-->
<!--          y: -15,-->
<!--          scale: 0.9-->
<!--        },-->
<!--        {-->
<!--          duration: 0.4,-->
<!--          opacity: 1,-->
<!--          y: 0,-->
<!--          scale: 1,-->
<!--          ease: "back.out(1.7)"-->
<!--        }-->
<!--      );-->
<!--    }-->
<!--  }-->
<!--}-->

<!--const handleLogin = async () => {-->
<!--  // Fermer le modal avec animation avant de rediriger-->
<!--  if (userModal.value) {-->
<!--    gsap.to(userModal.value, {-->
<!--      duration: 0.2,-->
<!--      opacity: 0,-->
<!--      scale: 0.9,-->
<!--      ease: "power2.out",-->
<!--      onComplete: () => {-->
<!--        isUserModalOpen.value = false;-->

<!--        router.push('/connexion');-->
<!--      }-->
<!--    });-->
<!--  }-->
<!--}-->

<!--// Fermer les dropdowns quand on clique ailleurs-->
<!--const handleClickOutside = (event) => {-->
<!--  if (languageSelector.value && !languageSelector.value.contains(event.target)) {-->
<!--    if (isLanguageOpen.value) {-->
<!--      toggleLanguageDropdown();-->
<!--    }-->
<!--  }-->

<!--  if (userMenuTrigger.value && !userMenuTrigger.value.contains(event.target)) {-->
<!--    if (isUserModalOpen.value) {-->
<!--      toggleUserModal();-->
<!--    }-->
<!--  }-->
<!--}-->

<!--onMounted(() => {-->
<!--  selectedLanguage.value = languages.value[0].code;-->
<!--  document.addEventListener('click', handleClickOutside);-->
<!--});-->

<!--// Nettoyer l'event listener-->
<!--import { onUnmounted } from 'vue';-->
<!--import $route from "express/lib/view";-->
<!--onUnmounted(() => {-->
<!--  document.removeEventListener('click', handleClickOutside);-->
<!--});-->

<!--</script>-->
