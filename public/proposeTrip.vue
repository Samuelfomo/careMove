<template>
  <div class="min-h-screen flex flex-col mx-auto">
    <Header />

    <main class="flex-1 flex items-center justify-center px-4 pb-10 bg-[url(@/assets/images/bg4.jpg)]">
      <div class="w-full max-w-2xl lg:pt-0 pt-28">
        <div class="bg-white shadow-strong p-8">
          <div class="mb-8 flex items-center space-x-2 pb-8 relative">
            <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white via-secondary to-white"></div>

            <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5h16v10H2V5z" />
              </svg>
            </div>

            <h2 class="text-2xl font-normal text-gray-700">Publication de Projet</h2>
          </div>

          <form @submit.prevent="publishProject" class="space-y-6">
            <div>
              <label class="block lg:text-base text-sm font-semibold text-black mb-2">
                Adresse de départ <span class="text-error">*</span>
              </label>
              <div class="relative">
                <div 
                  @click="toggleDepartureDropdown" 
                  class="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary transition-all duration-200"
                >
                  {{ projectData.departureAddress || 'Sélectionnez une ville' }}
                </div>
                <div v-if="isDepartureDropdownOpen" class="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-y-auto">
                  <input
                    v-model="searchDeparture"
                    type="text"
                    placeholder="Rechercher une ville..."
                    class="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
                  />
                  <div v-for="city in filteredDepartureCities" :key="city" @click="selectDeparture(city)" class="px-4 py-2 hover:bg-secondary hover:text-white cursor-pointer">
                    {{ city }}
                  </div>
                </div>
              </div>
              <div v-if="errors.departureAddress" class="text-error text-sm mt-1">{{ errors.departureAddress }}</div>
            </div>

            <div>
              <label class="block lg:text-base text-sm font-semibold text-black mb-2">
                Adresse d'arrivée <span class="text-error">*</span>
              </label>
              <div class="relative">
                <div 
                  @click="toggleArrivalDropdown" 
                  class="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary transition-all duration-200"
                >
                  {{ projectData.arrivalAddress || 'Sélectionnez une ville' }}
                </div>
                <div v-if="isArrivalDropdownOpen" class="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-y-auto">
                  <input
                    v-model="searchArrival"
                    type="text"
                    placeholder="Rechercher une ville..."
                    class="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
                  />
                  <div v-for="city in filteredArrivalCities" :key="city" @click="selectArrival(city)" class="px-4 py-2 hover:bg-secondary hover:text-white cursor-pointer">
                    {{ city }}
                  </div>
                </div>
              </div>
              <div v-if="errors.arrivalAddress" class="text-error text-sm mt-1">{{ errors.arrivalAddress }}</div>
            </div>

            <div class="flex space-x-4">
              <div class="flex flex-col w-full">
                <label class="block lg:text-base text-sm font-semibold text-black mb-2">
                  Date de départ <span class="text-error">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="projectData.departureDate"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary transition-all duration-200"
                    :class="{ 'border-error': errors.departureDate }"
                  />
                  <div v-if="errors.departureDate" class="text-error text-sm mt-1">{{ errors.departureDate }}</div>
                </div>
              </div>

              <div class="flex flex-col w-full">
                <label class="block lg:text-base text-sm font-semibold text-black mb-2">
                  Heure de départ <span class="text-error">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="projectData.departureTime"
                    type="time"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary transition-all duration-200"
                    :class="{ 'border-error': errors.departureTime }"
                  />
                  <div v-if="errors.departureTime" class="text-error text-sm mt-1">{{ errors.departureTime }}</div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="block lg:text-base text-sm font-semibold text-black mb-2">
                Nombre de passagers <span class="text-error">*</span>
              </label>
              <div class="flex items-center">
                <button type="button" @click="decrementPassengers" class="px-2 py-1 bg-secondary text-white rounded-l-lg">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 10h12v2H4z" />
                  </svg>
                </button>
                <div class="px-4 py-2 border border-gray-300 rounded-lg text-center text-secondary font-medium">
                  {{ projectData.passengerCount }}
                </div>
                <button type="button" @click="incrementPassengers" class="px-2 py-1 bg-secondary text-white rounded-r-lg">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 4v12m-4-4h8" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="errors.passengerCount" class="text-error text-sm mt-1">{{ errors.passengerCount }}</div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-800 transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="!isLoading">Publier le projet</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publication en cours...
              </span>
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from "@public/components/header.vue";

const projectData = ref({
  departureAddress: '',
  arrivalAddress: '',
  departureDate: '',
  departureTime: '',
  passengerCount: 1,
});

const errors = ref({
  departureAddress: '',
  arrivalAddress: '',
  departureDate: '',
  departureTime: '',
  passengerCount: '',
});

const isLoading = ref(false);
const isDepartureDropdownOpen = ref(false);
const isArrivalDropdownOpen = ref(false);
const searchDeparture = ref('');
const searchArrival = ref('');

