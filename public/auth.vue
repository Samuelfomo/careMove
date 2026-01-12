<template>
  <div class="min-h-screen flex flex-col mx-auto">
<!--    <Header />-->
<!--    <header class="fixed w-full z-50 flex flex-col">-->
      <div class="bg-white p-5 lg:px-14 flex justify-between items-center w-full flex-row shadow-sm h-16">

      </div>
<!--    </header>-->

    <!-- Main Content -->
    <main class="flex-1 flex items-center min-h-full justify-center px-4 pb-10 bg-gradient-to-tr from-secondary-400 to-secondary-400 via-primary/90 overflow-hidden relative">

      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-primary-900/70"></div>
<!--        <img :src="Voyage" alt="voyage en voiture" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay">-->

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-32 right-16 w-32 h-32 bg-primary-accent/20 rounded-full blur-2xl animate-bounce-light"></div>
        <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary-accent/30 rounded-full blur-lg animate-pulse"></div>
      </div>
      <div class="w-full max-w-2xl lg:pt-0 pt-28">

        <!-- Interface 1 : Demande de token (maintenant première) -->
        <div v-if="currentView === 'request'" ref="requestForm" class="bg-transparent">
          <div  class="bg-white shadow-strong p-8">
            <div class="mb-8 flex items-center space-x-2 pb-8 relative">
              <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white via-secondary to-white"></div>

              <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>

              <h2 class="text-2xl font-normal text-gray-700">Demande de Token</h2>
            </div>

            <form @submit.prevent="requestToken" class="space-y-6">
              <!--            <div>-->
              <!--              <label class="block lg:text-base text-sm font-semibold text-black mb-2">-->
              <!--                Saisir votre e-mail pour une demande de jeton d'authentification <span class="text-error">*</span>-->
              <!--              </label>-->
              <!--              <input-->
              <!--                v-model="requestData.email"-->
              <!--                type="email"-->
              <!--                placeholder="votre@email.com"-->
              <!--                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"-->
              <!--                :class="{ 'border-error': requestError }"-->
              <!--              />-->
              <!--              <div v-if="requestError" class="text-error text-sm mt-1">{{ requestError }}</div>-->
              <!--            </div>-->
              <div>
                <label class="block lg:text-base text-sm font-semibold text-black mb-2">
                  Saisir votre e-mail pour une demande de jeton d'authentification <span class="text-error">*</span>
                </label>
                <input
                  v-model="requestData.email"
                  type="text"
                  placeholder="Entrer votre email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1
                 focus:ring-secondary focus:border-transparent transition-all duration-200 placeholder:text-primary text-secondary font-medium"
                  :class="{ 'border-secondary-accent-600 bg-secondary-accent-100': requestError }"
                />
                <div v-if="requestError" class="text-error text-sm mt-1">{{ requestError }}</div>
              </div>

              <div class="text-right">
                <button
                  type="button"
                  @click="switchView('token')"
                  class="text-secondary hover:text-secondary-600 text-sm font-medium transition-colors"
                >
                  J'ai un token valide
                </button>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-800 transition-all duration-200 disabled:opacity-50"
              >
                <span v-if="!isLoading">Envoyer</span>
                <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
              </button>
            </form>

          </div>
          <div class="p-8 text-center bg-primary-accent-50 flex flex-col space-y-2 border-t border-primary-accent-30">
            <button
              class="text-gray-700 hover:text-primary-800 text-base font-normal transition-colors"
            >
              Vous n'avez pas de compte ?
            </button>
            <button
              @click="switchView('email')"
              class="text-secondary-accent hover:text-secondary-accent-600 text-base font-medium transition-colors"
            >
              Demande d'ouverture de compte ici
            </button>
          </div>

          <!-- App Download Section -->
          <div class="mt-8 grid grid-cols-3 gap-4">
            <div class="flex flex-col items-center text-center p-4 bg-secondary transition-colors cursor-pointer text-white">
              <svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              <span class="text-xs">Version iPhone</span>
            </div>
            <div class="flex flex-col items-center text-center p-4 bg-secondary-accent transition-colors cursor-pointer text-white">
              <svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs">Version Android</span>
            </div>
            <div class="flex flex-col items-center text-center p-4 bg-primary transition-colors cursor-pointer text-white">
              <svg class="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3 3 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.98 5.98 0 01-2.516-.552l1.562-1.562a3 3 0 001.789.027zm-4.677-2.796a3 3 0 01-.041-2.08L6.754 7.674a5.98 5.98 0 00-.552 2.326 5.98 5.98 0 00.956 3.117zm-.787-3.21l1.525-1.525a3 3 0 012.183-.078l1.562-1.562A5.98 5.98 0 0010 4a5.98 5.98 0 00-3.117.956 5.98 5.98 0 00-.532 2.961z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs">Support</span>
            </div>
          </div>
        </div>


        <!-- Interface 2 : Connexion par token (maintenant deuxième) -->
        <div v-if="currentView === 'token'" ref="tokenForm" class="bg-black">
          <div class="bg-white shadow-strong p-10">
            <div class="mb-8 flex items-center space-x-2 pb-8 relative">
              <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white via-secondary to-white"></div>

              <div class="w-12 h-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="1"
                     stroke-linecap="round" stroke-linejoin="round"
                     class="h-12 w-12">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" class="text-secondary" />
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" class="text-secondary" />
                </svg>
              </div>

              <h2 class="text-2xl font-normal text-gray-700">Authentification par Token</h2>
            </div>

            <form @submit.prevent="loginWithToken" class="space-y-6">

              <div>
                <label class="block lg:text-base text-sm font-semibold text-black mb-2">
                  Entrer votre token d'authentification <span class="text-error">*</span>
                </label>
                <input
                  v-model="tokenData.token"
                  type="text"
                  placeholder="Entrer votre token"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1
                 focus:ring-secondary focus:border-transparent transition-all duration-200 placeholder:text-primary text-secondary font-medium"
                  :class="{ 'border-secondary-accent-600 bg-secondary-accent-100': tokenError }"
                />
                <div v-if="tokenError" class="text-error text-sm mt-1">{{ tokenError }}</div>
              </div>

              <div class="text-right">
                <button
                  type="button"
                  @click="switchView('request')"
                  class="text-secondary hover:text-secondary-600 text-sm font-medium transition-colors"
                >
                  Demander un nouveau token
                </button>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-800 transition-all duration-200 disabled:opacity-50"
              >
                <span v-if="!isLoading">Se connecter</span>
                <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </span>
              </button>
            </form>
          </div>

          <div class="p-8 text-center bg-secondary-50 flex flex-col space-y-2 border-t border-secondary-100/60">
            <button
              class="text-gray-700 hover:text-primary-800 text-base font-normal transition-colors"
            >
              Vous n'avez pas de compte ?
            </button>
            <button
              @click="switchView('email')"
              class="text-primary text-base font-medium transition-colors"
            >
              Demande d'ouverture de compte ici
            </button>
          </div>
        </div>

        <!-- Interface 3 : Connexion email/password (reste troisième) -->
        <div v-if="currentView === 'email'" ref="emailForm" class="bg-white shadow-strong p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-primary mb-2">Basic Connexion</h2>
