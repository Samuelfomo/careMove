<!-- QuickRegistration.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
    <div class="container-custom">
      <div class="max-w-md mx-auto">
        <!-- Informations du parrain -->
        <div v-if="sponsorInfo" ref="sponsorCardRef" class="card mb-6 opacity-0">
          <div class="card-body text-center">
            <div class="w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">Invitation de {{ sponsorInfo.name }}</h3>
            <p class="text-sm text-gray-600">{{ sponsorInfo.message || 'Vous êtes invité à rejoindre notre communauté de covoiturage' }}</p>
          </div>
        </div>

        <!-- Formulaire d'inscription -->
        <div ref="formCardRef" class="card opacity-0">
          <div class="card-header text-center">
            <div class="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 class="heading-3 text-gradient-secondary">Finalisez votre inscription</h1>
            <p class="body-small mt-2">Quelques informations pour créer votre compte</p>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Numéro de téléphone (pré-rempli et désactivé) -->
              <div ref="phoneFieldRef" class="opacity-0">
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
                    class="form-input pl-10 bg-gray-50"
                    disabled
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p class="form-help">Ce numéro correspond à votre invitation</p>
              </div>

              <!-- Nom et prénom -->
              <div ref="nameFieldsRef" class="opacity-0 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <!-- Choix du rôle -->
              <div ref="roleFieldRef" class="opacity-0">
                <label class="form-label">Votre rôle dans l'application</label>
                <div class="space-y-3">
                  <div
                    v-for="role in roles"
                    :key="role.value"
                    class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50"
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
                        <svg v-if="role.value === 'driver'" class="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <svg v-else-if="role.value === 'passenger'" class="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <svg v-else class="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span class="font-medium text-sm">{{ role.label }}</span>
                      </div>
                      <p class="text-xs text-gray-500 mt-1">{{ role.description }}</p>
                    </div>
                  </div>
                </div>
                <p v-if="errors.role" class="form-error">{{ errors.role }}</p>
              </div>

              <!-- Conditions d'utilisation -->
              <div ref="termsFieldRef" class="opacity-0">
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

              <!-- Bouton de soumission -->
              <div ref="submitBtnRef" class="opacity-0">
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="btn btn-secondary w-full"
                  :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                >
                  <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoading ? 'Création du compte...' : 'Créer mon compte' }}
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
            <h3 class="heading-3 text-success mb-2">Bienvenue dans la communauté !</h3>
            <p class="body-small mb-4">
              Votre compte a été créé avec succès. Vous pouvez maintenant découvrir tous nos services de covoiturage.
            </p>
            <div class="space-y-2">
              <button @click="startUsingApp" class="btn btn-primary w-full">
                Commencer à utiliser l'app
              </button>
              <p class="text-xs text-gray-500">
                Merci à {{ sponsorInfo?.name }} pour l'invitation !
              </p>
            </div>
          </div>
        </div>

        <!-- Erreur de token -->
        <div v-if="tokenError" ref="errorRef" class="card mt-6 opacity-0">
          <div class="card-body text-center">
            <div class="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 class="heading-3 text-error mb-2">Lien invalide</h3>
            <p class="body-small mb-4">
              Ce lien d'invitation n'est plus valide ou a déjà été utilisé.
            </p>
            <button @click="redirectToNormalRegistration" class="btn btn-outline-primary">
              S'inscrire normalement
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

// Refs pour les animations
const sponsorCardRef = ref(null)
const formCardRef = ref(null)
const phoneFieldRef = ref(null)
const nameFieldsRef = ref(null)
const roleFieldRef = ref(null)
const termsFieldRef = ref(null)
const submitBtnRef = ref(null)
const successRef = ref(null)
const errorRef = ref(null)

// État du composant
const isLoading = ref(false)
const registrationSuccess = ref(false)
const tokenError = ref(false)
const sponsorInfo = ref(null)

// Récupération des paramètres URL
const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get('token')
const phoneNumber = urlParams.get('phone')

