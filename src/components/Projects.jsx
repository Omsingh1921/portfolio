import { useState } from 'react'
import { projects } from '../data/portfolioData'
import ProjectLightbox from './ProjectLightbox'
import CaseStudyModal from './CaseStudyModal'
import '../styles/Projects.css'

export default function Projects() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  const [caseStudyTab, setCaseStudyTab] = useState('overview')

  const featuredProject = projects.find((p) => p.featured) || projects[0]
  const secondaryProjects = projects.filter((p) => !p.featured)

  const currentImage =
    featuredProject.images && featuredProject.images[activeImageIndex]
      ? featuredProject.images[activeImageIndex]
      : { src: '', title: '', caption: '', tag: '' }

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? featuredProject.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === featuredProject.images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <section id="projects" className="projects-section" aria-label="Featured Projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-badge">
            <span className="section-label-dot"></span>
            <span className="section-label-text">FEATURED WORK</span>
          </div>

          <h2 className="section-heading">Production & Systems Engineering</h2>
          <p className="section-subheading">
            Full-stack enterprise architectures, secure RESTful APIs, and relational data management implemented with Java, Spring Boot, and React.
          </p>
        </div>

        {/* Featured Project Card: SalesTracker */}
        <div className="featured-project-card">
          <div className="featured-project-grid">
            {/* LEFT: Application Screenshot Gallery */}
            <div className="featured-gallery-column">
              <div className="featured-main-image-frame">
                <div
                  className="main-image-interactive"
                  onClick={() => setIsLightboxOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
                  aria-label="Click to enlarge screenshot"
                >
                  <img
                    src={currentImage.src}
                    alt={currentImage.title || 'SalesTracker Screenshot'}
                    className="featured-main-img"
                    loading="eager"
                  />

                  {/* Scrim Overlay & Tag */}
                  <div className="featured-image-scrim">
                    <span className="featured-screen-tag">{currentImage.tag}</span>
                    <span className="featured-zoom-hint">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>Enlarge</span>
                    </span>
                  </div>
                </div>

                {/* Screenshot Caption Bar */}
                <div className="featured-image-caption-bar">
                  <span className="caption-title">{currentImage.title}</span>
                  <span className="caption-sub">{currentImage.caption}</span>
                </div>
              </div>

              {/* Thumbnails Gallery Strip */}
              <div className="featured-thumbnail-strip" aria-label="Screenshot thumbnails">
                {featuredProject.images &&
                  featuredProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`gallery-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View ${img.tag} screenshot`}
                    >
                      <img src={img.thumb} alt={img.tag} className="thumb-img" />
                      <span className="thumb-label">{img.tag}</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* RIGHT: Project Information & Specifications */}
            <div className="featured-content-column">
              <div className="featured-meta-header">
                <span className="featured-badge">{featuredProject.subtitle}</span>
                <span className="featured-id-tag">FULL-STACK SYSTEM</span>
              </div>

              <h3 className="featured-project-title">{featuredProject.title}</h3>
              <p className="featured-project-desc">{featuredProject.shortDescription}</p>

              {/* Architecture Flow Visual */}
              {featuredProject.architecture && (
                <div className="arch-flow-box">
                  <div className="arch-flow-label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span>System Architecture Pipeline</span>
                  </div>
                  <div className="arch-flow-chain">
                    <span className="arch-node">React 19 Frontend</span>
                    <span className="arch-arrow">→</span>
                    <span className="arch-node">Axios REST API</span>
                    <span className="arch-arrow">→</span>
                    <span className="arch-node">Spring Security / JWT</span>
                    <span className="arch-arrow">→</span>
                    <span className="arch-node">Service & DataScope</span>
                    <span className="arch-arrow">→</span>
                    <span className="arch-node">Spring Data JPA</span>
                    <span className="arch-arrow">→</span>
                    <span className="arch-node highlight">MySQL 8.0</span>
                  </div>
                </div>
              )}

              {/* Technology Chips */}
              <div className="featured-tech-chips">
                {featuredProject.technologies.map((tech) => (
                  <span key={tech} className="tech-chip">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Features List */}
              <div className="featured-features-list">
                <h4 className="features-heading">Key Architectural Features:</h4>
                <div className="features-grid">
                  {featuredProject.features.map((feat, fIdx) => (
                    <div key={fIdx} className="feature-card-item">
                      <div className="feature-icon-bullet">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className="feature-text-block">
                        <strong className="feature-title">{feat.title}:</strong>{' '}
                        <span className="feature-desc">{feat.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="engineering-highlights-wrap">
                <span className="highlights-label">Engineering Focus:</span>
                <div className="highlights-pills">
                  {featuredProject.engineeringHighlights.map((hl, hIdx) => (
                    <span key={hIdx} className="eng-pill">
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: GitHub, Case Study, & Deep-Dive Shortcuts */}
              <div className="featured-actions">
                <a
                  href={featuredProject.githubUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View SalesTracker on GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>View on GitHub</span>
                </a>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCaseStudyTab('overview')
                    setIsCaseStudyOpen(true)
                  }}
                  aria-label="View Enterprise Case Study"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span>Enterprise Case Study</span>
                </button>
              </div>

              {/* Quick Case Study Exploration Shortcuts */}
              <div className="case-study-quick-links">
                <span className="quick-links-label">Explore Case Study:</span>
                <div className="quick-links-chips">
                  {[
                    { label: 'System Design & UML', tab: 'uml' },
                    { label: 'Role-Based Access (RBAC)', tab: 'roles' },
                    { label: 'Interactive Architecture', tab: 'architecture' },
                    { label: 'Module Gallery', tab: 'gallery' },
                    { label: 'Sales Funnel Workflow', tab: 'workflow' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="quick-link-chip"
                      onClick={() => {
                        setCaseStudyTab(item.tab)
                        setIsCaseStudyOpen(true)
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Engineering Projects (if present) */}
        {secondaryProjects.length > 0 && (
          <div className="secondary-projects-area">
            <h3 className="secondary-section-title">Other Engineering Projects</h3>
            <div className="secondary-projects-grid">
              {secondaryProjects.map((p) => (
                <div key={p.id} className="secondary-project-card">
                  <div className="secondary-card-header">
                    <span className="secondary-badge">{p.subtitle}</span>
                    <a
                      href={p.githubUrl}
                      className="secondary-github-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.name} on GitHub`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </div>

                  <h4 className="secondary-title">{p.title}</h4>
                  <p className="secondary-desc">{p.description}</p>

                  <div className="secondary-tech-chips">
                    {p.technologies.map((t) => (
                      <span key={t} className="tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Lightbox Modal */}
      <ProjectLightbox
        isOpen={isLightboxOpen}
        images={featuredProject.images}
        currentIndex={activeImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        project={featuredProject}
        initialTab={caseStudyTab}
        onClose={() => setIsCaseStudyOpen(false)}
        onOpenLightbox={(idx) => {
          setActiveImageIndex(idx)
          setIsLightboxOpen(true)
        }}
      />
    </section>
  )
}
