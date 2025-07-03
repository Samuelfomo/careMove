<template>
    <div class="min-h-screen flex flex-col bg-gray-100 gradient-to-br from-[#E0F2FE] via-secondary-900 to-[#F0F0F0]">
        <Header />

        <main class="flex-1 flex flex-col items-center justify-center px-4 pt-36 pb-12 bg-primary-100" style="background-image: url('@/assets/images/bg4.jpg')">
            <!-- Formulaire de recherche de trajet -->
            <Motion
                :initial="{ opacity: 0, y: 50 }"
                :animate="{ opacity: 1, y: 0 }"
                transition="{ duration: 0.5, ease: 'ease-out' }"
                class="w-full max-w-6xl rounded-xl overflow-hidden shadow-xl"
            >
                <div class="text-secondary-500 font-bold px-6 py-6">
                    <h2 class="text-4xl font-bold text-center">Rechercher un trajet</h2>
                </div>

                <form @submit.prevent="searchTrip" class="bg-white px-1 py-1 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                    <Motion
                        v-for="(field, index) in ['departureAddress', 'arrivalAddress', 'departureTime', 'passengerCount']"
                        :key="field"
                        :initial="{ opacity: 90, y: 10 }"
                        :animate="{ opacity: 9, y: 0 }"
                        :transition="{ delay: index * 0.8, duration: 0.7 }"
                        class="flex-1"
                    >
                        <label class="block text-sm font-medium text-gray-700 mb-1">{{ field === 'departureAddress' ? 'Adresse de départ' : field === 'arrivalAddress' ? 'Adresse d\'arrivée' : field === 'departureTime' ? 'Heure de départ' : 'Nombre de passagers' }}</label>
                        <div class="relative" v-if="field !== 'passengerCount'">
                            <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                            </svg>
                            <input v-if="field === 'departureTime'" v-model="searchData[field]" type="time" class="w-full p-3 pl-10 rounded-md border border-gray-300 outline-none bg-white text-gray-700" />
                            <select v-else v-model="searchData[field]" class="w-full p-3 pl-10 rounded-md border border-gray-300 outline-none bg-white text-gray-700">
                                <option disabled value="">Sélectionner</option>
                                <option v-if="field === 'departureAddress'" v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                                <option v-if="field === 'arrivalAddress'" v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                            </select>
                        </div>
                        <div class="relative flex items-center" v-else>
                            <button type="button" @click="decrementPassengers" class="px-3 py-1 bg-secondary-500 hover:bg-secondary text-white rounded-l-md transition duration-200">−</button>
                            <input v-model="searchData[field]" type="number" min="1" class="w-full p-3 border border-gray-300 outline-none bg-white text-gray-700 text-center" />
                            <button type="button" @click="incrementPassengers" class="px-3 py-1 bg-secondary-500 hover:bg-secondary text-white rounded-r-md transition duration-200">+</button>
                        </div>
                    </Motion>

                    <Motion
                        :initial="{ opacity: 0, y: 50 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.9 }"
                    >
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

        <Motion
            :initial="{ opacity: 0, y: 50 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.9, delay: 0.9 }"
            >
            <h3 class="text-primary text-xl md:text-2xl font-bold my-5 text-center px-4">
                Plus de 12 trajets viennent d'être publiés près de votre secteur
            </h3>
            </Motion>

            <section class="w-full flex flex-col md:flex-row px-4 md:px-14 gap-6 md:gap-20">
            <!-- Colonne gauche - image -->
            <div class="flex justify-center">
                <div class="px-4 rounded-xl mb-2 transition-transform duration-300 hover:scale-105 delay-100 hover:shadow-xl">
                <img :src="imgCarRed" alt="Covoiturage" class="rounded-lg w-full max-w-md h-52 md:h-60 object-cover" />
                </div>
            </div>

            <!-- Colonne droite - trajets -->
            <div class="flex-1">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
                <Motion
                    v-for="(trip, index) in latestTrips"
                    :key="trip.id"
                    :initial="{ opacity: 0, y: 30 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: index * 0.3, duration: 0.5 }"
                    class="bg-white shadow-lg p-4 rounded-lg hover:shadow-2xl transition-shadow duration-300"
                >
                    <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <!-- Image -->
                    <div class="relative w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                        <img :src="imgfont" alt="Photo du trajet" class="w-full h-full object-cover" />
                        <div class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-bold text-gray-500">
                        ♥ {{ trip.likes }}
                        </div>
                    </div>

                    <!-- Infos -->
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
                        <button class="text-sm p-2 rounded-lg hover:text-secondary-500 transition duration-200">
                            <IconEye />
                        </button>
                        </div>
                    </div>
                    </div>
                </Motion>
                </div>
            </div>
            </section>


        <!-- Autres sections... -->
    </div>
    <Footer/>
</template>

<script setup>
import { ref } from 'vue'
import Header from "@public/components/header.vue";
import Footer from './components/footer.vue';
import { Motion } from '@motionone/vue';
import imgfont from "@/assets/images/imgfont.png";
import imgCarRed from "@/assets/images/imgCarRed.jpg"
import { Icon12Hours, Icon2fa, Icon3dCubeSphere, IconEye, IconPlaceholder, IconUserExclamation, IconUserOff, IconUserPin, IconUsersGroup } from '@tabler/icons-vue';

const searchData = ref({
    departureAddress: '',
    arrivalAddress: '',
    departureTime: '',
    passengerCount: 1,
});

const isLoading = ref(false);
const cities = ['Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Maroua', 'Bertoua', 'Ngaoundéré'];

const latestTrips = ref([
    { id: 1, departure: 'Yaoundé', arrival: 'Douala', places: 5, published: 9, date: 'Il y a 8 jours', totalPlaces: 5, takenPlaces: 3, remainingPlaces: 2, price: 3700, likes: 3 },
    { id: 2, departure: 'Douala', arrival: 'Bafoussam', places: 3, published: 6, date: 'Il y a 3 jours', totalPlaces: 4, takenPlaces: 2, remainingPlaces: 2, price: 6000, likes: 5 },
    { id: 3, departure: 'Maroua', arrival: 'Garoua', places: 4, published: 7, date: 'Hier', totalPlaces: 4, takenPlaces: 2, remainingPlaces: 2, price: 12000, likes: 4 },
    { id: 3, departure: 'Maroua', arrival: 'Garoua', places: 4, published: 7, date: 'Hier', totalPlaces: 4, takenPlaces: 2, remainingPlaces: 2, price: 12000, likes: 4 },
]);

const incrementPassengers = () => {
    searchData.value.passengerCount++;
};

const decrementPassengers = () => {
    if (searchData.value.passengerCount > 1) {
        searchData.value.passengerCount--;
    }
};

const searchTrip = async () => {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Recherche de trajet en cours...');
    isLoading.value = false;
};
</script>
