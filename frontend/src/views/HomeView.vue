<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { useAuthStore } from '../stores/auth'
import api from '../api'

const auth = useAuthStore()
const sessions = ref<any[]>([])
const loading = ref(true)

const LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 6000]
const LEVEL_NAMES = ['Početnik', 'Student', 'Napredni Student', 'Ekspert', 'Majstor']
const LEVEL_COLORS = ['#8B949E', '#3B82F6', '#10B981', '#F59E0B', '#7C3AED']

const level = computed(() => {
  const xp = auth.user?.xp ?? 0
  let l = 0
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { l = i; break }
  }
  return {
    n: l + 1,
    name: LEVEL_NAMES[l],
    color: LEVEL_COLORS[l],
    current: xp - LEVEL_THRESHOLDS[l],
    max: (LEVEL_THRESHOLDS[l + 1] ?? 10000) - LEVEL_THRESHOLDS[l],
    isMax: l === LEVEL_THRESHOLDS.length - 1,
  }
})

onMounted(async () => {
  try {
    const { data } = await api.get('/quiz/sessions')
    sessions.value = data.sessions
  } finally {
    loading.value = false
  }
})

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('hr-HR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <!-- Welcome header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">
            Dobrodošao, <span class="text-brand">{{ auth.user?.username }}</span> 👋
          </h1>
          <p class="text-gray-500 text-sm mt-1">Nastavi učiti i osvoji što više XP-a!</p>
        </div>
        <div class="text-right hidden sm:block">
          <div class="text-xs text-gray-500 mb-1">Dnevna serija</div>
          <div class="flex items-center gap-1.5 text-warn font-semibold">
            <span>🔥</span>
            <span>{{ auth.user?.streak }} dana</span>
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="card p-4">
          <div class="text-xs text-gray-500 mb-1">Ukupno XP</div>
          <div class="text-xl font-bold text-white">{{ auth.user?.xp.toLocaleString() }}</div>
          <div class="text-xs text-brand mt-1">{{ level.name }}</div>
        </div>
        <div class="card p-4">
          <div class="text-xs text-gray-500 mb-1">Razina</div>
          <div class="text-xl font-bold text-white">{{ level.n }}</div>
          <div class="mt-2">
            <ProgressBar :value="level.current" :max="level.max" :color="level.color" />
          </div>
        </div>
        <div class="card p-4">
          <div class="text-xs text-gray-500 mb-1">Kvizova</div>
          <div class="text-xl font-bold text-white">{{ sessions.length }}</div>
          <div class="text-xs text-gray-600 mt-1">odigranih</div>
        </div>
        <div class="card p-4">
          <div class="text-xs text-gray-500 mb-1">Serija</div>
          <div class="text-xl font-bold text-white flex items-center gap-1.5">
            🔥 {{ auth.user?.streak }}
          </div>
          <div class="text-xs text-gray-600 mt-1">dana zaredom</div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link to="/ucenje" class="card p-5 hover:border-brand/40 transition-colors group block">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
              📖
            </div>
            <div>
              <div class="font-semibold text-white group-hover:text-brand transition-colors">Učenje</div>
              <div class="text-sm text-gray-500">Prouči svih 22 pitanja</div>
            </div>
            <svg class="ml-auto w-4 h-4 text-gray-600 group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </router-link>

        <router-link to="/kviz" class="card p-5 hover:border-brand/40 transition-colors group block">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div>
              <div class="font-semibold text-white group-hover:text-brand transition-colors">Kviz</div>
              <div class="text-sm text-gray-500">10 pitanja, zaradi XP</div>
            </div>
            <svg class="ml-auto w-4 h-4 text-gray-600 group-hover:text-brand transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </router-link>
      </div>

      <!-- How XP works -->
      <div class="card p-5">
        <h3 class="font-semibold text-white text-sm mb-3">Kako zarađuješ XP?</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div class="bg-bg-secondary rounded-lg p-3 text-center">
            <div class="text-green-400 font-bold text-base">+100</div>
            <div class="text-gray-500 mt-0.5">Točan odgovor</div>
          </div>
          <div class="bg-bg-secondary rounded-lg p-3 text-center">
            <div class="text-yellow-400 font-bold text-base">+50</div>
            <div class="text-gray-500 mt-0.5">Brz odgovor (&lt;10s)</div>
          </div>
          <div class="bg-bg-secondary rounded-lg p-3 text-center">
            <div class="text-blue-400 font-bold text-base">+50</div>
            <div class="text-gray-500 mt-0.5">Završen kviz</div>
          </div>
          <div class="bg-bg-secondary rounded-lg p-3 text-center">
            <div class="text-brand font-bold text-base">+300</div>
            <div class="text-gray-500 mt-0.5">Savršen rezultat</div>
          </div>
        </div>
      </div>

      <!-- Recent sessions -->
      <div v-if="sessions.length > 0">
        <h3 class="font-semibold text-white text-sm mb-3">Nedavni kvizovi</h3>
        <div class="space-y-2">
          <div
            v-for="s in sessions.slice(0, 5)"
            :key="s.id"
            class="card px-4 py-3 flex items-center gap-4"
          >
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
              :class="s.score === s.totalQuestions ? 'bg-green-500/15 text-green-400' : 'bg-brand/10 text-brand'"
            >
              {{ s.score }}/{{ s.totalQuestions }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-white font-medium">
                {{ s.score === s.totalQuestions ? '🏆 Savršen rezultat!' : `${s.score} od ${s.totalQuestions} točnih` }}
              </div>
              <div class="text-xs text-gray-500">{{ formatDate(s.completedAt) }}</div>
            </div>
            <div class="text-sm font-semibold text-brand">+{{ s.xpEarned }} XP</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
