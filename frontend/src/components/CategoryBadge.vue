<script setup lang="ts">
defineProps<{ category: string }>()

const map: Record<string, { label: string; cls: string }> = {
  CRVENA: { label: 'Zagarantirana', cls: 'bg-red-500/15 text-red-400 border border-red-500/30' },
  NARANCASTA: { label: 'Visoka vjerojatnost', cls: 'bg-orange-500/15 text-orange-400 border border-orange-500/30' },
  ZUTA: { label: 'Srednja vjerojatnost', cls: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' },
  ZELENA: { label: 'Strateški izbor', cls: 'bg-green-500/15 text-green-400 border border-green-500/30' },
}
</script>

<template>
  <span class="badge" :class="map[category]?.cls ?? 'bg-gray-500/20 text-gray-400'">
    {{ map[category]?.label ?? category }}
  </span>
</template>
