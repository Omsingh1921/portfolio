import { useRef, useEffect, useState, useMemo } from 'react'
import ProjectMarqueeCard from './ProjectMarqueeCard'
import '../styles/DashboardSingleMarquee.css'

/**
 * DashboardSingleMarquee
 * Single-direction continuous horizontal project screenshot stream
 * confined strictly to the SalesTracker dashboard showcase container.
 * - Single direction: Right to Left
 * - Zero jump seamless infinite loop
 * - Smooth deceleration on hover
 * - Fullscreen lightbox on card click
 */
export default function DashboardSingleMarquee({
  images = [],
  onSelectImage,
}) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Tripled images list for seamless loop wrapping
  const loopedImages = useMemo(() => {
    if (!images.length) return []
    return [...images, ...images, ...images]
  }, [images])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animId
    let isVisible = true
    let pos = 0
    let currentSpeed = 0.85
    let singleSetWidth = 0

    const updateDimensions = () => {
      if (trackRef.current && images.length) {
        const totalW = trackRef.current.scrollWidth
        singleSetWidth = totalW / 3
      }
    }

    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) resizeObserver.observe(containerRef.current)

    const visObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    if (containerRef.current) visObserver.observe(containerRef.current)

    let lastTime = performance.now()

    const loop = (now) => {
      const delta = Math.min((now - lastTime) / 16.667, 2.5)
      lastTime = now

      if (isVisible) {
        const baseSpeed = isMobile ? 0.6 : 0.85
        const slowSpeed = 0.15
        const targetSpeed = isHovered ? slowSpeed : baseSpeed

        currentSpeed += (targetSpeed - currentSpeed) * 0.08
        const step = currentSpeed * delta

        pos -= step
        if (singleSetWidth > 0 && Math.abs(pos) >= singleSetWidth) {
          pos += singleSetWidth
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${pos}px, 0, 0)`
        }
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      visObserver.disconnect()
    }
  }, [images.length, isHovered, isMobile])

  return (
    <div
      ref={containerRef}
      className={`dashboard-marquee-wrapper ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Continuous Dashboard Module Showcase"
    >
      {/* Edge gradient scrims inside the dashboard container */}
      <div className="dash-marquee-fade left" aria-hidden="true" />
      <div className="dash-marquee-fade right" aria-hidden="true" />

      {/* Single-direction scrolling track */}
      <div className="dash-marquee-track-container">
        <div ref={trackRef} className="dash-marquee-track">
          {loopedImages.map((img, idx) => (
            <ProjectMarqueeCard
              key={`dash-card-${img.id || img.tag}-${idx}`}
              image={img}
              index={idx % (images.length || 1)}
              onSelect={onSelectImage}
              scaleModifier={1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
