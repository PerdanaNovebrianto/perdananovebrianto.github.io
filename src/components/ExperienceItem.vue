<script setup>
defineProps({
  period: String,
  title: String,
  company: String,
  description: String,
  accent: String,
  icon: Object,
  align: {
    type: String,
    default: 'left',
  },
})

const accentMap = {
  primary: { badge: 'bg-primary text-on-primary', label: 'text-primary' },
  'secondary-fixed': { badge: 'bg-secondary-fixed text-on-secondary', label: 'text-secondary-fixed' },
  tertiary: { badge: 'bg-tertiary text-on-tertiary', label: 'text-tertiary' },
}
</script>

<template>
  <div class="relative flex flex-col md:flex-row items-center justify-between w-full">
    <div
      v-if="align === 'left'"
      class="w-full md:w-5/12 order-2 md:order-1"
    >
      <div class="glass-panel p-stack-lg rounded-xl hover:translate-y-[-5px] transition-transform duration-300">
        <span class="font-label-caps text-label-caps mb-2 block" :class="accentMap[accent].label">{{ period }}</span>
        <h3 class="font-headline-sm text-headline-sm mb-1">{{ title }}</h3>
        <p class="text-on-surface-variant font-bold mb-4">{{ company }}</p>
        <p class="text-body-md opacity-80">{{ description }}</p>
      </div>
    </div>
    <div v-else class="w-full md:w-5/12 order-1" />

    <div
      class="z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full order-2"
      :class="accentMap[accent].badge"
    >
      <FontAwesomeIcon :icon="icon" class="text-sm" />
    </div>

    <div
      v-if="align === 'right'"
      class="w-full md:w-5/12 order-2 md:order-3"
    >
      <div class="glass-panel p-stack-lg rounded-xl hover:translate-y-[-5px] transition-transform duration-300">
        <span class="font-label-caps text-label-caps mb-2 block" :class="accentMap[accent].label">{{ period }}</span>
        <h3 class="font-headline-sm text-headline-sm mb-1">{{ title }}</h3>
        <p class="text-on-surface-variant font-bold mb-4">{{ company }}</p>
        <p class="text-body-md opacity-80">{{ description }}</p>
      </div>
    </div>
    <div v-else class="w-full md:w-5/12 order-1 md:order-3" />
  </div>
</template>
