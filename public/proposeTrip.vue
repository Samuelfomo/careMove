<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from "@public/components/header.vue";
import Footer from './components/footer.vue';
import { Motion } from '@motionone/vue'


const projectData = ref({
  departureAddress: '',
  arrivalAddress: '',
  departureDate: '',
  departureTime: '',
  passengerCount: 1,
});

const isLoading = ref(false);
const cities = ['Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Maroua', 'Bertoua', 'Ngaoundéré'];

const latestTrips = ref([
  { id: 1, departure: 'Yaoundé', arrival: 'Douala', places: 5, published: 9, date: 'Il y a 8 jours' },
  { id: 2, departure: 'Douala', arrival: 'Bafoussam', places: 3, published: 6, date: 'Il y a 3 jours' },
  { id: 3, departure: 'Maroua', arrival: 'Garoua', places: 4, published: 7, date: 'Hier' }
]);

const infoList = [
  { title: 'Sécurité', description: 'Assurez-vous toujours de vérifier l’identité de vos passagers.' },
  { title: 'Économie', description: 'Le covoiturage peut réduire vos frais de transport.' },
  { title: 'Écologie', description: 'Partagez vos trajets pour réduire votre empreinte carbone.' }
];

const incrementPassengers = () => {
  projectData.value.passengerCount++;
};

const decrementPassengers = () => {
  if (projectData.value.passengerCount > 1) {
    projectData.value.passengerCount--;
  }
};

const publishProject = async () => {
  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  alert('Trajet publié avec succès !');
  isLoading.value = false;
};

// Element de temoignange des uses

// Témoignages
const testimonials = ref([
  {
    quote: "Ce service a changé ma façon de voyager ! Très pratique et économique.",
    author: "— Yasmine"
  },
  {
    quote: "Interface simple, publication rapide, et beaucoup de trajets disponibles.",
    author: "— Idriss"
  },
  {
    quote: "J’ai pu faire Ngaoundéré - Douala à moitié prix, c'est super cool :) !",
    author: "— Patrick"
  }
])

const currentTestimonial = ref(0)
let intervalId

const showNextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.value.length
}

const showPrevTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.value.length) % testimonials.value.length
}

onMounted(() => {
  intervalId = setInterval(showNextTestimonial, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const isLoadingTrips = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoadingTrips.value = false
  }, 5000)
})
</script>

