<script setup>
import CloudIcon from './CloudIcon.vue'

defineProps({
  clouds: {
    type: Array,
    required: true,
  },
  front: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="parallax-bg" :class="{ 'parallax-bg--front': front }">
    <div
      v-for="(cloud, index) in clouds"
      :key="index"
      class="cloud-wrapper"
      :style="{ top: cloud.top, left: cloud.left }"
    >
      <div
        class="cloud"
        :class="cloud.opacity"
        :style="{
          animationDuration: cloud.duration,
          animationDelay: cloud.delay ?? undefined,
        }"
      >
        <CloudIcon :size="cloud.size" />
      </div>
    </div>
  </div>
</template>
