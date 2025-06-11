
<script setup>
    import imgCar from "@/assets/images/imgCar.png";
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()
</script>
<template>
    <section class="bg-white py-4 w-full">
      <div class="w-full mx-auto">
        <div class="bg-primary text-white p-8 flex flex-col md:flex-row items-center gap-10">
            
          <div class="flex flex-col items-center justify-center">
            <div class="bg-secondary-500 p-4 rounded-xl mb-2 ">
              <img :src="imgCar" alt="Covoiturage" class="w-110 h-64" />
            </div>
            <h2 class="text-4xl font-bold w-72 text-center">{{t('home.securitySolution.secureSolutionTitle')}}</h2>
          </div>
  
          
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Card 1 -->
            <div class="bg-[#7667ED] text-white p-4 rounded-lg shadow">
              <div class="flex items-center gap-3 mb-2">
                <div class="bg-white w-6 h-6 rounded"></div>
                <h3 class="font-bold">{{t('home.securitySolution.profileVerifyTitle')}}</h3>
              </div>
              <p class="text-sm">{{t('home.securitySolution.profileVerifyDescription')}}</p>
              <a href="#" class="text-xs underline mt-2 inline-block">En savoir +</a>
            </div>
  
            <!-- Card 2 -->
            <div class="bg-[#7667ED] text-white p-4 rounded-lg shadow">
              <div class="flex items-center gap-3 mb-2">
                <div class="bg-white w-6 h-6 rounded"></div>
                <h3 class="font-bold">{{t('home.securitySolution.laagerSecurityTitle')}}</h3>
              </div>
              <p class="text-sm">{{t('home.securitySolution.laagerSecurityDescription')}}</p>
              <a href="#" class="text-xs underline mt-2 inline-block">En savoir +</a>
            </div>
  
            <!-- Deux autres blocs fantômes / placeholders -->
            <div class="bg-[#7667ED] p-4 rounded-lg h-24 opacity-50"></div>
            <div class="bg-[#7667ED] p-4 rounded-lg h-24 opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  </script>
  