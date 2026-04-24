<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import CategoryBadge from '../components/CategoryBadge.vue'
import api from '../api'

const CATS = ['SVE', 'CRVENA', 'NARANCASTA', 'ZUTA', 'ZELENA']
const CAT_LABELS: Record<string, string> = {
  SVE: 'Sve', CRVENA: '🔴 Zagarantirana', NARANCASTA: '🟠 Visoka', ZUTA: '🟡 Srednja', ZELENA: '🟢 Strateška',
}

const questions = ref<any[]>([])
const loading = ref(true)
const activeCategory = ref('SVE')
const expandedId = ref<number | null>(null)
const search = ref('')

const filtered = computed(() => {
  let list = questions.value
  if (activeCategory.value !== 'SVE') list = list.filter((q) => q.category === activeCategory.value)
  if (search.value.trim()) {
    const s = search.value.toLowerCase()
    list = list.filter((q) => q.title.toLowerCase().includes(s) || q.keyConcepts.join(' ').toLowerCase().includes(s))
  }
  return list
})

onMounted(async () => {
  try {
    const { data } = await api.get('/questions')
    questions.value = data.questions
  } finally {
    loading.value = false
  }
})

function masteryLabel(level: number | undefined) {
  const levels = ['–', 'Viđeno', 'Naučeno', 'Ponavljanje', 'Dobro', '⭐ Savladano']
  return levels[level ?? 0] ?? '–'
}

function masteryColor(level: number | undefined) {
  const n = level ?? 0
  if (n === 0) return 'text-gray-600'
  if (n <= 1) return 'text-blue-400'
  if (n <= 2) return 'text-yellow-400'
  if (n <= 3) return 'text-orange-400'
  return 'text-green-400'
}

function toggle(id: number) {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <NavBar />

    <div class="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white">Materijal za učenje</h1>
        <p class="text-gray-500 text-sm mt-1">22 ključna pitanja za ispit · klikni na pitanje za detalje</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="cat in CATS"
          :key="cat"
          @click="activeCategory = cat"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          :class="activeCategory === cat
            ? 'bg-brand text-white shadow-lg shadow-brand/20'
            : 'bg-bg-card border border-[#30363D] text-gray-400 hover:text-white'"
        >
          {{ CAT_LABELS[cat] }}
        </button>
      </div>

      <!-- Search -->
      <div class="mb-5 relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="search" placeholder="Pretraži pitanja..." class="input pl-9" />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-3">
        <div v-for="i in 5" :key="i" class="card h-16 animate-pulse" />
      </div>

      <!-- Questions -->
      <div v-else class="space-y-2">
        <div v-if="filtered.length === 0" class="text-center text-gray-500 py-12">Nema pronađenih pitanja</div>

        <div
          v-for="q in filtered"
          :key="q.id"
          class="card overflow-hidden border transition-all hover:border-[#3d444d]"
          :class="expandedId === q.id ? 'border-brand/30' : ''"
        >
          <!-- Header row -->
          <button
            @click="toggle(q.id)"
            class="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-bg-elevated/50 transition-colors"
          >
            <span class="text-xs text-gray-600 font-mono w-5 shrink-0 text-center">{{ q.number }}</span>
            <div class="flex-1 min-w-0">
              <div class="font-medium text-sm text-white truncate">{{ q.title }}</div>
              <div class="flex items-center gap-2 mt-1">
                <CategoryBadge :category="q.category" />
                <span v-if="q.progress" class="text-xs" :class="masteryColor(q.progress?.masteryLevel)">
                  {{ masteryLabel(q.progress?.masteryLevel) }}
                </span>
              </div>
            </div>
            <svg
              class="w-4 h-4 text-gray-500 transition-transform shrink-0"
              :class="expandedId === q.id ? 'rotate-180' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Expanded content -->
          <div v-if="expandedId === q.id" class="border-t border-[#30363D] bg-bg-secondary">
            <!-- Key concepts -->
            <div class="px-4 pt-4 pb-2">
              <div class="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Ključni pojmovi</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="concept in q.keyConcepts"
                  :key="concept"
                  class="px-2 py-0.5 bg-brand/10 border border-brand/20 rounded text-xs text-brand"
                >
                  {{ concept }}
                </span>
              </div>
            </div>

            <!-- Full content -->
            <div class="px-4 pb-4 pt-3">
              <div class="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Objašnjenje</div>
              <div class="text-sm text-gray-300 whitespace-pre-line leading-relaxed">{{ q.content }}</div>
            </div>

            <!-- Progress stats -->
            <div v-if="q.progress" class="border-t border-[#30363D] px-4 py-3 flex items-center gap-4 text-xs text-gray-500">
              <span>Pokušaja: <strong class="text-gray-300">{{ q.progress.totalAttempts }}</strong></span>
              <span>Točnih: <strong class="text-green-400">{{ q.progress.correctCount }}</strong></span>
              <span>Savladanost: <strong :class="masteryColor(q.progress.masteryLevel)">{{ masteryLabel(q.progress.masteryLevel) }}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
