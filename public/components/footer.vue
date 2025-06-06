<!-- Footer.vue -->
<template>
  <footer class="bg-primary pt-10 lg:pt-12">
    <div class="container mx-auto px-4 w-full">
      <!-- Call to Action Section -->
      <div class="flex flex-col items-center text-center lg:mb-32 mb-10">
        <h2 class="text-white font-bold text-2xl lg::text-3xl mb-4">
          Construisons ensemble votre avenir financier
        </h2>
        <p class="text-gray-200 font-roboto text-base lg:text-lg mb-6">
          Cresaf s'engage à vos côtés pour concrétiser vos projets grâce à des solutions de financement adaptées
          et un accompagnement personnalisé. Que vous soyez commerçant, entrepreneur ou agriculteur, nous sommes
          là pour soutenir votre réussite.
        </p>
        <button type="button"
                class="btn btn-primary-accent mt-0 mb-0"
                @click="contact"
        >
          Demarrer un trajet aujourd'hui
        </button>
      </div>

      <!-- Locations Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-5" ref="featuresSection">
        <div v-for="(location, index) in locations" :key="index" class="text-white md:text-start text-center"
             ref="featureCards"
        >
          <div>
            <!-- Carte Google Maps intégrée -->
            <div v-if="location.mapEmbedUrl" class="map-container rounded-lg overflow-hidden shadow-md cursor-pointer h-32 hover:opacity-80 transition-opacity duration-200"
                 @click="openGoogleMapsDirections(location)">
              <iframe
                :src="location.mapEmbedUrl"
                width="100%"
                height="180"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Google Maps"
                class="w-full"
              ></iframe>
            </div>

            <!-- Sinon, image seule non cliquable -->
            <div v-else>
              <img :src="none" alt="Carte" class="w-full h-32 object-cover cursor-wait rounded-md hover:opacity-80 transition-opacity duration-200"/>
            </div>
          </div>
          <h3 class="montserrat montserrat-700 text-base my-2">{{ location.title }}</h3>
          <p class="text-gray-200 italic montserrat text-xs">
            {{ location.address }}
          </p>
          <div class="flex md:justify-normal justify-center items-center space-x-2 italic font-bold">
            <img :src="phone" alt="phone icon" class="w-4 h-4" />
            <span class="cursor-pointer text-sm montserrat montserrat-600 text-white" @click="openWhatsApp(location.phone) ">{{ location.textPhone }}</span>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-white pt-6 pb-2">
        <div class="lg:flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="w-full lg:flex flex-wrap lg:justify-start justify-start gap-x-4 text-sm text-gray-300 lg:space-x-0 space-x-4 leading-8">
            <span>Copyright © 2023 - 2025</span>
            <span class="hover:text-secondary transition-colors cursor-pointer font-bold" @click="router.push('/')">
              Crédit Solidaire D'Afrique S.A
            </span>
            <span class="hidden md:inline">|</span>
            <span>Designed by</span>
            <span class="hover:text-secondary transition-colors cursor-pointer font-bold" @click="openImediatis">
              TEAM NF
            </span>
          </div>

          <!--          <div class="flex w-full lg:justify-center justify-around">-->
          <!--            <a href="#" class="rounded-full h-10 w-10 flex items-center justify-center-->
          <!--              border border-white bg-yellow-500"-->
          <!--               @click="openCresafFaceBook"-->
          <!--            >-->
          <!--              <img :src="facebookIcon" alt="Facebook" class="w-6 h-6" />-->
          <!--            </a>-->
          <!--          </div>-->
        </div>
      </div>
    </div>

    <div class="fixed right-2 top-[95%]  transform -translate-y-1/2 space-y-4 z-50">
      <div class="top-full right-0 mt-auto h-full flex justify-center md:justify-end z-50 pointer-events-none lg:pb-5 lg:pr-0 pr-2">
        <a href="#" class="rounded-xl h-12 w-12 flex items-center justify-center border-2 border-purple-600 bg-white
              transition-transform hover:scale-110 pointer-events-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14f05d"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 3l0 16" />
            <path d="M16 7l-4 -4" />
            <path d="M8 7l4 -4" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {useRouter} from "vue-router";
// import FaceBook from "@/assets/images/svg/facebook.svg"
import Phone from "@/assets/images/svg/phone.svg"
import none from "@/assets/images/map_none.jpg"
import {ref, onMounted} from "vue";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const router = useRouter()

// const facebookIcon = FaceBook
const phone = Phone;
const featuresSection = ref(null);
const featureCards = ref([]);

