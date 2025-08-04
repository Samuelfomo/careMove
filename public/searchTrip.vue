<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <!-- Hero Section avec Search -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 pt-24 pb-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Titre -->
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-white py-10">
              Trouvez votre trajet idéal
            </h1>
            <p class="text-xl text-white/90">
              Plus de {{ totalTrips }} trajets disponibles aujourd'hui
            </p>
          </div>

          <!-- Formulaire de recherche -->
          <div class="bg-white rounded-2xl shadow-2xl p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <!-- Départ -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">Départ</label>
                <div class="relative">
                  <svg class="w-10 h-10 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="3" />
                  </svg>
                  <select
                    v-model="searchFilters.departure"
                    @change="filterTrips"
                    class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all"
                  >
                    <option value="">Toutes les villes</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                  </select>
                </div>
              </div>

              <!-- Arrivée -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">Arrivée</label>
                <div class="relative">
                  <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-accent-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <select
                    v-model="searchFilters.arrival"
                    @change="filterTrips"
                    class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all"
                  >
                    <option value="">Toutes les villes</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                  </select>
                </div>
              </div>

              <!-- Date -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">Date de départ</label>
                <div class="relative">
                  <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <input
                    v-model="searchFilters.date"
                    @change="filterTrips"
                    type="date"
                    :min="today"
                    class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all"
                  />
                </div>
              </div>

              <!-- Passagers -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">Passagers</label>
                <div class="grid grid-cols-3 items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    @click="decrementPassengers"
                    :disabled="searchFilters.passengers <= 1"
                    class="px-3 h-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <input
                    v-model="searchFilters.passengers"
                    type="number"
                    min="1"
                    readonly
                    class="flex-1 py-3 text-center border-0 focus:ring-0 outline-none"
                  />
                  <button
                    type="button"
                    @click="incrementPassengers"
                    class="px-3 h-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Bouton de réinitialisation -->
            <div class="pt-4 text-center">
              <button
                @click="resetFilters"
                class="text-secondary btn-sm hover:text-secondary-700 hover:scale-105 transition-transform duration-500 font-medium underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section des résultats -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- En-tête des résultats -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-semibold text-primary mb-2">
              {{ totalTripsCount }} trajet{{ totalTripsCount > 1 ? 's' : '' }} trouvé{{ totalTripsCount > 1 ? 's' : '' }}
            </h2>
            <p class="text-gray-600">
              <span v-if="hasActiveFilters">Résultats filtrés pour vos critères</span>
              <span v-else>Affichage de {{ paginatedTrips.length }} trajets sur {{ totalTripsCount }}</span>
            </p>
          </div>

          <!-- Tri -->
          <div class="mt-4 md:mt-0">
            <select
              v-model="sortBy"
              @change="sortTrips"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none"
            >
              <option value="time">Trier par heure</option>
              <option value="price">Trier par prix</option>
              <option value="places">Trier par places disponibles</option>
            </select>
          </div>
        </div>

        <!-- Liste des trajets -->
        <div class="space-y-4">
          <!-- Loading skeleton -->
          <template v-if="isLoading">
            <div v-for="n in 5" :key="n" class="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div class="flex space-x-4">
                <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div class="w-24 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </template>

          <!-- Aucun résultat -->
          <div v-else-if="totalTripsCount === 0 && hasActiveFilters" class="text-center py-12">
            <svg class="w-24 h-24 mx-auto text-secondary-accent-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <h3 class="text-xl font-semibold text-secondary-accent-500 mb-2">Aucun trajet trouvé</h3>
            <p class="text-gray-500 mb-4">Aucun trajet ne correspond à vos critères de recherche</p>
            <button
              @click="resetFilters"
              class="bg-secondary-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-secondary-600 transition-colors"
            >
              Voir tous les trajets
            </button>
          </div>

          <!-- Liste des trajets -->
          <Motion
            v-else
            v-for="(trip, index) in paginatedTrips"
            :key="trip.id"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: index * 0.1, duration: 0.3 }"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div class="p-6">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <!-- Conducteur et horaires -->
                <div class="flex items-center space-x-4 flex-1">
                  <div class="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {{ trip.driver.split(' ').map(n => n[0]).join('') }}
                  </div>

                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h3 class="font-semibold text-gray-800">{{ trip.driver }}</h3>
                      <div class="flex items-center">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-sm text-gray-600 ml-1">{{ trip.rating }}</span>
                      </div>
                    </div>

                    <div class="text-sm text-gray-600">
                      <span class="font-medium">{{ trip.departureTime }}</span> -
                      <span class="font-medium">{{ trip.arrivalTime }}</span>
                      <span class="mx-2">•</span>
                      <span>{{ trip.duration }}</span>
                    </div>
                  </div>
                </div>

                <!-- Itinéraire -->
                <div class="flex items-center space-x-4 flex-1 justify-center">
                  <div class="text-center">
                    <div class="text-lg font-semibold text-gray-800">{{ trip.departure }}</div>
                    <div class="text-sm text-gray-500">{{ trip.departureTime }}</div>
                  </div>

                  <div class="flex items-center space-x-2 px-4">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div class="w-16 h-px bg-gray-300"></div>
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    <div class="w-16 h-px bg-gray-300"></div>
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>

                  <div class="text-center">
                    <div class="text-lg font-semibold text-gray-800">{{ trip.arrival }}</div>
                    <div class="text-sm text-gray-500">{{ trip.arrivalTime }}</div>
                  </div>
                </div>

                <!-- Prix et places -->
                <div class="flex items-center justify-between lg:justify-end space-x-6">
                  <div class="text-center">
                    <div class="text-sm text-gray-500">Places restantes</div>
                    <div class="font-semibold text-gray-800">{{ trip.remainingPlaces }}/{{ trip.totalPlaces }}</div>
                  </div>

                  <div class="text-center">
                    <div class="text-2xl font-bold text-secondary-600">{{ trip.price.toLocaleString() }}</div>
                    <div class="text-sm text-gray-500">XAF</div>
                  </div>

                  <button
                    @click="viewTrip(trip)"
                    :disabled="trip.remainingPlaces === 0"
                    class="bg-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <span v-if="trip.remainingPlaces > 0">Réserver</span>
                    <span v-else>Complet</span>
                  </button>
                </div>
              </div>
            </div>
          </Motion>
        </div>

        <!-- Pagination -->
        <div v-if="totalTripsCount > tripsPerPage" class="mt-12 flex justify-center items-center space-x-2">
          <div class="flex items-center space-x-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>

            <!-- Numéros de pages -->
            <template v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-lg transition-colors',
                  page === currentPage
                    ? 'bg-secondary-500 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-2 py-2 text-gray-500">...</span>
            </template>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>

          <!-- Info pagination -->
          <div class="mt-4 text-right w-full text-gray-600">
            Page {{ currentPage }} sur {{ totalPages }} • {{ totalTripsCount }} trajets au total
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de détails -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b">
            <h2 class="text-2xl font-bold text-gray-800">Détails du trajet</h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Contenu -->
          <div class="p-6" v-if="selectedTrip">
            <!-- Info conducteur -->
            <div class="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
              <div class="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {{ selectedTrip.driver.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">{{ selectedTrip.driver }}</h3>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-gray-600 ml-1">{{ selectedTrip.rating }} ({{ selectedTrip.reviews }} avis)</span>
                </div>
              </div>
            </div>

            <!-- Détails du trajet -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="font-medium">{{ selectedTrip.departure }}</span>
                  <span class="text-gray-500">{{ selectedTrip.departureTime }}</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span class="font-medium">{{ selectedTrip.arrival }}</span>
                  <span class="text-gray-500">{{ selectedTrip.arrivalTime }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Prix par personne:</span>
                  <span class="font-semibold">{{ selectedTrip.price.toLocaleString() }} XAF</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Places disponibles:</span>
                  <span class="font-semibold">{{ selectedTrip.remainingPlaces }}/{{ selectedTrip.totalPlaces }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Durée du trajet:</span>
                  <span class="font-semibold">{{ selectedTrip.duration }}</span>
                </div>
              </div>
            </div>

            <!-- Réservation -->
            <div class="border-t pt-6">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de places à réserver
                </label>
                <div class="flex items-center space-x-4">
                  <button
                    @click="decrementReservation"
                    :disabled="reservationCount <= 1"
                    class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <span class="text-xl font-semibold">{{ reservationCount }}</span>
                  <button
                    @click="incrementReservation"
                    :disabled="reservationCount >= selectedTrip.remainingPlaces"
                    class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between mb-6">
                <span class="text-lg font-medium">Total:</span>
                <span class="text-2xl font-bold text-secondary-600">
                  {{ (selectedTrip.price * reservationCount).toLocaleString() }} XAF
                </span>
              </div>

              <button
                @click="confirmReservation"
                class="w-full bg-secondary-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-secondary-600 transition-colors"
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from "@public/components/header.vue"
import Footer from './components/footer.vue'
import { Motion } from '@motionone/vue'

// États réactifs
const searchFilters = ref({
  departure: '',
  arrival: '',
  date: '',
  passengers: 1
})

const sortBy = ref('time')
const isLoading = ref(true)
const showModal = ref(false)
const selectedTrip = ref(null)
const reservationCount = ref(1)

// Pagination
const currentPage = ref(1)
const tripsPerPage = ref(4)
const totalPages = ref(0)

// Données
const cities = [
  'Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Maroua',
  'Bertoua', 'Ngaoundéré', 'Bamenda', 'Limbé', 'Ebolowa'
]

const allTrips = ref([
  {
    id: 1,
    driver: 'Jean Martin',
    rating: 4.8,
    reviews: 25,
    departure: 'Yaoundé',
    arrival: 'Douala',
    departureTime: '08:00',
    arrivalTime: '11:30',
    duration: '3h 30min',
    date: '2025-08-04',
    price: 3500,
    totalPlaces: 4,
    remainingPlaces: 2
  },
  {
    id: 2,
    driver: 'Marie Kouna',
    rating: 4.9,
    reviews: 42,
    departure: 'Douala',
    arrival: 'Bafoussam',
    departureTime: '14:30',
    arrivalTime: '18:00',
    duration: '3h 30min',
    date: '2025-08-04',
    price: 4000,
    totalPlaces: 4,
    remainingPlaces: 3
  },
  {
    id: 3,
    driver: 'Paul Ngono',
    rating: 4.7,
    reviews: 18,
    departure: 'Yaoundé',
    arrival: 'Bafoussam',
    departureTime: '06:00',
    arrivalTime: '09:15',
    duration: '3h 15min',
    date: '2025-08-05',
    price: 3800,
    totalPlaces: 5,
    remainingPlaces: 1
  },
  {
    id: 4,
    driver: 'Sophie Talla',
    rating: 5.0,
    reviews: 65,
    departure: 'Bamenda',
    arrival: 'Douala',
    departureTime: '07:30',
    arrivalTime: '12:00',
    duration: '4h 30min',
    date: '2025-08-04',
    price: 5500,
    totalPlaces: 4,
    remainingPlaces: 4
  },
  {
    id: 5,
    driver: 'Ahmed Bello',
    rating: 4.6,
    reviews: 31,
    departure: 'Garoua',
    arrival: 'Maroua',
    departureTime: '09:30',
    arrivalTime: '12:30',
    duration: '3h 00min',
    date: '2025-08-05',
    price: 2500,
    totalPlaces: 6,
    remainingPlaces: 5
  },
  {
    id: 6,
    driver: 'Fatima Alhadji',
    rating: 4.8,
    reviews: 22,
    departure: 'Douala',
    arrival: 'Limbé',
    departureTime: '16:00',
    arrivalTime: '17:30',
    duration: '1h 30min',
    date: '2025-08-04',
    price: 1500,
    totalPlaces: 4,
    remainingPlaces: 3
  },
  {
    id: 7,
    driver: 'Gabriel Tchoua',
    rating: 4.5,
    reviews: 15,
    departure: 'Yaoundé',
    arrival: 'Ebolowa',
    departureTime: '10:00',
    arrivalTime: '12:30',
    duration: '2h 30min',
    date: '2025-08-05',
    price: 2800,
    totalPlaces: 5,
    remainingPlaces: 0
  },
  {
    id: 8,
    driver: 'Aminata Diallo',
    rating: 4.9,
    reviews: 38,
    departure: 'Bamenda',
    arrival: 'Yaoundé',
    departureTime: '05:30',
    arrivalTime: '11:00',
    duration: '5h 30min',
    date: '2025-08-06',
    price: 6500,
    totalPlaces: 4,
    remainingPlaces: 2
  },
  // Ajouter plus de trajets pour simuler une grande base de données
  {
    id: 9,
    driver: 'Ernest Manga',
    rating: 4.3,
    reviews: 12,
    departure: 'Yaoundé',
    arrival: 'Bertoua',
    departureTime: '07:00',
    arrivalTime: '11:30',
    duration: '4h 30min',
    date: '2025-08-04',
    price: 4500,
    totalPlaces: 4,
    remainingPlaces: 3
  },
  {
    id: 10,
    driver: 'Chantal Mbia',
    rating: 4.7,
    reviews: 28,
    departure: 'Douala',
    arrival: 'Yaoundé',
    departureTime: '15:00',
    arrivalTime: '18:30',
    duration: '3h 30min',
    date: '2025-08-04',
    price: 3500,
    totalPlaces: 5,
    remainingPlaces: 2
  },
  {
    id: 11,
    driver: 'Robert Ekani',
    rating: 4.6,
    reviews: 19,
    departure: 'Bafoussam',
    arrival: 'Douala',
    departureTime: '06:30',
    arrivalTime: '10:00',
    duration: '3h 30min',
    date: '2025-08-05',
    price: 4000,
    totalPlaces: 4,
    remainingPlaces: 4
  },
  {
    id: 12,
    driver: 'Sylvie Nkomo',
    rating: 4.8,
    reviews: 34,
    departure: 'Ngaoundéré',
    arrival: 'Garoua',
    departureTime: '08:00',
    arrivalTime: '11:00',
    duration: '3h 00min',
    date: '2025-08-06',
    price: 3000,
    totalPlaces: 6,
    remainingPlaces: 5
  },
  {
    id: 13,
    driver: 'Michel Biya',
    rating: 4.4,
    reviews: 16,
    departure: 'Ebolowa',
    arrival: 'Yaoundé',
    departureTime: '12:00',
    arrivalTime: '14:30',
    duration: '2h 30min',
    date: '2025-08-04',
    price: 2800,
    totalPlaces: 5,
    remainingPlaces: 1
  },
  {
    id: 14,
    driver: 'Nadège Fokou',
    rating: 4.9,
    reviews: 41,
    departure: 'Limbé',
    arrival: 'Douala',
    departureTime: '18:00',
    arrivalTime: '19:30',
    duration: '1h 30min',
    date: '2025-08-05',
    price: 1500,
    totalPlaces: 4,
    remainingPlaces: 3
  },
  {
    id: 15,
    driver: 'David Kameni',
    rating: 4.5,
    reviews: 23,
    departure: 'Maroua',
    arrival: 'Garoua',
    departureTime: '14:00',
    arrivalTime: '17:00',
    duration: '3h 00min',
    date: '2025-08-06',
    price: 2500,
    totalPlaces: 6,
    remainingPlaces: 4
  }
])

// Propriétés calculées
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

const filteredTrips = computed(() => {
  let trips = [...allTrips.value]

  // Filtrer par départ
  if (searchFilters.value.departure) {
    trips = trips.filter(trip => trip.departure === searchFilters.value.departure)
  }

  // Filtrer par arrivée
  if (searchFilters.value.arrival) {
    trips = trips.filter(trip => trip.arrival === searchFilters.value.arrival)
  }

  // Filtrer par date
  if (searchFilters.value.date) {
    trips = trips.filter(trip => trip.date === searchFilters.value.date)
  }

  // Filtrer par nombre de places disponibles
  trips = trips.filter(trip => trip.remainingPlaces >= searchFilters.value.passengers)

  return trips
})

const paginatedTrips = computed(() => {
  const start = (currentPage.value - 1) * tripsPerPage.value
  const end = start + tripsPerPage.value
  return filteredTrips.value.slice(start, end)
})

const totalTripsCount = computed(() => filteredTrips.value.length)

const hasActiveFilters = computed(() => {
  return searchFilters.value.departure ||
    searchFilters.value.arrival ||
    searchFilters.value.date ||
    searchFilters.value.passengers > 1
})

const totalTrips = computed(() => allTrips.value.length)

// Calcul des pages visibles pour la pagination
const visiblePages = computed(() => {
  const total = Math.ceil(totalTripsCount.value / tripsPerPage.value)
  totalPages.value = total

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const current = currentPage.value
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total]
  }

  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})

