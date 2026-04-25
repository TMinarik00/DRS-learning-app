<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-white">Kviz</h1>
        <p class="text-gray-500 text-sm mt-2">Izaberi tip kviza</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <!-- Brzi kviz -->
        <router-link
          to="/kviz/brzi"
          class="card p-6 hover:border-brand/40 transition-all group flex flex-col gap-3"
        >
          <div class="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-2xl">
            ⚡
          </div>
          <div>
            <div class="font-semibold text-lg text-white group-hover:text-brand transition-colors">
              Brzi kviz
            </div>
            <p class="text-sm text-gray-500 mt-1">
              10 pitanja s 4 ponuđena odgovora · 30s po pitanju · zarađuješ XP.
            </p>
          </div>
          <div class="text-xs text-brand mt-auto pt-2">Pokreni →</div>
        </router-link>

        <!-- Obični kviz -->
        <router-link
          to="/kviz/obicni"
          class="card p-6 hover:border-brand/40 transition-all group flex flex-col gap-3"
        >
          <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
            🎯
          </div>
          <div>
            <div class="font-semibold text-lg text-white group-hover:text-brand transition-colors">
              Obični kviz
            </div>
            <p class="text-sm text-gray-500 mt-1">
              Pitanja iz skripte · flashcard stil · samoocjenjivanje znaš/ne znaš.
            </p>
          </div>
          <div class="text-xs text-brand mt-auto pt-2">Pokreni →</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
