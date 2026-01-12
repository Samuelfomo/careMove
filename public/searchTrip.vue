<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
    <Header />

    <!-- Hero Section avec Search amélioré -->
    <section class="relative bg-gradient-to-br from-primary-600 to-secondary pt-24 pb-16">
      <!-- Motif de fond -->
      <div class="absolute inset-0 bg-black/50">
        <div class="absolute inset-0"
             style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')">
        </div>
      </div>

      <div class="container mx-auto px-4 relative">
        <div class="max-w-6xl mx-auto">
          <!-- En-tête avec statistiques -->
          <div class="text-center mb-12">
            <h1 class="text-5xl md:text-6xl font-bold text-white my-10">
              Voyagez <span class="text-primary-accent-500">ensemble</span>
            </h1>
            <p class="text-xl text-white/90 mb-8">
              Découvrez des trajets sûrs et économiques avec des conducteurs vérifiés
            </p>

            <!-- Statistiques -->
            <div class="flex flex-wrap justify-center gap-8 mb-12">
              <div class="text-center" v-for="(stat, index) in statistiques" :key="index">
                <div class="text-3xl font-bold text-primary-accent-500">{{ stat.title }}</div>
                <div class="text-white/80 text-sm">{{ stat.description }}</div>
              </div>
            </div>
          </div>

          <!-- Formulaire de recherche modernisé -->
          <div class="bg-white rounded-3xl shadow-2xl p-8">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <!-- Départ -->
              <div class="lg:col-span-1">
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  <svg class="inline w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  Ville de départ
                </label>
                <select
                  v-model="searchFilters.departure"
                  @change="filterTrips"
                  class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                >
                  <option value="">Choisir une ville</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>

              <!-- Arrivée -->
              <div class="lg:col-span-1">
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  <svg class="inline w-4 h-4 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  Destination
                </label>
                <select
                  v-model="searchFilters.arrival"
                  @change="filterTrips"
                  class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                >
                  <option value="">Choisir une ville</option>
                  <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>

              <!-- Date -->
              <div class="lg:col-span-1">
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  <svg class="inline w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  Date de départ
                </label>
                <input
                  v-model="searchFilters.date"
                  @change="filterTrips"
                  type="date"
                  :min="today"
                  class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>

              <!-- Passagers -->
              <div class="lg:col-span-1">
                <label class="block text-sm font-semibold text-gray-700 mb-3">
                  <svg class="inline w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Passagers
                </label>
                <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    @click="decrementPassengers"
                    :disabled="searchFilters.passengers <= 1"
                    class="p-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span class="text-lg font-bold">-</span>
                  </button>
                  <div class="flex-1 p-4 text-center font-semibold">
                    {{ searchFilters.passengers }}
                  </div>
                  <button
                    type="button"
                    @click="incrementPassengers"
                    class="p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <span class="text-lg font-bold">+</span>
                  </button>
                </div>
              </div>

              <!-- Bouton Rechercher -->
              <div class="lg:col-span-1 flex items-end">
                <button
                  @click="filterTrips"
                  class="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <svg class="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                  <span class="block text-sm">Rechercher</span>
                </button>
              </div>
            </div>

            <!-- Recherches populaires -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-sm text-gray-600 mb-3">Trajets populaires :</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="route in popularRoutes"
                  :key="route"
                  @click="setPopularRoute(route)"
                  class="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 rounded-full text-sm transition-colors"
                >
                  {{ route }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section des résultats -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- En-tête des résultats -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-2">
              {{ totalTripsCount }} trajet{{ totalTripsCount > 1 ? 's' : '' }} trouvé{{ totalTripsCount > 1 ? 's' : '' }}
            </h2>
            <p class="text-gray-600">
              <span v-if="hasActiveFilters">Résultats filtrés pour vos critères</span>
              <span v-else>Tous vérifiés par notre système de parrainage</span>
            </p>
          </div>

          <!-- Tri et filtres -->
          <div class="mt-4 md:mt-0 flex gap-4">
            <select
              v-model="sortBy"
              @change="sortTrips"
              class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
            >
              <option value="time">Trier par heure</option>
              <option value="price">Trier par prix</option>
              <option value="places">Trier par places disponibles</option>
            </select>

            <button class="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
              </svg>
              Filtres avancés
            </button>
          </div>
        </div>

        <!-- Liste des trajets modernisée -->
        <div class="space-y-6">
          <!-- Loading skeleton -->
          <template v-if="isLoading">
            <div v-for="n in 3" :key="n" class="bg-white rounded-2xl shadow-md p-6 animate-pulse">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div class="lg:col-span-3">
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div class="space-y-2">
                      <div class="h-4 bg-gray-300 rounded w-24"></div>
                      <div class="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
                <div class="lg:col-span-6">
                  <div class="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div class="lg:col-span-3">
                  <div class="h-8 bg-gray-300 rounded w-24 ml-auto"></div>
                </div>
              </div>
            </div>
          </template>

          <!-- Aucun résultat -->
          <div v-else-if="totalTripsCount === 0" class="text-center py-16">
            <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-500 mb-2">Aucun trajet trouvé</h3>
            <p class="text-gray-400 mb-6">Aucun trajet ne correspond à vos critères de recherche</p>
            <button
              @click="resetFilters"
              class="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all"
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
            class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div class="p-6">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <!-- Photo conducteur + info -->
                <div class="lg:col-span-3">
                  <div class="flex items-center space-x-4">
                    <div class="relative">
                      <!-- Placeholder pour photo conducteur depuis Freepik -->
                      <img
                        :src="trip.driverImage || '/images/drivers/default-driver.jpg'"
                        :alt="trip.driver"
                        class="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                        @error="handleImageError"
                      />
                      <!-- Badge de vérification -->
                      <div v-if="trip.isVerified" class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-800">{{ trip.driver }}</h3>
                      <div class="flex items-center">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-sm text-gray-600 ml-1">{{ trip.rating }} ({{ trip.reviews || 0 }} avis)</span>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">{{ trip.carModel || 'Véhicule standard' }}</div>
                    </div>
                  </div>
                </div>

                <!-- Itinéraire visuel -->
                <div class="lg:col-span-4">
                  <div class="flex items-center justify-center">
                    <div class="text-center">
                      <div class="font-semibold text-gray-800">{{ trip.departure }}</div>
                      <div class="text-sm text-gray-500">{{ trip.departureTime }}</div>
                    </div>

                    <div class="mx-6 flex-1">
                      <div class="flex items-center">
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div class="flex-1 h-0.5 bg-gray-300 mx-2 relative">
                          <!-- Icône voiture au milieu -->
                          <svg class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM2 9v5a2 2 0 002 2h1a3 3 0 006 0h2a3 3 0 006 0h1a2 2 0 002-2V9H2zm7 6a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <div class="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                      <div class="text-center text-xs text-gray-500 mt-2">
                        <svg class="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" />
                        </svg>
                        {{ trip.duration }}
                      </div>
                    </div>

                    <div class="text-center">
                      <div class="font-semibold text-gray-800">{{ trip.arrival }}</div>
                      <div class="text-sm text-gray-500">{{ trip.arrivalTime }}</div>
                    </div>
                  </div>
                </div>

                <!-- Photo voiture + features -->
                <div class="lg:col-span-2">
                  <div class="text-center">
                    <!-- Placeholder pour photo voiture depuis Freepik -->
                    <img
                      :src="trip.carImage || '/images/cars/default-car.jpg'"
                      :alt="trip.carModel"
                      class="w-20 h-12 mx-auto rounded-lg object-cover mb-2 shadow-sm"
                      @error="handleCarImageError"
                    />
                    <div class="flex flex-wrap justify-center gap-1">
                      <span
                        v-for="(feature, idx) in (trip.features || []).slice(0, 2)"
                        :key="idx"
                        class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {{ feature }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Prix et réservation -->
                <div class="lg:col-span-3">
                  <div class="text-right">
                    <div class="mb-2">
                      <span class="text-2xl font-bold text-green-600">
                        {{ trip.price.toLocaleString() }}
                      </span>
                      <span class="text-gray-500 text-sm ml-1">XAF</span>
                    </div>
                    <div class="text-sm text-gray-600 mb-3">
                      <svg class="inline w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      {{ trip.remainingPlaces }} place{{ trip.remainingPlaces > 1 ? 's' : '' }} restante{{ trip.remainingPlaces > 1 ? 's' : '' }}
                    </div>
                    <button
                      @click="viewTrip(trip)"
                      :disabled="trip.remainingPlaces === 0"
                      class="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <span v-if="trip.remainingPlaces > 0">Voir détails</span>
                      <span v-else>Complet</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        </div>

        <!-- Section sécurité -->
        <div class="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <div class="text-center">
            <div class="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              Voyagez en toute sécurité
            </h3>
            <p class="text-gray-600 mb-6">
              Notre système de parrainage garantit que tous nos conducteurs sont recommandés par la communauté
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <div class="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <svg class="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm">Conducteurs parrainés</span>
              </div>
              <div class="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm">Identité vérifiée</span>
              </div>
              <div class="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <svg class="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm">Évaluations transparentes</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalTripsCount > tripsPerPage" class="mt-12 flex justify-center items-center space-x-2">
          <div class="flex items-center space-x-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                    : 'border-2 border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-2 py-2 text-gray-500">...</span>
            </template>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>

          <!-- Info pagination -->
          <div class="mt-4 text-center w-full text-gray-600">
            Page {{ currentPage }} sur {{ totalPages }} • {{ totalTripsCount }} trajets au total
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de détails modernisée -->
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
            <!-- Image de la voiture -->
            <div class="text-center mb-6">
              <img
                :src="selectedTrip.carImage || '/images/cars/default-car.jpg'"
                :alt="selectedTrip.carModel"
                class="w-full h-48 object-cover rounded-xl mb-4 shadow-lg"
                @error="handleCarImageError"
              />
            </div>

            <!-- Info conducteur -->
            <div class="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
              <img
                :src="selectedTrip.driverImage || '/images/drivers/default-driver.jpg'"
                :alt="selectedTrip.driver"
                class="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                @error="handleImageError"
              />
              <div>
                <h3 class="font-semibold text-gray-800">{{ selectedTrip.driver }}</h3>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-gray-600 ml-1">{{ selectedTrip.rating }} ({{ selectedTrip.reviews || 0 }} avis)</span>
                </div>
                <div class="text-sm text-gray-500">{{ selectedTrip.carModel || 'Véhicule standard' }}</div>
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

            <!-- Équipements -->
            <div v-if="selectedTrip.features && selectedTrip.features.length" class="mb-6">
              <h4 class="font-semibold text-gray-800 mb-3">Équipements disponibles</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="feature in selectedTrip.features"
                  :key="feature"
                  class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {{ feature }}
                </span>
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
                    class="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <span class="text-xl font-semibold">{{ reservationCount }}</span>
                  <button
                    @click="incrementReservation"
                    :disabled="reservationCount >= selectedTrip.remainingPlaces"
                    class="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                <span class="text-lg font-medium">Total:</span>
                <span class="text-2xl font-bold text-green-600">
                  {{ (selectedTrip.price * reservationCount).toLocaleString() }} XAF
                </span>
              </div>

              <button
                @click="confirmReservation"
                class="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105"
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Header from "./components/header.vue"
import Footer from './components/footer.vue'
import { Motion } from '@motionone/vue'
import Img from '@/assets/Nouveau dossier/img.png'

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

const popularRoutes = [
  'Yaoundé → Douala',
  'Douala → Bafoussam',
  'Yaoundé → Bafoussam',
  'Bamenda → Douala'
]

const allTrips = ref([
  {
    id: 1,
    driver: 'Jean Martin',
    driverImage: Img, // '/images/drivers/jean-martin.jpg',
    rating: 4.8,
    reviews: 25,
    departure: 'Yaoundé',
    arrival: 'Douala',
    departureTime: '08:00',
    arrivalTime: '11:30',
    duration: '3h 30min',
    date: '2025-08-04',
    price: 3500,
    carModel: 'Toyota Camry',
    carImage: Img, // '/images/cars/toyota-camry.jpg',
    totalPlaces: 4,
    remainingPlaces: 2,
    isVerified: true,
    features: ['Climatisation', 'WiFi', 'Musique', 'Bagages OK']
  },
  {
    id: 2,
    driver: 'Marie Kouna',
    driverImage: Img, // '/images/drivers/marie-kouna.jpg',
    rating: 4.9,
    reviews: 42,
    departure: 'Douala',
    arrival: 'Bafoussam',
    departureTime: '14:30',
    arrivalTime: '18:00',
    duration: '3h 30min',
    date: '2025-08-04',
    price: 4000,
    carModel: 'Honda Accord',
    carImage: Img, // '/images/cars/honda-accord.jpg',
    totalPlaces: 4,
    remainingPlaces: 3,
    isVerified: true,
    features: ['Climatisation', 'Bagages OK', 'Non-fumeur']
  },
  {
    id: 3,
    driver: 'Paul Ngono',
    driverImage: Img, // '/images/drivers/paul-ngono.jpg',
    rating: 4.7,
    reviews: 18,
    departure: 'Yaoundé',
    arrival: 'Bafoussam',
    departureTime: '06:00',
    arrivalTime: '09:15',
    duration: '3h 15min',
    date: '2025-08-05',
    price: 3800,
    carModel: 'Nissan Sentra',
    carImage: Img, // '/images/cars/nissan-sentra.jpg',
    totalPlaces: 5,
    remainingPlaces: 1,
    isVerified: true,
    features: ['Climatisation', 'Musique', 'Bagages OK']
  }
  // ... autres trajets
])

// Propriétés calculées
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

const filteredTrips = computed(() => {
  let trips = [...allTrips.value]

  if (searchFilters.value.departure) {
    trips = trips.filter(trip => trip.departure === searchFilters.value.departure)
  }

  if (searchFilters.value.arrival) {
    trips = trips.filter(trip => trip.arrival === searchFilters.value.arrival)
  }

  if (searchFilters.value.date) {
    trips = trips.filter(trip => trip.date === searchFilters.value.date)
  }

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

const totalTrips = computed(() => allTrips.value.length);
const statistiques = ref([
  {
    title: totalTrips,
    description: 'Trajets actifs',
  },
  {
    title: '98%',
    description: 'Satisfaction',
  },
  {
    title: '15,000+',
    description: 'Utilisateurs actifs',
  }
])

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
  currentPage.value = 1
  console.log('Filtres appliqués:', searchFilters.value)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    document.querySelector('.py-16').scrollIntoView({ behavior: 'smooth' })
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

const setPopularRoute = (route) => {
  const [departure, arrival] = route.split(' → ')
  searchFilters.value.departure = departure
  searchFilters.value.arrival = arrival
  filterTrips()
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
  alert(`Réservation confirmée pour ${reservationCount.value} place(s) sur le trajet ${selectedTrip.value.departure} → ${selectedTrip.value.arrival}`)

  // Mettre à jour les places disponibles
  selectedTrip.value.remainingPlaces -= reservationCount.value

  const tripIndex = allTrips.value.findIndex(trip => trip.id === selectedTrip.value.id)
  if (tripIndex !== -1) {
    allTrips.value[tripIndex].remainingPlaces = selectedTrip.value.remainingPlaces
  }

  closeModal()
}

// Gestion des erreurs d'images
const handleImageError = (event) => {
  event.target.src = '/images/drivers/default-avatar.png'
}

const handleCarImageError = (event) => {
  event.target.src = '/images/cars/default-car.png'
}

// Cycle de vie
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
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
.group:hover {
  transform: translateY(-2px);
}

/* Style pour les inputs focus */
input:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
