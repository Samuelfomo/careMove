<!-- RegistrationForm.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
    <div class="container-custom">
      <div class="max-w-lg mx-auto">
        <!-- Card principale -->
        <div ref="cardRef" class="card opacity-0">
          <div class="card-header text-center">
            <div class="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 class="heading-3 text-gradient-secondary">Rejoignez-nous</h1>
            <p class="body-small mt-2">Créez votre compte et commencez à partager vos trajets</p>
          </div>

          <div class="card-body">
            <!-- Étapes de progression -->
            <div ref="progressRef" class="mb-8 opacity-0">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600">Étape {{ currentStep }} sur 3</span>
                <span class="text-sm text-gray-500">{{ Math.round((currentStep / 3) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-gradient-secondary h-2 rounded-full transition-all duration-500"
                  :style="{ width: `${(currentStep / 3) * 100}%` }"
                ></div>
              </div>
            </div>

            <form @submit.prevent="handleSubmit">
              <!-- Étape 1: Token et Téléphone -->
              <div v-if="currentStep === 1" ref="step1Ref" class="space-y-6 opacity-0">
                <!-- Token de parrainage -->
                <div v-if="!tokenFromUrl">
                  <label for="token" class="form-label">
                    Token de parrainage
                  </label>
                  <input
                    id="token"
                    v-model="form.token"
                    type="text"
                    placeholder="Entrez votre token de parrainage"
                    class="form-input"
                    :class="{ 'border-error': errors.token }"
                    @input="clearError('token')"
                  />
                  <p v-if="errors.token" class="form-error">{{ errors.token }}</p>
                  <p class="form-help">Ce token vous a été envoyé par votre parrain</p>
                </div>

                <!-- Numéro de téléphone -->
                <div>
                  <label for="phoneNumber" class="form-label">
                    Numéro de téléphone
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      id="phoneNumber"
                      v-model="form.phoneNumber"
                      type="tel"
                      placeholder="+237 6XX XXX XXX"
                      class="form-input pl-10"
                      :class="{ 'border-error': errors.phoneNumber }"
                      :disabled="phoneFromUrl"
                      @input="clearError('phoneNumber')"
                    />
                  </div>
                  <p v-if="errors.phoneNumber" class="form-error">{{ errors.phoneNumber }}</p>
                  <p v-if="phoneFromUrl" class="form-help">Ce numéro correspond au lien de parrainage</p>
                </div>
              </div>

              <!-- Étape 2: Informations personnelles -->
              <div v-if="currentStep === 2" ref="step2Ref" class="space-y-6 opacity-0">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Prénom -->
                  <div>
                    <label for="firstName" class="form-label">Prénom</label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      placeholder="Votre prénom"
                      class="form-input"
                      :class="{ 'border-error': errors.firstName }"
                      @input="clearError('firstName')"
                    />
                    <p v-if="errors.firstName" class="form-error">{{ errors.firstName }}</p>
                  </div>

                  <!-- Nom -->
                  <div>
                    <label for="lastName" class="form-label">Nom</label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      placeholder="Votre nom"
                      class="form-input"
                      :class="{ 'border-error': errors.lastName }"
                      @input="clearError('lastName')"
                    />
                    <p v-if="errors.lastName" class="form-error">{{ errors.lastName }}</p>
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="form-label">Adresse email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="votre@email.com"
                      class="form-input pl-10"
                      :class="{ 'border-error': errors.email }"
                      @input="clearError('email')"
                    />
                  </div>
                  <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
                </div>
              </div>

              <!-- Étape 3: Rôle et conditions -->
              <div v-if="currentStep === 3" ref="step3Ref" class="space-y-6 opacity-0">
                <!-- Choix du rôle -->
                <div>
                  <label class="form-label">Votre rôle dans l'application</label>
                  <div class="space-y-3">
                    <div
                      v-for="role in roles"
                      :key="role.value"
                      class="flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50"
                      :class="{ 'border-secondary bg-secondary-50': form.role === role.value }"
                      @click="form.role = role.value"
                    >
                      <input
                        :id="role.value"
                        v-model="form.role"
                        :value="role.value"
                        type="radio"
                        class="sr-only"
                      />
                      <div class="flex-shrink-0 mr-3">
                        <div
                          class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                          :class="form.role === role.value ? 'border-secondary bg-secondary' : 'border-gray-300'"
                        >
                          <div v-if="form.role === role.value" class="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div class="flex-grow">
                        <div class="flex items-center">
                          <CarIcon v-if="role.value === 'driver'" class="w-5 h-5 mr-2 text-gray-600" />
                          <UserIcon v-else-if="role.value === 'passenger'" class="w-5 h-5 mr-2 text-gray-600" />
                          <UsersIcon v-else class="w-5 h-5 mr-2 text-gray-600" />
                          <span class="font-medium">{{ role.label }}</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">{{ role.description }}</p>
                      </div>
                    </div>
                  </div>
                  <p v-if="errors.role" class="form-error">{{ errors.role }}</p>
                </div>

                <!-- Conditions d'utilisation -->
                <div>
                  <div class="flex items-start">
                    <input
                      id="acceptTerms"
                      v-model="form.acceptTerms"
                      type="checkbox"
                      class="mt-1 h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                    <label for="acceptTerms" class="ml-3 text-sm text-gray-700">
                      J'accepte les
                      <a href="#" class="text-secondary hover:text-secondary-700 font-medium">conditions d'utilisation</a>
                      et la
                      <a href="#" class="text-secondary hover:text-secondary-700 font-medium">politique de confidentialité</a>
                    </label>
                  </div>
                  <p v-if="errors.acceptTerms" class="form-error">{{ errors.acceptTerms }}</p>
                </div>
              </div>

              <!-- Boutons d'action -->
              <div ref="buttonsRef" class="flex justify-between mt-8 opacity-0">
                <button
                  v-if="currentStep > 1"
                  type="button"
                  @click="previousStep"
                  class="btn btn-outline-secondary"
                >
                  Précédent
                </button>
                <div v-else></div>

                <button
                  v-if="currentStep < 3"
                  type="button"
                  @click="nextStep"
                  class="btn btn-secondary"
                >
                  Suivant
                </button>
                <button
                  v-else
                  type="submit"
                  :disabled="isLoading"
                  class="btn btn-secondary"
                  :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                >
                  <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoading ? 'Inscription...' : 'Créer mon compte' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Message de succès -->
        <div v-if="registrationSuccess" ref="successRef" class="card mt-6 opacity-0">
          <div class="card-body text-center">
            <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="heading-3 text-success mb-2">Inscription réussie !</h3>
            <p class="body-small mb-4">
              Bienvenue dans notre communauté de covoiturage. Vous pouvez maintenant commencer à utiliser l'application.
            </p>
            <button class="btn btn-primary">
              Accéder à l'application
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { gsap } from 'gsap'

// Refs pour les animations
const cardRef = ref(null)
const progressRef = ref(null)
const step1Ref = ref(null)
const step2Ref = ref(null)
const step3Ref = ref(null)
const buttonsRef = ref(null)
const successRef = ref(null)

// État du formulaire
const currentStep = ref(1)
const isLoading = ref(false)
const registrationSuccess = ref(false)

// Récupération des paramètres URL
const urlParams = new URLSearchParams(window.location.search)
const tokenFromUrl = urlParams.get('token')
const phoneFromUrl = urlParams.get('phone')

const form = reactive({
  token: tokenFromUrl || '',
  phoneNumber: phoneFromUrl || '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  acceptTerms: false
})

const errors = reactive({})

// Options de rôles
const roles = [
  {
    value: 'driver',
    label: 'Conducteur',
    description: 'Je propose des trajets en voiture',
    icon: 'CarIcon'
  },
  {
    value: 'passenger',
    label: 'Passager',
    description: 'Je recherche des trajets à partager',
    icon: 'UserIcon'
  },
  {
    value: 'both',
    label: 'Les deux',
    description: 'Je propose et recherche des trajets',
    icon: 'UsersIcon'
  }
]

// Animation d'entrée
onMounted(() => {
  const timeline = gsap.timeline()

  timeline
    .to(cardRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(progressRef.value, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.3")

  animateStep()
})

// Animation des étapes
const animateStep = async () => {
  await nextTick()

  const currentStepRef = currentStep.value === 1 ? step1Ref.value :
    currentStep.value === 2 ? step2Ref.value : step3Ref.value

  if (currentStepRef) {
    gsap.set(currentStepRef, { opacity: 0, y: 20 })
    gsap.to(currentStepRef, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    })
  }

  if (buttonsRef.value) {
    gsap.to(buttonsRef.value, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.2
    })
  }
}

// Validation par étape
const validateStep = (step) => {
  const newErrors = {}

  if (step === 1) {
    if (!tokenFromUrl && !form.token.trim()) {
      newErrors.token = 'Le token de parrainage est requis'
    }
    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Le numéro de téléphone est requis'
    } else if (!/^\+?[1-9]\d{1,14}$/.test(form.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Veuillez entrer un numéro de téléphone valide'
    }
  }

  if (step === 2) {
    if (!form.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    }
    if (!form.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }
  }

  if (step === 3) {
    if (!form.role) {
      newErrors.role = 'Veuillez choisir votre rôle'
    }
    if (!form.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation'
    }
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

// Navigation entre les étapes
const nextStep = () => {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < 3) {
      currentStep.value++
      animateStep()
    }
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    animateStep()
  }
}

// Nettoyer les erreurs
const clearError = (field) => {
  if (errors[field]) {
    delete errors[field]
  }
}

// Soumission finale du formulaire
const handleSubmit = async () => {
  if (!validateStep(3)) return

  isLoading.value = true

  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Ici, vous ferez l'appel à votre API Node.js
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: form.token,
        phoneNumber: form.phoneNumber,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role
      })
    })

    if (response.ok) {
      registrationSuccess.value = true

      // Animation d'affichage du succès
      await nextTick()
      gsap.to(successRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })

      // Masquer le formulaire
      gsap.to(cardRef.value, {
        opacity: 0.3,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.out"
      })
    } else {
      throw new Error('Erreur lors de l\'inscription')
    }

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    // Gérer l'erreur
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
</style>