<!--            <p class="text-gray-600">Connectez-vous avec vos identifiants</p>-->
          </div>

          <form @submit.prevent="loginWithEmail" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Adresse email <span class="text-error">*</span>
              </label>
              <input
                v-model="emailData.email"
                type="email"
                placeholder="votre@email.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"
                :class="{ 'border-error': emailError }"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe <span class="text-error">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="emailData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Votre mot de passe"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 pr-12"
                  :class="{ 'border-error': emailError }"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
              <div v-if="emailError" class="text-error text-sm mt-1">{{ emailError }}</div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input v-model="emailData.remember" type="checkbox" class="rounded border-gray-300 text-secondary focus:ring-secondary">
                <span class="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <button type="button" class="text-secondary hover:text-secondary-600 text-sm font-medium transition-colors">
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-secondary text-white py-3 rounded-xl font-medium hover:bg-secondary-600 transition-all duration-200 disabled:opacity-50"
            >
              <span v-if="!isLoading">Se connecter</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </span>
            </button>
          </form>

          <div class="mt-8 flex justify-center space-x-6 text-center">
            <button
              @click="switchView('request')"
              class="text-primary hover:text-primary-600 text-sm font-medium transition-colors"
            >
              Demander un token
            </button>
            <button
              @click="switchView('token')"
              class="text-primary hover:text-primary-600 text-sm font-medium transition-colors"
            >
              Connexion par token
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer adapté pour ShareWuma -->
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import Header from "@public/components/header.vue";
// import Voyage from "@/assets/images/logo.svg";

