import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { clouds as cloudDefs } from '../data/portfolio.js'

const SUN_GRADIENT = {
  fromA: [0xfc, 0xbb, 0x04],
  toA: [0xff, 0x4d, 0x00],
  fromB: [0xff, 0xfc, 0x00],
  toB: [0xff, 0x8a, 0x3d],
}

function lerpRgb(from, to, amount) {
  const mix = (a, b) => Math.round(a + (b - a) * amount)
  return `rgb(${mix(from[0], to[0], amount)}, ${mix(from[1], to[1], amount)}, ${mix(from[2], to[2], amount)})`
}

function lerpChannel(from, to, amount) {
  return Math.round(from + (to - from) * amount)
}

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

function getDocHeight() {
  return Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
}

function clamp(min, value, max) {
  return Math.min(Math.max(value, min), max)
}

/** Sun size & layout; base size from portrait when available, else viewport fallback. */
function getSunLayout(viewportWidth, portraitSize) {
  const isMobile = viewportWidth < 768
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024
  const maxClamp = isMobile ? 100 : isTablet ? 110 : 120
  const size = portraitSize ? clamp(72, portraitSize, maxClamp) : clamp(72, viewportWidth * 0.1, maxClamp)

  return {
    size,
    startTop: isMobile ? 10 : isTablet ? 13 : 15,
    startScale: isMobile ? 1.1 : 1.4,
    scaleGrowth: isMobile ? 2.2 : 2.8,
    glowBlur: size * 0.33,
  }
}

function getFooterMidDocY(scrollY) {
  const footer = document.querySelector('footer')
  if (!footer) {
    return scrollY + window.innerHeight * 0.75
  }

  const rect = footer.getBoundingClientRect()
  if (rect.height > 0) {
    return rect.top + scrollY + rect.height / 2
  }

  const waves = footer.querySelector('.waves')
  if (waves) {
    const wavesRect = waves.getBoundingClientRect()
    return wavesRect.top + scrollY + wavesRect.height / 2
  }

  return rect.top + scrollY
}

function assignCloudLayers(defs) {
  const layered = defs.map((cloud) => ({
    ...cloud,
    inFront: Math.random() < 0.5,
  }))

  const minFront = Math.min(2, layered.length)
  const minBack = Math.min(1, layered.length - minFront)
  let frontCount = 0

  for (const cloud of layered) {
    if (cloud.inFront) frontCount += 1
  }

  while (frontCount < minFront) {
    const cloud = layered[Math.floor(Math.random() * layered.length)]
    if (!cloud.inFront) {
      cloud.inFront = true
      frontCount += 1
    }
  }

  while (layered.length - frontCount < minBack) {
    const cloud = layered[Math.floor(Math.random() * layered.length)]
    if (cloud.inFront) {
      cloud.inFront = false
      frontCount -= 1
    }
  }

  return layered
}

function partitionCloudLayers(defs) {
  const back = []
  const front = []

  for (const cloud of assignCloudLayers(defs)) {
    if (cloud.inFront) front.push(cloud)
    else back.push(cloud)
  }

  return { back, front }
}

export function useParallaxScroll() {
  const activeSection = ref('profile')

  const sunRef = ref(null)
  const sunDiscRef = ref(null)
  const sunGlowRef = ref(null)
  const portraitRef = ref(null)

  const { back: backClouds, front: frontClouds } = partitionCloudLayers(cloudDefs)

  let rafId = null
  let observer = null
  let portraitObserver = null
  /** Frozen start/end in document space; converted to viewport Y on each frame. */
  let sunAnchors = null

  function getPortraitSize() {
    if (!portraitRef.value) return null

    const { width, height } = portraitRef.value.getBoundingClientRect()
    return Math.max(width, height)
  }

  function captureSunAnchors() {
    const scrollY = getScrollY()
    const endDocY = getFooterMidDocY(scrollY)
    const endX = window.innerWidth / 2
    const portrait = portraitRef.value

    if (!portrait) {
      const layout = getSunLayout(window.innerWidth, null)
      sunAnchors = {
        startDocY: scrollY + window.innerHeight * layout.startTop / 100,
        endDocY,
        startX: endX,
        endX,
      }
      return
    }

    const rect = portrait.getBoundingClientRect()
    sunAnchors = {
      startDocY: rect.top + scrollY + rect.height / 2,
      endDocY,
      startX: rect.left + rect.width / 2,
      endX,
    }
  }

  function getSunPosition(p, scrollY, centerX, layout) {
    if (!sunAnchors) {
      const startY = window.innerHeight * layout.startTop / 100
      const endY = getFooterMidDocY(scrollY) - scrollY
      return {
        left: centerX,
        top: startY + (endY - startY) * p,
      }
    }

    const { startDocY, endDocY, startX, endX } = sunAnchors
    const docY = startDocY + (endDocY - startDocY) * p

    return {
      left: startX + (endX - startX) * p,
      top: docY - scrollY,
    }
  }

  function applyParallax() {
    const scrollY = getScrollY()
    const p = Math.min(scrollY / getDocHeight(), 1)
    const centerX = window.innerWidth / 2
    const layout = getSunLayout(window.innerWidth, getPortraitSize())
    const { left: sunX, top: sunY } = getSunPosition(p, scrollY, centerX, layout)

    if (sunRef.value) {
      const scale = layout.startScale + p * layout.scaleGrowth

      sunRef.value.style.width = `${layout.size}px`
      sunRef.value.style.height = `${layout.size}px`
      sunRef.value.style.left = `${sunX}px`
      sunRef.value.style.top = `${sunY}px`
      sunRef.value.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`
    }

    const colorStart = lerpRgb(SUN_GRADIENT.fromA, SUN_GRADIENT.toA, p)
    const colorEnd = lerpRgb(SUN_GRADIENT.fromB, SUN_GRADIENT.toB, p)
    const gradient = `linear-gradient(to right, ${colorStart}, ${colorEnd})`
    const glowSize = layout.glowBlur * (1 + p * 1.5)

    if (sunDiscRef.value) {
      sunDiscRef.value.style.background = gradient
      sunDiscRef.value.style.boxShadow = `0 0 ${glowSize}px rgba(255, ${lerpChannel(200, 90, p)}, ${lerpChannel(0, 20, p)}, ${0.6 + p * 0.2})`
    }
    if (sunGlowRef.value) {
      sunGlowRef.value.style.background = gradient
    }
  }

  function onScroll() {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
      applyParallax()
      rafId = null
    })
  }

  function onLayoutChange() {
    captureSunAnchors()
    applyParallax()
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function observeSections(sectionIds) {
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          activeSection.value = visible[0].target.id
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  }

  onMounted(async () => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onLayoutChange, { passive: true })

    await nextTick()
    captureSunAnchors()

    if (portraitRef.value) {
      portraitRef.value.addEventListener('load', onLayoutChange)
      portraitObserver = new ResizeObserver(onLayoutChange)
      portraitObserver.observe(portraitRef.value)
    }

    applyParallax()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onLayoutChange)
    portraitRef.value?.removeEventListener('load', onLayoutChange)
    portraitObserver?.disconnect()
    if (rafId !== null) cancelAnimationFrame(rafId)
    observer?.disconnect()
  })

  return {
    activeSection,
    sunRef,
    sunDiscRef,
    sunGlowRef,
    backClouds,
    frontClouds,
    portraitRef,
    scrollToSection,
    observeSections,
  }
}
