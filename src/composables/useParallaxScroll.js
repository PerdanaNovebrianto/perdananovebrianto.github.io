import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'

export function useParallaxScroll() {
  const scrollY = ref(0)
  const docHeight = ref(1)
  const activeSection = ref('profile')
  const prefersReducedMotion = shallowRef(false)

  let rafId = null
  let observer = null

  const scrollPercent = computed(() =>
    docHeight.value > 0 ? Math.min(scrollY.value / docHeight.value, 1) : 0,
  )

  const sunStyle = computed(() => {
    if (prefersReducedMotion.value) {
      return {
        top: '15%',
        background: 'radial-gradient(circle, #FDE68A 0%, rgba(253, 230, 138, 0) 70%)',
        transform: 'translateX(-50%) scale(1)',
        boxShadow: '0 0 80px rgba(253, 230, 138, 0.3)',
      }
    }

    const p = scrollPercent.value
    const sunY = 15 + p * 60
    const r = Math.round(253 + (249 - 253) * p)
    const g = Math.round(230 + (115 - 230) * p)
    const b = Math.round(138 + (22 - 138) * p)
    const scale = 1 + p * 1.5
    const sunColor = `rgb(${r}, ${g}, ${b})`

    return {
      top: `${sunY}%`,
      background: `radial-gradient(circle, ${sunColor} 0%, rgba(${r},${g},${b},0) 75%)`,
      transform: `translateX(-50%) scale(${scale})`,
      boxShadow: `0 0 ${80 * scale}px rgba(${r}, ${g}, ${b}, 0.4)`,
    }
  })

  function cloudStyle(index) {
    if (prefersReducedMotion.value) return undefined
    return { transform: `translateY(${scrollY.value * (index + 1) * 0.2}px)` }
  }

  function onScroll() {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
      scrollY.value = window.scrollY
      rafId = null
    })
  }

  function onResize() {
    docHeight.value = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    )
    onScroll()
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

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }

  onMounted(() => {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    docHeight.value = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    )

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    onResize()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    if (rafId !== null) cancelAnimationFrame(rafId)
    observer?.disconnect()
  })

  return {
    activeSection,
    sunStyle,
    cloudStyle,
    scrollToSection,
    observeSections,
  }
}
