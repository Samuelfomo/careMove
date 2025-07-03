<template>
    <Header/>
    <div class="min-h-screen bg-white px-4 py-10 pt-36 flex flex-col md:flex-row md:items-start md:justify-center gap-10">
  
      <!-- Partie gauche : Photo + infos modifiables -->
      <div class="bg-white shadow-xl border-2 border-secondary-500 rounded-xl p-6 max-w-sm w-full">
        <img
          src="@/assets/images/profil.png"
          alt="User Photo"
          class="w-48 h-56 object-cover mx-auto rounded-md mb-6"
        />
  
        <div class="space-y-4 px-10">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 font-medium">Nom :</span>
            <input type="text" value="Julie Queen" class="bg-secondary-500 text-white text-sm px-3 py-1 rounded-md" readonly />
          </div>
  
          <div class="flex justify-between items-center">
            <span class="text-gray-600 font-medium">Pseudo</span>
            <input type="text" value="Juliosess" class="bg-secondary-500 text-white text-sm px-3 py-1 rounded-md" readonly />
          </div>
  
          <div class="flex justify-between items-center">
            <span class="text-gray-600 font-medium">Email</span>
            <input
              type="text"
              value="julie_queen@gmail.com"
              class="bg-secondary-500 text-white text-sm px-3 py-1 rounded-md"
              readonly
            />
          </div>
        </div>
  
        <hr class="my-6" />
  
        <div class="flex justify-center">
            <button
                class="bg-secondary-500 text-white px-6 py-2 rounded-full hover:bg-secondary transition delay-100"
                @click="isEditing = !isEditing"
            >
                {{ isEditing ? 'Annuler' : 'Modifier' }}
            </button>
        </div>
      </div>

      <!-- Partie droite -->
      <div class="flex-1 max-w-2xl">
        <div class="flex items-center justify-between">
            <div>
                <div class="flex space-x-10" >
                    <h2 class="text-2xl font-bold">Julie Elena Queen</h2>
                    <div class="text-gray-500 text-sm flex items-center space-x-1">
                        <svg class="w-4 h-4 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 2a6 6 0 016 6c0 5-6 10-6 10S4 13 4 8a6 6 0 016-6zM8 8a2 2 0 114 0 2 2 0 01-4 0z" clip-rule="evenodd" />
                        </svg>
                        <span>Douala</span>
                    </div>
                </div>
            <p class="text-green-600 font-medium">Conducteur(trice)</p>
            <div class="text-green-600 text-2xl mt-1">★ ★ ★ ☆ ☆</div>
            </div>
        </div>

        <!-- Onglets -->
        <div class="mt-6 flex space-x-12 border-b pb-2">
            <button
            @click="activeTab = 'about'"
            :class="activeTab === 'about' ? 'text-secondary-500 font-semibold border-b-2 border-secondary-500' : 'text-gray-500 hover:text-secondary-500'"
            >
            A propos
            </button>
            <button
            @click="activeTab = 'experience'"
            :class="activeTab === 'experience' ? 'text-secondary-500 font-semibold border-b-2 border-secondary-500' : 'text-gray-500 hover:text-secondary-500'"
            >
            Experience
            </button>
        </div>

        <!-- Contenu dynamique -->
        <transition name="fade-slide" mode="out-in">
        <div :key="activeTab" class="mt-6 space-y-5">
            <!-- A PROPOS -->
            <div v-if="activeTab === 'about'">
            <h3 class="text-gray-600 py-3 font-semibold">CONTACTS</h3>
            <div class="flex items-center">
                <span class="w-32 py-2 font-medium">Address :</span>
                <span class="text-secondary-500">Pk 12, Douala</span>
            </div>
            <div class="flex items-center">
                <span class="w-32 py-2 font-medium">Téléphone :</span>
                <span class="text-secondary-500">+237 600 000 00 / 600 000...</span>
            </div>
            <div class="flex items-center">
                <span class="w-32 py-2 font-medium">Date Naiss :</span>
                <span class="text-secondary-500">21 Juin 1979</span>
            </div>
            <div class="flex items-center">
                <span class="w-32 py-2 font-medium">Genre :</span>
                <span class="text-secondary-500">Féminin</span>
            </div>
            </div>

            <!-- EXPERIENCE -->
            <div v-else>
            <h3 class="text-gray-600 font-semibold mb-3 py-4">EXPÉRIENCES</h3>
            <ul class="space-y-2">
                <li>
                <span class="text-secondary-500 font-bold py-10 ">Chauffeuse professionnelle</span> – Express Voyages (2020 - 2023)
                <p class="text-sm text-gray-600 pb-10">Transport interurbain régulier entre Yaoundé et Douala.</p>
                </li>
                <li>
                <span class="text-secondary-500 font-bold py-7">Conductrice indépendante</span> – Covoiturage (2018 - 2020)
                <p class="text-sm text-gray-600">Organisation de trajets partagés sur de longues distances.</p>
                </li>
            </ul>
            </div>
        </div>
        </transition>

        </div>
    
    </div>
  </template>
  
<script setup>
    import { ref } from 'vue';
    import Header from './components/header.vue';

    const isEditing = ref(false)

    const activeTab = ref('about') // Valeurs possibles : 'about' ou 'experience'
</script>
  
  <style scoped>
    input[readonly] {
        pointer-events: none;
    }
    .fade-slide-enter-active,
        .fade-slide-leave-active {
        transition: all 0.4s ease;
        }

        .fade-slide-enter-from,
        .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(10px);
        }

  </style>
  