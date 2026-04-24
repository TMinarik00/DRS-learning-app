<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import ProgressBar from '../components/ProgressBar.vue'
import { skripta, type SkriptaQuestion } from '../data/skripta'

type State = 'setup' | 'question' | 'results'

interface QuizItem extends SkriptaQuestion {
  lectureTitle: string
}

const state = ref<State>('setup')
const selectedLecture = ref<number>(-1) // -1 = all
const questionCount = ref<number>(10)
const items = ref<QuizItem[]>([])
const currentIdx = ref(0)
const revealed = ref(false)
const answers = ref<{ knew: boolean; item: QuizItem }[]>([])

const allItems = computed<QuizItem[]>(() => {
  const out: QuizItem[] = []
  skripta.forEach((lec, idx) => {
    if (selectedLecture.value !== -1 && selectedLecture.value !== idx) return
    lec.questions.forEach((q) => out.push({ ...q, lectureTitle: lec.title }))
  })
  return out
})

const currentItem = computed(() => items.value[currentIdx.value])
const correctCount = computed(() => answers.value.filter((a) => a.knew).length)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function start() {
  const pool = allItems.value
  if (pool.length === 0) return
  const n = Math.min(questionCount.value, pool.length)
  items.value = shuffle(pool).slice(0, n)
  currentIdx.value = 0
  revealed.value = false
  answers.value = []
  state.value = 'question'
}

function reveal() {
  revealed.value = true
}

function rate(knew: boolean) {
  answers.value.push({ knew, item: currentItem.value })
  if (currentIdx.value < items.value.length - 1) {
    currentIdx.value++
    revealed.value = false
  } else {
    state.value = 'results'
  }
}

function reset() {
  state.value = 'setup'
  items.value = []
  answers.value = []
  currentIdx.value = 0
  revealed.value = false
}

const COUNTS = [5, 10, 20, 50]
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <!-- SETUP -->
      <div v-if="state === 'setup'">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-white">Obični kviz</h1>
          <p class="text-gray-500 text-sm mt-1">Pitanja iz skripte · flashcard stil · samoocjenjivanje</p>
        </div>

        <!-- Lecture filter -->
        <div class="mb-5">
          <div class="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Predavanje</div>
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedLecture = -1"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              :class="selectedLecture === -1
                ? 'bg-brand text-white shadow-lg shadow-brand/20'
                : 'bg-bg-card border border-[#30363D] text-gray-400 hover:text-white'"
            >
              Sva
            </button>
            <button
              v-for="(lec, idx) in skripta"
              :key="idx"
              @click="selectedLecture = idx"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              :class="selectedLecture === idx
                ? 'bg-brand text-white shadow-lg shadow-brand/20'
                : 'bg-bg-card border border-[#30363D] text-gray-400 hover:text-white'"
            >
              P{{ idx + 1 }}
            </button>
          </div>
        </div>

        <!-- Count selector -->
        <div class="mb-6">
          <div class="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Broj pitanja</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="c in COUNTS"
              :key="c"
              @click="questionCount = c"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              :class="questionCount === c
                ? 'bg-brand text-white shadow-lg shadow-brand/20'
                : 'bg-bg-card border border-[#30363D] text-gray-400 hover:text-white'"
            >
              {{ c }}
            </button>
          </div>
          <p class="text-xs text-gray-600 mt-2">
            Dostupno {{ allItems.length }} pitanja u odabranoj kategoriji.
          </p>
        </div>

        <button
          @click="start"
          :disabled="allItems.length === 0"
          class="btn-primary w-full text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎯 Pokreni kviz
        </button>
      </div>

      <!-- QUESTION -->
      <div v-else-if="state === 'question' && currentItem">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-gray-500">
            Pitanje {{ currentIdx + 1 }} / {{ items.length }}
          </span>
          <span class="text-xs text-gray-600">
            P{{ skripta.findIndex((l) => l.title === currentItem.lectureTitle) + 1 }} ·
            #{{ currentItem.number }}
          </span>
        </div>

        <ProgressBar :value="currentIdx" :max="items.length" class="mb-6" />

        <!-- Question card -->
        <div class="card p-6 mb-4">
          <div class="text-xs text-gray-500 mb-2">{{ currentItem.lectureTitle }}</div>
          <h2 class="text-lg font-semibold text-white leading-relaxed">
            {{ currentItem.title }}
          </h2>
        </div>

        <!-- Answer (revealed) -->
        <div
          v-if="revealed"
          class="card p-5 mb-4 border-brand/30 bg-brand/5 animate-slide-up"
        >
          <div class="text-xs text-brand mb-2 font-medium uppercase tracking-wider">Odgovor</div>
          <div class="text-sm text-gray-200 whitespace-pre-line leading-relaxed">
            {{ currentItem.content }}
          </div>
        </div>

        <!-- Reveal button -->
        <button
          v-if="!revealed"
          @click="reveal"
          class="btn-primary w-full py-3 text-base"
        >
          Prikaži odgovor
        </button>

        <!-- Self-rating -->
        <div v-else class="grid grid-cols-2 gap-3 animate-slide-up">
          <button
            @click="rate(false)"
            class="card p-4 border-2 border-red-500/30 hover:bg-red-500/10 transition-colors text-red-400 font-medium"
          >
            ✗ Nisam znao
          </button>
          <button
            @click="rate(true)"
            class="card p-4 border-2 border-green-500/30 hover:bg-green-500/10 transition-colors text-green-400 font-medium"
          >
            ✓ Znao sam
          </button>
        </div>
      </div>

      <!-- RESULTS -->
      <div v-else-if="state === 'results'" class="text-center animate-bounce-in">
        <div class="text-6xl mb-4">
          {{ correctCount === items.length ? '🏆' : correctCount >= items.length * 0.7 ? '🎯' : '📚' }}
        </div>
        <h2 class="text-2xl font-bold text-white mb-1">Kviz završen!</h2>
        <p class="text-gray-500 mb-6">
          Znao si {{ correctCount }} od {{ items.length }} pitanja
        </p>

        <div class="grid grid-cols-2 gap-3 mb-6">
          <div class="card p-4">
            <div class="text-2xl font-bold text-white">{{ correctCount }}/{{ items.length }}</div>
            <div class="text-xs text-gray-500 mt-1">Rezultat</div>
          </div>
          <div class="card p-4">
            <div class="text-2xl font-bold text-brand">
              {{ Math.round((correctCount / items.length) * 100) }}%
            </div>
            <div class="text-xs text-gray-500 mt-1">Točnost</div>
          </div>
        </div>

        <!-- Per-answer summary -->
        <div class="card p-4 mb-6 text-left">
          <div class="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">
            Pregled odgovora
          </div>
          <div class="space-y-2">
            <div
              v-for="(a, idx) in answers"
              :key="idx"
              class="flex items-center gap-3 text-sm"
            >
              <span
                :class="a.knew ? 'text-success' : 'text-danger'"
                class="w-4 text-center shrink-0"
              >
                {{ a.knew ? '✓' : '✗' }}
              </span>
              <span class="text-gray-400 truncate">
                #{{ a.item.number }} · {{ a.item.title }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="reset" class="btn-ghost flex-1">Novi kviz</button>
          <router-link to="/ucenje/skripta" class="btn-primary flex-1 text-center">
            Ponovi gradivo
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
