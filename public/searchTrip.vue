<template>
  <div class="min-h-screen flex flex-col bg-gray-100 gradient-to-br from-[#E0F2FE] via-secondary-900 to-[#F0F0F0]">
    <Header />

    <!-- MAIN -->
    <main class="flex-1 flex flex-col items-center justify-center px-4 pt-36 pb-12 bg-primary-100" style="background-image: url('@/assets/images/bg4.jpg')">
      <!-- RECHERCHE DE TRAJET -->
      <Motion
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        transition="{ duration: 0.5, ease: 'ease-out' }"
        class="w-full max-w-6xl overflow-hidden"
      >
        <div class="text-primary font-bold px-6 py-6">
          <h2 class="text-4xl font-bold text-center">Rechercher un trajet</h2>
        </div>

        <form @submit.prevent="searchTrip" class="bg-white min-h-44 p-5 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 rounded-md shadow-lg">
          <Motion
            v-for="(field, index) in ['departureAddress', 'arrivalAddress', 'departureTime', 'passengerCount']"

            class="flex-1"
          >
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ field === 'departureAddress' ? 'Adresse de départ' : field === 'arrivalAddress' ? 'Adresse d\'arrivée' : field === 'departureTime' ? 'Heure de départ' : 'Nombre de passagers' }}
            </label>
            <div class="relative" v-if="field !== 'passengerCount'">
              <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              <input v-if="field === 'departureTime'" v-model="searchData[field]" type="time" class="w-full p-3 pl-10 rounded-md border border-secondary-500 outline-none bg-white text-gray-700" />
              <select v-else v-model="searchData[field]" class="w-full p-3 pl-10 rounded-md border border-secondary-500 outline-none bg-white text-gray-700">
                <option disabled value="">Sélectionner</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>
            <div class="relative flex items-center" v-else>
              <button type="button" @click="decrementPassengers" class="px-3 py-1 bg-secondary-500 hover:bg-secondary text-white rounded-l-md transition duration-200">−</button>
              <input v-model="searchData[field]" type="number" min="1" class="w-full p-3 border border-secondary-500 rounded-lg outline-none bg-white text-gray-700 text-center" />
              <button type="button" @click="incrementPassengers" class="px-3 py-1 bg-secondary-500 hover:bg-secondary text-white rounded-r-md transition duration-200">+</button>
            </div>
          </Motion>

          <Motion :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.9 }">
            <button
              type="submit"
              :disabled="isLoading"
              class="bg-secondary-500 text-white mt-5 py-3 px-6 items-center justify-center rounded-md font-bold hover:bg-secondary transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="!isLoading">RECHERCHER</span>
              <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Recherche en cours...
                </span>
            </button>
          </Motion>
        </form>
      </Motion>
    </main>

    <!-- INFO SECTION -->
    <Motion :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.9, delay: 0.9 }">
      <h3 class="text-primary-800 md:text-4xl py-10 text-2xl  px-4  font-bold text-center">
        Plus de 12 trajets viennent d'être publiés près de votre secteur
      </h3>
    </Motion>

    <!-- SECTION TRAJETS -->
    <section class="w-full flex flex-col md:flex-row px-4 pb-10 md:px-14 gap-6 md:gap-20 container justify-center items-center mx-auto">
      <div class="flex justify-center p-2">
<!--        <div class="rounded-xl transition-transform duration-300 hover:scale-105 delay-100 hover:shadow-xl">-->
          <img :src="imgCarRed" alt="Covoiturage" class="max-w-xl h-full object-contain rounded-xl" />
