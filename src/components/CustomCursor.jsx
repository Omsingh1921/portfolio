import { useEffect, useRef, useState } from 'react'
import '../styles/CustomCursor.css'

/**
 * CustomCursor
 * Minimal custom pointer indicator with smooth lag interpolation,
 * subtle ring expansion over interactive elements, and complete mobile disablement.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Only enable if pointer is fine (mouse/trackpad, not touch)
    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }

    let animationFrameId
    const mouse = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      setIsVisible(true)

      // Direct placement for instant dot response
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      }

      // Check if target is interactive
      const target = e.target
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, [role="button"], .btn, .gallery-thumb-btn, .main-image-interactive, .skill-badge, .about-highlight-card, .timeline-card')
        )
        setIsHovered(isInteractive)
      }
    }

    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Smooth ring interpolation loop
    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isActive ? 'active' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isActive ? 'active' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}
