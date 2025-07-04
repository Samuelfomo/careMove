<!-- Footer.vue -->
<template>
  <footer class="bg-primary pt-10 lg:pt-12">
    <div class="container mx-auto px-4 w-full">
      <!-- Call to Action Section -->
      <div class="flex flex-col items-center text-center lg:mb-32 mb-10">
        <h2 class="text-white font-bold text-2xl lg:text-3xl mb-4">
          {{ $t('footer.title') }}
        </h2>
        <p class="text-gray-200 font-roboto text-base lg:text-lg mb-6">
          {{ $t('footer.description') }}
        </p>
        <button type="button"
                class="btn btn-secondary mt-0 mb-0"
                @click="contact"
        >
          {{ $t('footer.startTripToday') }}
        </button>
      </div>

      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div class="text-white md:text-start text-center">
          <h3 class="montserrat montserrat-700 text-lg mb-4">{{ $t('footer.sections.company.title') }}</h3>
          <p class="text-gray-200 text-sm mb-4">
            {{ $t('footer.sections.company.description') }}
          </p>
          <div class="flex md:justify-start justify-center items-center space-x-2">
            <img :src="phone" alt="phone icon" class="w-4 h-4" />
            <span class="cursor-pointer text-sm montserrat montserrat-600 text-white"
                  @click="openWhatsApp('+237658794995')">
              +237 651 72 15 36
            </span>
          </div>
        </div>

        <!-- Services -->
        <div class="text-white md:text-start text-center">
          <h3 class="montserrat montserrat-700 text-lg mb-4">{{ $t('footer.sections.services.title') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.services.carpool') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.services.regularTrips') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.services.longDistance') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.services.cityTrips') }}</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="text-white md:text-start text-center">
          <h3 class="montserrat montserrat-700 text-lg mb-4">{{ $t('footer.sections.support.title') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.support.help') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.support.safety') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.support.contact') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.support.faq') }}</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="text-white md:text-start text-center">
          <h3 class="montserrat montserrat-700 text-lg mb-4">{{ $t('footer.sections.legal.title') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.legal.terms') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.legal.privacy') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.legal.cookies') }}</a></li>
            <li><a href="#" class="text-gray-200 hover:text-secondary transition-colors">{{ $t('footer.sections.legal.cancellation') }}</a></li>
          </ul>
        </div>
      </div>

      <!-- Popular Routes Section -->
      <div class="border-t border-gray-600 pt-8 mb-8">
        <h3 class="text-white font-bold text-xl mb-6 text-center">{{ $t('footer.popularRoutes.title') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="route in popularRoutes" :key="route.id"
               class="bg-primary-900 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all cursor-pointer">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-white font-semibold text-sm">{{ route.from }} → {{ route.to }}</p>
                <p class="text-gray-300 text-xs">{{ $t('footer.popularRoutes.from') }} {{ route.price }}</p>
              </div>
              <svg class="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-gray-600 pt-6 pb-2">
        <div class="lg:flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="w-full lg:flex flex-wrap lg:justify-start justify-start gap-x-4 text-sm text-gray-300 lg:space-x-0 space-x-4 leading-8">
            <span>{{ $t('footer.copyright') }}</span>
            <span class="hover:text-secondary transition-colors cursor-pointer font-bold" @click="router.push('/')">
              {{ $t('footer.company') }}
            </span>
            <span class="hidden md:inline">|</span>
            <span>{{ $t('footer.designedBy') }}</span>
            <span class="hover:text-secondary transition-colors cursor-pointer font-bold" @click="openTeamNF">
              {{ $t('footer.team') }}
            </span>
          </div>

          <!-- Social Media -->
          <div class="flex w-full lg:justify-center justify-around space-x-4">
            <a href="#" class="rounded-full h-10 w-10 flex items-center justify-center border border-transparent bg-secondary-accent-600 hover:bg-secondary-accent-700 transition-colors">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
<!--            <a href="#" class="rounded-full h-10 w-10 flex items-center justify-center border border-white bg-blue-800 hover:bg-blue-900 transition-colors">-->
<!--              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">-->
<!--                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>-->
<!--              </svg>-->
<!--            </a>-->
            <a href="#" class="rounded-full h-10 w-10 flex items-center justify-center border border-transparent bg-secondary-600 hover:bg-secondary-700 transition-colors">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to top button -->
    <div class="fixed right-2 top-[95%] transform -translate-y-1/2 space-y-4 z-50">
      <div class="top-full right-0 mt-auto h-full flex justify-center md:justify-end z-50 pointer-events-none lg:pb-5 lg:pr-0 pr-2">
        <a href="#" class="rounded-xl h-12 w-12 flex items-center justify-center border-2 border-secondary-600 bg-white
              transition-transform hover:scale-110 pointer-events-auto"
           @click="scrollToTop"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-secondary-600"
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
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import Phone from "@/assets/images/svg/phone.svg";
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const { t } = useI18n();
const phone = Phone;

// Popular routes data
const popularRoutes = ref([
  { id: 1, from: 'Douala', to: 'Yaoundé', price: '2500 FCFA' },
  { id: 2, from: 'Yaoundé', to: 'Bafoussam', price: '3000 FCFA' },
  { id: 3, from: 'Douala', to: 'Limbe', price: '1500 FCFA' },
  { id: 4, from: 'Bafoussam', to: 'Bamenda', price: '2000 FCFA' },
  { id: 5, from: 'Yaoundé', to: 'Bertoua', price: '4000 FCFA' },
  { id: 6, from: 'Douala', to: 'Kribi', price: '2500 FCFA' }
]);

const contact = () => {
  window.open(`https://api.whatsapp.com/send/?phone=237658794995&text&type=phone_number&app_absent=0`, "_blank");
}

const openTeamNF = () => {
  window.open("https://teamnf.com/", "_blank");
}

const openWhatsApp = (phone) => {
  if (phone) {
    const phoneNumber = String(phone).replace(/\s+/g, '').replace('+', '');
    const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`;
    window.open(url, "_blank");
  } else {
    console.error("Numéro de téléphone non disponible !");
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  // Animations pour les éléments du footer
  ScrollTrigger.create({
    trigger: 'footer',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.footer-animate', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  });
});
</script>

<style scoped>
</style>

<!--&lt;!&ndash; Footer.vue &ndash;&gt;-->
<!--<template>-->
<!--  <footer class="bg-primary pt-10 lg:pt-12">-->
<!--    <div class="container mx-auto px-4 w-full">-->
<!--      &lt;!&ndash; Call to Action Section &ndash;&gt;-->
<!--      <div class="flex flex-col items-center text-center lg:mb-32 mb-10">-->
<!--        <h2 class="text-white font-bold text-2xl lg::text-3xl mb-4">-->
<!--          Construisons ensemble votre avenir financier-->
<!--        </h2>-->
<!--        <p class="text-gray-200 font-roboto text-base lg:text-lg mb-6">-->
<!--          Cresaf s'engage à vos côtés pour concrétiser vos projets grâce à des solutions de financement adaptées-->
<!--          et un accompagnement personnalisé. Que vous soyez commerçant, entrepreneur ou agriculteur, nous sommes-->
<!--          là pour soutenir votre réussite.-->
<!--        </p>-->
<!--        <button type="button"-->
<!--                class="btn btn-primary-accent mt-0 mb-0"-->
<!--                @click="contact"-->
<!--        >-->
<!--          Demarrer un trajet aujourd'hui-->
<!--        </button>-->
<!--      </div>-->

<!--      &lt;!&ndash; Locations Grid &ndash;&gt;-->
<!--      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-5" ref="featuresSection">-->
<!--        <div v-for="(location, index) in locations" :key="index" class="text-white md:text-start text-center"-->
<!--             ref="featureCards"-->
<!--        >-->
<!--          <div>-->
<!--            &lt;!&ndash; Carte Google Maps intégrée &ndash;&gt;-->
<!--            <div v-if="location.mapEmbedUrl" class="map-container rounded-lg overflow-hidden shadow-md cursor-pointer h-32 hover:opacity-80 transition-opacity duration-200"-->
<!--                 @click="openGoogleMapsDirections(location)">-->
<!--              <iframe-->
<!--                :src="location.mapEmbedUrl"-->
<!--                width="100%"-->
<!--                height="180"-->
<!--                style="border:0;"-->
<!--                allowfullscreen=""-->
<!--                loading="lazy"-->
<!--                referrerpolicy="no-referrer-when-downgrade"-->
<!--                title="Google Maps"-->
<!--                class="w-full"-->
<!--              ></iframe>-->
<!--            </div>-->

<!--            &lt;!&ndash; Sinon, image seule non cliquable &ndash;&gt;-->
<!--            <div v-else>-->
<!--              <img :src="none" alt="Carte" class="w-full h-32 object-cover cursor-wait rounded-md hover:opacity-80 transition-opacity duration-200"/>-->
<!--            </div>-->
<!--          </div>-->
<!--          <h3 class="montserrat montserrat-700 text-base my-2">{{ location.title }}</h3>-->
<!--          <p class="text-gray-200 italic montserrat text-xs">-->
<!--            {{ location.address }}-->
<!--          </p>-->
<!--          <div class="flex md:justify-normal justify-center items-center space-x-2 italic font-bold">-->
<!--            <img :src="phone" alt="phone icon" class="w-4 h-4" />-->
<!--            <span class="cursor-pointer text-sm montserrat montserrat-600 text-white" @click="openWhatsApp(location.phone) ">{{ location.textPhone }}</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Footer Bottom &ndash;&gt;-->
<!--      <div class="border-t border-white pt-6 pb-2">-->
<!--        <div class="lg:flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">-->
<!--          <div class="w-full lg:flex flex-wrap lg:justify-start justify-start gap-x-4 text-sm text-gray-300 lg:space-x-0 space-x-4 leading-8">-->
<!--            <span>Copyright © 2023 - 2025</span>-->
<!--            <span class="hover:text-secondary transition-colors cursor-pointer font-bold" @click="router.push('/')">-->
<!--              Crédit Solidaire D'Afrique S.A-->
<!--            </span>-->
<!--            <span class="hidden md:inline">|</span>-->
<!--            <span>Designed by</span>-->
<!--            <span class="hover:text-secondary transition-colors cursor-pointer font-bold" @click="openImediatis">-->
<!--              TEAM NF-->
<!--            </span>-->
<!--          </div>-->

<!--          &lt;!&ndash;          <div class="flex w-full lg:justify-center justify-around">&ndash;&gt;-->
<!--          &lt;!&ndash;            <a href="#" class="rounded-full h-10 w-10 flex items-center justify-center&ndash;&gt;-->
<!--          &lt;!&ndash;              border border-white bg-yellow-500"&ndash;&gt;-->
<!--          &lt;!&ndash;               @click="openCresafFaceBook"&ndash;&gt;-->
<!--          &lt;!&ndash;            >&ndash;&gt;-->
<!--          &lt;!&ndash;              <img :src="facebookIcon" alt="Facebook" class="w-6 h-6" />&ndash;&gt;-->
<!--          &lt;!&ndash;            </a>&ndash;&gt;-->
<!--          &lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="fixed right-2 top-[95%]  transform -translate-y-1/2 space-y-4 z-50">-->
<!--      <div class="top-full right-0 mt-auto h-full flex justify-center md:justify-end z-50 pointer-events-none lg:pb-5 lg:pr-0 pr-2">-->
<!--        <a href="#" class="rounded-xl h-12 w-12 flex items-center justify-center border-2 border-purple-600 bg-white-->
<!--              transition-transform hover:scale-110 pointer-events-auto"-->
<!--        >-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14f05d"-->
<!--               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">-->
<!--            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>-->
<!--            <path d="M12 3l0 16" />-->
<!--            <path d="M16 7l-4 -4" />-->
<!--            <path d="M8 7l4 -4" />-->
<!--          </svg>-->
<!--        </a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </footer>-->
<!--</template>-->

<!--<script setup>-->
<!--import {useRouter} from "vue-router";-->
<!--// import FaceBook from "@/assets/images/svg/facebook.svg"-->
<!--import Phone from "@/assets/images/svg/phone.svg"-->
<!--import none from "@/assets/images/map_none.jpg"-->
<!--import {ref, onMounted} from "vue";-->
<!--import gsap from "gsap";-->
<!--import {ScrollTrigger} from "gsap/ScrollTrigger";-->
<!--gsap.registerPlugin(ScrollTrigger);-->

<!--const router = useRouter()-->

<!--// const facebookIcon = FaceBook-->
<!--const phone = Phone;-->
<!--const featuresSection = ref(null);-->
<!--const featureCards = ref([]);-->

<!--const locations = [-->
<!--  {-->
<!--    title: 'Siège social (Douala)',-->
<!--    address: 'Bonakouamouang, Akwa, Face Prudential Beneficial Life',-->
<!--    phone: '+237 658 794 995',-->
<!--    textPhone: '+237 658 794 995',-->
<!--    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1048.3107933470685!2d9.70440172672647!3d4.05273483122112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061136521bddd85%3A0x4dc0381643068eab!2sCRESAF%20-%20Cr%C3%A9dit%20Solidaire%20d%27Afrique!5e0!3m2!1sfr!2scm!4v1747233173429!5m2!1sfr!2scm",-->
<!--    gpsCoords: '4.052734831221122,9.70440172672647'-->
<!--  },-->
<!--  {-->
<!--    title: 'Agence d\'Akwa',-->
<!--    address: 'Bonakouamouang, Akwa, Face Prudential Beneficial Life',-->
<!--    phone: '+237 658 794 995',-->
<!--    textPhone: '+237 658 794 995',-->
<!--    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1048.3107933470685!2d9.70440172672647!3d4.05273483122112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061136521bddd85%3A0x4dc0381643068eab!2sCRESAF%20-%20Cr%C3%A9dit%20Solidaire%20d%27Afrique!5e0!3m2!1sfr!2scm!4v1747233173429!5m2!1sfr!2scm",-->
<!--    gpsCoords: '4.056295596917937,9.703365511685044'-->
<!--  },-->
<!--  {-->
<!--    title: 'Agence Anatole',-->
<!--    address: 'Carrefour Anatole, face la station total',-->
<!--    phone: null,-->
<!--    textPhone: '+237 *** *** ***',-->
<!--    mapEmbedUrl: null,-->
<!--    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.88246563407!2d9.700099511684809!3d4.041553896920996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106112337c5fc7f7%3A0x89a8836a257e4ab2!2sCarrefour%20Anatole%2C%20Douala!5e0!3m2!1sfr!2scm!4v1715971461095!5m2!1sfr!2scm",-->
<!--    gpsCoords: '4.041553896920996,9.700099511684809'-->
<!--  },-->
<!--  {-->
<!--    title: 'Agence de Yaoundé',-->
<!--    address: 'Descente Mokolo Elobi, batiment Dubaï Market',-->
<!--    phone: '+237 692 313 295',-->
<!--    textPhone: '+237 692 313 295',-->
<!--    mapEmbedUrl: null,-->
<!--    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.8289708097245!2d11.511476911682971!3d3.862953097127033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcfd9dba9c739%3A0xeb9f84583978b64c!2sMarch%C3%A9%20Mokolo!5e0!3m2!1sfr!2scm!4v1715971524686!5m2!1sfr!2scm",-->
<!--    gpsCoords: '3.862953097127033,11.511476911682971'-->
<!--  },-->
<!--  {-->
<!--    title: 'Agence de Bafoussam',-->
<!--    address: 'Montée sens interdit, marché A, avant la direction régionale de la Total',-->
<!--    phone: '+237 699 477 764',-->
<!--    textPhone: '+237 699 477 764',-->
<!--    mapEmbedUrl: null,-->
<!--    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.4129265629776!2d10.41624259171053!3d5.77758409582046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f131f2ac9da29%3A0xe98a1d38f7321015!2sTotal%20Energies%20March%C3%A9%20A!5e0!3m2!1sfr!2scm!4v1715971588638!5m2!1sfr!2scm",-->
<!--    gpsCoords: '5.77758409582046,10.41624259171053'-->
<!--  }-->
<!--]-->

<!--const openImediatis = () => {-->
<!--  window.open("https://imediatis.cm/", "_blank");-->
<!--}-->

<!--const contact = () => {-->
<!--  window.open(`https://api.whatsapp.com/send/?phone=237233421788&text&type=phone_number&app_absent=0`, "_blank");-->
<!--}-->

<!--// const openCresafFaceBook = () =>{-->
<!--//   window.open("https://www.facebook.com/cresaf.sa", "blank");-->
<!--// }-->

<!--// Ouvre Google Maps avec l'itinéraire vers l'emplacement choisi-->
<!--const openGoogleMapsDirections = (location) => {-->
<!--  if (!location){-->
<!--    return;-->
<!--  }-->
<!--  if (location.gpsCoords) {-->
<!--    // Format: https://www.google.com/maps/dir/?api=1&destination=LAT,LNG-->
<!--    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.gpsCoords}`;-->
<!--    window.open(mapsUrl, '_blank');-->
<!--  }-->
<!--}-->

<!--const openWhatsApp = (phone) => {-->
<!--  // window.open(`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`, "_blank");-->
<!--  if (phone) {-->
<!--    const phoneExemple = String(phone).replace(/\s+/g, '').replace('+', '')-->
<!--    const url = `https://api.whatsapp.com/send/?phone=${phoneExemple}&image&type=phone_number&app_absent=0`;-->
<!--    window.open(url, "_blank");-->
<!--  } else {-->
<!--    console.error("Numéro de téléphone non disponible !");-->
<!--  }-->
<!--}-->
<!--onMounted(()=>{-->
<!--  // Animations pour la section des fonctionnalités-->
<!--  ScrollTrigger.create({-->
<!--    trigger: featuresSection.value,-->
<!--    start: 'top 80%',-->
<!--    onEnter: () => {-->
<!--      gsap.from(featureCards.value, {-->
<!--        y: 50,-->
<!--        opacity: 0,-->
<!--        duration: 0.8,-->
<!--        stagger: 0.2,-->
<!--        ease: 'power3.out'-->
<!--      });-->
<!--    }-->
<!--  });-->
<!--});-->

<!--</script>-->

<!--<style scoped>-->
<!--.map-container {-->
<!--  transition: transform 0.3s ease;-->
<!--}-->

<!--.map-container:hover {-->
<!--  transform: translateY(-5px);-->
<!--  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);-->
<!--}-->
<!--</style>-->


