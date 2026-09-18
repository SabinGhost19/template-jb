import { onBeforeUnmount, onMounted } from 'vue'

/** Runs `handler` whenever the Escape key is pressed while the component is mounted. */
export function useEscapeKey(handler: () => void): void {
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') handler()
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}
