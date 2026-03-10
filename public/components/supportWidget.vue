<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRouter } from "vue-router";
const router = useRouter();

import Logo from "@/assets/images/logo/kombi.svg";

interface SupportItem {
  title: string
  description: string
  linkText: string
  link: string
  icon: string
}

const isOpen = ref(false) // ✅ Fermé par défaut
const showTooltip = ref(false)

const items: SupportItem[] = [
  {
    title: "Online Customer Service",
    description: "24-Hour Service",
    linkText: "Contact Online Customer Service",
    link: "#",
    icon: "headset"
  },
  {
    title: "Kombi App",
    description:
      "Experience tutorials and device management with this one-stop service platform.",
    linkText: "Check It Out",
    link: "#",
    icon: "heart"
  },
  {
    title: "Kombi App",
    description:
      "Experience tutorials and device management with this one-stop service platform.",
    linkText: "Check It Out",
    link: "#",
    icon: "home"
  }
]

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

const closeModal = () => {
  isOpen.value = false
}

const clickOutside = (e: MouseEvent) => {
  const modal = document.getElementById("support-modal")
  const button = document.getElementById("support-button")

  // Ne ferme pas si on clique sur le bouton ou dans le modal
  if (
    modal && !modal.contains(e.target as Node) &&
    button && !button.contains(e.target as Node)
  ) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener("click", clickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", clickOutside)
})
</script>

<template>
  <!-- Floating Button -->
  <div
    class="fixed bottom-6 right-6 z-50"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <!-- Tooltip -->
    <div
      v-if="showTooltip && !isOpen"
      class="absolute right-16 top-1/6 -translate-y-1/2 bg-primary text-primary-accent text-xs px-3 py-1 rounded shadow whitespace-nowrap"
    >
      Cliquez ici pour obtenir retourner sur notre plate forme de visite 👇
    </div>

    <!-- Badge -->
    <span
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
    >
      1
    </span>

    <!-- Button -->
    <button
      id="support-button"
      @click="toggleModal"
      class="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center hover:scale-110 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-7 h-7 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 12a8 8 0 0116 0v5a2 2 0 01-2 2h-2v-7h3M4 12v5a2 2 0 002 2h2v-7H5"
        />
      </svg>
    </button>
  </div>

  <!-- Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/20 z-40"
  ></div>

  <!-- Slide Modal -->
  <div
    v-if="isOpen"
    id="support-modal"
    class="fixed right-6 bottom-24 w-[360px] bg-white rounded-2xl shadow-2xl z-50
           transform transition-all duration-300"
  >
    <div class="p-6 space-y-6">
      <div
        v-for="item in items"
        :key="item.title"
        class="flex gap-4 pb-4 border-b last:border-none"
      >
        <!-- Icon -->
        <div class="text-xl">
          <span v-if="item.icon === 'headset'">🎧</span>
          <span v-if="item.icon === 'heart'">💙</span>
          <span v-if="item.icon === 'home'">💙</span>
        </div>

        <div>
          <h3 class="font-medium text-md">
            {{ item.title }}
          </h3>

          <p class="text-gray-500 text-sm mt-1">
            {{ item.description }}
          </p>

          <a
          :href="item.link"
          class="text-blue-600 mt-2 inline-block font-medium text-base hover:underline"
          >
          {{ item.linkText }} →
          </a>
        </div>
      </div>

    </div>
  </div>
</template>