<!--        </div>-->
      </div>

      <div class="flex-1">
        <div class="grid grid-cols-2 gap-6 mb-7">

          <!-- Shimmers -->
          <template v-if="isLoadingTrips">
            <div v-for="n in 4" :key="n" class="bg-white p-2 rounded-lg shadow animate-pulse space-y-4">
              <div class="flex space-x-4">
                <div class="bg-gray-300 h-24 w-24 rounded-lg"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="flex gap-x-20">
                    <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div class="h-4 bg-gray-200 rounded-full w-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Liste trajets -->
          <Motion
            v-else
            v-for="(trip, index) in latestTrips"
            :key="trip.id"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: index * 0.3, duration: 0.5 }"
            class="bg-white shadow-lg p-4 rounded-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div class="relative w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                <img :src="imgfont" alt="Photo du trajet" class="w-full h-full object-cover" />
                <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-bold text-gray-500">
                  ♥ {{ trip.likes }}
                </div>
              </div>
              <div class="flex-1">
                <div class="flex flex-col space-y-1">
                  <p class="font-bold text-sm text-gray-500">{{ trip.departure }} - {{ trip.arrival }}</p>
                </div>
                <div class="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
                  <p class="bg-gray-100 flex items-center gap-1 px-2 py-1 rounded-lg font-bold hover:bg-gray-200 transition">
                    <IconUsersGroup class="w-4 h-4 text-primary" /> {{ trip.totalPlaces }}
                  </p>
                  <p class="bg-gray-100 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-200 transition">
                    <IconUserOff class="w-4 h-4 text-red-400" /> {{ trip.takenPlaces }}
                  </p>
                  <p class="bg-gray-100 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-200 transition">
                    <IconUserExclamation class="w-4 h-4 text-secondary-500" /> {{ trip.remainingPlaces }}
                  </p>
                </div>
                <div class="flex justify-between items-center mt-3">
                  <p class="font-bold text-lg text-secondary-500">{{ trip.price }} XAF</p>
                  <button class="text-sm p-2 rounded-lg hover:text-secondary-500 transition duration-200" @click="viewTrip(trip)">
                    <IconEye />
                  </button>

                </div>
              </div>
            </div>
          </Motion>

        </div>
      </div>
    </section>
    <!-- SIDEBAR DE DÉTAILS -->
    <transition name="apparaitre">
      <div v-if="showSidebar" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

        <!-- Contenu du panneau -->
        <div class="relative w-full max-w-md md:w-[450px] bg-white rounded-lg shadow-2xl overflow-y-auto max-h-[90vh]">

          <!-- HEADER -->
          <div class="flex items-center justify-between p-4 border-b bg-gray-50">
            <h2 class="text-xl font-bold text-secondary-600">Détails du trajet</h2>
            <button @click="closeSidebar" class="text-gray-500 hover:text-red-500 text-2xl font-bold">×</button>
          </div>

          <!-- IMAGE -->
          <div class="w-full h-48 relative">
            <img :src="imgfont" alt="Trajet" class="w-full h-full object-cover rounded-b-none rounded-t-lg" />
            <div class="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-sm font-bold text-gray-700 shadow">
              ♥ {{ selectedTrip?.likes }}
            </div>
          </div>

          <!-- INFOS -->
          <div class="p-5 space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <!-- Ligne 1 -->
              <div class="flex items-center gap-3">
                <IconMapPin class="w-6 h-6 text-primary" />
                <span><strong>Départ :</strong> {{ selectedTrip?.departure }}</span>
              </div>
              <div class="flex items-center gap-3">
                <IconMapPin class="w-6 h-6 text-secondary-500" />
                <span><strong>Arrivée :</strong> {{ selectedTrip?.arrival }}</span>
              </div>

              <!-- Ligne 2 -->
              <div class="flex items-center gap-3">
                <IconUsersGroup class="w-6 h-6 text-primary" />
                <span><strong>Places :</strong> {{ selectedTrip?.totalPlaces }}</span>
              </div>
              <div class="flex items-center gap-3">
                <IconUserOff class="w-6 h-6 text-red-400" />
                <span><strong>Occupées :</strong> {{ selectedTrip?.takenPlaces }}</span>
              </div>

              <!-- Ligne 3 -->
              <div class="flex items-center gap-3">
                <IconUserExclamation class="w-6 h-6 text-secondary-500" />
                <span><strong>Restantes :</strong> {{ selectedTrip?.remainingPlaces }}</span>
              </div>
              <div class="flex items-center gap-3">
                <IconMoneybag class="w-6 h-6 text-secondary-600" />
                <span><strong>Prix :</strong> {{ selectedTrip?.price }} XAF / pls</span>
              </div>
            </div>

            <!-- CHAMP DE RÉSERVATION -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de places à réserver</label>
              <input
                v-model.number="reservationCount"
                type="number"
                min="1"
                :max="selectedTrip?.remainingPlaces"
                class="w-full p-3 border border-secondary-500 rounded-lg outline-none bg-white text-gray-700 text-center"
              />
            </div>

            <!-- BOUTON -->
            <button
              @click="submitReservation"
              class="w-full bg-secondary-500 text-white py-3 px-6 rounded-md font-bold hover:bg-secondary-600 transition-all duration-200"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </transition>



    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from "@public/components/header.vue"
