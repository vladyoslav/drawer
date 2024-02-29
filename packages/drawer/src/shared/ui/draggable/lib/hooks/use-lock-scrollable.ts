// export const useLockScrollable = (root: RefObject<HTMLElement>) => {
//   const lock = (target: HTMLElement) => {
//     if (!root.current) return
//
//     lockScrollableParents(target, root.current)
//   }
//
//   const unclock = (target: HTMLElement) => {
//     if (!root.current) return
//
//     unlockScrollableParents(target, root.current)
//   }
//
//   return [lock, unclock] as const
// }