// Méthodes
const filterTrips = () => {
  // Réinitialiser à la page 1 lors d'un nouveau filtrage
  currentPage.value = 1
  console.log('Filtres appliqués:', searchFilters.value)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll vers le haut de la section
    document.querySelector('.py-12').scrollIntoView({ behavior: 'smooth' })
  }
}

const sortTrips = () => {
  switch (sortBy.value) {
    case 'price':
      allTrips.value.sort((a, b) => a.price - b.price)
      break
    case 'places':
      allTrips.value.sort((a, b) => b.remainingPlaces - a.remainingPlaces)
      break
    case 'time':
    default:
      allTrips.value.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
      break
  }
}

const resetFilters = () => {
  searchFilters.value = {
    departure: '',
    arrival: '',
    date: '',
    passengers: 1
  }
  currentPage.value = 1
}

const incrementPassengers = () => {
  searchFilters.value.passengers++
  filterTrips()
}

const decrementPassengers = () => {
  if (searchFilters.value.passengers > 1) {
    searchFilters.value.passengers--
    filterTrips()
  }
}

const viewTrip = (trip) => {
  selectedTrip.value = trip
  reservationCount.value = 1
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedTrip.value = null
  reservationCount.value = 1
}

const incrementReservation = () => {
  if (reservationCount.value < selectedTrip.value.remainingPlaces) {
    reservationCount.value++
  }
}