import Footer from './components/footer.vue'
import { Motion } from '@motionone/vue'
import imgfont from "@/assets/images/imgfont.png"
import imgCarRed from "@/assets/images/imgCarRed.jpg"
import {
  IconUsersGroup,
  IconUserOff,
  IconUserExclamation,
  IconEye,
  IconMapPin,
  IconMoneybag
} from '@tabler/icons-vue'

const searchData = ref({
  departureAddress: '',
  arrivalAddress: '',
  departureTime: '',
  passengerCount: 1,
})

const isLoading = ref(false)
const isLoadingTrips = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoadingTrips.value = false
  }, 20000)
})

const cities = ['Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Maroua', 'Bertoua', 'Ngaoundéré']

const latestTrips = ref([
  { id: 1, departure: 'Yaoundé', arrival: 'Douala', totalPlaces: 5, takenPlaces: 3, remainingPlaces: 2, price: 3700, likes: 3 },
  { id: 2, departure: 'Douala', arrival: 'Bafoussam', totalPlaces: 4, takenPlaces: 2, remainingPlaces: 2, price: 6000, likes: 5 },
  { id: 3, departure: 'Maroua', arrival: 'Garoua', totalPlaces: 4, takenPlaces: 2, remainingPlaces: 2, price: 12000, likes: 4 },
  { id: 4, departure: 'Garoua', arrival: 'Ngaoundéré', totalPlaces: 6, takenPlaces: 3, remainingPlaces: 3, price: 8000, likes: 2 },
])

const showSidebar = ref(false)
const selectedTrip = ref(null)
const reservationCount = ref(1)

const viewTrip = (trip) => {
  selectedTrip.value = trip
  reservationCount.value = 1
  showSidebar.value = true
}

const closeSidebar = () => {
  showSidebar.value = false
  selectedTrip.value = null
}

const submitReservation = () => {
  if (reservationCount.value > selectedTrip.value.remainingPlaces) {
    alert("Le nombre de places demandées dépasse les places restantes.")
    return
  }

  // Traitement de réservation ici (à remplacer par API)
  alert(`Réservation de ${reservationCount.value} place(s) pour le trajet ${selectedTrip.value.departure} → ${selectedTrip.value.arrival}`)

  closeSidebar()
}

const incrementPassengers = () => {
  searchData.value.passengerCount++
}

const decrementPassengers = () => {
  if (searchData.value.passengerCount > 1) {
    searchData.value.passengerCount--
  }
}

const searchTrip = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  alert('Recherche de trajet en cours...')
  isLoading.value = false
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
/* Apparition douce avec délai */
.apparaitre-enter-active,
.apparaitre-leave-active {
  transition: opacity 0.6s ease 0.3s; /* durée lente + delay */
}

.apparaitre-enter-from,
.apparaitre-leave-to {
  opacity: 0;
}

.apparaitre-enter-to,
.apparaitre-leave-from {
  opacity: 1;
}

</style>