// État réactif - Vue par défaut changée de 'token' à 'request'
const currentView = ref('request') // 'request', 'token', 'email'
const isLoading = ref(false)
const showPassword = ref(false)

// Données des formulaires
const tokenData = ref({
  token: ''
})

const requestData = ref({
  email: ''
})

const emailData = ref({
  email: '',
  password: '',
  remember: false
})

// Erreurs
const tokenError = ref('')
const requestError = ref('')
const emailError = ref('')

// Références pour les animations
const tokenForm = ref(null | '')
const requestForm = ref(null | '')
const emailForm = ref(null | '')

// Méthodes
const switchView = async (view) => {
  // Animation de sortie
  const currentForm = getCurrentFormRef()
  if (currentForm) {
    await gsap.to(currentForm, {
      x: -50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })
  }

  currentView.value = view
  clearErrors()

  // Animation d'entrée
  await nextTick()
  const newForm = getCurrentFormRef()
  if (newForm) {
    gsap.fromTo(newForm, {
      x: 50,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    })
  }
}

const getCurrentFormRef = () => {
  switch (currentView.value) {
    case 'request': return requestForm.value
    case 'token': return tokenForm.value
    case 'email': return emailForm.value
    default: return null
  }
}

const clearErrors = () => {
  tokenError.value = ''
  requestError.value = ''
  emailError.value = ''
}

const requestToken = async () => {
  requestError.value = ''

  if (!requestData.value.email.toString().trim()) {
    requestError.value = 'L\'email est requis'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(requestData.value.email)) {
    // setTimeout(() => requestError.value = 'Format d\'email invalide', 100)
    requestError.value = 'Format d\'email invalide'
    return
  }

  isLoading.value = true

  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Logique de demande de token
    console.log('Demande de token pour:', requestData.value.email)

    // Afficher message de succès et rediriger vers la page de connexion par token
    // alert('Token envoyé par email !')
    await switchView('token')
  } catch (error) {
    requestError.value = 'Erreur lors de l\'envoi du token'
  } finally {
    isLoading.value = false
  }
}

const loginWithToken = async () => {
  tokenError.value = ''

  if (!tokenData.value.token.toString().trim()) {
    tokenError.value = 'Le token est requis'
    return
  }

  isLoading.value = true

  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Logique de connexion avec token
    console.log('Connexion avec token:', tokenData.value.token)

    // Redirection ou action après connexion réussie
  } catch (error) {
    tokenError.value = 'Token invalide ou expiré'
  } finally {
    isLoading.value = false
  }
}

const loginWithEmail = async () => {
  emailError.value = ''

  if (!emailData.value.email.toString().trim() || !emailData.value.password.toString().trim()) {
    emailError.value = 'Email et mot de passe requis'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailData.value.email)) {
    emailError.value = 'Format d\'email invalide'
    return
  }

  isLoading.value = true

  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Logique de connexion avec email/password
    console.log('Connexion avec email:', emailData.value)

    // Redirection ou action après connexion réussie
  } catch (error) {
    emailError.value = 'Identifiants incorrects'
  } finally {
    isLoading.value = false
  }
}

