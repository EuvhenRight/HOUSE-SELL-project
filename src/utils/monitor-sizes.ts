import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

const BREAKPOINTS = {
  LABELS: ['xs', 'sm', 'md', 'lg', 'xl'],
  VALUES: [375, 768, 1024, 1280, 1536]
}
// function to monitor window size
export function useMonitorSize() {
  const sizes = reactive({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
  })

  const updateSizes = () => {
    const width = window.innerWidth

    sizes.xs = width < BREAKPOINTS.VALUES[1]
    sizes.sm = width >= BREAKPOINTS.VALUES[1] && width < BREAKPOINTS.VALUES[2]
    sizes.md = width >= BREAKPOINTS.VALUES[2] && width < BREAKPOINTS.VALUES[3]
    sizes.lg = width >= BREAKPOINTS.VALUES[3] && width < BREAKPOINTS.VALUES[4]
    sizes.xl = width >= BREAKPOINTS.VALUES[4]
  }

  onMounted(() => {
    window.addEventListener('resize', updateSizes)
    updateSizes() // Initial sizing
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSizes)
  })

  return {
    ...toRefs(sizes),
    BREAKPOINTS
  }
}
