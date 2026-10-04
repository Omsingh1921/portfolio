import React from 'react'

/**
 * ProjectMarqueeCard
 * Premium showcase card for continuous image marquee rows.
 * Features:
 * - 16:10 aspect ratio with object-fit: cover
 * - Top metadata tag: 'SALES TRACKER · SPRING BOOT + REACT'
 * - Hover state: subtle scale (~1.06), brightness boost, cyan border glow
 * - Overlay with module name and 'VIEW PROJECT →' badge
 */
export default function ProjectMarqueeCard({
  image,
  index,
  onSelect,
  scaleModifier = 1,
}) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(image, index)
    }
  }

  return (
    <div
      className="project-marquee-card interactive-card"
      onClick={handleClick}
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
      }}
    >
      <div className="marquee-card-inner">
        {/* Top Minimal Eyebrow Metadata */}
        <div className="marquee-card-meta">
          <span className="marquee-meta-brand">SALES TRACKER</span>
          <span className="marquee-meta-tech">SPRING BOOT + REACT</span>
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
            <span>VIEW PROJECT</span>
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
