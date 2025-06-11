<script setup>
import Header from "@public/components/header.vue";
import Voyage from "@/assets/images/voiture.jpg"
import Footer from "@public/components/footer.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-white">
    <Header />

    <!-- Hero Section - Recherche de transport -->
    <section class="relative bg-black overflow-hidden pt-44">
      <!-- Background Image Overlay -->
      <div class="absolute inset-0 bg-primary bg-opacity-20"></div>

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <img :src="Voyage" alt="voyage en voiture" class="absolute top-0 left-0 w-full h-full object-cover object-center">
      </div>

      <div class="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center min-h-screen">
        <h1 class="text-4xl md:text-5xl font-montserrat text-white mb-4">
          {{ t('home.title') }} <span class="italic font-black">?</span>
        </h1>
        <p class="text-xl text-gray-300 mb-2">
          {{ t('home.subtitle') }}
        </p>
        <p class="text-lg text-gray-300 mb-8">
          {{ t('home.description') }}
        </p>

        <!-- Search Form -->
        <div class="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 lg:mb-0 mb-10">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Departure Address -->
            <div class="relative">
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                :placeholder="t('home.departureAddress')"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Destination Address -->
            <div class="relative">
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                :placeholder="t('home.destinationAddress')"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Departure Date -->
            <div class="relative">
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="date"
                :placeholder="t('home.departureDate')"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Search Button -->
            <button class="bg-secondary-500 hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
              {{ t('home.search') }}
            </button>
          </div>
        </div>
        <div class="w-full mt-auto py-16 bg-primary bg-opacity-60 relative">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-montserrat text-white mb-8">
              {{ t('home.proposeTrip') }}
            </h2>

            <button class="bg-white rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center mx-auto mb-8">
              <svg class="w-14 h-12 bg-secondary rounded-lg text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              <span class="font-semibold text-base px-3">{{ t('home.publishAnnouncement') }}</span>
            </button>

            <div class="max-w-2xl mx-auto">
              <p class="text-xl font-normal text-white leading-relaxed">
                {{ t('home.carpoolDescription') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto grid lg:grid-cols-3 px-4 md:grid-cols-2 grid-cols-1 max-w-6xl lg:space-x-4 lg:gap-y-0 gap-y-4">
        <!-- Service Card 1 -->
        <div class="flex flex-col justify-center items-center shadow-lg border rounded-lg">
          <header class="h-14 w-full bg-secondary rounded-t-lg"></header>
          <main class="w-full py-2 place-items-center px-4">
            <h3 class="leading-relaxed text-xl font-bold text-gray-600 my-1">{{ t('home.services.haveCarTitle') }}</h3>
            <p class="text-sm text-primary font-serif leading-relaxed">
              {{ t('home.services.haveCarDescription') }}
            </p>
          </main>
          <footer class="py-4">
            <a class="border border-secondary py-2 px-12 rounded-lg flex justify-between items-center cursor-pointer hover:bg-secondary hover:text-white transition-colors">
              {{ t('home.services.proposeButton') }}
            </a>
          </footer>
        </div>

        <!-- Service Card 2 -->
        <div class="flex flex-col justify-center items-center shadow-lg border rounded-lg">
          <header class="h-14 w-full bg-secondary-accent rounded-t-lg"></header>
          <main class="w-full py-2 place-items-center px-4">
            <h3 class="leading-relaxed text-xl font-bold text-gray-600 my-1">{{ t('home.services.needRideTitle') }}</h3>
            <p class="text-sm text-primary font-serif leading-relaxed">
              {{ t('home.services.needRideDescription') }}
            </p>
          </main>
          <footer class="py-4">
            <a class="border border-secondary-accent py-2 px-12 rounded-lg flex justify-between items-center cursor-pointer hover:bg-secondary-accent hover:text-white transition-colors">
              {{ t('home.services.bookButton') }}
            </a>
          </footer>
        </div>

        <!-- Service Card 3 -->
        <div class="flex flex-col justify-center items-center shadow-lg border rounded-lg">
          <header class="h-14 w-full bg-primary rounded-t-lg"></header>
          <main class="w-full py-2 place-items-center px-4">
            <h3 class="leading-relaxed text-xl font-bold text-gray-600 my-1">{{ t('home.services.regularTripsTitle') }}</h3>
            <p class="text-sm text-primary font-serif leading-relaxed">
              {{ t('home.services.regularTripsDescription') }}
            </p>
          </main>
          <footer class="py-4">
            <a class="border border-primary py-2 px-12 rounded-lg flex justify-between items-center cursor-pointer hover:bg-primary hover:text-white transition-colors">
              {{ t('home.services.organizeButton') }}
            </a>
          </footer>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>


<!--<script setup>-->
<!--import Header from "@public/components/header.vue";-->
<!--import Voyage from "@/assets/images/voiture.jpg"-->
<!--import Footer from "@public/components/footer.vue";-->
<!--import { useI18n } from 'vue-i18n'-->

<!--const { t } = useI18n()-->
<!--</script>-->

<!--<template>-->
<!--  <div class="min-h-screen bg-white">-->
<!--    <Header />-->

<!--    &lt;!&ndash; Hero Section - Recherche de transport &ndash;&gt;-->
<!--    <section class="relative h-screen bg-gradient-to-r from-primary to-primary-900 overflow-hidden lg:pt-44 pt-96">-->
<!--      &lt;!&ndash; Background Image Overlay &ndash;&gt;-->
<!--      <div class="absolute inset-0 bg-primary/30 bg-opacity-40"></div>-->

<!--      &lt;!&ndash; Background Pattern &ndash;&gt;-->
<!--      <div class="absolute inset-0 opacity-20">-->
<!--        <img :src="Voyage" alt="voyage en voiture" class="absolute top-0 left-0 w-full h-full object-cover object-center">-->
<!--      </div>-->

<!--      <div class="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">-->
<!--        <h1 class="text-4xl md:text-5xl font-montserrat text-white mb-4">-->
<!--          Vous cherchez un moyen de transport <span class="italic font-black">?</span>-->
<!--        </h1>-->
<!--        <p class="text-xl text-gray-300 mb-2">-->
<!--          Faites des économies sur vos déplacements-->
<!--        </p>-->
<!--        <p class="text-lg text-gray-300 mb-8">-->
<!--          Rejoignez un trajet déjà planifié !-->
<!--        </p>-->

<!--        &lt;!&ndash; Search Form &ndash;&gt;-->
<!--        <div class="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">-->
<!--          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">-->
<!--            &lt;!&ndash; Departure Address &ndash;&gt;-->
<!--            <div class="relative">-->
<!--              <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">-->
<!--                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">-->
<!--                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />-->
<!--                </svg>-->
<!--              </div>-->
<!--              <input-->
<!--                type="text"-->
<!--                placeholder="Adresse de départ"-->
<!--                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none"-->
<!--              />-->
<!--            </div>-->

<!--            &lt;!&ndash; Destination Address &ndash;&gt;-->
<!--            <div class="relative">-->
<!--              <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">-->
<!--                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">-->
<!--                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />-->
<!--                </svg>-->
<!--              </div>-->
<!--              <input-->
<!--                type="text"-->
<!--                placeholder="Adresse d'arrivée"-->
<!--                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent outline-none"-->
<!--              />-->
<!--            </div>-->

<!--            &lt;!&ndash; Departure Date &ndash;&gt;-->
<!--            <div class="relative">-->
<!--              <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500">-->
<!--                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">-->
<!--                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />-->
<!--                </svg>-->
<!--              </div>-->
<!--              <input-->
<!--                type="date"-->
<!--                placeholder="Date de départ"-->
<!--                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"-->
<!--              />-->
<!--            </div>-->

<!--            &lt;!&ndash; Search Button &ndash;&gt;-->
<!--            <button class="bg-secondary-500 hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">-->
<!--              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />-->
<!--              </svg>-->
<!--              Rechercher-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="w-full mt-auto py-16 bg-primary bg-opacity-60 relative">-->
<!--          <div class="container mx-auto px-4 text-center">-->
<!--            <h2 class="text-3xl md:text-4xl font-montserrat text-white mb-8">-->
<!--              Proposez un trajet !-->
<!--            </h2>-->

<!--            <button class="bg-white rounded-lg-->
<!--             shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center mx-auto mb-8">-->
<!--              <svg class="w-14 h-12 bg-secondary rounded-lg text-white" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />-->
<!--              </svg>-->
<!--              <span class="font-semibold text-base px-3" >Publier votre annonce</span>-->
<!--            </button>-->

<!--            <div class="max-w-2xl mx-auto">-->
<!--              <p class="text-xl font-normal text-white leading-relaxed">-->
<!--                Publiez une annonce de covoiturage dès maintenant-->
<!--                et connectez-vous avec des voyageurs proches de-->
<!--                chez vous.-->
<!--              </p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

<!--    &lt;!&ndash; Propose a Trip Section &ndash;&gt;-->
<!--    <section class="py-16 bg-white">-->
<!--      <div class="container mx-auto px-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-w-6xl gap-4">-->
<!--        <div class="flex flex-col justify-center items-center shadow-lg border rounded-lg">-->
<!--          <header class="h-14 w-full bg-secondary rounded-t-lg"></header>-->
<!--          <main class="w-full py-2 place-items-center px-4 ">-->
<!--            <h3 class="leading-relaxed text-xl font-bold text-gray-600 my-1">Vous avez une voiture ?</h3>-->
<!--            <p class="text-sm text-primary font-serif leading-relaxed">-->
<!--              Proposez vos trajets, partagez les frais et rendez service à d'autres passagers. Simple, pratique, économique.-->
<!--            </p>-->
<!--          </main>-->
<!--          <footer class="py-4">-->
<!--            <a class="border border-secondary py-2 px-12 rounded-lg flex justify-between items-center">-->
<!--              proposer-->
<!--            </a>-->
<!--          </footer>-->
<!--        </div>-->
<!--        <div class="flex flex-col justify-center items-center shadow-lg border rounded-lg">-->
<!--          <header class="h-14 w-full bg-secondary-accent rounded-t-lg"></header>-->
<!--          <main class="w-full py-2 place-items-center px-4 ">-->
<!--            <h3 class="leading-relaxed text-xl font-bold text-gray-600 my-1">Vous avez une voiture ?</h3>-->
<!--            <p class="text-sm text-primary font-serif leading-relaxed">-->
<!--              Proposez vos trajets, partagez les frais et rendez service à d'autres passagers. Simple, pratique, économique.-->
<!--            </p>-->
<!--          </main>-->
<!--          <footer class="py-4">-->
<!--            <a class="border border-secondary-accent py-2 px-12 rounded-lg flex justify-between items-center">-->
<!--              proposer-->
<!--            </a>-->
<!--          </footer>-->
<!--        </div>-->
<!--        <div class="flex flex-col justify-center items-center shadow-lg border rounded-lg">-->
<!--          <header class="h-14 w-full bg-primary rounded-t-lg"></header>-->
<!--          <main class="w-full py-2 place-items-center px-4 ">-->
<!--            <h3 class="leading-relaxed text-xl font-bold text-gray-600 my-1">Vous avez une voiture ?</h3>-->
<!--            <p class="text-sm text-primary font-serif leading-relaxed">-->
<!--              Proposez vos trajets, partagez les frais et rendez service à d'autres passagers. Simple, pratique, économique.-->
<!--            </p>-->
<!--          </main>-->
<!--          <footer class="py-4">-->
<!--            <a class="border border-primary py-2 px-12 rounded-lg flex justify-between items-center">-->
<!--              proposer-->
<!--            </a>-->
<!--          </footer>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

<!--    <Footer />-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--/* Custom styles if needed */-->
<!--</style>-->
