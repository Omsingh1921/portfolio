import { useState, useRef } from 'react'

/**
 * ProjectMarqueeCard
 * Premium showcase card for continuous image marquee tracks.
 * Features:
 * - 16:10 aspect ratio with object-fit: cover
 * - Smooth subtle 3D tilt on pointer move (safe performance angle max ±4 deg)
 * - Hover state: subtle scale (~1.03), brightness boost, cyan border glow
 * - Dynamic metadata from project data
 * - Keyboard accessible
 */
export default function ProjectMarqueeCard({
  image,
  index,
  onSelect,
  scaleModifier = 1,
  isSelected = false,
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    // Subtle tilt: max ±3.5 degrees for smooth elegance without performance overhead
    const rx = ((y - centerY) / centerY) * -3.5
    const ry = ((x - centerX) / centerX) * 3.5
    setTilt({ rx: parseFloat(rx.toFixed(2)), ry: parseFloat(ry.toFixed(2)) })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  const handleClick = () => {
    if (onSelect) {
      onSelect(image, index)
    }
  }

  const projectName = image.projectName || 'SALES TRACKER'
  const techStack = image.techStack || 'SPRING BOOT + REACT'

  return (
    <div
      ref={cardRef}
      className={`project-marquee-card interactive-card ${isSelected ? 'is-selected' : ''}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`View ${image.title || image.tag || 'Project Screenshot'}`}
      style={{
        '--proximity-scale': scaleModifier,
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${isSelected ? 1.03 : scaleModifier})`,
      }}
    >
      <div className="marquee-card-inner">
        {/* Top Minimal Eyebrow Metadata */}
        <div className="marquee-card-meta">
          <span className="marquee-meta-brand">{projectName}</span>
          <span className="marquee-meta-tech">{techStack}</span>
        </div>

        {/* Screenshot Image Frame */}
        <div className="marquee-card-img-wrap">
          <img
            src={image.src}
            alt={image.title || image.tag || 'Project Interface'}
            className="marquee-card-img"
            loading="lazy"
            decoding="async"
          />
          <div className="marquee-card-scrim" aria-hidden="true" />
        </div>

        {/* Bottom Overlay with Title & Action */}
        <div className="marquee-card-footer">
          <div className="marquee-footer-info">
            <span className="marquee-module-tag">{image.tag || image.module || 'Overview'}</span>
            <h4 className="marquee-module-title">{image.title || image.tag}</h4>
          </div>
          <div className="marquee-view-badge">
            <span>INSPECT</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
