<script setup>
defineProps({
  title: String,
  icon: Object,
  accent: String,
  barClass: String,
  skills: {
    type: Array,
    default: () => [],
  },
})

const accentTextClass = {
  primary: 'text-primary',
  'secondary-fixed': 'text-secondary-fixed',
  tertiary: 'text-tertiary',
  'on-surface-variant': 'text-on-surface-variant',
}
</script>

<template>
  <div class="glass-panel p-8 rounded-2xl space-y-6">
    <div class="flex items-center gap-4 mb-2">
      <div class="w-12 h-12 glass-panel rounded-full flex items-center justify-center">
        <FontAwesomeIcon :icon="icon" class="text-2xl" :class="accentTextClass[accent]" />
      </div>
      <h3 class="font-headline-sm text-headline-sm">{{ title }}</h3>
    </div>
    <div class="space-y-4">
      <div v-for="skill in skills" :key="skill.name" class="space-y-2">
        <div class="flex justify-between text-label-caps">
          <span>{{ skill.name }}</span>
          <span :class="accentTextClass[accent]">{{ skill.score }}/100</span>
        </div>
        <div class="w-full bg-white/10 rounded-full h-1">
          <div class="h-full rounded-full" :class="barClass" :style="{ width: `${skill.score}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>
