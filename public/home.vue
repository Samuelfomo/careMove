<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from "@public/components/header.vue"
import Voyage from "@/assets/images/voiture.jpg"
import Footer from "@public/components/footer.vue"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Refs pour les animations
const heroRef = ref(null)
const searchFormRef = ref(null)
const propositionsRef = ref(null)
const verticalScrollRef = ref(null)
const testimonialsRef = ref(null)

// Données pour les propositions de voyage
const travelPropositions = ref([
  {
    id: 1,
    from: 'Douala',
    to: 'Yaoundé',
    date: '2025-06-20',
    time: '08:00',
    price: '3000 FCFA',
    driver: 'Jean M.',
    seats: 3,
    rating: 4.8,
    image: '../src/assets/images/bg1.jpg'
  },
  {
    id: 2,
    from: 'Yaoundé',
    to: 'Bafoussam',
    date: '2025-06-20',
    time: '14:30',
    price: '2500 FCFA',
    driver: 'Marie K.',
    seats: 2,
    rating: 4.9,
    image: '../src/assets/images/bg.jpg'
  },
  {
    id: 3,
    from: 'Douala',
    to: 'Limbé',
    date: '2025-06-21',
    time: '10:15',
    price: '1500 FCFA',
    driver: 'Paul N.',
    seats: 4,
    rating: 4.7,
    image: '../src/assets/images/bg2.jpg'
  },
  {
    id: 4,
    from: 'Bamenda',
    to: 'Douala',
    date: '2025-06-21',
    time: '06:00',
    price: '4000 FCFA',
    driver: 'Sophie T.',
    seats: 1,
    rating: 5.0,
    image: '../src/assets/images/bg3.jpg'
  },
  {
    id: 5,
    from: 'Garoua',
    to: 'Maroua',
    date: '2025-06-22',
    time: '09:30',
    price: '2000 FCFA',
    driver: 'Ahmed B.',
    seats: 3,
    rating: 4.6,
    image: '../src/assets/images/bg4.jpg'
  }
])

// Données pour les témoignages
const testimonials = ref([
  {
    id: 1,
    name: 'Elise Fotso',
    role: 'Étudiante',
    message: 'ShareWuma m\'a permis d\'économiser énormément sur mes trajets université-maison. Interface intuitive et conducteurs fiables !',
    rating: 5,
    image: '/api/placeholder/50/50'
  },
  {
    id: 2,
    name: 'Michel Ngono',
    role: 'Chef d\'entreprise',
    message: 'Excellent service ! Je propose régulièrement mes trajets et l\'ambiance est toujours conviviale.',
    rating: 5,
    image: '/api/placeholder/50/50'
  },
  {
    id: 3,
    name: 'Fatima Alhadji',
    role: 'Fonctionnaire',
    message: 'Pratique pour les trajets domicile-travail. L\'application est fluide et les réservations sont simples.',
    rating: 4,
    image: '/api/placeholder/50/50'
  },
  {
    id: 4,
    name: 'Gabriel Tchoua',
    role: 'Commerçant',
    message: 'Grâce à ShareWuma, mes déplacements professionnels sont devenus plus économiques et plus agréables.',
    rating: 5,
    image: '/api/placeholder/50/50'
  },
  {
    id: 5,
    name: 'Aminata Diallo',
    role: 'Infirmière',
    message: 'Service fiable pour mes trajets de nuit. La sécurité est au rendez-vous et les prix sont abordables.',
    rating: 4,
    image: '/api/placeholder/50/50'
  }
])

// Données pour les trajets populaires
const popularRoutes = ref([
  { from: 'Douala', to: 'Yaoundé', trips: 45, price: '2500 FCFA' },
  { from: 'Yaoundé', to: 'Bafoussam', trips: 32, price: '2000 FCFA' },
  { from: 'Douala', to: 'Limbé', trips: 28, price: '1200 FCFA' },
  { from: 'Bamenda', to: 'Douala', trips: 25, price: '3500 FCFA' },
  { from: 'Garoua', to: 'Ngaoundéré', trips: 18, price: '1800 FCFA' },
  { from: 'Yaoundé', to: 'Ebolowa', trips: 22, price: '1500 FCFA' }
])

// Variables pour le scroll automatique
let horizontalScrollTween = null
let verticalScrollTween = null

