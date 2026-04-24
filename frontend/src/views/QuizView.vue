<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import CategoryBadge from '../components/CategoryBadge.vue'
import ProgressBar from '../components/ProgressBar.vue'
import api from '../api'

type State = 'setup' | 'loading' | 'question' | 'feedback' | 'results'

const state = ref<State>('setup')
const selectedCategory = ref<string>('')
const sessionId = ref<string>('')
const questions = ref<any[]>([])
const currentIdx = ref(0)
const answers = ref<any[]>([])
const selectedOptionId = ref<number | null>(null)
const feedbackData = ref<{ isCorrect: boolean; correctOptionId: number } | null>(null)
const TOTAL_MS = 30000
const timeLeft = ref(30)
const elapsedMs = ref(0)
const rafId = ref<number | null>(null)
const finalScore = ref<{ score: number; totalQuestions: number; xpEarned: number; isPerfect: boolean } | null>(null)
const startTime = ref(0)
const error = ref('')

const timerPercent = computed(() => Math.max(0, ((TOTAL_MS - elapsedMs.value) / TOTAL_MS) * 100))

const CATS = [
  { value: '', label: 'Sva pitanja', desc: '22 teme, sve kategorije', icon: '🎯' },
  { value: 'CRVENA', label: 'Zagarantirana', desc: 'Pitanja 1–4, uvijek na ispitu', icon: '🔴' },
  { value: 'NARANCASTA', label: 'Visoka vjerojatnost', desc: 'Pitanja 5–10, često na ispitu', icon: '🟠' },
  { value: 'ZUTA', label: 'Srednja vjerojatnost', desc: 'Pitanja 11–16', icon: '🟡' },
  { value: 'ZELENA', label: 'Strateški izbor', desc: 'Pitanja 17–22', icon: '🟢' },
]

const currentQ = computed(() => questions.value[currentIdx.value])
const progress = computed(() => ((currentIdx.value) / questions.value.length) * 100)

function stopTimer() {
  if (rafId.value !== null) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }
}

function startTimer() {
  stopTimer()
  startTime.value = Date.now()
  elapsedMs.value = 0
  timeLeft.value = 30
  const tick = () => {
    elapsedMs.value = Date.now() - startTime.value
    timeLeft.value = Math.max(0, Math.ceil((TOTAL_MS - elapsedMs.value) / 1000))
    if (elapsedMs.value >= TOTAL_MS) {
      stopTimer()
      handleAnswer(null)
      return
    }
    rafId.value = requestAnimationFrame(tick)
  }
  rafId.value = requestAnimationFrame(tick)
}

async function startQuiz() {
  state.value = 'loading'
  error.value = ''
  try {
    const { data } = await api.post('/quiz/start', {
      category: selectedCategory.value || undefined,
    })
    sessionId.value = data.sessionId
    questions.value = data.questions
    currentIdx.value = 0
    answers.value = []
    state.value = 'question'
    startTimer()
  } catch (e: any) {
    error.value = e.response?.data?.error ?? 'Greška pri pokretanju kviza'
    state.value = 'setup'
  }
}

async function handleAnswer(optionId: number | null) {
  stopTimer()
  selectedOptionId.value = optionId
  const timeSpent = Math.round((Date.now() - startTime.value) / 1000)

  try {
    const { data } = await api.post(`/quiz/${sessionId.value}/answer`, {
      quizQuestionId: currentQ.value.id,
      selectedOptionId: optionId,
      timeSpent,
    })
    feedbackData.value = data
    answers.value.push({
      quizQuestionId: currentQ.value.id,
      selectedOptionId: optionId,
      isCorrect: data.isCorrect,
      correctOptionId: data.correctOptionId,
      timeSpent,
    })
    state.value = 'feedback'
  } catch {
    // continue silently
  }
}

