type elType = HTMLDivElement & { handle: Function }

export const vClickOutside = {
  mounted(el: elType, { value: hideFunc }: any) {
    el.handle = (e: MouseEvent) => {
      if (!el.contains(e.target as any)) {
        hideFunc()
      }
    }
    document.addEventListener('click', el.handle as any)
  },
  unmounted(el: elType) {
    document.removeEventListener('click', el.handle as any)
  }
}
