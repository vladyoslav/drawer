export const getMinConstraint = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const parent = el.parentNode as HTMLElement
  const parentRect = parent.getBoundingClientRect()

  return parentRect.height - rect.height
}