onMounted(async () => {
   await nextTick();
  gsap.registerPlugin(ScrollTrigger)
  initAnimations()
  initHorizontalScroll()
  initVerticalScroll()
})

onUnmounted(() => {
  if (horizontalScrollTween) horizontalScrollTween.kill()
  if (verticalScrollTween) verticalScrollTween.kill()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

const initAnimations = () => {
  // Animation du hero
  gsap.set(['.hero-title', '.hero-subtitle', '.hero-description'], { opacity: 0, y: 50 })
  gsap.set(searchFormRef.value, { opacity: 0, y: 30, scale: 0.95 })

  const heroTl = gsap.timeline()
  heroTl
    .to('.hero-title', { duration: 1, opacity: 1, y: 0, ease: 'power2.out' })
    .to('.hero-subtitle', { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.5')
    .to('.hero-description', { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.6')
    .to(searchFormRef.value, { duration: 1, opacity: 1, y: 0, scale: 1, ease: 'back.out(1.7)' }, '-=0.4')

  // Animation des cartes de service
  gsap.set('.service-card', { opacity: 0, y: 50, scale: 0.9 })
  ScrollTrigger.create({
    trigger: '.services-section',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.service-card', {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      })
    }
  })

  // Animation des statistiques
  gsap.set('.stat-item', { opacity: 0, scale: 0.8 })
  ScrollTrigger.create({
    trigger: '.stats-section',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.stat-item', {
        duration: 0.6,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      })
    }
  })

  // Animation des trajets populaires
  gsap.set('.route-card', { opacity: 0, x: -50 })
  ScrollTrigger.create({
    trigger: '.popular-routes',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.route-card', {
        duration: 0.6,
        opacity: 1,
        x: 0,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }
  })

  // Animation de la section CTA
  gsap.set('.cta-content', { opacity: 0, y: 30 })
  ScrollTrigger.create({
    trigger: '.cta-section',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.cta-content', {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      })
    }
  })
}

const initHorizontalScroll = () => {
  const container = propositionsRef.value
  if (!container) return

  // Scroll automatique horizontal
  horizontalScrollTween = gsap.to(container, {
    x: () => -(container.scrollWidth - container.clientWidth),
    duration: 10,
    ease: 'none',
    repeat: -1,
    yoyo: true
  })

  // Pause au survol
  container.addEventListener('mouseenter', () => horizontalScrollTween.pause())
  container.addEventListener('mouseleave', () => horizontalScrollTween.resume())
}

const initVerticalScroll = () => {
  const container = verticalScrollRef.value
  if (!container) return

  // Scroll automatique vertical
  verticalScrollTween = gsap.to(container, {
    y: () => -(container.scrollHeight - container.clientHeight),
    duration: 20,
    ease: 'none',
    repeat: -1,
    yoyo: true
  })

  // Pause au survol
  container.addEventListener('mouseenter', () => verticalScrollTween.pause())
  container.addEventListener('mouseleave', () => verticalScrollTween.resume())
}

const handleManualScroll = (direction, isHorizontal = true) => {
  const container = isHorizontal ? propositionsRef.value : verticalScrollRef.value
  const scrollAmount = isHorizontal ? 300 : 200

  if (isHorizontal) {
    horizontalScrollTween.pause()
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
    setTimeout(() => horizontalScrollTween.resume(), 2000)
  } else {
    verticalScrollTween.pause()
    container.scrollBy({ top: direction * scrollAmount, behavior: 'smooth' })
    setTimeout(() => verticalScrollTween.resume(), 2000)
  }
}

const selectProposition = (proposition) => {
  gsap.to(event.currentTarget, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  })

  // Logique de sélection ici
  console.log('Proposition sélectionnée:', proposition)
}
</script>

<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
    <Header />

    <!-- Hero Section -->
    <section ref="heroRef" class="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden pt-20">
      <!-- Background Effects -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/20"></div>
