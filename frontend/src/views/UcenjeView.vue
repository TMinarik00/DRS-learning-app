<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import { skripta } from '../data/skripta'

const search = ref('')
const expandedKey = ref<string | null>(null)
const activeLecture = ref<number>(-1) // -1 = all

const lectures = skripta

const filtered = computed(() => {
  const s = search.value.trim().toLowerCase()
  return lectures.map((lec, idx) => {
    if (activeLecture.value !== -1 && activeLecture.value !== idx) {
      return { ...lec, questions: [] }
    }
    if (!s) return lec
    return {
      ...lec,
      questions: lec.questions.filter(
        (q) =>
          q.title.toLowerCase().includes(s) ||
          q.content.toLowerCase().includes(s) ||
          String(q.number).includes(s),
      ),
    }
  })
})

const totalQuestions = computed(() =>
  lectures.reduce((sum, l) => sum + l.questions.length, 0),
)

function toggle(key: string) {
  expandedKey.value = expandedKey.value === key ? null : key
}
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white">Učenje</h1>
        <p class="text-gray-500 text-sm mt-1">
          Pitanja iz skripte · {{ totalQuestions }} pitanja organiziranih po predavanjima
        </p>
      </div>

      <!-- Lecture filter -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          @click="activeLecture = -1"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          :class="activeLecture === -1
            ? 'bg-brand text-white shadow-lg shadow-brand/20'
            : 'bg-bg-card border border-[#30363D] text-gray-400 hover:text-white'"
        >
          Sva predavanja
        </button>
        <button
          v-for="(lec, idx) in lectures"
          :key="idx"
          @click="activeLecture = idx"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          :class="activeLecture === idx
            ? 'bg-brand text-white shadow-lg shadow-brand/20'
            : 'bg-bg-card border border-[#30363D] text-gray-400 hover:text-white'"
        >
          P{{ idx + 1 }}
        </button>
      </div>

      <!-- Search -->
      <div class="mb-5 relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="search" placeholder="Pretraži pitanja iz skripte..." class="input pl-9" />
      </div>

      <!-- Lectures -->
      <div class="space-y-8">
        <section v-for="(lec, lIdx) in filtered" :key="lIdx" v-show="lec.questions.length > 0">
          <h2 class="text-sm font-semibold text-brand uppercase tracking-wider mb-3 border-b border-[#30363D] pb-2">
            {{ lec.title }}
          </h2>

          <div class="space-y-2">
            <div
              v-for="q in lec.questions"
              :key="q.number"
              class="card overflow-hidden border transition-all hover:border-[#3d444d]"
              :class="expandedKey === lIdx + '-' + q.number ? 'border-brand/30' : ''"
            >
              <button
                @click="toggle(lIdx + '-' + q.number)"
                class="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-bg-elevated/50 transition-colors"
              >
                <span class="text-xs text-gray-600 font-mono w-7 shrink-0 text-center">{{ q.number }}</span>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm text-white">{{ q.title }}</div>
                </div>
                <svg
                  class="w-4 h-4 text-gray-500 transition-transform shrink-0"
                  :class="expandedKey === lIdx + '-' + q.number ? 'rotate-180' : ''"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                v-if="expandedKey === lIdx + '-' + q.number"
                class="border-t border-[#30363D] bg-bg-secondary px-4 py-4"
              >
                <div class="text-sm text-gray-300 whitespace-pre-line leading-relaxed">{{ q.content }}</div>
              </div>
            </div>
          </div>
        </section>

        <div
          v-if="filtered.every((l) => l.questions.length === 0)"
          class="text-center text-gray-500 py-12"
        >
          Nema pronađenih pitanja
        </div>
      </div>
    </div>
  </div>
</template>
