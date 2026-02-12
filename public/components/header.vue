<template>
  <header class="fixed w-full z-50 flex flex-col bg-white">
    <div class="bg-transparent lg:py-4 p-3 lg:px-14 flex lg:gap-x-10 gap-x-3 justify-between items-center w-full flex-row shadow-sm h-16 contain-size container mx-auto">
      <!-- Bouton pour afficher le menu mobile -->
      <button class="lg:hidden text-primary hover:text-secondary-500" @click="isDrawerOpen = !isDrawerOpen">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18"></path>
        </svg>
      </button>
      <div class="relative flex justify-between items-center w-full lg:pr-40">
        <div class="absolute cursor-pointer z-50 py-2" @click="router.push('/')">
          <img :src="logo" alt="Logo" class="object-cover h-12 lg:block hidden">
          <div class="flex justify-between items-end gap-2 lg:hidden">
            <img :src="logo" alt="Logo" class="object-cover h-10">
<!--            <span class="uppercase font-medium text-2xl text-primary ">solutions</span>-->
          </div>
        </div>
        <!-- Espace réservé pour le logo -->
        <div class="w-28 h-28 invisible"></div>
      </div>
      <div
        class="lg:hidden text-sm font-medium flex justify-between items-center space-x-2 border border-primary rounded-md p-2 text-neutral-800 cursor-pointer text-nowrap"
        @click="toggleUserModal"
        ref="userMenuTrigger"
      >
        <IconUserCircle class="h-4 w-4" />
        <span>Accès</span>
<!--        <IconChevronDown :stroke="2" :class="{ 'rotate-180': isUserModalOpen }" class="transition-transform duration-200 h-5 w-5" />-->
      </div>


      <div class="lg:flex justify-between items-end space-x-10 hidden w-full text-sm font-semibold text-primary">
          <div class="flex justify-between items-center space-x-2  py-1 cursor-pointer">
            <span class="text-nowrap" @click="router.push('/searchTrip')">Explorer</span>
          </div>
        <div class="space-x-2 py-1 cursor-pointer">
          <span class="text-nowrap" @click="router.push('/proposeTrip')">Trajets</span>
        </div>
        <div class="space-x-2 py-1 cursor-pointer">
          <span class="text-nowrap" @click="router.push('/proposeTrip')">Communauté</span>
        </div>
        <div class="space-x-2 py-1 cursor-pointer">
          <span class="text-nowrap" @click="router.push('/proposeTrip')">Support</span>
        </div>
      </div>

      <div class="lg:flex justify-end items-end space-x-2 hidden w-full text-sm font-semibold text-primary">

        <div class="space-x-2 text-primary border border-transparent hover:border-secondary-400/10 hover:scale-110 transition-transform duration-500 rounded-full p-2 pb-0 cursor-pointer">
          <IconSearch  class="h-6 w-6" />
        </div>

          <!-- Sélecteur de langue -->
          <div class="relative">
            <div
              class="flex justify-between items-center space-x-2 bg-primary/5 rounded-full p-1 px-2 cursor-pointer hover:bg-gray-50 transition-colors"
              @click="toggleLanguageDropdown"
              ref="languageSelector"
            >
              <IconLanguage :stroke="2" />
              <span class="text-xs font-semibold text-nowrap">{{ getCurrentLanguageLabel() }}</span>
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
              class="flex justify-between items-center space-x-2 bg-primary-accent-400 rounded-full py-1 px-4 text-primary cursor-pointer hover:bg-primary-accent-300 transition-colors text-nowrap"
              @click="toggleUserModal"
              ref="userMenuTrigger"
            >
              <IconUserCircle stroke="{2}" />
              <span>Accès</span>
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
                    <p class="font-medium text-gray-900">Kb - Accès </p>
                    <p class="text-sm text-gray-500">Votre accès commence ici</p>
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

      <!-- Drawer (Menu latéral pour mobile) -->
      <transition name="slide">
        <div v-if="isDrawerOpen" class="fixed inset-0 bg-primary bg-opacity-60 z-50 flex">
          <div class="w-full max-w-[300px] h-full p-5 shadow-lg transform transition-all bg-primary-900">
            <div class="py-2 w-full flex justify-between items-center" @click="isDrawerOpen = false">
              <div class="rounded-full flex justify-center items-center bg-white drop-shadow-[0_0_2px_white] w-14 h-14 p-1">
                <img :src="logo1" alt="logo ShareWuma " class="object-cover w-12">
              </div>
              <span class="drop-shadow-[0_0_2px_blue] uppercase font-medium text-2xl text-white">solutions</span>
              <IconX class="text-white hover:text-secondary-400 h-8 w-8" />
            </div>
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
              <router-link to="/searchTrip" class="w-full h-full text-lg font-bold hover:text-secondary-400 flex justify-between py-3
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
              <router-link to="/proposeTrip" class="w-full h-full text-lg font-bold hover:text-secondary-400 flex justify-between py-3 border-b
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

import Logo from "@/assets/images/friend/kb3_v3.svg"
import Logo1 from "@/assets/images/friend/skb.svg"
// import Logo from "@/assets/images/logo.svg"
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
const logo1 = Logo1;
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