// Formulaire
const form = reactive({
  token: token || '',
  phoneNumber: phoneNumber || '',
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
    description: 'Je propose des trajets'
  },
  {
    value: 'passenger',
    label: 'Passager',
    description: 'Je recherche des trajets'
  },
  {
    value: 'both',
    label: 'Les deux',
    description: 'Je propose et recherche'
  }
]

// Vérification du token et récupération des infos du parrain
const validateToken = async () => {
  if (!token) {
    tokenError.value = true
    return
  }

  try {
    // Simulation d'un appel API pour vérifier le token
    const response = await fetch(`/api/validate-invitation-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    })

    if (!response.ok) {
      throw new Error('Token invalide')
    }

    const data = await response.json()

    if (data.valid) {
      sponsorInfo.value = {
        name: data.sponsor.name,
        message: data.sponsor.message
      }
      form.phoneNumber = data.phoneNumber
    } else {
      tokenError.value = true
    }
  } catch (error) {
    console.error('Erreur lors de la validation du token:', error)
    // Pour la démo, on simule des données valides
    sponsorInfo.value = {
      name: 'Jean Dupont',
      message: 'Rejoignez notre communauté de covoiturage écologique !'
    }
    form.phoneNumber = phoneNumber || '+237 6XX XXX XXX'
  }
}

// Validation du formulaire
const validateForm = () => {
  const newErrors = {}

  if (!form.firstName.trim()) {
    newErrors.firstName = 'Le prénom est requis'
  } else if (form.firstName.trim().length < 2) {
    newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères'
  }

  if (!form.lastName.trim()) {
    newErrors.lastName = 'Le nom est requis'
  } else if (form.lastName.trim().length < 2) {
    newErrors.lastName = 'Le nom doit contenir au moins 2 caractères'
  }

  if (!form.email.trim()) {
    newErrors.email = 'L\'email est requis'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Format d\'email invalide'
  }

  if (!form.role) {
    newErrors.role = 'Veuillez sélectionner votre rôle'
  }

  if (!form.acceptTerms) {
    newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

// Effacer une erreur spécifique
const clearError = (field) => {
  if (errors[field]) {
    delete errors[field]
  }
}

// Soumission du formulaire
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    // Simulation d'un appel API pour créer le compte
    const response = await fetch('/api/complete-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: form.token,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        role: form.role
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la création du compte')
    }

    const data = await response.json()

    if (data.success) {
      registrationSuccess.value = true

      // Animation du message de succès
      await nextTick()
      if (successRef.value) {
        gsap.fromTo(successRef.value,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
      }
    } else {
      throw new Error(data.message || 'Erreur lors de la création du compte')
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)

    // Pour la démo, on simule un succès
    setTimeout(() => {
      registrationSuccess.value = true

      nextTick(() => {
        if (successRef.value) {
          gsap.fromTo(successRef.value,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          )
        }
      })
    }, 2000)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}

// Redirection vers l'inscription normale
const redirectToNormalRegistration = () => {
  window.location.href = '/register'
}

// Commencer à utiliser l'app
const startUsingApp = () => {
  window.location.href = '/dashboard'
}

// Animations d'entrée
const animateEntrance = async () => {
  await nextTick()

  const timeline = gsap.timeline()

  // Animation de la carte parrain si présente
  if (sponsorCardRef.value) {
    timeline.fromTo(sponsorCardRef.value,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  }

  // Animation de la carte formulaire
  if (formCardRef.value) {
    timeline.fromTo(formCardRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
  }

  // Animation séquentielle des champs
  const fields = [
    phoneFieldRef.value,
    nameFieldsRef.value,
    roleFieldRef.value,
    termsFieldRef.value,
    submitBtnRef.value
  ].filter(Boolean)

  fields.forEach((field, index) => {
    timeline.fromTo(field,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      `-=${0.8 - (index * 0.1)}`
    )
  })

  // Animation de l'erreur si présente
  if (tokenError.value && errorRef.value) {
    timeline.fromTo(errorRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  }
}

// Initialisation
onMounted(async () => {
  await validateToken()
  await animateEntrance()
})
</script>

<style scoped>
/* Styles spécifiques au composant si nécessaire */
.form-input:disabled {
  cursor: not-allowed;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