const locations = [
  {
    title: 'Siège social (Douala)',
    address: 'Bonakouamouang, Akwa, Face Prudential Beneficial Life',
    phone: '+237 658 794 995',
    textPhone: '+237 658 794 995',
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1048.3107933470685!2d9.70440172672647!3d4.05273483122112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061136521bddd85%3A0x4dc0381643068eab!2sCRESAF%20-%20Cr%C3%A9dit%20Solidaire%20d%27Afrique!5e0!3m2!1sfr!2scm!4v1747233173429!5m2!1sfr!2scm",
    gpsCoords: '4.052734831221122,9.70440172672647'
  },
  {
    title: 'Agence d\'Akwa',
    address: 'Bonakouamouang, Akwa, Face Prudential Beneficial Life',
    phone: '+237 658 794 995',
    textPhone: '+237 658 794 995',
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1048.3107933470685!2d9.70440172672647!3d4.05273483122112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061136521bddd85%3A0x4dc0381643068eab!2sCRESAF%20-%20Cr%C3%A9dit%20Solidaire%20d%27Afrique!5e0!3m2!1sfr!2scm!4v1747233173429!5m2!1sfr!2scm",
    gpsCoords: '4.056295596917937,9.703365511685044'
  },
  {
    title: 'Agence Anatole',
    address: 'Carrefour Anatole, face la station total',
    phone: null,
    textPhone: '+237 *** *** ***',
    mapEmbedUrl: null,
    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.88246563407!2d9.700099511684809!3d4.041553896920996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106112337c5fc7f7%3A0x89a8836a257e4ab2!2sCarrefour%20Anatole%2C%20Douala!5e0!3m2!1sfr!2scm!4v1715971461095!5m2!1sfr!2scm",
    gpsCoords: '4.041553896920996,9.700099511684809'
  },
  {
    title: 'Agence de Yaoundé',
    address: 'Descente Mokolo Elobi, batiment Dubaï Market',
    phone: '+237 692 313 295',
    textPhone: '+237 692 313 295',
    mapEmbedUrl: null,
    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.8289708097245!2d11.511476911682971!3d3.862953097127033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcfd9dba9c739%3A0xeb9f84583978b64c!2sMarch%C3%A9%20Mokolo!5e0!3m2!1sfr!2scm!4v1715971524686!5m2!1sfr!2scm",
    gpsCoords: '3.862953097127033,11.511476911682971'
  },
  {
    title: 'Agence de Bafoussam',
    address: 'Montée sens interdit, marché A, avant la direction régionale de la Total',
    phone: '+237 699 477 764',
    textPhone: '+237 699 477 764',
    mapEmbedUrl: null,
    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.4129265629776!2d10.41624259171053!3d5.77758409582046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f131f2ac9da29%3A0xe98a1d38f7321015!2sTotal%20Energies%20March%C3%A9%20A!5e0!3m2!1sfr!2scm!4v1715971588638!5m2!1sfr!2scm",
    gpsCoords: '5.77758409582046,10.41624259171053'
  }
]

const openImediatis = () => {
  window.open("https://imediatis.cm/", "_blank");
}

const contact = () => {
  window.open(`https://api.whatsapp.com/send/?phone=237233421788&text&type=phone_number&app_absent=0`, "_blank");
}

// const openCresafFaceBook = () =>{
//   window.open("https://www.facebook.com/cresaf.sa", "blank");
// }

// Ouvre Google Maps avec l'itinéraire vers l'emplacement choisi
const openGoogleMapsDirections = (location) => {
  if (!location){
    return;
  }
  if (location.gpsCoords) {
    // Format: https://www.google.com/maps/dir/?api=1&destination=LAT,LNG
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.gpsCoords}`;
    window.open(mapsUrl, '_blank');
  }
}

const openWhatsApp = (phone) => {
  // window.open(`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`, "_blank");
  if (phone) {
    const phoneExemple = String(phone).replace(/\s+/g, '').replace('+', '')
    const url = `https://api.whatsapp.com/send/?phone=${phoneExemple}&image&type=phone_number&app_absent=0`;
    window.open(url, "_blank");
  } else {
    console.error("Numéro de téléphone non disponible !");
  }
}
onMounted(()=>{
  // Animations pour la section des fonctionnalités
  ScrollTrigger.create({
    trigger: featuresSection.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.from(featureCards.value, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  });
});

</script>

<style scoped>
.map-container {
  transition: transform 0.3s ease;
}

.map-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
