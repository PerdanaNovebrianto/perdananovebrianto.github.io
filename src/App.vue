<script setup>
import { onMounted } from 'vue'
import { faChevronDown, faCircleCheck, faCloud, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import ExperienceItem from './components/ExperienceItem.vue'
import SkillCard from './components/SkillCard.vue'
import { useParallaxScroll } from './composables/useParallaxScroll.js'
import {
  clouds,
  contacts,
  credentials,
  education,
  experiences,
  portraitSrc,
  sections,
  skillCategories,
  socialLinks,
} from './data/portfolio.js'

const { activeSection, sunStyle, cloudStyle, scrollToSection, observeSections } = useParallaxScroll()

const navLinkClass = (id) =>
  activeSection.value === id
    ? 'font-label-caps text-label-caps text-primary font-bold border-b-2 border-primary pb-1'
    : 'font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors duration-300'

const educationAccentClass = {
  primary: 'bg-primary',
  'secondary-fixed': 'bg-secondary-fixed',
}

onMounted(() => {
  observeSections(sections.map((section) => section.id))
})
</script>

<template>
  <div
    id="parallax-sun"
    :style="sunStyle"
  />

  <div class="parallax-bg overflow-hidden" aria-hidden="true">
    <div
      v-for="(cloud, index) in clouds"
      :key="index"
      class="cloud"
      :class="cloud.opacity"
      :style="{
        top: cloud.top,
        left: cloud.left,
        animationDuration: cloud.duration,
        animationDelay: cloud.delay ?? undefined,
        ...cloudStyle(index),
      }"
    >
      <FontAwesomeIcon :icon="faCloud" class="text-white" :style="{ fontSize: cloud.size }" />
    </div>
  </div>

  <nav class="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4" aria-label="Section navigation">
    <a
      v-for="section in sections"
      :key="section.id"
      href="#"
      class="section-dot"
      :class="{ active: activeSection === section.id }"
      :title="section.title"
      :aria-label="section.label"
      @click.prevent="scrollToSection(section.id)"
    />
  </nav>

  <header class="fixed top-0 w-full z-100 backdrop-blur-xl border-b border-white/30 bg-black/20">
    <div class="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
      <div class="font-headline-sm text-headline-sm tracking-tighter text-white font-bold">
        ADRIAN VOID
      </div>
      <nav class="hidden md:flex gap-8 items-center" aria-label="Main navigation">
        <a
          v-for="section in sections"
          :key="section.id"
          href="#"
          :class="navLinkClass(section.id)"
          @click.prevent="scrollToSection(section.id)"
        >
          {{ section.label }}
        </a>
      </nav>
      <button type="button" class="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps font-bold active:scale-95 transition-transform">
        Resume
      </button>
    </div>
  </header>

  <main class="relative z-10">
    <section id="profile" class="min-h-screen flex flex-col justify-center items-center px-gutter text-center pt-24">
      <div class="max-w-4xl space-y-stack-lg">
        <img
          :src="portraitSrc"
          alt="Adrian Void portrait"
          width="192"
          height="192"
          decoding="async"
          class="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/30 object-cover shadow-2xl mx-auto mb-stack-lg"
        >
        <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tighter text-shadow">
          ADRIAN VOID
        </h1>
        <p class="font-headline-md text-headline-sm md:text-headline-md text-on-surface/80 max-w-2xl mx-auto font-light">
          Designing Digital Odysseys at the intersection of technical precision and narrative storytelling.
        </p>
        <div class="pt-stack-lg flex flex-col md:flex-row gap-4 justify-center">
          <button type="button" class="px-8 py-4 bg-primary text-on-primary rounded-lg font-bold hover:bg-primary-container transition-all">
            Explore Work
          </button>
          <button type="button" class="px-8 py-4 glass-panel rounded-lg font-bold hover:bg-white/10 transition-all" @click="scrollToSection('contact')">
            Contact Me
          </button>
        </div>
      </div>
      <div class="absolute bottom-10 animate-bounce" aria-hidden="true">
        <FontAwesomeIcon :icon="faChevronDown" class="text-4xl text-white" />
      </div>
    </section>

    <section id="experience" class="py-section-padding px-gutter max-w-container-max mx-auto relative">
      <div class="text-center mb-24">
        <h2 class="font-headline-md text-headline-md mb-4 text-shadow">Work Experience</h2>
        <div class="w-20 h-1 bg-primary mx-auto rounded-full" />
      </div>
      <div class="relative space-y-12">
        <div class="absolute left-0 md:left-1/2 md:-translate-x-1/2 h-full w-px bg-white/20 hidden md:block" aria-hidden="true" />
        <ExperienceItem
          v-for="job in experiences"
          :key="job.title"
          v-bind="job"
        />
      </div>
    </section>

    <section id="skills" class="py-section-padding px-gutter max-w-container-max mx-auto">
      <div class="text-center mb-24">
        <h2 class="font-headline-md text-headline-md mb-4 text-shadow">Mastered Crafts</h2>
        <p class="text-body-lg text-on-surface-variant max-w-xl mx-auto">
          A blend of technical prowess and artistic intuition refined over a decade.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillCard
          v-for="category in skillCategories"
          :key="category.title"
          v-bind="category"
        />
      </div>
    </section>

    <section id="education" class="py-section-padding px-gutter">
      <div class="max-w-4xl mx-auto glass-panel p-12 rounded-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
          <FontAwesomeIcon :icon="faGraduationCap" class="text-9xl" />
        </div>
        <h2 class="font-headline-md text-headline-md mb-12 flex items-center gap-4 text-shadow">
          <FontAwesomeIcon :icon="faGraduationCap" class="text-primary" />
          Education &amp; Credentials
        </h2>
        <div class="space-y-12">
          <div v-for="item in education" :key="item.degree" class="flex gap-6">
            <div class="w-1 h-auto rounded-full" :class="educationAccentClass[item.accent]" />
            <div>
              <h3 class="font-headline-sm text-headline-sm">{{ item.degree }}</h3>
              <p class="text-on-surface-variant">{{ item.school }}</p>
              <p class="text-body-md mt-4 opacity-70 italic">{{ item.note }}</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
            <div v-for="credential in credentials" :key="credential" class="flex items-center gap-3">
              <FontAwesomeIcon :icon="faCircleCheck" class="text-primary" />
              <span class="text-body-md">{{ credential }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="py-section-padding px-gutter relative overflow-hidden flex items-center md:h-48">
      <div class="waves h-[200px] min-h-[200px]" aria-hidden="true">
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
      <div class="relative z-10 max-w-container-max mx-auto w-full">
        <div class="space-y-stack-lg text-center mx-auto max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10">
          <h2 class="font-display-lg text-headline-md text-secondary tracking-tight text-shadow">
            Let's Dive In
          </h2>
          <p class="text-body-lg text-on-surface/80">
            Ready to start a project together? Whether you have a clear vision or just a spark of an idea, I'm here to bring it to life.
          </p>
          <div class="space-y-6 pt-8 flex flex-col items-center">
            <div
              v-for="contact in contacts"
              :key="contact.label"
              class="flex items-center gap-4 w-full max-w-xs text-left glass-panel p-4 rounded-xl"
            >
              <div class="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon :icon="contact.icon" class="text-secondary text-xl" />
              </div>
              <div>
                <p class="text-label-caps font-bold text-secondary">{{ contact.label }}</p>
                <p class="text-body-lg">{{ contact.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-surface-container-lowest border-t border-white/10 w-full relative z-20">
    <div class="flex flex-col md:flex-row justify-between items-center px-gutter py-stack-lg w-full max-w-container-max mx-auto gap-stack-lg">
      <div class="font-headline-sm text-headline-sm text-on-surface font-bold">
        ADRIAN VOID
      </div>
      <div class="font-body-md text-body-md text-outline">
        © 2024 Adrian Void. All rights reserved.
      </div>
      <div class="flex gap-8">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.href"
          class="text-secondary-fixed hover:text-secondary-container transition-all hover:translate-y-[-2px] flex items-center gap-2"
        >
          <FontAwesomeIcon :icon="link.icon" class="text-sm" />
          {{ link.name }}
        </a>
      </div>
    </div>
  </footer>
</template>
