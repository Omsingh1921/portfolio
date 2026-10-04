import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

/**
 * AntigravityCanvas
 * Interactive physics needle & particle field inspired by the Google Antigravity interface.
 * Particles respond to cursor coordinates with vector orientation, elastic displacement,
 * dynamic needle elongation, and a chromatic gradient (cyan -> violet -> rose).
 */
export default function AntigravityCanvas() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = 0
    let height = 0
    let dpr = window.devicePixelRatio || 1

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 220,
    }

    // Needle particles
    let particles = []
    const spacing = 36 // Grid spacing in px

    const initGrid = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      particles = []
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Slight jitter for an organic yet structured feel
          const jitterX = (Math.sin(c * 17 + r * 31) * spacing * 0.15)
          const jitterY = (Math.cos(c * 23 + r * 19) * spacing * 0.15)
          const originX = c * spacing + jitterX
          const originY = r * spacing + jitterY

          // Chromatic color based on horizontal position (Cyan -> Indigo/Violet -> Rose/Pink)
          const ratio = Math.max(0, Math.min(1, originX / (width || 1)))
          let activeColor
          if (ratio < 0.35) {
            // Cyan to Blue
            activeColor = '#06b6d4'
          } else if (ratio < 0.65) {
            // Indigo / Violet
            activeColor = '#8b5cf6'
          } else {
            // Pink / Rose
            activeColor = '#f43f5e'
          }

          particles.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            angle: 0,
            targetAngle: 0,
            length: 3,
            targetLength: 3,
            opacity: isDark ? 0.25 : 0.3,
            targetOpacity: isDark ? 0.25 : 0.3,
            activeColor,
            ratio,
          })
        }
      }
    }

    initGrid()

    // Handle mouse movement over hero container or window
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top

      if (
        clientX >= -50 &&
        clientX <= width + 50 &&
        clientY >= -50 &&
        clientY <= height + 50
      ) {
        mouse.targetX = clientX
        mouse.targetY = clientY
        mouse.active = true
      } else {
        mouse.active = false
      }
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        mouse.targetX = touch.clientX - rect.left
        mouse.targetY = touch.clientY - rect.top
        mouse.active = true
      }
    }

    const handleTouchEnd = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      initGrid()
    })
    resizeObserver.observe(canvas)

    // Animation loop with spring physics
    const render = () => {

      ctx.clearRect(0, 0, width, height)

      // Mouse smooth interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15
        mouse.y += (mouse.targetY - mouse.y) * 0.15
      } else {
        mouse.targetX = -1000
        mouse.targetY = -1000
        mouse.x += (mouse.targetX - mouse.x) * 0.05
        mouse.y += (mouse.targetY - mouse.y) * 0.05
      }

      // Draw subtle ambient cursor spotlight
      if (mouse.active && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const radial = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.2
        )
        if (isDark) {
          radial.addColorStop(0, 'rgba(6, 182, 212, 0.09)')
          radial.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)')
          radial.addColorStop(1, 'rgba(10, 13, 20, 0)')
        } else {
          radial.addColorStop(0, 'rgba(6, 182, 212, 0.08)')
          radial.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)')
          radial.addColorStop(1, 'rgba(250, 250, 250, 0)')
        }
        ctx.fillStyle = radial
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Base idle color
      const idleColor = isDark
        ? 'rgba(148, 163, 184, 0.28)'
        : 'rgba(100, 116, 139, 0.35)'

      // Update and draw each particle needle
      const count = particles.length
      for (let i = 0; i < count; i++) {
        const p = particles[i]

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.radius && mouse.active) {
          // Normalized force
          const force = (1 - dist / mouse.radius)
          const easeForce = force * force

          // Angle towards cursor
          p.targetAngle = Math.atan2(dy, dx)

          // Elongation as it gets closer
          p.targetLength = 4 + easeForce * 9 // Up to 13px

          // Slight repulsion displacement (Antigravity bounce)
          const pushDistance = easeForce * 14
          const pushX = p.originX - Math.cos(p.targetAngle) * pushDistance
          const pushY = p.originY - Math.sin(p.targetAngle) * pushDistance

          p.targetOpacity = Math.min(0.95, 0.35 + easeForce * 0.65)

          // Spring towards displaced target
          p.x += (pushX - p.x) * 0.12
          p.y += (pushY - p.y) * 0.12
        } else {
          // Return to rest
          p.targetLength = 3.5
          p.targetOpacity = isDark ? 0.24 : 0.3
          // Spring back to origin
          p.x += (p.originX - p.x) * 0.08
          p.y += (p.originY - p.y) * 0.08
        }

        // Interpolate angle & length
        // Shortest angle interpolation to prevent spinning full 360
        let angleDiff = p.targetAngle - p.angle
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
        p.angle += angleDiff * 0.14

        p.length += (p.targetLength - p.length) * 0.12
        p.opacity += (p.targetOpacity - p.opacity) * 0.12

        // Draw needle line
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)

        ctx.beginPath()
        const half = p.length / 2
        ctx.moveTo(-half, 0)
        ctx.lineTo(half, 0)

        ctx.lineCap = 'round'
        ctx.lineWidth = p.length > 5 ? 2 : 1.5

        if (dist < mouse.radius && mouse.active) {
          ctx.strokeStyle = p.activeColor
          ctx.globalAlpha = p.opacity
        } else {
          ctx.strokeStyle = idleColor
          ctx.globalAlpha = p.opacity
        }

        ctx.stroke()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      resizeObserver.disconnect()
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="antigravity-canvas"
      aria-hidden="true"
    />
  )
}
