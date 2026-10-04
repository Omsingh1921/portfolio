import { useEffect, useRef, useState } from 'react'

/**
 * ScrollReveal
 * Lightweight, GPU-accelerated scroll reveal wrapper using IntersectionObserver.
 * Triggers opacity 0 -> 1 and translateY(20px) -> 0.
 * Automatically respects prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.12,
  direction = 'up',
  as: Component = 'div',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef(null)

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (domRef.current) observer.unobserve(domRef.current)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [threshold])

  const style = {
    transitionDelay: `${delay}ms`,
  }

  return (
    <Component
      ref={domRef}
      className={`scroll-reveal ${direction} ${isVisible ? 'revealed' : ''} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}
