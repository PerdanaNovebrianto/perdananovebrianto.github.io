<script setup>
defineProps({
  period: String,
  title: String,
  company: String,
  description: Array,
  accent: String,
  icon: Object,
  align: {
    type: String,
    default: 'left',
  },
  isLast: {
    type: Boolean,
    default: false,
  },
})

const accentMap = {
  primary: { badge: 'bg-primary text-on-primary', label: 'text-primary' },
  'secondary-fixed': { badge: 'bg-secondary-fixed text-on-secondary', label: 'text-secondary-fixed' },
  tertiary: { badge: 'bg-tertiary text-on-tertiary', label: 'text-tertiary' },
}
</script>

<template>
  <div class="relative w-full">
    <div
      v-if="!isLast"
      class="absolute hidden md:block top-4 left-1/2 -translate-x-1/2 w-px bg-white/60 h-[calc(100%+3rem)]"
      aria-hidden="true"
    />

    <div class="md:grid md:grid-cols-[minmax(0,5fr)_auto_minmax(0,5fr)] md:items-start md:gap-x-8">
      <div
        class="glass-panel p-stack-lg rounded-xl"
        :class="align === 'left' ? 'md:col-start-1 md:row-start-1' : 'md:col-start-3 md:row-start-1'"
      >
        <span class="font-label-caps text-label-caps mb-2 block" :class="accentMap[accent].label">{{ period }}</span>
        <h3 class="font-headline-sm text-headline-md mb-1">{{ title }}</h3>
        <p class="text-on-surface-variant text-headline-sm font-bold mb-4">{{ company }}</p>
        <ul class="list-disc list-outside pl-4">
          <li v-for="item in description" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div
        class="hidden md:flex items-center justify-center w-8 h-8 rounded-full md:col-start-2 md:row-start-1 md:justify-self-center relative z-10"
        :class="accentMap[accent].badge"
      >
        <FontAwesomeIcon :icon="icon" class="text-sm" />
      </div>
    </div>
  </div>
</template>
