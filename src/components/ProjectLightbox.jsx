import { useEffect } from 'react'

export default function ProjectLightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onPrev()
      } else if (e.key === 'ArrowRight') {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen || !images.length) return null

  const safeIndex = ((currentIndex % images.length) + images.length) % images.length
  const currentImage = images[safeIndex] || images[0]

  return (
    <div
      className="project-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot Preview Lightbox"
    >
      <div
        className="project-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="lightbox-header-bar">
          <div className="lightbox-header-left">
            <span className="lightbox-app-title">SalesTracker — {currentImage.module || currentImage.tag}</span>
            <span className="lightbox-header-divider">•</span>
            <span className="lightbox-header-subtitle">{currentImage.title}</span>
          </div>

          <div className="lightbox-header-right">
            <div className="lightbox-counter-badge" aria-label={`Image ${safeIndex + 1} of ${images.length}`}>
              {safeIndex + 1} / {images.length}
            </div>

            <button
              type="button"
              className="lightbox-close-btn"
              onClick={onClose}
              aria-label="Close lightbox (ESC)"
              title="Close (ESC)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Viewport with Image & Floating Navigation Buttons */}
        <div className="lightbox-stage">
          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn prev"
              onClick={onPrev}
              aria-label="Previous screenshot (Left Arrow)"
              title="Previous (Left Arrow)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <div className="lightbox-image-wrap">
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="lightbox-img"
              loading="eager"
            />
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn next"
              onClick={onNext}
              aria-label="Next screenshot (Right Arrow)"
              title="Next (Right Arrow)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Bottom Navigation & Caption Bar */}
        <div className="lightbox-caption-bar">
          <div className="lightbox-caption-text">
            <div className="lightbox-meta-row">
              <span className="lightbox-module-pill">{currentImage.module || currentImage.tag}</span>
              {currentImage.roles && currentImage.roles.length > 0 && (
                <div className="lightbox-roles-pills">
                  <span className="lightbox-roles-label">RBAC Access:</span>
                  {currentImage.roles.map((r) => (
                    <span key={r} className="lightbox-role-tag">
                      {r.replace('ROLE_', '')}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="lightbox-caption-desc">{currentImage.caption}</p>
          </div>

          {/* Direct Navigation Controls */}
          {images.length > 1 && (
            <div className="lightbox-controls-group">
              <button
                type="button"
                className="lightbox-action-btn"
                onClick={onPrev}
                aria-label="Go to previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Previous</span>
              </button>

              <span className="lightbox-mini-counter">{safeIndex + 1} / {images.length}</span>

              <button
                type="button"
                className="lightbox-action-btn"
                onClick={onNext}
                aria-label="Go to next image"
              >
                <span>Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
