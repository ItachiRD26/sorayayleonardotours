// src/hooks/useScrollToTop.ts
"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function useScrollToTop(targetPath: string) {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith(targetPath)) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [pathname, targetPath])
}
