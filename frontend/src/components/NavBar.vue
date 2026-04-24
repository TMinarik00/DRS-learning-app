<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const mobileOpen = ref(false)

const nav = [
  { to: '/', label: 'Početna', icon: '⊞' },
  { to: '/ucenje', label: 'Učenje', icon: '📖' },
  { to: '/kviz', label: 'Kviz', icon: '⚡' },
  { to: '/ljestvica', label: 'Ljestvica', icon: '🏆' },
  { to: '/profil', label: 'Profil', icon: '👤' },
]

function levelFor(xp: number) {
  if (xp < 500) return { n: 1, label: 'Početnik' }
  if (xp < 1500) return { n: 2, label: 'Student' }
  if (xp < 3000) return { n: 3, label: 'Napredni' }
  if (xp < 6000) return { n: 4, label: 'Ekspert' }
  return { n: 5, label: 'Majstor' }
}

const level = () => levelFor(auth.user?.xp ?? 0)
</script>

<template>
  <nav class="bg-bg-secondary border-b border-[#30363D] sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 font-bold text-white">
        <span class="text-brand text-xl">◈</span>
        <span class="hidden sm:block text-sm tracking-wide">DRS</span>
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-1">
        <router-link
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === item.to
            ? 'bg-brand/20 text-brand'
            : 'text-gray-400 hover:text-gray-100 hover:bg-bg-card'"
        >
          {{ item.label }}
        </router-link>
      </div>

      <!-- Right: XP + avatar -->
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 text-sm">
          <span class="text-gray-500">Razina {{ level().n }}</span>
          <span class="font-semibold text-brand">{{ auth.user?.xp.toLocaleString() }} XP</span>
        </div>
        <button
          @click="auth.logout"
          class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity"
          :style="{ background: auth.user?.avatarColor }"
          :title="`${auth.user?.username} — Odjavi se`"
        >
          {{ auth.user?.username?.charAt(0).toUpperCase() }}
        </button>
        <!-- Mobile menu toggle -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden text-gray-400 hover:text-white p-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile nav -->
    <div v-if="mobileOpen" class="md:hidden border-t border-[#30363D] bg-bg-secondary px-4 py-2">
      <router-link
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        @click="mobileOpen = false"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1"
        :class="route.path === item.to ? 'bg-brand/20 text-brand' : 'text-gray-400'"
      >
        <span>{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>
