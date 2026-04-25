<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.response?.data?.error ?? 'Greška pri prijavi'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-bg-primary flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 border border-brand/30 mb-4">
          <span class="text-2xl text-brand font-bold">◈</span>
        </div>
        <h1 class="text-2xl font-bold text-white">DRS Kviz</h1>
        <p class="text-gray-500 text-sm mt-1">Distribuirani Računalni Sustavi</p>
      </div>

      <div class="card p-6">
        <h2 class="text-lg font-semibold text-white mb-5">Prijava</h2>

        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block text-xs text-gray-400 mb-1.5 font-medium">Email</label>
            <input v-model="email" type="email" placeholder="ime@fer.hr" class="input" required />
          </div>
          <div>
            <label class="block text-xs text-gray-400 mb-1.5 font-medium">Lozinka</label>
            <input v-model="password" type="password" placeholder="••••••" class="input" required />
          </div>

          <div v-if="error" class="text-danger text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {{ error }}
          </div>

          <button type="submit" class="btn-primary w-full" :disabled="loading">
            <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Prijava...' : 'Prijavi se' }}
          </button>
        </form>
      </div>

      <p class="text-center text-sm text-gray-500 mt-5">
        Nemaš račun?
        <router-link to="/register" class="text-brand hover:underline font-medium">Registriraj se</router-link>
      </p>

    </div>
  </div>
</template>