const decrementReservation = () => {
  if (reservationCount.value > 1) {
    reservationCount.value--
  }
}

const confirmReservation = () => {
  // Ici, vous pouvez implémenter la logique de réservation
  alert(`Réservation confirmée pour ${reservationCount.value} place(s) sur le trajet ${selectedTrip.value.departure} → ${selectedTrip.value.arrival}`)

  // Mettre à jour les places disponibles
  selectedTrip.value.remainingPlaces -= reservationCount.value

  // Mettre à jour dans la liste principale
  const tripIndex = allTrips.value.findIndex(trip => trip.id === selectedTrip.value.id)
  if (tripIndex !== -1) {
    allTrips.value[tripIndex].remainingPlaces = selectedTrip.value.remainingPlaces
  }

  closeModal()
}

// Cycle de vie
onMounted(() => {
  // Simuler le chargement initial des trajets
  setTimeout(() => {
    isLoading.value = false
  }, 1500)

  // Ne pas définir de date par défaut pour montrer tous les trajets
  // searchFilters.value.date = today.value
})
</script>

<style scoped>
/* Animation de pulse pour le loading */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animation pour la modal */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Style pour les boutons disabled */
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Effet hover sur les cartes de trajets */
.trip-card {
  transition: all 0.3s ease;
}

.trip-card:hover {
  transform: translateY(-2px);
}

/* Style pour les inputs focus */
input:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Animation pour les éléments qui apparaissent */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
