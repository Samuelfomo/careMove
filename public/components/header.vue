<template>
  <header class="fixed w-full z-50 flex flex-col">
    <div class="bg-white px-5 py-10 lg:px-14 flex justify-between items-center w-full flex-row border-b shadow-sm h-16">
      <div class="relative lg:flex">
        <div class="absolute cursor-pointer flex z-50" @click="router.push('/')">
          <img :src="logo" alt="Logo" class="object-cover">
        </div>
        <!-- Espace réservé pour le logo -->
        <div class="w-28 h-28 invisible"></div>
      </div>
      <div class="lg:grid grid-cols-2 hidden w-full">
        <div class="flex items-center justify-center space-x-10 text-primary text-base">
          <span class="cursor-pointer">Accueil</span>
          <span class="cursor-pointer">Reservation</span>
        </div>
        <div class="flex items-center justify-end space-x-10">
          <div class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md pl-4">
            <IconSearch stroke="{2}" />
            <input type="text" placeholder="Rechercher" class="bg-white text-primary p-1 rounded-md focus:outline-none focus:border-none max-w-[8rem] placeholder:text-primary-900" />
          </div>
          <div class="flex justify-between items-center space-x-2 border border-secondary-400 rounded-md py-1 px-4 cursor-pointer">
            <IconCirclePlus stroke="{2}" />
            <span>Publier un trajet</span>
          </div>
<!--          <div class="flex justify-between items-center space-x-2 border border-teal-700 rounded-md py-1 px-4 text-white bg-teal-700 hidden">-->
<!--            <IconUserCircle stroke="{2}" />-->
<!--            <span>The Peace</span>-->
<!--            <IconChevronDown stroke={2} />-->
<!--          </div>-->
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
            <nav class="flex flex-col space-y-4 py-5">
              <router-link to="#" class="w-full h-full text-lg font-bold hover:text-secondary-400 flex justify-between py-3
            border-b items-center"
                           :class="[$route.name === 'values' ? activeDrawerClass : 'text-white']"
                           @click="OpenAboutUs"
              >
                <span>Faire une reservation</span>
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
                <span>Nos produits</span>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24" viewBox="0 0 24 24"  fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                  <path v-if="viewproducts" d="M3 16l10 -10l10 10" />
                  <path v-if="viewproducts2" d="M2 9l10 11l10 -12" />
                </svg>
              </router-link>
<!--              <router-link to="#" class="w-full h-full text-lg font-bold hover:text-secondary flex justify-between py-3 border-b-->
<!--            items-center"-->
<!--                           :class="[$route.name === 'solutions' ? activeDrawerClass : 'text-white']"-->
<!--                           @click="OpenSolutions"-->
<!--              >-->
<!--                <span>Nos solutions</span>-->
<!--                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24" viewBox="0 0 24 24"  fill="none"-->
<!--                      stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
<!--                      stroke-linejoin="round">-->
<!--                  <path v-if="viewsolutions" d="M3 16l10 -10l10 10" />-->
<!--                  <path v-if="viewsolutions2" d="M2 9l10 11l10 -12" />-->
<!--                </svg>-->
<!--              </router-link>-->
<!--              <router-link to="#" class="w-full h-full text-lg font-bold hover:text-secondary flex justify-between py-3 border-b-->
<!--            items-center"-->
<!--                           :class="[$route.name === 'mobile' ? activeDrawerClass : 'text-white']"-->
<!--                           @click="OpenMobile"-->
<!--              >-->
<!--                <span>Cresaf sur mobile</span>-->
<!--                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24" viewBox="0 0 24 24"  fill="none"-->
<!--                      stroke="currentColor" stroke-width="2" stroke-linecap="round"-->
<!--                      stroke-linejoin="round">-->
<!--                  <path v-if="viewMobile" d="M3 16l10 -10l10 10" />-->
<!--                  <path v-if="viewMobile2" d="M2 9l10 11l10 -12" />-->
<!--                </svg>-->
<!--              </router-link>-->
            </nav>
            <button type="button"
                    class="flex justify-center items-center gap-2 text-lg p-2 mt-2 font-montserrat font-semibold shadow-md rounded-lg bg-secondary hover:border hover:border-transparent text-white transition-transform duration-700 hover:scale-105"
                    :class="[$route.name === 'contact' ? 'border-secondary text-secondary' : 'text-gray-800']"
            >
              Connectez-nous
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5
           4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" />
              </svg>
            </button>

          </div>
        </div>
      </transition>
    </div>
  </header>

</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from "vue-router"
const router = useRouter()
import Logo from "@/assets/images/logo.svg"
import { IconSearch, IconCirclePlus, IconUserCircle, IconChevronDown, IconX } from '@tabler/icons-vue';

const aboutUs = ref(false)
const products = ref(false)
const solutions = ref(false)
const mobile = ref(false)
const viewaboutUs = ref(false)
const viewaboutUs2 = ref(true);
const viewproducts = ref(false)
const viewproducts2 = ref(true);
const viewsolutions = ref(false)
const viewMobile = ref(false)
const viewMobile2 = ref(true)
const viewsolutions2 = ref(true);
const languages = ref([
  'french', 'english'
]);
let selectedLanguage = ref('');

const logo = Logo;


const isDrawerOpen = ref(false);

const activeDrawerClass = ref('text-secondary')

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
const OpenSolutions = () => {
  solutions.value = !solutions.value
  aboutUs.value = false
  products.value = false
  viewsolutions.value = !viewsolutions.value
  viewsolutions2.value = !viewsolutions2.value
}
const OpenMobile = () => {
  mobile.value = !mobile.value
  solutions.value = false
  aboutUs.value = false
  products.value = false
  viewMobile.value = !viewMobile.value
  viewMobile2.value = !viewMobile2.value
}
onMounted(() =>{
  selectedLanguage.value = languages.value[0];
})

</script>
