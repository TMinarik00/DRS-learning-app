<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import { useAuthStore } from '../stores/auth'
import api from '../api'

const auth = useAuthStore()
const leaderboard = ref<any[]>([])
const myRank = ref<number | null>(null)
const loading = ref(true)

const LEVEL_NAMES = ['', 'Početnik', 'Student', 'Napredni', 'Ekspert', 'Majstor']
function levelFor(xp: number) {
  if (xp < 500) return 1
  if (xp < 1500) return 2
  if (xp < 3000) return 3
  if (xp < 6000) return 4
  return 5
}

function rankIcon(rank: number) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

onMounted(async () => {
  try {
    const { data } = await api.get('/leaderboard')
    leaderboard.value = data.leaderboard
    myRank.value = data.myRank
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div class="mb-6 flex items-end justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">Ljestvica</h1>
          <p class="text-gray-500 text-sm mt-1">Top studenti prema ukupnom XP-u</p>
        </div>
        <div v-if="myRank" class="text-right">
          <div class="text-xs text-gray-500">Tvoja pozicija</div>
          <div class="text-xl font-bold text-brand">{{ rankIcon(myRank) }}</div>
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-2">
        <div v-for="i in 5" :key="i" class="card h-16 animate-pulse" />
      </div>

      <!-- Leaderboard list -->
      <div v-else class="space-y-2">
        <div
          v-for="entry in leaderboard"
          :key="entry.id"
          class="card px-4 py-3.5 flex items-center gap-4 transition-all"
          :class="entry.id === auth.user?.id ? 'border-brand/40 bg-brand/5' : 'hover:border-[#3d444d]'"
        >
          <!-- Rank -->
          <div class="text-sm font-bold w-8 text-center shrink-0 text-gray-400">
            {{ rankIcon(entry.rank) }}
          </div>

          <!-- Avatar -->
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            :style="{ background: entry.avatarColor }"
          >
            {{ entry.username.charAt(0).toUpperCase() }}
          </div>

          <!-- Name + level -->
          <div class="flex-1 min-w-0">
            <div class="font-medium text-sm text-white flex items-center gap-2">
              {{ entry.username }}
              <span v-if="entry.id === auth.user?.id" class="text-xs text-brand">(ti)</span>
            </div>
            <div class="text-xs text-gray-500">
              Razina {{ levelFor(entry.xp) }} · {{ LEVEL_NAMES[levelFor(entry.xp)] }}
              <span v-if="entry.streak > 0" class="ml-2">🔥 {{ entry.streak }}</span>
            </div>
          </div>

          <!-- XP -->
          <div class="text-sm font-bold text-white text-right shrink-0">
            {{ entry.xp.toLocaleString() }}
            <span class="text-xs text-gray-500 font-normal ml-0.5">XP</span>
          </div>
        </div>
      </div>

      <div v-if="!loading && leaderboard.length === 0" class="text-center text-gray-500 py-12">
        Ljestvica je prazna — budi prvi! 🚀
      </div>
    </div>
  </div>
</template>