async function next() {
  if (currentIdx.value < questions.value.length - 1) {
    currentIdx.value++
    selectedOptionId.value = null
    feedbackData.value = null
    state.value = 'question'
    startTimer()
  } else {
    // Complete session
    const timeTaken = answers.value.reduce((sum, a) => sum + a.timeSpent, 0)
    try {
      const { data } = await api.post(`/quiz/${sessionId.value}/complete`, { timeTaken })
      finalScore.value = data
    } catch {
      finalScore.value = {
        score: answers.value.filter((a) => a.isCorrect).length,
        totalQuestions: questions.value.length,
        xpEarned: 0,
        isPerfect: false,
      }
    }
    state.value = 'results'
  }
}

function reset() {
  state.value = 'setup'
  questions.value = []
  answers.value = []
  currentIdx.value = 0
  finalScore.value = null
  feedbackData.value = null
  selectedOptionId.value = null
  stopTimer()
}

function optionClass(optId: number) {
  if (state.value !== 'feedback') {
    return 'border-[#30363D] hover:border-brand/50 hover:bg-brand/5 cursor-pointer'
  }
  if (optId === feedbackData.value?.correctOptionId) return 'border-success bg-green-500/10 text-white'
  if (optId === selectedOptionId.value && !feedbackData.value?.isCorrect) return 'border-danger bg-red-500/10'
  return 'border-[#30363D] opacity-50'
}