<!--        <img :src="Voyage" alt="voyage en voiture" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay">-->

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-32 right-16 w-32 h-32 bg-primary-accent/20 rounded-full blur-2xl animate-bounce-light"></div>
        <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary-accent/30 rounded-full blur-lg animate-pulse"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
        <!-- Hero Content -->
        <div class="text-center mb-12">
          <h1 class="hero-title text-5xl md:text-7xl font-montserrat font-bold text-white mb-6 leading-tight">
            {{ t('home.title') }}
            <span class="text-primary-accent italic">?</span>
          </h1>
          <p class="hero-subtitle text-2xl md:text-3xl text-gray-200 mb-4 font-light">
            {{ t('home.subtitle') }}
          </p>
          <p class="hero-description text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {{ t('home.description') }}
          </p>
        </div>

        <!-- Search Form -->
        <div ref="searchFormRef" class="w-full max-w-6xl mx-auto">
          <div class="bg-white backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <!-- Departure -->
              <div class="relative group">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-600 group-focus-within:text-secondary-500 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  :placeholder="t('home.departureAddress')"
                  class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all duration-300 text-lg"
                />
              </div>

              <!-- Destination -->
              <div class="relative group">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-600 group-focus-within:text-secondary-500 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  :placeholder="t('home.destinationAddress')"
                  class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all duration-300 text-lg"
                />
              </div>

              <!-- Date -->
              <div class="relative group">
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-600 group-focus-within:text-secondary-500 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  type="date"
                  class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all duration-300 text-lg"
                />
              </div>

              <!-- Search Button -->
              <button class="bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-700 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
                <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
                {{ t('home.search') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Propositions de voyage (Scroll horizontal) -->
    <section class="py-20 bg-gradient-to-t from-secondary-300 via-white to-secondary-300">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-primary font-bold text-gray-600 mb-6 leading-relaxed">
            Trajets disponibles actuellement
          </h2>
          <p class="text-xl text-gray-500 max-w-2xl mx-auto">
            Découvrez les prochains départs et réservez votre place en quelques clics
          </p>
        </div>

        <!-- Contrôles de navigation -->
        <div class="flex justify-center space-x-4 mb-8">
          <button
            @click="handleManualScroll(-1, true)"
            class="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg class="w-6 h-6 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button
            @click="handleManualScroll(1, true)"
            class="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg class="w-6 h-6 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Container de scroll horizontal -->
        <div class="relative overflow-hidden">
          <div
            ref="propositionsRef"
            class="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style="scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none;"
          >
            <div
              v-for="trip in travelPropositions"
              :key="trip.id"
              @click="selectProposition(trip)"
              class="flex-none w-70 bg-white rounded-2xl shadow-xl border border-primary-100 transition-all duration-500 cursor-pointer transform hover:scale-105"
            >
              <div class="p-6">
                <!-- Header -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <img :src="trip.image" :alt="trip.driver" class="w-12 h-12 rounded-full object-cover">
                    <div>
                      <h4 class="font-montserrat text-primary text-sm">{{ trip.driver }}</h4>
                      <div class="flex items-center">
                        <div class="flex text-yellow-400 text-sm">
                          <span v-for="i in 5" :key="i" :class="i <= trip.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                        </div>
                        <span class="text-xs text-gray-600 ml-1">({{ trip.rating }})</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-xl font-bold text-secondary">{{ trip.price }}</div>
                    <div class="text-xs text-gray-500">par personne</div>
                  </div>
                </div>

                <!-- Route -->
                <div class="flex items-center space-x-4 mb-4">
                  <div class="flex-1">
                    <div class="text-lg font-semibold text-primary">{{ trip.from }}</div>
                    <div class="text-xs text-gray-500">Départ</div>
                  </div>
                  <div class="flex-none">
                    <svg class="w-6 h-6 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="flex-1 text-right">
                    <div class="text-lg font-semibold text-primary">{{ trip.to }}</div>
                    <div class="text-xs text-gray-500">Arrivée</div>
                  </div>
                </div>

                <!-- Date et places -->
                <div class="flex items-center justify-between text-sm text-secondary-accent-600 mb-4">
                  <span>{{ trip.date }} à {{ trip.time }}</span>
                  <span class="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                    {{ trip.seats }} place{{ trip.seats > 1 ? 's' : '' }}
                  </span>
                </div>

                <!-- Action -->
                <button class="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300">
                  Réserver maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section statistiques -->
    <section class="stats-section py-16 bg-primary-800 text-white mx-auto px-4">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="stat-item text-center">
            <div class="text-4xl font-bold text-primary-accent mb-2">15K+</div>
            <div class="text-lg text-gray-300">Utilisateurs actifs</div>
          </div>
          <div class="stat-item text-center">
            <div class="text-4xl font-bold text-primary-accent mb-2">50K+</div>
            <div class="text-lg text-gray-300">Trajets réalisés</div>
          </div>
          <div class="stat-item text-center">
            <div class="text-4xl font-bold text-primary-accent mb-2">25</div>
            <div class="text-lg text-gray-300">Villes connectées</div>
          </div>
          <div class="stat-item text-center">
            <div class="text-4xl font-bold text-primary-accent mb-2">4.8★</div>
            <div class="text-lg text-gray-300">Note moyenne</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Témoignages (Scroll vertical) -->
    <section class="py-10 hidden text-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold font-secondary text-primary mb-4 leading-relaxed">
            Ce que disent nos utilisateurs
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de notre communauté
          </p>
        </div>

        <!-- Contrôles de navigation verticale -->
        <div class="flex justify-center space-x-4 mb-8">
          <button
            @click="handleManualScroll(-1, false)"
            class="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <svg class="w-6 h-6 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <button
            @click="handleManualScroll(1, false)"
            class="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <svg class="w-6 h-6 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Container de scroll vertical -->
        <div class="max-w-4xl mx-auto border-t border-gray-300">
          <div class="h-96 overflow-hidden max-w-3xl flex justify-center items-center">
            <div
              ref="verticalScrollRef"
              class="space-y-6 overflow-y-auto scrollbar-hide"
              style="scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none;"
            >
              <div
                v-for="testimonial in testimonials"
                :key="testimonial.id"
                class="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div class="flex items-start space-x-6">
                  <img :src="testimonial.image" :alt="testimonial.name" class="w-16 h-16 rounded-full object-cover flex-shrink-0">
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <h4 class="text-xl font-semibold text-gray-900">{{ testimonial.name }}</h4>
                        <p class="text-gray-600">{{ testimonial.role }}</p>
                      </div>
                      <div class="flex text-yellow-400">
                        <span v-for="i in 5" :key="i" :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                      </div>
                    </div>
                    <p class="text-gray-700 leading-relaxed italic">"{{ testimonial.message }}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Services -->
    <section class="services-section py-10 bg-gradient-to-b from-primary-50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-montserrat font-bold text-gray-700 uppercase mb-4">
            Nos Services
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            ShareWuma vous accompagne dans tous vos déplacements avec des solutions adaptées à vos besoins
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 space-x-6 max-w-6xl mx-auto">
          <!-- Service Card 1 -->
          <div class="service-card group">
            <div class="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-secondary-200 transform hover:-translate-y-2">
              <div class="h-28 bg-gradient-to-br from-secondary-400 to-secondary-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="absolute bottom-4 left-6">
                  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-8">
                <h3 class="text-2xl font-bold text-primary-900 mb-4">{{ t('home.services.haveCarTitle') }}</h3>
                <p class="text-gray-600 mb-6 leading-relaxed">{{ t('home.services.haveCarDescription') }}</p>
                <button class="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105">
                  {{ t('home.services.proposeButton') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Service Card 2 -->
          <div class="service-card group">
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary-accent-200 transform hover:-translate-y-2">
              <div class="h-28 bg-gradient-to-br from-primary-accent-400 to-primary-accent-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="absolute bottom-4 left-6">
                  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-8">
                <h3 class="text-2xl font-bold text-primary-900 mb-4">{{ t('home.services.needRideTitle') }}</h3>
                <p class="text-gray-600 mb-6 leading-relaxed">{{ t('home.services.needRideDescription') }}</p>
                <button class="w-full bg-gradient-to-r from-primary-accent-500 to-primary-accent-600 text-primary-900 py-3 px-6 rounded-xl font-semibold hover:from-primary-accent-600 hover:to-primary-accent-700 transition-all duration-300 transform hover:scale-105">
                  {{ t('home.services.bookButton') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Service Card 3 -->
          <div class="service-card group">
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-secondary-accent-200 transform hover:-translate-y-2">
              <div class="h-28 bg-gradient-to-br from-secondary-accent-400 to-secondary-accent-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="absolute bottom-4 left-6">
                  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="p-8">
                <h3 class="text-2xl font-bold text-primary-900 mb-4">{{ t('home.services.regularTripsTitle') }}</h3>
                <p class="text-gray-600 mb-6 leading-relaxed">{{ t('home.services.regularTripsDescription') }}</p>
                <button class="w-full bg-gradient-to-r from-secondary-accent-500 to-secondary-accent-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-secondary-accent-600 hover:to-secondary-accent-700 transition-all duration-300 transform hover:scale-105">
                  {{ t('home.services.organizeButton') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Trajets Populaires -->
    <section class="popular-routes py-20 bg-gradient-to-tr from-primary-accent to-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-montserrat font-bold text-gray-700 uppercase mb-4">
            {{ t('footer.popularRoutes.title') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les destinations les plus demandées par notre communauté
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            v-for="route in popularRoutes"
            :key="`${route.from}-${route.to}`"
            class="route-card group cursor-pointer"
          >
            <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary-200 transform hover:-translate-y-1">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 bg-secondary-500 rounded-full"></div>
                    <span class="text-lg font-semibold text-gray-900">{{ route.from }}</span>
                  </div>
                  <svg class="w-5 h-5 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <div class="flex items-center space-x-3">
                    <span class="text-lg font-semibold text-gray-900">{{ route.to }}</span>
                    <div class="w-3 h-3 bg-primary-accent-500 rounded-full"></div>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-600">
                    {{ route.trips }} trajets cette semaine
                  </div>
                  <div class="text-lg font-bold text-secondary-600">
                    {{ t('footer.popularRoutes.from') }} {{ route.price }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Avantages -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-montserrat font-bold text-primary-900 mb-4">
            Pourquoi choisir ShareWuma ?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Une plateforme conçue pour vous offrir la meilleure expérience de covoiturage
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <!-- Avantage 1 -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-900 mb-3">Économique</h3>
            <p class="text-gray-600">Réduisez vos frais de transport jusqu'à 70% en partageant les coûts</p>
          </div>

          <!-- Avantage 2 -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary-accent-500 to-primary-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-900 mb-3">Sécurisé</h3>
            <p class="text-gray-600">Profils vérifiés, système de notation et assurance incluse</p>
          </div>

          <!-- Avantage 3 -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-900 mb-3">Écologique</h3>
            <p class="text-gray-600">Contribuez à la protection de l'environnement en réduisant les émissions</p>
          </div>

          <!-- Avantage 4 -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                <path d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-primary-900 mb-3">Convivial</h3>
            <p class="text-gray-600">Rencontrez de nouvelles personnes et créez des liens durables</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section CTA -->
    <section class="cta-section py-20 bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-32 h-32 bg-primary-accent/20 rounded-full blur-2xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl animate-bounce-light"></div>
        <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary-accent/20 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="cta-content max-w-4xl mx-auto">
          <h2 class="text-5xl font-montserrat font-bold text-white mb-6">
            {{ t('home.startTripToday') }}
          </h2>
          <p class="text-xl text-gray-200 mb-8 leading-relaxed">
            Rejoignez des milliers d'utilisateurs qui font confiance à ShareWuma pour leurs déplacements quotidiens.
            Commencez votre aventure dès maintenant !
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="bg-gradient-to-r from-primary-accent-500 to-primary-accent-600 text-primary-900 font-bold py-4 px-8 rounded-xl text-lg hover:from-primary-accent-600 hover:to-primary-accent-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {{ t('home.proposeTrip') }}
            </button>
            <button class="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-white hover:text-primary-900 transition-all duration-300 transform hover:scale-105">
              {{ t('home.search') }}
            </button>
          </div>

          <!-- App Download -->
          <div class="mt-12">
            <p class="text-gray-300 mb-6">Téléchargez notre application mobile</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#" class="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div class="text-left">
                  <div class="text-xs">Télécharger sur</div>
                  <div class="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" class="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div class="text-left">
                  <div class="text-xs">Disponible sur</div>
                  <div class="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth animations */
.service-card {
  will-change: transform;
}

.route-card {
  will-change: transform;
}

/* Custom scroll behavior */
.scroll-container {
  scroll-behavior: smooth;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #1d9b75, #ffed66);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

/* Parallax effect for background elements */
.parallax-element {
  will-change: transform;
}
</style>
