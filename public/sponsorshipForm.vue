<!-- SponsorshipForm.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
    <div class="container-custom">
      <div class="max-w-md mx-auto">
        <!-- Card principale -->
        <div ref="cardRef" class="card opacity-0">
          <div class="card-header text-center">
            <div class="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h1 class="heading-3 text-gradient-primary">Parrainer un ami</h1>
            <p class="body-small mt-2">Invitez vos proches à rejoindre notre communauté de covoiturage</p>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Numéro de téléphone -->
              <div ref="phoneFieldRef" class="opacity-0 transform translate-y-4">
                <label for="phoneNumber" class="form-label">
                  Numéro de téléphone à parrainer
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
                    placeholder="Ex: +237 6XX XXX XXX"
                    class="form-input pl-10"
                    :class="{ 'border-error': errors.phoneNumber }"
                    @input="clearError('phoneNumber')"
                  />
                </div>
                <p v-if="errors.phoneNumber" class="form-error">{{ errors.phoneNumber }}</p>
              </div>

              <!-- Message personnalisé (optionnel) -->
              <div ref="messageFieldRef" class="opacity-0 transform translate-y-4">
                <label for="message" class="form-label">
                  Message personnalisé (optionnel)
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="3"
                  placeholder="Ajoutez un message personnel à votre invitation..."
                  class="form-input resize-none"
                  maxlength="200"
                ></textarea>
                <p class="form-help">{{ form.message.length }}/200 caractères</p>
              </div>

              <!-- Bouton de soumission -->
              <div ref="submitBtnRef" class="opacity-0 transform translate-y-4">
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="btn btn-primary w-full"
                  :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                >
                  <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-accent" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoading ? 'Génération du lien...' : 'Générer le lien de parrainage' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Résultat du parrainage -->
        <div v-if="sponsorshipLink" ref="resultRef" class="card mt-6 opacity-0 transform translate-y-4">
          <div class="card-body text-center">
            <div class="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="heading-3 text-success mb-2">Lien généré avec succès !</h3>
            <p class="body-small mb-4">Partagez ce lien avec votre ami :</p>

            <!-- Lien généré -->
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <p class="text-sm font-mono text-gray-800 break-all">{{ sponsorshipLink }}</p>
            </div>

            <!-- Boutons d'action -->
            <div class="space-y-3">
              <button
                @click="copyLink"
                class="btn btn-primary-accent w-full"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {{ linkCopied ? 'Lien copié !' : 'Copier le lien' }}
              </button>

              <button
                @click="shareWhatsApp"
                class="btn btn-secondary w-full"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Partager via WhatsApp
              </button>
            </div>

            <button
              @click="resetForm"
              class="btn btn-outline-primary w-full mt-4"
            >
              Parrainer une autre personne
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
const cardRef = ref(null)
const phoneFieldRef = ref(null)
const messageFieldRef = ref(null)
const submitBtnRef = ref(null)
const resultRef = ref(null)

// État du formulaire
const form = reactive({
  phoneNumber: '',
  message: ''
})

const errors = reactive({})
const isLoading = ref(false)
const sponsorshipLink = ref('')
const linkCopied = ref(false)

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
    .to([phoneFieldRef.value, messageFieldRef.value, submitBtnRef.value], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3")
})

// Validation du formulaire
const validateForm = () => {
  const newErrors = {}

  if (!form.phoneNumber.trim()) {
    newErrors.phoneNumber = 'Le numéro de téléphone est requis'
  } else if (!/^\+?[1-9]\d{1,14}$/.test(form.phoneNumber.replace(/\s/g, ''))) {
    newErrors.phoneNumber = 'Veuillez entrer un numéro de téléphone valide'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

// Nettoyer les erreurs
const clearError = (field) => {
  if (errors[field]) {
    delete errors[field]
  }
}

// Soumission du formulaire
const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Ici, vous ferez l'appel à votre API Node.js
    const response = await fetch('/api/generate-sponsorship-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: form.phoneNumber,
        message: form.message
      })
    })

    const data = await response.json()
    sponsorshipLink.value = data.link || `https://votre-app.com/register?token=ABC123&phone=${encodeURIComponent(form.phoneNumber)}`

    // Animation d'affichage du résultat
    await nextTick()
    gsap.to(resultRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    })

  } catch (error) {
    console.error('Erreur lors de la génération du lien:', error)
    // Gérer l'erreur
  } finally {
    isLoading.value = false
  }
}

// Copier le lien
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(sponsorshipLink.value)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Erreur lors de la copie:', error)
  }
}

// Partager via WhatsApp
const shareWhatsApp = () => {
  const message = `Salut ! Je t'invite à rejoindre notre application de covoiturage. Clique sur ce lien pour t'inscrire : ${sponsorshipLink.value}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// Réinitialiser le formulaire
const resetForm = () => {
  form.phoneNumber = ''
  form.message = ''
  sponsorshipLink.value = ''
  Object.keys(errors).forEach(key => delete errors[key])

  // Animation de réinitialisation
  gsap.to(resultRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power2.in"
  })
}
</script>
