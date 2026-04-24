<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import ProgressBar from '../components/ProgressBar.vue'
import CategoryBadge from '../components/CategoryBadge.vue'
import { useAuthStore } from '../stores/auth'
import api from '../api'

const auth = useAuthStore()

const username = ref(auth.user?.username ?? '')
const email = ref(auth.user?.email ?? '')
const avatarColor = ref(auth.user?.avatarColor ?? '#7C3AED')
const profileSaving = ref(false)
const profileMsg = ref('')
const profileError = ref('')

const currentPassword = ref('')
const newPassword = ref('')
const passwordSaving = ref(false)
const passwordMsg = ref('')
const passwordError = ref('')

const stats = ref<{ totalSessions: number; bestScore: number; masteredCount: number } | null>(null)
const progress = ref<any[]>([])

const COLORS = ['#7C3AED', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#06B6D4', '#F97316']
const LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 6000]
const LEVEL_NAMES = ['Početnik', 'Student', 'Napredni Student', 'Ekspert', 'Majstor']

function levelFor(xp: number) {
  let l = 0
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { l = i; break }
  }
  return {
    n: l + 1,
    name: LEVEL_NAMES[l],
    current: xp - LEVEL_THRESHOLDS[l],
    max: (LEVEL_THRESHOLDS[l + 1] ?? 10000) - LEVEL_THRESHOLDS[l],
  }
}

onMounted(async () => {
  const [profileRes, progressRes] = await Promise.all([
    api.get('/user/profile'),
    api.get('/user/progress'),
  ])
  stats.value = profileRes.data.stats
  progress.value = progressRes.data.progress
})

async function saveProfile() {
  profileMsg.value = ''
  profileError.value = ''
  profileSaving.value = true
  try {
    const { data } = await api.put('/user/profile', {
      username: username.value,
      email: email.value,
      avatarColor: avatarColor.value,
    })
    auth.updateUser(data.user)
    profileMsg.value = 'Profil je ažuriran!'
  } catch (e: any) {
    profileError.value = e.response?.data?.error ?? 'Greška'
  } finally {
    profileSaving.value = false
  }
}

async function savePassword() {
  passwordMsg.value = ''
  passwordError.value = ''
  passwordSaving.value = true
  try {
    await api.put('/user/password', { currentPassword: currentPassword.value, newPassword: newPassword.value })
    passwordMsg.value = 'Lozinka je promijenjena!'
    currentPassword.value = ''
    newPassword.value = ''
  } catch (e: any) {
    passwordError.value = e.response?.data?.error ?? 'Greška'
  } finally {
    passwordSaving.value = false
  }
}

function masteryLabel(l: number) {
  return ['–', 'Viđeno', 'Naučeno', 'Ponavljanje', 'Dobro', '⭐'][l] ?? '–'
}
function masteryColor(l: number) {
  if (l === 0) return 'text-gray-600'
  if (l <= 1) return 'text-blue-400'
  if (l <= 2) return 'text-yellow-400'
  if (l <= 3) return 'text-orange-400'
  return 'text-green-400'
}

const lv = () => levelFor(auth.user?.xp ?? 0)
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-3xl mx-auto px-4 py-8 space-y-5 animate-fade-in">
      <h1 class="text-2xl font-bold text-white">Profil</h1>

      <!-- Stats overview -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="card p-4 text-center">
          <div class="text-xl font-bold text-white">{{ auth.user?.xp.toLocaleString() }}</div>
          <div class="text-xs text-gray-500 mt-0.5">Ukupno XP</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-xl font-bold text-white">Razina {{ lv().n }}</div>
          <div class="text-xs text-brand mt-0.5">{{ lv().name }}</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-xl font-bold text-white">{{ stats?.totalSessions ?? '–' }}</div>
          <div class="text-xs text-gray-500 mt-0.5">Kvizova</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-xl font-bold text-white">{{ stats?.masteredCount ?? '–' }}/22</div>
          <div class="text-xs text-gray-500 mt-0.5">Savladano</div>
        </div>
      </div>

      <!-- Level progress -->
      <div class="card p-4">
        <div class="flex justify-between text-xs text-gray-500 mb-2">
          <span>Razina {{ lv().n }} — {{ lv().name }}</span>
          <span>{{ lv().current }} / {{ lv().max }} XP</span>
        </div>
        <ProgressBar :value="lv().current" :max="lv().max" />
      </div>

      <!-- Edit profile -->
      <div class="card p-5">
        <h2 class="font-semibold text-white mb-4">Uredi profil</h2>

        <!-- Avatar color picker -->
        <div class="mb-4">
          <div class="text-xs text-gray-400 mb-2 font-medium">Boja avatara</div>
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              :style="{ background: avatarColor }"
            >
              {{ auth.user?.username?.charAt(0).toUpperCase() }}
            </div>
            <div class="flex gap-2">
              <button
                v-for="c in COLORS"
                :key="c"
                @click="avatarColor = c"
                class="w-6 h-6 rounded-full transition-all hover:scale-110"
                :style="{ background: c, outline: c === avatarColor ? `2px solid ${c}` : 'none', outlineOffset: '2px' }"
              />
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1.5 font-medium">Korisničko ime</label>
            <input v-model="username" class="input" />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1.5 font-medium">Email</label>
            <input v-model="email" type="email" class="input" />
          </div>
        </div>

        <div v-if="profileMsg" class="mt-3 text-success text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">{{ profileMsg }}</div>
        <div v-if="profileError" class="mt-3 text-danger text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{{ profileError }}</div>

        <button @click="saveProfile" class="btn-primary mt-4" :disabled="profileSaving">
          {{ profileSaving ? 'Sprema...' : 'Spremi promjene' }}
        </button>
      </div>

      <!-- Change password -->
      <div class="card p-5">
        <h2 class="font-semibold text-white mb-4">Promjena lozinke</h2>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1.5 font-medium">Trenutna lozinka</label>
            <input v-model="currentPassword" type="password" class="input" />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1.5 font-medium">Nova lozinka</label>
            <input v-model="newPassword" type="password" class="input" />
          </div>
        </div>

        <div v-if="passwordMsg" class="mt-3 text-success text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">{{ passwordMsg }}</div>
        <div v-if="passwordError" class="mt-3 text-danger text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{{ passwordError }}</div>

        <button @click="savePassword" class="btn-primary mt-4" :disabled="passwordSaving">
          {{ passwordSaving ? 'Mijenjam...' : 'Promijeni lozinku' }}
        </button>
      </div>

      <!-- Per-question progress -->
      <div v-if="progress.length > 0" class="card p-5">
        <h2 class="font-semibold text-white mb-4">Napredak po pitanjima</h2>
        <div class="space-y-2">
          <div
            v-for="p in progress"
            :key="p.id"
            class="flex items-center gap-3 text-sm py-1.5"
          >
            <span class="text-xs text-gray-600 w-5 text-center font-mono">{{ p.question.number }}</span>
            <span class="text-gray-300 flex-1 min-w-0 truncate">{{ p.question.title }}</span>
            <CategoryBadge :category="p.question.category" />
            <span class="text-xs shrink-0" :class="masteryColor(p.masteryLevel)">
              {{ masteryLabel(p.masteryLevel) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Danger zone -->
      <div class="card p-4 border-red-500/20">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-white">Odjava</div>
            <div class="text-xs text-gray-500">Odjaviti se s računa</div>
          </div>
          <button @click="auth.logout" class="btn-ghost text-danger border-red-500/30 hover:bg-red-500/10">
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
