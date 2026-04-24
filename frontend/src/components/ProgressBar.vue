<script setup lang="ts">
defineProps<{ value: number; max: number; color?: string }>()
</script>

<template>
  <div class="w-full bg-bg-elevated rounded-full overflow-hidden h-1.5">
    <div
      class="h-full rounded-full transition-all duration-700"
      :style="{
        width: `${Math.min(100, (value / max) * 100)}%`,
        background: color ?? 'linear-gradient(90deg, #7C3AED, #8B5CF6)',
      }"
    />
  </div>
</template>