onUnmounted(stopTimer)
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-2xl mx-auto px-4 py-8 animate-fade-in">

      <!-- SETUP -->
      <div v-if="state === 'setup'">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-white">Kviz</h1>
          <p class="text-gray-500 text-sm mt-1">10 pitanja · 30 sekundi po pitanju · zaradi XP</p>
        </div>

        <div class="grid gap-3 mb-6">
          <div
            v-for="cat in CATS"
            :key="cat.value"
            @click="selectedCategory = cat.value"
            class="card p-4 cursor-pointer transition-all hover:border-brand/40 flex items-center gap-4"
            :class="selectedCategory === cat.value ? 'border-brand bg-brand/5' : ''"
          >
            <span class="text-2xl">{{ cat.icon }}</span>
            <div class="flex-1">
              <div class="font-medium text-sm text-white">{{ cat.label }}</div>
              <div class="text-xs text-gray-500">{{ cat.desc }}</div>
            </div>
            <div
              class="w-4 h-4 rounded-full border-2 transition-all shrink-0"
              :class="selectedCategory === cat.value ? 'border-brand bg-brand' : 'border-gray-600'"
            />
          </div>
        </div>

        <div v-if="error" class="text-danger text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
          {{ error }}
        </div>

        <button @click="startQuiz" class="btn-primary w-full text-base py-3">
          ⚡ Pokreni Kviz
        </button>
      </div>

      <!-- LOADING -->
      <div v-else-if="state === 'loading'" class="flex flex-col items-center justify-center py-24 gap-4">
        <svg class="animate-spin w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p class="text-gray-500 text-sm">Priprema pitanja...</p>
      </div>

      <!-- QUESTION / FEEDBACK -->
      <div v-else-if="state === 'question' || state === 'feedback'">
        <!-- Progress header -->
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-gray-500">Pitanje {{ currentIdx + 1 }} / {{ questions.length }}</span>
          <div class="flex items-center gap-2">
            <CategoryBadge v-if="currentQ" :category="currentQ.questionCategory" />
            <span
              class="text-sm font-mono font-bold px-2.5 py-0.5 rounded-lg"
              :class="timeLeft <= 10 ? 'bg-red-500/15 text-red-400' : 'bg-bg-card text-gray-300'"
            >
              {{ timeLeft }}s
            </span>
          </div>
        </div>

        <ProgressBar :value="currentIdx" :max="questions.length" class="mb-5" />

        <!-- Timer bar -->
        <div class="w-full bg-bg-card rounded-full h-1 mb-6 overflow-hidden">
          <div
            class="h-full rounded-full"
            :style="{
              width: `${timerPercent}%`,
              background: timeLeft <= 10 ? '#EF4444' : '#7C3AED',
            }"
          />
        </div>

        <!-- Question -->
        <div class="card p-5 mb-4">
          <div class="text-xs text-gray-500 mb-2">{{ currentQ?.questionTitle }}</div>
          <p class="text-base font-medium text-white leading-relaxed">{{ currentQ?.text }}</p>
        </div>

        <!-- Options -->
        <div class="grid gap-2.5">
          <button
            v-for="opt in currentQ?.options"
            :key="opt.id"
            @click="state === 'question' && handleAnswer(opt.id)"
            class="card p-4 text-left text-sm font-medium transition-all border-2 flex items-center gap-3"
            :class="optionClass(opt.id)"
            :disabled="state === 'feedback'"
          >
            <span v-if="state === 'feedback'">
              <span v-if="opt.id === feedbackData?.correctOptionId" class="text-success text-lg">✓</span>
              <span v-else-if="opt.id === selectedOptionId && !feedbackData?.isCorrect" class="text-danger text-lg">✗</span>
              <span v-else class="text-gray-600">–</span>
            </span>
            <span class="flex-1">{{ opt.text }}</span>
          </button>
        </div>

        <!-- Feedback message -->
        <div v-if="state === 'feedback'" class="mt-4 animate-slide-up">
          <div
            class="rounded-xl px-4 py-3 text-sm font-medium"
            :class="feedbackData?.isCorrect ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'"
          >
            {{ feedbackData?.isCorrect ? '🎉 Točan odgovor!' : selectedOptionId === null ? '⏱️ Vrijeme je isteklo!' : '❌ Netočan odgovor.' }}
          </div>

          <button @click="next" class="btn-primary w-full mt-3 py-3 text-base">
            {{ currentIdx < questions.length - 1 ? 'Sljedeće pitanje →' : 'Završi kviz' }}
          </button>
        </div>
      </div>

      <!-- RESULTS -->
      <div v-else-if="state === 'results' && finalScore" class="text-center animate-bounce-in">
        <div class="text-6xl mb-4">
          {{ finalScore.isPerfect ? '🏆' : finalScore.score >= finalScore.totalQuestions * 0.7 ? '🎯' : '📚' }}
        </div>
        <h2 class="text-2xl font-bold text-white mb-1">
          {{ finalScore.isPerfect ? 'Savršen rezultat!' : 'Kviz završen!' }}
        </h2>
        <p class="text-gray-500 mb-6">
          {{ finalScore.score }} od {{ finalScore.totalQuestions }} točnih odgovora
        </p>

        <div class="grid grid-cols-3 gap-3 mb-6">
          <div class="card p-4">
            <div class="text-2xl font-bold text-white">{{ finalScore.score }}/{{ finalScore.totalQuestions }}</div>
            <div class="text-xs text-gray-500 mt-1">Rezultat</div>
          </div>
          <div class="card p-4">
            <div class="text-2xl font-bold text-brand">+{{ finalScore.xpEarned }}</div>
            <div class="text-xs text-gray-500 mt-1">XP zarađeno</div>
          </div>
          <div class="card p-4">
            <div class="text-2xl font-bold" :class="finalScore.score === finalScore.totalQuestions ? 'text-yellow-400' : 'text-gray-400'">
              {{ Math.round((finalScore.score / finalScore.totalQuestions) * 100) }}%
            </div>
            <div class="text-xs text-gray-500 mt-1">Točnost</div>
          </div>
        </div>

        <!-- Per-answer summary -->
        <div class="card p-4 mb-6 text-left">
          <div class="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Pregled odgovora</div>
          <div class="space-y-2">
            <div
              v-for="(a, idx) in answers"
              :key="idx"
              class="flex items-center gap-3 text-sm"
            >
              <span :class="a.isCorrect ? 'text-success' : 'text-danger'" class="w-4 text-center shrink-0">
                {{ a.isCorrect ? '✓' : '✗' }}
              </span>
              <span class="text-gray-400 truncate">{{ questions[idx]?.questionTitle }}</span>
              <span class="text-xs text-gray-600 ml-auto shrink-0">{{ a.timeSpent }}s</span>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="reset" class="btn-ghost flex-1">
            Novi kviz
          </button>
          <router-link to="/ucenje/brzo" class="btn-primary flex-1 text-center">
            Ponovi gradivo
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>