// Animation d'entrée au montage
onMounted(() => {
  const currentForm = getCurrentFormRef()
  if (currentForm) {
    gsap.fromTo(currentForm, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    })
  }
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>


<!--<template>-->
<!--  <div class="min-h-screen flex flex-col">-->
<!--    &lt;!&ndash; Header &ndash;&gt;-->
<!--&lt;!&ndash;    <header class="p-6">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="flex items-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="text-3xl font-bold text-primary">&ndash;&gt;-->
<!--&lt;!&ndash;          Share<span class="text-secondary">Wuma</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </header>&ndash;&gt;-->

<!--    &lt;!&ndash; Main Content &ndash;&gt;-->
<!--    <main class="flex-1 flex items-center justify-center px-4 pb-10 bg-[url(@/assets/images/bg4.jpg)]">-->
<!--      <div class="w-full max-w-2xl">-->

<!--        &lt;!&ndash; Interface de connexion par token &ndash;&gt;-->
<!--        <div v-if="currentView === 'token'" ref="tokenForm" class="bg-black">-->
<!--          <div  class="bg-white shadow-strong p-10">-->
<!--            &lt;!&ndash;            <div class="mb-8 flex items-center space-x-2 border-b pb-8 ">&ndash;&gt;-->
<!--            &lt;!&ndash;              <div class="w-12 h-12 flex items-center justify-center">&ndash;&gt;-->
<!--            &lt;!&ndash;                <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"&ndash;&gt;-->
<!--            &lt;!&ndash;                      stroke-linecap="round"  stroke-linejoin="round"  class="h-12 w-12">&ndash;&gt;-->
<!--            &lt;!&ndash;                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />&ndash;&gt;-->
<!--            &lt;!&ndash;                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" class="text-secondary" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" class="text-secondary" />&ndash;&gt;-->
<!--            &lt;!&ndash;                </svg>&ndash;&gt;-->
<!--            &lt;!&ndash;              </div>&ndash;&gt;-->
<!--            &lt;!&ndash;               <h2 class="text-2xl font-normal text-gray-700">Authentification</h2>&ndash;&gt;-->

<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--            <div class="mb-8 flex items-center space-x-2 pb-8 relative">-->
<!--              <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white via-secondary to-white"></div>-->

<!--              <div class="w-12 h-12 flex items-center justify-center">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"-->
<!--                     fill="none" stroke="currentColor" stroke-width="1"-->
<!--                     stroke-linecap="round" stroke-linejoin="round"-->
<!--                     class="h-12 w-12">-->
<!--                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>-->
<!--                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />-->
<!--                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" class="text-secondary" />-->
<!--                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" class="text-secondary" />-->
<!--                </svg>-->
<!--              </div>-->

<!--              <h2 class="text-2xl font-normal text-gray-700">Authentification</h2>-->
<!--            </div>-->

<!--            <form @submit.prevent="loginWithToken" class="space-y-6">-->
<!--              <div>-->
<!--                <label class="block lg:text-base text-sm font-semibold text-black mb-2">-->
<!--                  Saisir votre e-mail pour une demande de jeton d'authentification <span class="text-error">*</span>-->
<!--                </label>-->
<!--                <input-->
<!--                  v-model="tokenData.token"-->
<!--                  type="text"-->
<!--                  placeholder="Entrer votre email"-->
<!--                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1-->
<!--                 focus:ring-secondary focus:border-transparent transition-all duration-200 placeholder:text-primary text-secondary font-medium"-->
<!--                  :class="{ 'border-secondary-accent-600 bg-secondary-accent-100': tokenError }"-->
<!--                />-->
<!--                &lt;!&ndash;              <div v-if="tokenError" class="text-secondary-accent-600 text-sm mt-1">{{ tokenError }}</div>&ndash;&gt;-->
<!--              </div>-->

<!--              <div class="text-right">-->
<!--                <button-->
<!--                  type="button"-->
<!--                  @click="switchView('request')"-->
<!--                  class="text-secondary hover:text-secondary-600 text-sm font-medium transition-colors"-->
<!--                >-->
<!--                  J'ai un token valide-->
<!--                </button>-->
<!--              </div>-->

<!--              <button-->
<!--                type="submit"-->
<!--                :disabled="isLoading"-->
<!--                class="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-800 transition-all duration-200 disabled:opacity-50"-->
<!--              >-->
<!--                <span v-if="!isLoading">Envoyer</span>-->
<!--                <span v-else class="flex items-center justify-center">-->
<!--                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">-->
<!--                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>-->
<!--                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>-->
<!--                </svg>-->
<!--                Connexion...-->
<!--              </span>-->
<!--              </button>-->
<!--            </form>-->

<!--            &lt;!&ndash;          <div class="mt-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">&ndash;&gt;-->
<!--            &lt;!&ndash;            <p class="text-gray-700 text-sm">&ndash;&gt;-->
<!--            &lt;!&ndash;              Vous n'avez pas de compte ?&ndash;&gt;-->
<!--            &lt;!&ndash;              <button @click="switchView('request')" class="text-secondary hover:text-secondary-600 font-medium ml-1">&ndash;&gt;-->
<!--            &lt;!&ndash;                Demande d'ouverture de compte ici&ndash;&gt;-->
<!--            &lt;!&ndash;              </button>&ndash;&gt;-->
<!--            &lt;!&ndash;            </p>&ndash;&gt;-->
<!--            &lt;!&ndash;          </div>&ndash;&gt;-->

<!--          </div>-->
<!--          <div class="p-8 text-center bg-secondary-50 flex flex-col space-y-2 border-t border-secondary-100/60">-->
<!--            <button-->
<!--              class="text-gray-700 hover:text-primary-800 text-base font-normal transition-colors"-->
<!--            >-->
<!--              Vous n'avez pas de compte ?-->
<!--            </button>-->
<!--            <button-->
<!--              @click="switchView('email')"-->
<!--              class="text-primary text-base font-medium transition-colors"-->
<!--            >-->
<!--              Demande d'ouverture de compte ici-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->


<!--        &lt;!&ndash; Interface de demande de token &ndash;&gt;-->
<!--        <div v-if="currentView === 'request'" ref="requestForm" class="bg-white shadow-strong p-8">-->
<!--          <div class="text-center mb-8">-->
<!--            <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">-->
<!--              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>-->
<!--                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <h2 class="text-2xl font-bold text-primary mb-2">Demande de Token</h2>-->
<!--            <p class="text-gray-600">Saisir votre e-mail pour une demande de jeton d'authentification</p>-->
<!--          </div>-->

<!--          <form @submit.prevent="requestToken" class="space-y-6">-->
<!--            <div>-->
<!--              <label class="block text-sm font-medium text-gray-700 mb-2">-->
<!--                Entrer votre email <span class="text-error">*</span>-->
<!--              </label>-->
<!--              <input-->
<!--                v-model="requestData.email"-->
<!--                type="email"-->
<!--                placeholder="votre@email.com"-->
<!--                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"-->
<!--                :class="{ 'border-error': requestError }"-->
<!--              />-->
<!--              <div v-if="requestError" class="text-error text-sm mt-1">{{ requestError }}</div>-->
<!--            </div>-->

<!--            <button-->
<!--              type="submit"-->
<!--              :disabled="isLoading"-->
<!--              class="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-800 transition-all duration-200 disabled:opacity-50"-->
<!--            >-->
<!--              <span v-if="!isLoading">Envoyer</span>-->
<!--              <span v-else class="flex items-center justify-center">-->
<!--                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">-->
<!--                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>-->
<!--                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>-->
<!--                </svg>-->
<!--                Envoi en cours...-->
<!--              </span>-->
<!--            </button>-->
<!--          </form>-->

<!--          <div class="mt-6 p-4 bg-primary-accent-50 rounded-xl border border-primary-accent-200">-->
<!--            <p class="text-gray-700 text-sm">-->
<!--              Vous n'avez pas de compte ?-->
<!--              <span class="text-secondary-accent hover:text-secondary-accent-600 font-medium cursor-pointer">-->
<!--                Demande d'ouverture de compte ici-->
<!--              </span>-->
<!--            </p>-->
<!--          </div>-->

<!--          <div class="mt-8 flex justify-center space-x-6 text-center">-->
<!--            <button-->
<!--              @click="switchView('token')"-->
<!--              class="text-primary hover:text-primary-600 text-sm font-medium transition-colors"-->
<!--            >-->
<!--              ← Retour à la connexion-->
<!--            </button>-->
<!--            <button-->
<!--              @click="switchView('email')"-->
<!--              class="text-primary hover:text-primary-600 text-sm font-medium transition-colors"-->
<!--            >-->
<!--              Connexion email/password-->
<!--            </button>-->
<!--          </div>-->

<!--          &lt;!&ndash; App Download Section &ndash;&gt;-->
<!--          <div class="mt-8 grid grid-cols-3 gap-4">-->
<!--            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-primary-accent transition-colors cursor-pointer">-->
<!--              <svg class="w-8 h-8 text-gray-600 mb-2" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>-->
<!--              </svg>-->
<!--              <span class="text-xs text-gray-600">Version iPhone</span>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-primary-accent transition-colors cursor-pointer">-->
<!--              <svg class="w-8 h-8 text-gray-600 mb-2" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>-->
<!--              </svg>-->
<!--              <span class="text-xs text-gray-600">Version Android</span>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-primary-accent transition-colors cursor-pointer">-->
<!--              <svg class="w-8 h-8 text-gray-600 mb-2" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3 3 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.98 5.98 0 01-2.516-.552l1.562-1.562a3 3 0 001.789.027zm-4.677-2.796a3 3 0 01-.041-2.08L6.754 7.674a5.98 5.98 0 00-.552 2.326 5.98 5.98 0 00.956 3.117zm-.787-3.21l1.525-1.525a3 3 0 012.183-.078l1.562-1.562A5.98 5.98 0 0010 4a5.98 5.98 0 00-3.117.956 5.98 5.98 0 00-.532 2.961z" clip-rule="evenodd"/>-->
<!--              </svg>-->
<!--              <span class="text-xs text-gray-600">Support</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Interface de connexion email/password &ndash;&gt;-->
<!--        <div v-if="currentView === 'email'" ref="emailForm" class="bg-white shadow-strong p-8">-->
<!--          <div class="text-center mb-8">-->
<!--            <div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">-->
<!--              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">-->
<!--                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <h2 class="text-2xl font-bold text-primary mb-2">Connexion Conducteur</h2>-->
<!--            <p class="text-gray-600">Connectez-vous avec vos identifiants</p>-->
<!--          </div>-->

<!--          <form @submit.prevent="loginWithEmail" class="space-y-6">-->
<!--            <div>-->
<!--              <label class="block text-sm font-medium text-gray-700 mb-2">-->
<!--                Adresse email <span class="text-error">*</span>-->
<!--              </label>-->
<!--              <input-->
<!--                v-model="emailData.email"-->
<!--                type="email"-->
<!--                placeholder="votre@email.com"-->
<!--                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200"-->
<!--                :class="{ 'border-error': emailError }"-->
<!--              />-->
<!--            </div>-->

<!--            <div>-->
<!--              <label class="block text-sm font-medium text-gray-700 mb-2">-->
<!--                Mot de passe <span class="text-error">*</span>-->
<!--              </label>-->
<!--              <div class="relative">-->
<!--                <input-->
<!--                  v-model="emailData.password"-->
<!--                  :type="showPassword ? 'text' : 'password'"-->
<!--                  placeholder="Votre mot de passe"-->
<!--                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 pr-12"-->
<!--                  :class="{ 'border-error': emailError }"-->
<!--                />-->
<!--                <button-->
<!--                  type="button"-->
<!--                  @click="showPassword = !showPassword"-->
<!--                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"-->
<!--                >-->
<!--                  <svg v-if="showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">-->
<!--                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>-->
<!--                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>-->
<!--                  </svg>-->
<!--                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">-->
<!--                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>-->
<!--                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>-->
<!--                  </svg>-->
<!--                </button>-->
<!--              </div>-->
<!--              <div v-if="emailError" class="text-error text-sm mt-1">{{ emailError }}</div>-->
<!--            </div>-->

<!--            <div class="flex items-center justify-between">-->
<!--              <label class="flex items-center">-->
<!--                <input v-model="emailData.remember" type="checkbox" class="rounded border-gray-300 text-secondary focus:ring-secondary">-->
<!--                <span class="ml-2 text-sm text-gray-600">Se souvenir de moi</span>-->
<!--              </label>-->
<!--              <button type="button" class="text-secondary hover:text-secondary-600 text-sm font-medium transition-colors">-->
<!--                Mot de passe oublié ?-->
<!--              </button>-->
<!--            </div>-->

<!--            <button-->
<!--              type="submit"-->
<!--              :disabled="isLoading"-->
<!--              class="w-full bg-secondary text-white py-3 rounded-xl font-medium hover:bg-secondary-600 transition-all duration-200 disabled:opacity-50"-->
<!--            >-->
<!--              <span v-if="!isLoading">Se connecter</span>-->
<!--              <span v-else class="flex items-center justify-center">-->
<!--                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">-->
<!--                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>-->
<!--                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>-->
<!--                </svg>-->
<!--                Connexion...-->
<!--              </span>-->
<!--            </button>-->
<!--          </form>-->

<!--          <div class="mt-8 flex justify-center space-x-6 text-center">-->
<!--            <button-->
<!--              @click="switchView('token')"-->
<!--              class="text-primary hover:text-primary-600 text-sm font-medium transition-colors"-->
<!--            >-->
<!--              Connexion par token-->
<!--            </button>-->
<!--            <button-->
<!--              @click="switchView('request')"-->
<!--              class="text-primary hover:text-primary-600 text-sm font-medium transition-colors"-->
<!--            >-->
<!--              Demander un token-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </main>-->

<!--    &lt;!&ndash; Footer adapté pour ShareWuma &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, nextTick } from 'vue'-->
<!--import { gsap } from 'gsap'-->

