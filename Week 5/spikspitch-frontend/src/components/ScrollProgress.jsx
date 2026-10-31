import { useEffect, useRef } from 'react'

// Thin game-style progress bar pinned to the top of the landing page.
export default function ScrollProgress() {
  const fill = useRef(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (fill.current) fill.current.style.transform = `scaleX(${p})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-3 border-b-3 border-black bg-black" aria-hidden="true">
      <div ref={fill} className="h-full origin-left bg-[var(--mint)]" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