const cities = [
  // Adamaoua
  'Ngaoundéré', 'Tibati', 'Meiganga', 'Tignère', 'Banyo',
  
  // Centre
  'Yaoundé', 'Mbalmayo', 'Bafia', 'Akonolinga', 'Obala', 
  'Monatélé', 'Nanga-Eboko', 'Eséka', 'Ngoumou',
  
  // Est
  'Bertoua', 'Batouri', 'Abong-Mbang', 'Yokadouma', 
  'Garoua-Boulaï', 'Dimako', 'Lomié',
  
  // Extrême-Nord
  'Maroua', 'Kousséri', 'Mokolo', 'Yagoua', 'Mora',
  'Kaélé', 'Mindif', 'Guidiguis',
  
  // Littoral
  'Douala', 'Edéa', 'Nkongsamba', 'Loum', 'Manjo',
  'Yabassi', 'Dibombari', 'Mbanga',
  
  // Nord
  'Garoua', 'Guider', 'Pitoa', 'Figuil', 'Lagdo',
  'Rey Bouba', 'Tcholliré',
  
  // Nord-Ouest
  'Bamenda', 'Wum', 'Kumbo', 'Ndop', 'Nkambe',
  'Mbengwi', 'Bali',
  
  // Ouest
  'Bafoussam', 'Dschang', 'Foumban', 'Mbouda', 'Bangangté',
  'Bafang', 'Baham', 'Bandjoun',
  
  // Sud
  'Ebolowa', 'Kribi', 'Sangmélima', 'Ambam', 'Mvangan',
  'Évodoula', 'Lolodorf',
  
  // Sud-Ouest
  'Buéa', 'Limbe', 'Kumba', 'Mamfé', 'Tiko',
  'Mundemba', 'Ekondo-Titi', 'Idenau'
]; // Liste des villes

const toggleDepartureDropdown = () => {
  isDepartureDropdownOpen.value = !isDepartureDropdownOpen.value;
  isArrivalDropdownOpen.value = false; // Fermer le dropdown d'arrivée si ouvert
};

const toggleArrivalDropdown = () => {
  isArrivalDropdownOpen.value = !isArrivalDropdownOpen.value;
  isDepartureDropdownOpen.value = false; // Fermer le dropdown de départ si ouvert
};

const selectDeparture = (city) => {
  projectData.value.departureAddress = city;
  isDepartureDropdownOpen.value = false;
  validateDeparture();
};

const selectArrival = (city) => {
  projectData.value.arrivalAddress = city;
  isArrivalDropdownOpen.value = false;
  validateArrival();
};

const incrementPassengers = () => {
  projectData.value.passengerCount++;
};

const decrementPassengers = () => {
  if (projectData.value.passengerCount > 1) {
    projectData.value.passengerCount--;
  }
};

const validateDeparture = () => {
  errors.value.departureAddress = projectData.value.departureAddress ? '' : 'L\'adresse de départ est requise';
};

const validateArrival = () => {
  errors.value.arrivalAddress = projectData.value.arrivalAddress ? '' : 'L\'adresse d\'arrivée est requise';
};

const publishProject = async () => {
  // Réinitialiser les erreurs
  errors.value = {
    departureAddress: '',
    arrivalAddress: '',
    departureDate: '',
    departureTime: '',
    passengerCount: '',
  };

  // Validation
  validateDeparture();
  validateArrival();

  if (!projectData.value.departureAddress) {
    errors.value.departureAddress = 'L\'adresse de départ est requise';
  }
  if (!projectData.value.arrivalAddress) {
    errors.value.arrivalAddress = 'L\'adresse d\'arrivée est requise';
  }
  if (!projectData.value.departureDate) {
    errors.value.departureDate = 'La date de départ est requise';
  }
  if (!projectData.value.departureTime) {
    errors.value.departureTime = 'L\'heure de départ est requise';
  }
  if (projectData.value.passengerCount < 1) {
    errors.value.passengerCount = 'Le nombre de passagers doit être au moins 1';
  }

  // Si des erreurs existent, arrêter la soumission
  if (Object.values(errors.value).some(error => error)) {
    return;
  }

  isLoading.value = true;

  try {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Projet publié avec succès!');
  } catch (error) {
    alert('Une erreur est survenue lors de la publication du projet.');
  } finally {
    isLoading.value = false;
  }
};

// Calculer les villes filtrées pour le départ
const filteredDepartureCities = computed(() => {
  return cities.filter(city => city.toLowerCase().includes(searchDeparture.value.toLowerCase()));
});

// Calculer les villes filtrées pour l'arrivée
const filteredArrivalCities = computed(() => {
  return cities.filter(city => city.toLowerCase().includes(searchArrival.value.toLowerCase()));
});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
.text-error {
  color: red;
}
</style>