<!--// État réactif-->
<!--const currentView = ref('token') // 'token', 'request', 'email'-->
<!--const isLoading = ref(false)-->
<!--const showPassword = ref(false)-->

<!--// Données des formulaires-->
<!--const tokenData = ref({-->
<!--  token: ''-->
<!--})-->

<!--const requestData = ref({-->
<!--  email: ''-->
<!--})-->

<!--const emailData = ref({-->
<!--  email: '',-->
<!--  password: '',-->
<!--  remember: false-->
<!--})-->

<!--// Erreurs-->
<!--const tokenError = ref('')-->
<!--const requestError = ref('')-->
<!--const emailError = ref('')-->

<!--// Références pour les animations-->
<!--const tokenForm = ref(null)-->
<!--const requestForm = ref(null)-->
<!--const emailForm = ref(null)-->

<!--// Méthodes-->
<!--const switchView = async (view) => {-->
<!--  // Animation de sortie-->
<!--  const currentForm = getCurrentFormRef()-->
<!--  if (currentForm) {-->
<!--    await gsap.to(currentForm, {-->
<!--      x: -50,-->
<!--      opacity: 0,-->
<!--      duration: 0.3,-->
<!--      ease: "power2.in"-->
<!--    })-->
<!--  }-->

<!--  currentView.value = view-->
<!--  clearErrors()-->

<!--  // Animation d'entrée-->
<!--  await nextTick()-->
<!--  const newForm = getCurrentFormRef()-->
<!--  if (newForm) {-->
<!--    gsap.fromTo(newForm, {-->
<!--      x: 50,-->
<!--      opacity: 0-->
<!--    }, {-->
<!--      x: 0,-->
<!--      opacity: 1,-->
<!--      duration: 0.4,-->
<!--      ease: "power2.out"-->
<!--    })-->
<!--  }-->
<!--}-->

