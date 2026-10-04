import { useRef, useEffect, useState, useMemo } from 'react'
import ProjectMarqueeCard from './ProjectMarqueeCard'
import '../styles/InfiniteMarquee.css'

/**
 * InfiniteProjectMarquee
 * Dual-row continuous horizontal project showcase inspired by Unfold / Mobbin.
 * - Row 1: Moves Right to Left
 * - Row 2: Moves Left to Right
 * - Seamless zero-jump loop with duplicate tracks
 * - Smooth deceleration on hover (no abrupt stop)
 * - Cursor proximity scaling on desktop
 * - Pauses execution when offscreen via IntersectionObserver
 * - Automatically respects prefers-reduced-motion
 */
export default function InfiniteProjectMarquee({
  row1Images = [],
  row2Images = [],
  onSelectImage,
}) {
  const containerRef = useRef(null)
  const track1Ref = useRef(null)
  const track2Ref = useRef(null)

  const [isHovered, setIsHovered] = useState(false)
  const [proximityCard, setProximityCard] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Ensure duplicate lists for seamless infinite looping
  const doubledRow1 = useMemo(() => {
    if (!row1Images.length) return []
    return [...row1Images, ...row1Images, ...row1Images]
  }, [row1Images])

  const doubledRow2 = useMemo(() => {
    if (!row2Images.length) return []
    return [...row2Images, ...row2Images, ...row2Images]
  }, [row2Images])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Smooth continuous animation engine with easing deceleration
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animId
    let isVisible = true

    // Track 1 (Right to Left) and Track 2 (Left to Right)
    let pos1 = 0
    let pos2 = 0
    let currentSpeed = 1.0

    // Measure single set width for seamless wrap
    let setWidth1 = 0
    let setWidth2 = 0

    const updateDimensions = () => {
      if (track1Ref.current && row1Images.length) {
        // Width of one full sequence of row1
        const totalW = track1Ref.current.scrollWidth
        setWidth1 = totalW / 3
      }
      if (track2Ref.current && row2Images.length) {
        const totalW = track2Ref.current.scrollWidth
        setWidth2 = totalW / 3
        if (pos2 === 0) {
          pos2 = -setWidth2
        }
      }
    }

    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) resizeObserver.observe(containerRef.current)

    // Visibility observer to pause RAF when off-screen
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
        // Target speed: normal is 0.85px/frame; hovered is 0.18px/frame (significantly slowed, not stopped)
        const baseSpeed = isMobile ? 0.65 : 0.85
        const slowSpeed = isMobile ? 0.2 : 0.22
        const targetSpeed = isHovered ? slowSpeed : baseSpeed

        // Smooth velocity interpolation (inertial easing)
        currentSpeed += (targetSpeed - currentSpeed) * 0.06

        const step = currentSpeed * delta

        // Row 1: Right to Left
        pos1 -= step
        if (setWidth1 > 0 && Math.abs(pos1) >= setWidth1) {
          pos1 += setWidth1
        }
        if (track1Ref.current) {
          track1Ref.current.style.transform = `translate3d(${pos1}px, 0, 0)`
        }

        // Row 2: Left to Right
        pos2 += step
        if (setWidth2 > 0 && pos2 >= 0) {
          pos2 -= setWidth2
        }
        if (track2Ref.current) {
          track2Ref.current.style.transform = `translate3d(${pos2}px, 0, 0)`
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
  }, [doubledRow1.length, doubledRow2.length, isHovered, isMobile, row1Images.length, row2Images.length])

  // Cursor Proximity Effect (Desktop only)
  const handleMouseMove = (e) => {
    if (isMobile) return

    const mouseX = e.clientX
    const mouseY = e.clientY

    // Find card closest to cursor in the marquee rows
    const cards = containerRef.current?.querySelectorAll('.project-marquee-card')
    if (!cards || cards.length === 0) return

    let closestCard = null
    let minDistance = 240 // Proximity radius in px

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect()
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2
      const dist = Math.hypot(mouseX - cardCenterX, mouseY - cardCenterY)

      if (dist < minDistance) {
        minDistance = dist
        closestCard = index
      }
    })

    setProximityCard(closestCard)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setProximityCard(null)
  }

  return (
    <div
      ref={containerRef}
      className={`infinite-marquee-section ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Continuous Project Screenshots Showcase"
    >
      {/* Edge gradient scrims for seamless bleed into background */}
      <div className="marquee-edge-fade left" aria-hidden="true" />
      <div className="marquee-edge-fade right" aria-hidden="true" />

      {/* ROW 1: Moves continuously from Right to Left */}
      <div className="marquee-row-wrapper" aria-label="Row 1: Application Modules">
        <div ref={track1Ref} className="marquee-track row-1">
          {doubledRow1.map((img, idx) => (
            <ProjectMarqueeCard
              key={`row1-${img.id || img.tag}-${idx}`}
              image={img}
              index={idx % (row1Images.length || 1)}
              onSelect={onSelectImage}
              scaleModifier={proximityCard === idx ? 1.04 : 1}
            />
          ))}
        </div>
      </div>

      {/* ROW 2: Moves continuously from Left to Right */}
      <div className="marquee-row-wrapper" aria-label="Row 2: Security & Governance Modules">
        <div ref={track2Ref} className="marquee-track row-2">
          {doubledRow2.map((img, idx) => (
            <ProjectMarqueeCard
              key={`row2-${img.id || img.tag}-${idx}`}
              image={img}
              index={(idx % (row2Images.length || 1)) + (row1Images.length || 0)}
              onSelect={onSelectImage}
              scaleModifier={proximityCard === idx + doubledRow1.length ? 1.04 : 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
