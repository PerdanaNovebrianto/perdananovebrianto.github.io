<script setup>
import { onMounted } from 'vue'
import { faChevronDown, faCircleCheck, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import CloudGroup from './components/CloudGroup.vue'
import ExperienceItem from './components/ExperienceItem.vue'
import SkillCard from './components/SkillCard.vue'
import { useParallaxScroll } from './composables/useParallaxScroll.js'
import {
  profile,
  contacts,
  // education,
  experiences,
  sections,
  skillCategories,
} from './data/portfolio.js'

const {
  activeSection,
  scrollHintOpacity,
  sunRef,
  sunDiscRef,
  sunGlowRef,
  backClouds,
  frontClouds,
  portraitRef,
  scrollToSection,
  observeSections,
  observeFadeIn,
} = useParallaxScroll()

const sectionIds = sections.map(({ id }) => id)

const NAV_LINK_ACTIVE =
  'font-label-caps text-headline-md text-primary font-bold border-primary'
const NAV_LINK_IDLE =
  'font-label-caps text-headline-md text-on-surface hover:text-primary transition-colors duration-300'

const navLinkClass = (id) => (activeSection.value === id ? NAV_LINK_ACTIVE : NAV_LINK_IDLE)

const educationAccentClass = {
  primary: 'bg-primary',
  'secondary-fixed': 'bg-secondary-fixed',
}

const openUrl = (url) => {
  window.open(url, '_blank')
}

onMounted(() => {
  observeSections(sectionIds)
  observeFadeIn()
})
</script>

<template>
  <div class="sky-layers" aria-hidden="true">
    <CloudGroup :clouds="backClouds" />
    <div ref="sunRef" id="parallax-sun">
      <div ref="sunGlowRef" class="sunshine" />
      <div ref="sunDiscRef" class="sun" />
    </div>
    <CloudGroup :clouds="frontClouds" front />
  </div>

  <header class="fixed top-0 w-full z-100 glass-panel glass-panel--header shadow-md">
    <div class="flex justify-center items-center px-gutter py-4 w-full max-w-container-max mx-auto">
      <nav class="flex gap-8 items-center" aria-label="Main navigation">
        <a
          v-for="section in sections"
          :key="section.id"
          href="#"
          :class="navLinkClass(section.id)"
          @click.prevent="scrollToSection(section.id)"
        >
          <FontAwesomeIcon :icon="section.icon" class="block md:hidden text-xl" />
          <div class="hidden md:block">{{ section.label }}</div>
        </a>
      </nav>
    </div>
  </header>

  <div
    class="fixed bottom-4 left-1/2 -translate-x-1/2 z-0 animate-bounce pointer-events-none transition-opacity duration-300"
    :style="{ opacity: scrollHintOpacity }"
    aria-hidden="true"
  >
    <FontAwesomeIcon :icon="faChevronDown" class="text-xl md:text-2xl text-white/60 text-shadow-sm" />
  </div>

  <main class="relative z-1">
    <section id="profile" class="min-h-screen flex flex-col justify-center items-center px-gutter text-center pt-20 pb-8">
      <div class="max-w-4xl space-y-stack-sm md:space-y-stack-md">
        <img
          ref="portraitRef"
          :src="profile.photo"
          alt="portrait"
          width="192"
          height="192"
          decoding="async"
          class="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/30 object-cover shadow-2xl mx-auto mb-stack-sm md:mb-stack-md"
        >
        <h1 class="font-display-md text-display-lg-mobile md:text-display-lg text-on-surface tracking-tighter text-shadow-sm">
          {{ profile.name }}
        </h1>
        <p class="font-headline-md text-headline-sm md:text-headline-md text-on-surface max-w-3xl mx-auto font-light text-shadow-sm">
          {{ profile.title }}
        </p>
        <div class="pt-stack-md flex flex-row gap-4 justify-center">
          <button
            type="button"
            class="w-full max-w-40 md:max-w-48 px-6 py-3 md:px-8 md:py-4 glass-panel rounded-lg font-bold cursor-pointer"
            @click="openUrl('https://github.com/PerdanaNovebrianto')"
          >
            Explore Work
          </button>
          <button
            type="button"
            class="w-full max-w-40 md:max-w-48 px-6 py-3 md:px-8 md:py-4 glass-panel rounded-lg font-bold cursor-pointer"
            @click="scrollToSection('contact')"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>

    <section id="experience" class="py-section-padding px-gutter max-w-container-max mx-auto relative">
      <div class="animate-fade-in text-center mb-20">
        <h2 class="font-headline-md text-display-md mb-4 text-shadow-sm">Work Experience</h2>
        <div class="w-20 h-1 bg-primary mx-auto rounded-full" />
      </div>
      <div class="relative space-y-12">
        <ExperienceItem
          v-for="(job, index) in experiences"
          :key="`${job.company}-${job.period}`"
          v-bind="job"
          :is-last="index === experiences.length - 1"
        />
      </div>
    </section>

    <section id="skills" class="py-section-padding px-gutter max-w-container-max mx-auto">
      <div class="animate-fade-in text-center mb-12">
        <h2 class="font-headline-md text-display-md mb-4 text-shadow-sm">Skills</h2>
        <div class="w-20 h-1 bg-primary mx-auto rounded-full" />
        <p class="text-headline-sm text-on-surface max-w-xl mx-auto mt-4">A refined skills along the journey.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <SkillCard
          v-for="category in skillCategories"
          :key="category.title"
          v-bind="category"
        />
      </div>
    </section>

    <!-- <section id="education" class="py-section-padding px-gutter">
      <div class="animate-fade-in text-center mb-20">
        <h2 class="font-headline-md text-display-md mb-4 text-shadow-sm">Education</h2>
        <div class="w-20 h-1 bg-primary mx-auto rounded-full" />
      </div>
      <div class="max-w-4xl mx-auto glass-panel p-12 rounded-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
          <FontAwesomeIcon :icon="faGraduationCap" class="text-6xl" />
        </div>
        <div class="space-y-12">
          <div v-for="item in education" :key="item.degree" class="flex gap-6">
            <div class="w-1 h-auto rounded-full" :class="educationAccentClass[item.accent]" />
            <div>
              <h3 class="font-headline-sm text-headline-sm">{{ item.degree }}</h3>
              <p class="text-on-surface-variant">{{ item.school }}</p>
              <p class="text-body-md mt-4 opacity-70 italic">{{ item.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section id="contact" class="py-section-padding px-gutter max-w-container-max mx-auto">
      <div class="animate-fade-in text-center mb-12">
        <h2 class="font-headline-md text-display-md mb-4 text-shadow-sm">Contact</h2>
        <div class="w-20 h-1 bg-primary mx-auto rounded-full" />
      </div>
      <div class="relative z-10 max-w-container-max mx-auto w-full">
        <div class="space-y-stack-xl text-center mx-auto max-w-4xl glass-panel animate-fade-in rounded-xl p-6 md:p-8">
          <p class="text-body-lg text-on-surface/80 mb-8">
            Ready to start a project together? Whether you have a clear vision or just a spark of an idea, I'm here to bring it to life.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="contact in contacts"
              :key="contact.label"
              type="button"
              class="flex items-center gap-4 w-full max-w-sm text-left glass-panel p-4 rounded-xl cursor-pointer"
              @click="openUrl(contact.value)"
            >
              <div class="min-w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon :icon="contact.icon" class="text-secondary text-xl" />
              </div>
              <div>
                <p class="text-label-caps font-bold text-secondary">{{ contact.label }}</p>
                <p class="text-body-sm md:text-body-md break-all">{{ contact.title }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="waves" aria-hidden="true">
      <svg class="w-full h-full" preserveAspectRatio="none" shape-rendering="auto" viewBox="0 24 150 28" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax-wave">
          <use fill="rgba(0,40,91,0.7)" x="48" href="#gentle-wave" y="0" />
          <use fill="rgba(0,68,147,0.5)" x="48" href="#gentle-wave" y="3" />
          <use fill="rgba(0,91,192,0.3)" x="48" href="#gentle-wave" y="5" />
          <use fill="#0b0f10" x="48" href="#gentle-wave" y="7" />
        </g>
      </svg>
    </div>
  </footer>
</template>