<!--const getCurrentFormRef = () => {-->
<!--  switch (currentView.value) {-->
<!--    case 'token': return tokenForm.value-->
<!--    case 'request': return requestForm.value-->
<!--    case 'email': return emailForm.value-->
<!--    default: return null-->
<!--  }-->
<!--}-->

<!--const clearErrors = () => {-->
<!--  tokenError.value = ''-->
<!--  requestError.value = ''-->
<!--  emailError.value = ''-->
<!--}-->

<!--const loginWithToken = async () => {-->
<!--  tokenError.value = ''-->

<!--  if (!tokenData.value.token.trim()) {-->
<!--    tokenError.value = 'Le token est requis'-->
<!--    return-->
<!--  }-->

<!--  isLoading.value = true-->

<!--  try {-->
<!--    // Simulation d'appel API-->
<!--    await new Promise(resolve => setTimeout(resolve, 2000))-->

<!--    // Logique de connexion avec token-->
<!--    console.log('Connexion avec token:', tokenData.value.token)-->

<!--    // Redirection ou action après connexion réussie-->
<!--  } catch (error) {-->
<!--    tokenError.value = 'Token invalide ou expiré'-->
<!--  } finally {-->
<!--    isLoading.value = false-->
<!--  }-->
<!--}-->

<!--const requestToken = async () => {-->
<!--  requestError.value = ''-->

<!--  if (!requestData.value.email.trim()) {-->
<!--    requestError.value = 'L\'email est requis'-->
<!--    return-->
<!--  }-->

<!--  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/-->
<!--  if (!emailRegex.test(requestData.value.email)) {-->
<!--    requestError.value = 'Format d\'email invalide'-->
<!--    return-->
<!--  }-->

<!--  isLoading.value = true-->

<!--  try {-->
<!--    // Simulation d'appel API-->
<!--    await new Promise(resolve => setTimeout(resolve, 2000))-->

<!--    // Logique de demande de token-->
<!--    console.log('Demande de token pour:', requestData.value.email)-->

<!--    // Afficher message de succès-->
<!--    alert('Token envoyé par email !')-->
<!--  } catch (error) {-->
<!--    requestError.value = 'Erreur lors de l\'envoi du token'-->
<!--  } finally {-->
<!--    isLoading.value = false-->
<!--  }-->
<!--}-->