<template>
  <div class="min-h-screen flex flex-col border-b border-gray-600  bg-gradient-to-tr from-gray-100 via-primary-800 to-gray-100">
    <Header />

    <main class="flex-1 flex items-center justify-center px-4 mt-36">
      <div class="flex flex-col lg:flex-row md:space-x-8 justify-between rounded w-full max-w-8xl container md:p-10 place-items-center">

        <!-- Formulaire -->
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          transition="{ duration: 0.5, ease: 'ease-out' }"
          class="w-full max-w-xl rounded-xl overflow-hidden shadow-xl"
        >
          <div class="bg-primary-800 text-white px-6 py-6 ">
            <h2 class="text-3xl font-bold text-center">Publier un trajet</h2>
            <p class="text-sm mt-1 text-center">Vous avez un véhicule ?</p>
          </div>

          <form @submit.prevent="publishProject" class="bg-primary-50 px-6 py-6 space-y-4">
            <!-- Adresse de départ -->
            <Motion
              v-for="(field, index) in ['departureAddress', 'arrivalAddress']"
              :key="field"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ delay: index * 0.1, duration: 0.3 }"
            >
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Adresse {{ field === 'departureAddress' ? 'de départ' : 'd\'arrivée' }}</label>
                <div class="relative">
                  <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <select v-model="projectData[field]" class="w-full p-3 pl-10 rounded-md border border-gray-300 outline-none bg-white">
                    <option disabled value="">Sélectionner une ville</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                  </select>
                </div>
              </div>
            </Motion>

            <!-- Date et Heure -->
            <div class="flex md:flex-nowrap flex-col md:space-x-3 md:space-y-0 space-y-3">
              <Motion
                v-for="(label, index) in ['Date de départ', 'Heure de départ']"
                :key="label"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ delay: index * 0.1 + 0.2, duration: 0.3 }"
                class="flex-1"
              >
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
                <div class="relative">
                  <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.75 4a.75.75 0 00-1.5 0v4.25c0 .414.336.75.75.75H12a.75.75 0 000-1.5h-1.25V6z" />
                  </svg>
                  <input v-model="projectData[label === 'Date de départ' ? 'departureDate' : 'departureTime']" type="date" class="w-full p-3 pl-10 rounded-md border border-gray-300 outline-none bg-white" />
                </div>
              </Motion>
            </div>

            <!-- Nombre de passagers -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.3 }"
              class="flex items-center justify-between"
            >
              <label class="block text-sm font-medium text-gray-700">Nombre de passagers</label>
              <div class="flex items-center">
                <button type="button" @click="decrementPassengers" class="px-4 py-2 bg-primary-800 hover:bg-primary-600 text-white rounded-l-md transition duration-200 hover:scale-105 ease-in-out">−</button>
                <div class="px-4 py-2 outline-none bg-white text-center">{{ projectData.passengerCount }}</div>
                <button type="button" @click="incrementPassengers" class="px-4 py-2 bg-primary-800 hover:bg-primary-600 text-white rounded-r-md transition duration-200 hover:scale-105 ease-in-out">+</button>
              </div>
            </Motion>

            <!-- Bouton de soumission -->
            <Motion
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              transition="{ duration: 0.3 }"
              class="w-full flex justify-center items-center"
            >
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full max-w-md bg-primary-700 text-white py-3 rounded-md font-bold hover:bg-primary-800 transition-all duration-200 disabled:opacity-50"
              >
                <span v-if="!isLoading">PUBLIER</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publication en cours...
                </span>
              </button>
            </Motion>
          </form>
        </Motion>

        <!-- Liste des trajets -->
        <div class="w-full lg:w-1/2 text-white md:py-0 py-4">
          <h3 class="text-2xl font-semibold mb-4 text-center">Derniers trajets publiés</h3>
          <div class="space-y-4">

            <!-- Squelettes de chargement (shimmer) -->
            <template v-if="isLoadingTrips">
              <div v-for="i in 3" :key="i" class="animate-pulse bg-white/60 p-4 rounded-lg flex justify-between items-center text-black">
                <div class="w-32 h-4 bg-gray-300 rounded"></div>
                <div class="w-24 h-4 bg-gray-300 rounded"></div>
                <div class="w-20 h-4 bg-gray-300 rounded"></div>
                <div class="w-16 h-6 bg-gray-300 rounded"></div>
              </div>
            </template>

            <!-- Liste réelle des trajets -->
            <template v-else>
              <div
                v-for="(trip, index) in latestTrips"
                :key="trip.id"
                class="bg-white/80 text-black p-4 rounded-lg flex justify-between items-center transition hover:shadow-md"
              >
                <span>{{ trip.departure }} - {{ trip.arrival }}</span>
                <span class="text-secondary font-bold">{{ trip.places }} Places / {{ trip.published }} publiées</span>
                <span class="text-sm">{{ trip.date }}</span>
                <button class="text-sm flex p-1 pt-2 rounded-lg hover:bg-gray-200 transition duration-200">Détail</button>
              </div>

              <button class="hover:font-bold hover:delay-100 mt-2">Voir Plus</button>
            </template>

          </div>
        </div>

      </div>
    </main>


      <section class="py-10 md:mt-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center text-white">
              <p class="md:text-lg text-base">autres conducteurs certifiés sur ShareWuma</p>
            </div>
            <div class="text-center text-white">
              <h3 class="md:text-4xl text-3xl font-bold mb-2">Plus de 1000</h3>
              <p class="md:text-lg text-base">membres inscrits à travers le notre solution</p>
            </div>
            <div class="text-center text-white">
              <h3 class="md:text-4xl text-3xl font-bold mb-2">Plus de 40 trajets</h3>
              <p class="md:text-lg text-base">partagés chaque jours</p>
            </div>
          </div>
        </div>
      </section>

      <section class="md:py-12 pb-12">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-center space-x-8">

            <!-- Bouton précédent -->
            <button @click="showPrevTestimonial" class="bg-gray-800 text-white h-12 w-12 rounded-full hover:bg-gray-700 flex items-center justify-center transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Témoignage animé -->
            <transition name="fade-slide" mode="out-in">
              <div :key="currentTestimonial" class="bg-primary-800 p-6 rounded-lg shadow-md max-w-xl w-full text-center">
                <p class="text-lg font-semibold mb-4 text-white">
                  "{{ testimonials[currentTestimonial].quote }}"
                </p>
                <p class="text-center font-bold text-primary-accent">{{ testimonials[currentTestimonial].author }}</p>
              </div>
            </transition>

            <!-- Bouton suivant -->
            <button @click="showNextTestimonial" class="bg-gray-800 text-white h-12 w-12 rounded-full hover:bg-gray-700 flex items-center justify-center transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </div>
      </section>


  </div>
  <Footer/>
</template>

<style scoped>
.text-error {
  color: red;
}
</style>
