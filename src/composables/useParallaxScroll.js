import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { clouds as cloudDefs } from '../data/portfolio.js'

const SUN_GRADIENT = {
  fromA: [0xfc, 0xbb, 0x04],
  toA: [0xff, 0x4d, 0x00],
  fromB: [0xff, 0xfc, 0x00],
  toB: [0xff, 0x8a, 0x3d],
}

const MOBILE_MAX_WIDTH = 768
const MOBILE_APPEARANCE_STEP = 0.03

function lerpRgb(from, to, amount) {
  const mix = (a, b) => Math.round(a + (b - a) * amount)
  return `rgb(${mix(from[0], to[0], amount)}, ${mix(from[1], to[1], amount)}, ${mix(from[2], to[2], amount)})`
}

function lerpChannel(from, to, amount) {
  return Math.round(from + (to - from) * amount)
}

function isMobileViewport() {
  return window.innerWidth < MOBILE_MAX_WIDTH
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

function getSunLayout(viewportWidth, portraitSize) {
  const isMobile = viewportWidth < MOBILE_MAX_WIDTH
  const isTablet = viewportWidth >= MOBILE_MAX_WIDTH && viewportWidth < 1024
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

function readFooterMidDocY(scrollY) {
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
  const scrollHintRef = ref(null)

  const { back: backClouds, front: frontClouds } = partitionCloudLayers(cloudDefs)

  let rafId = null
  let observer = null
  let fadeInObserver = null
  let portraitObserver = null
  let sunAnchors = null
  let cachedFooterMidDocY = null
  let cachedSunLayout = null
  let lastAppearanceP = -1
  let lastScrollY = 0
  let scrollDirection = 'down'

  function updateScrollDirection() {
    const scrollY = getScrollY()

    if (scrollY > lastScrollY) {
      scrollDirection = 'down'
    } else if (scrollY < lastScrollY) {
      scrollDirection = 'up'
    }

    lastScrollY = scrollY
  }

  function getFadeFromTop(entry) {
    const { boundingClientRect, rootBounds, isIntersecting } = entry

    if (!rootBounds) {
      return scrollDirection === 'up'
    }

    const rootMid = rootBounds.top + rootBounds.height / 2

    if (isIntersecting) {
      return boundingClientRect.top < rootMid
    }

    return boundingClientRect.bottom < rootMid
  }

  function applyFadeDirection(el, entry = null) {
    const fromTop = entry ? getFadeFromTop(entry) : scrollDirection === 'up'

    el.classList.toggle('fade-from-top', fromTop)
    el.classList.toggle('fade-from-bottom', !fromTop)
  }

  function setFadeVisibility(el, entry, visible) {
    applyFadeDirection(el, entry)

    if (!visible) {
      el.classList.remove('is-visible')
      return
    }

    el.classList.remove('is-visible')
    requestAnimationFrame(() => {
      el.classList.add('is-visible')
    })
  }

  function readPortraitSize() {
    if (!portraitRef.value) return null

    const { width, height } = portraitRef.value.getBoundingClientRect()
    return Math.max(width, height)
  }

  function refreshSunDimensions() {
    const portraitSize = readPortraitSize()
    cachedSunLayout = getSunLayout(window.innerWidth, portraitSize)

    if (sunRef.value) {
      sunRef.value.style.width = `${cachedSunLayout.size}px`
      sunRef.value.style.height = `${cachedSunLayout.size}px`
    }
  }

  function captureSunAnchors() {
    const scrollY = getScrollY()
    cachedFooterMidDocY = readFooterMidDocY(scrollY)
    const endDocY = cachedFooterMidDocY
    const endX = window.innerWidth / 2
    const portrait = portraitRef.value

    if (!portrait) {
      const layout = cachedSunLayout ?? getSunLayout(window.innerWidth, null)
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
    const footerViewportY = (cachedFooterMidDocY ?? scrollY + window.innerHeight * 0.75) - scrollY

    if (!sunAnchors) {
      const startY = window.innerHeight * layout.startTop / 100
      return {
        x: centerX,
        y: startY + (footerViewportY - startY) * p,
      }
    }

    const { startDocY, endDocY, startX, endX } = sunAnchors
    const docY = startDocY + (endDocY - startDocY) * p

    return {
      x: startX + (endX - startX) * p,
      y: docY - scrollY,
    }
  }

  function applySunAppearance(p, layout, force = false) {
    if (!force && isMobileViewport()) {
      if (Math.abs(p - lastAppearanceP) < MOBILE_APPEARANCE_STEP) return
    }

    lastAppearanceP = p

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

  function applyScrollHintOpacity(p) {
    const fadeStart = 0.88
    const opacity = p <= fadeStart ? 1 : Math.max(0, 1 - (p - fadeStart) / (1 - fadeStart))

    if (scrollHintRef.value) {
      scrollHintRef.value.style.opacity = String(opacity)
    }
  }

  function applyParallax(forceAppearance = false) {
    const scrollY = getScrollY()
    const p = Math.min(scrollY / getDocHeight(), 1)
    const layout = cachedSunLayout ?? getSunLayout(window.innerWidth, null)
    const { x: sunX, y: sunY } = getSunPosition(p, scrollY, window.innerWidth / 2, layout)

    if (sunRef.value) {
      const scale = layout.startScale + p * layout.scaleGrowth
      sunRef.value.style.transform =
        `translate3d(${sunX}px, ${sunY}px, 0) translate3d(-50%, -50%, 0) scale(${scale})`
    }

    applySunAppearance(p, layout, forceAppearance)
    applyScrollHintOpacity(p)
  }

  function onScroll() {
    updateScrollDirection()

    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
      applyParallax()
      rafId = null
    })
  }

  function onLayoutChange() {
    refreshSunDimensions()
    captureSunAnchors()
    lastAppearanceP = -1
    applyParallax(true)
  }

  function scrollToSection(id) {
    const behavior = isMobileViewport() ? 'auto' : 'smooth'
    document.getElementById(id)?.scrollIntoView({ behavior })
  }

  function observeFadeIn() {
    const targets = document.querySelectorAll('.animate-fade-in')

    if (!targets.length) return

    fadeInObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setFadeVisibility(entry.target, entry, entry.isIntersecting)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.15 },
    )

    for (const el of targets) {
      applyFadeDirection(el)
      fadeInObserver.observe(el)
    }
  }

  function observeSections(sectionIds) {
    const sectionVisibility = new Map(sectionIds.map((id) => [id, 0]))
    const sectionThresholds = isMobileViewport()
      ? [0, 0.5, 1]
      : [0, 0.1, 0.25, 0.5, 0.75, 1]

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          sectionVisibility.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          )
        }

        let bestId = activeSection.value
        let bestRatio = 0

        for (const id of sectionIds) {
          const ratio = sectionVisibility.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestRatio > 0) {
          activeSection.value = bestId
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: sectionThresholds },
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
    lastScrollY = getScrollY()
    refreshSunDimensions()
    captureSunAnchors()

    if (portraitRef.value) {
      portraitRef.value.addEventListener('load', onLayoutChange)
      portraitObserver = new ResizeObserver(onLayoutChange)
      portraitObserver.observe(portraitRef.value)
    }

    applyParallax(true)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onLayoutChange)
    portraitRef.value?.removeEventListener('load', onLayoutChange)
    portraitObserver?.disconnect()
    if (rafId !== null) cancelAnimationFrame(rafId)
    observer?.disconnect()
    fadeInObserver?.disconnect()
  })

  return {
    activeSection,
    sunRef,
    sunDiscRef,
    sunGlowRef,
    backClouds,
    frontClouds,
    portraitRef,
    scrollHintRef,
    scrollToSection,
    observeSections,
    observeFadeIn,
  }
}