<!--const loginWithEmail = async () => {-->
<!--  emailError.value = ''-->

<!--  if (!emailData.value.email.trim() || !emailData.value.password.trim()) {-->
<!--    emailError.value = 'Email et mot de passe requis'-->
<!--    return-->
<!--  }-->

<!--  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/-->
<!--  if (!emailRegex.test(emailData.value.email)) {-->
<!--    emailError.value = 'Format d\'email invalide'-->
<!--    return-->
<!--  }-->

<!--  isLoading.value = true-->

<!--  try {-->
<!--    // Simulation d'appel API-->
<!--    await new Promise(resolve => setTimeout(resolve, 2000))-->

<!--    // Logique de connexion avec email/password-->
<!--    console.log('Connexion avec email:', emailData.value)-->

<!--    // Redirection ou action après connexion réussie-->
<!--  } catch (error) {-->
<!--    emailError.value = 'Identifiants incorrects'-->
<!--  } finally {-->
<!--    isLoading.value = false-->
<!--  }-->
<!--}-->

<!--// Animation d'entrée au montage-->
<!--onMounted(() => {-->
<!--  const currentForm = getCurrentFormRef()-->
<!--  if (currentForm) {-->
<!--    gsap.fromTo(currentForm, {-->
<!--      y: 30,-->
<!--      opacity: 0-->
<!--    }, {-->
<!--      y: 0,-->
<!--      opacity: 1,-->
<!--      duration: 0.6,-->
<!--      ease: "power2.out"-->
<!--    })-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Styles personnalisés si nécessaire */-->
<!--</style>-->
