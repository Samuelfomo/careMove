<script setup>

</script>

<template>
  <section
    class="relative lg:mt-20 h-screen flex items-center justify-center text-white text-center bg-cover bg-center"
    style="background-image: url('../../../src/assets/images/friend/driver.png');"
  >

    <!-- Overlay sombre -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Contenu -->
    <div class="relative z-10 max-w-3xl px-6">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Voyagez Ensemble, Roulez Intelligent
      </h1>
      <p class="text-lg md:text-xl mb-8 text-gray-200">
        Une nouvelle manière simple, économique et sécurisée de se déplacer.
      </p>
      <button class="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition duration-300">
        Découvrir
      </button>
    </div>

  </section>

  <section class="py-20 bg-white">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

      <img src="../../../src/assets/images/friend/driver.png" alt="image.jpg" class="rounded-2xl shadow-lg" />

      <div>
        <h2 class="text-3xl font-bold mb-4">
          Performance & Sécurité
        </h2>
        <p class="text-gray-600 mb-6">
          Nous développons des solutions robustes et sécurisées adaptées à votre entreprise.
        </p>
        <button class="px-5 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
          En savoir plus
        </button>
      </div>

    </div>
  </section>

</template>

<style scoped>

</style>
