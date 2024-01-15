import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

const BREAKPOINTS = {
  LABELS: ['base', 'xs', 'sm', 'md', 'lg', 'xl'],
  VALUES: [0, 480, 768, 992, 1280, 1536]
}
// FUNCTION TO MONITOR BREAKPOINTS SIZES
export function useMonitorSize() {
  const sizes = reactive({
    base: false,
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
  })

  const updateSizes = () => {
    const width = window.innerWidth

    sizes.base = width < BREAKPOINTS.VALUES[1]
    sizes.xs = width >= BREAKPOINTS.VALUES[1] && width < BREAKPOINTS.VALUES[2]
    sizes.sm = width >= BREAKPOINTS.VALUES[2] && width < BREAKPOINTS.VALUES[3]
    sizes.md = width >= BREAKPOINTS.VALUES[3] && width < BREAKPOINTS.VALUES[4]
    sizes.lg = width >= BREAKPOINTS.VALUES[4] && width < BREAKPOINTS.VALUES[5]
    sizes.xl = width >= BREAKPOINTS.VALUES[5]
  }

  onMounted(() => {
    window.addEventListener('resize', updateSizes)
    updateSizes() // INITIAL CALL
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSizes)
  })

  return {
    ...toRefs(sizes),
    BREAKPOINTS
  }
}
