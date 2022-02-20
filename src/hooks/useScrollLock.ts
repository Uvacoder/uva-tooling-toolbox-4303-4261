import { useCallback } from "react"

export const useScrollLock = () => {
  const lock = useCallback(() => {
    document.body.classList.add("overflow-hidden")
  }, [])

  const unlock = useCallback(() => {
    document.body.classList.remove("overflow-hidden")
  }, [])

  return [lock, unlock]
}
