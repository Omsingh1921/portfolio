import { useState, useRef, useEffect } from 'react'
import { projects } from '../data/portfolioData'
import ProjectLightbox from './ProjectLightbox'
import CaseStudyModal from './CaseStudyModal'
import DashboardSingleMarquee from './DashboardSingleMarquee'
import ScrollReveal from './ScrollReveal'
import '../styles/Projects.css'

export default function Projects() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  const [caseStudyTab, setCaseStudyTab] = useState('overview')
  const [activeDeepDiveTab, setActiveDeepDiveTab] = useState('architecture')
  const [isUmlZoomed, setIsUmlZoomed] = useState(false)
  const thumbnailStripRef = useRef(null)

  const [selectedProjectId, setSelectedProjectId] = useState('sales-tracker')
  const featuredProject = projects.find((p) => p.featured) || projects[0]
  const secondaryProjects = projects.filter((p) => !p.featured)
  const activeSelectedProject = projects.find((p) => p.id === selectedProjectId) || featuredProject
  const allImages = featuredProject.images || []
  const umlDiagrams = featuredProject.caseStudy?.umlDiagrams || []

  const handleSelectMarqueeImage = (_img, idx) => {
    setSelectedProjectId('sales-tracker')
    setActiveImageIndex(idx)
    setIsLightboxOpen(true)
  }

  const handleToggleFullscreen = () => {
    const cardEl = document.querySelector('.st-main-viewer-card')
    if (!document.fullscreenElement) {
      if (cardEl && cardEl.requestFullscreen) {
        cardEl.requestFullscreen().catch(() => {
          setActiveImageIndex(0)
          setIsLightboxOpen(true)
        })
      } else {
        setActiveImageIndex(0)
        setIsLightboxOpen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeEl = thumbnailStripRef.current.querySelector('.st-thumb-btn.active')
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'nearest',
          block: 'nearest',
        })
      }
    }
  }, [activeImageIndex])

  // Keyboard navigation for screenshots and ESC for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen || isCaseStudyOpen) return

      if (isUmlZoomed) {
        if (e.key === 'Escape') setIsUmlZoomed(false)
        return
      }

      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [allImages.length, isLightboxOpen, isCaseStudyOpen, isUmlZoomed])

  const handleScrollToLiveDemo = (e) => {
    e.preventDefault()
    if (featuredProject.liveUrl) {
      window.open(featuredProject.liveUrl, '_blank', 'noopener,noreferrer')
      return
    }
    const target = document.getElementById('product-interface')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 12 Core Capabilities
  const coreCapabilities = [
    {
      title: 'Sales Dashboard',
      desc: 'Real-time executive KPIs, pipeline win rates, conversion funnels, and revenue metrics.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      title: 'Lead Pipeline',
      desc: 'Multi-channel lead intake, status qualification state machine, and interaction logging.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <polyline points="17 11 19 13 23 9" />
        </svg>
      ),
    },
    {
      title: 'Deal Management',
      desc: 'Stage progression tracking from prospecting to negotiation with mandatory loss reasons.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: 'Sales & Invoices',
      desc: 'Unique invoice generation that synchronizes won deals with automated revenue accounting.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      title: 'Sales Targets',
      desc: 'Monthly and annual rep quota allocation with dynamic attainment percentage tracking.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      title: 'Analytics & Reports',
      desc: 'Consolidated reporting across pipeline health, rep performance, and revenue trends.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      title: 'User Management',
      desc: 'Enterprise user administration, manager assignment, and active status governance.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Role Management',
      desc: 'Hierarchical role definitions enforcing parent-child authority relationships.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      title: 'Authorities',
      desc: 'Granular permission matrix mapped to controller methods with @PreAuthorize.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: 'Audit Trail',
      desc: 'Immutable security audit trail recording actor ID, entity mutations, and timestamps.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      title: 'Profile Management',
      desc: 'Secure user self-service settings, credential management, and role viewing.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      title: 'Authentication',
      desc: 'Single-entrypoint JWT login with BCrypt password hashing and refresh token rotation.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      ),
    },
  ]

  // Deep Dive Tabs content mapping
  const renderDeepDiveContent = () => {
    switch (activeDeepDiveTab) {
      case 'architecture': {
        const archDiag = umlDiagrams.find((d) => d.id === 'arch-diagram')
        return (
          <div className="st-deep-dive-panel">
            <div className="st-panel-header">
              <span className="st-panel-tag">LAYERED ARCHITECTURE</span>
              <h4 className="st-panel-title">Layered System Architecture Flow</h4>
              <p className="st-panel-desc">
                Controller → Service → Repository → Database separation enforcing strict validation and declarative transaction boundaries.
              </p>
            </div>
            <div className="arch-flow-diagram">
              {archDiag?.flow?.map((item, fIdx) => (
                <div key={fIdx} className="arch-flow-node">
                  <span className="flow-step-num">{fIdx + 1}</span>
                  <div className="flow-step-content">
                    <strong className="flow-step-title">{item.step}</strong>
                    <span className="flow-step-tech">{item.tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'datamodel': {
        const erDiag = umlDiagrams.find((d) => d.id === 'er-diagram')
        return (
          <div className="st-deep-dive-panel">
            <div className="st-panel-header">
              <span className="st-panel-tag">RELATIONAL SCHEMA</span>
              <h4 className="st-panel-title">Entity-Relationship (ER) Schema</h4>
              <p className="st-panel-desc">
                8 core relational tables with foreign key constraints, composite authorities, and soft deletion flags.
              </p>
            </div>
            <div className="er-schema-diagram">
              {erDiag?.entities?.map((ent, eIdx) => (
                <div key={eIdx} className="er-entity-card">
                  <div className="er-entity-header">
                    <span className="er-table-icon">TABLE</span>
                    <strong className="er-entity-name">{ent.name}</strong>
                  </div>
                  <div className="er-entity-fields">{ent.fields}</div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'authentication': {
        return (
          <div className="st-deep-dive-panel">
            <div className="st-panel-header">
              <span className="st-panel-tag">STATELESS SECURITY</span>
              <h4 className="st-panel-title">JWT Authentication & Refresh Token Rotation</h4>
              <p className="st-panel-desc">
                End-to-end token verification protocol from initial client login to automatic 401 re-authentication.
              </p>
            </div>
            <div className="seq-flow-diagram">
              {[
                { step: 'Login Request', detail: 'POST /api/v1/auth/login validates credentials with BCryptPasswordEncoder.' },
                { step: 'Token Pair Issuance', detail: 'Server issues 15-minute signed JWT access token and single-use refresh token.' },
                { step: 'Bearer Authorization', detail: 'JwtAuthenticationFilter intercepts requests, validates signature, and populates SecurityContext.' },
                { step: 'Method Security', detail: 'Controllers enforce @PreAuthorize("hasAuthority(...)") based on authenticated GrantedAuthorities.' },
                { step: '401 Interception & Refresh', detail: 'Axios interceptor intercepts expired tokens, invokes /auth/refresh-token, and retries original request.' },
                { step: 'Safe Logout', detail: 'Calling POST /auth/logout deletes refresh token records from MySQL, invalidating future sessions immediately.' },
              ].map((step, sIdx) => (
                <div key={sIdx} className="seq-step-item">
                  <div className="seq-step-index">{sIdx + 1}</div>
                  <div className="seq-step-body">
                    <strong className="seq-step-title">{step.step}</strong>
                    <p className="seq-step-detail">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'workflow': {
        const wfDiag = umlDiagrams.find((d) => d.id === 'sales-lifecycle')
        return (
          <div className="st-deep-dive-panel">
            <div className="st-panel-header">
              <span className="st-panel-tag">STATE MACHINE</span>
              <h4 className="st-panel-title">Sales Lifecycle & Deal State Machine</h4>
              <p className="st-panel-desc">
                Strict multi-stage commercial state machine enforcing sequential lead qualification, mandatory loss reasons, and invoice sync.
              </p>
            </div>
            <div className="state-machine-diagram">
              {wfDiag?.steps?.map((step, sIdx) => (
                <div key={sIdx} className="state-step-node">
                  <div className="state-node-header">
                    <span className="state-bullet">{sIdx + 1}</span>
                    <strong className="state-title">{step.step}</strong>
                  </div>
                  <p className="state-detail">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'authorization': {
        const roleDiag = umlDiagrams.find((d) => d.id === 'role-hierarchy')
        return (
          <div className="st-deep-dive-panel">
            <div className="st-panel-header">
              <span className="st-panel-tag">ROLE HIERARCHY</span>
              <h4 className="st-panel-title">Dynamic Role Hierarchy & Method Security</h4>
              <p className="st-panel-desc">
                Hierarchical role tree with anti-escalation enforcement preventing lower roles from assigning superior privileges.
              </p>
            </div>
            <div className="hierarchy-diagram">
              {roleDiag?.levels?.map((lvl, lIdx) => (
                <div key={lIdx} className="hierarchy-node">
                  <span className="hierarchy-rank">Tier {lIdx + 1}</span>
                  <strong className="hierarchy-role">{lvl.role}</strong>
                  <span className="hierarchy-desc">{lvl.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'datascope': {
        const dsDiag = umlDiagrams.find((d) => d.id === 'datascope-flow')
        return (
          <div className="st-deep-dive-panel">
            <div className="st-panel-header">
              <span className="st-panel-tag">ORGANIZATIONAL SCOPING</span>
              <h4 className="st-panel-title">Recursive Hierarchy & DataScope Resolution</h4>
              <p className="st-panel-desc">
                MySQL recursive CTE traversal dynamically isolates sales branches, preventing cross-team data leaks at the query layer.
              </p>
            </div>
            <div className="datascope-diagram">
              {dsDiag?.rules?.map((rule, rIdx) => (
                <div key={rIdx} className="datascope-rule-card">
                  <strong className="datascope-scope">{rule.scope}</strong>
                  <p className="datascope-desc">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
      default:
        return null
    }
  }

  return (
    <section id="projects" className="projects-section" aria-label="Selected Work">
      <div className="container">
        {/* ====================================================================
            SECTION HEADER: SELECTED WORK
            ==================================================================== */}
        <ScrollReveal className="section-header">
          <div className="section-label-badge">
            <span className="section-label-dot"></span>
            <span className="section-label-text">SELECTED WORK</span>
          </div>
          <h2 className="section-heading">SELECTED WORK</h2>
          <p className="section-subheading">
            Systems I've designed, built and shipped.
          </p>
        </ScrollReveal>

        {/* Project Switcher Strip */}
        <div className="st-project-switcher-wrap">
          <div className="st-project-switcher" role="tablist" aria-label="Select Project to Inspect">
            {projects.map((p) => {
              const isActive = p.id === selectedProjectId
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`st-project-switch-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedProjectId(p.id)}
                >
                  <span className="switch-pill-dot" />
                  <span className="switch-pill-name">{p.name}</span>
                  {p.featured && <span className="switch-pill-badge">FEATURED</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* ====================================================================
            ACTIVE PROJECT DETAIL PANEL
            ==================================================================== */}
        <ScrollReveal key={activeSelectedProject.id} className="st-case-study-hero">
          <div className="st-hero-badge">
            <span className="st-badge-dot"></span>
            <span className="st-badge-text">
              {activeSelectedProject.featured ? 'FEATURED PROJECT · ENTERPRISE APPLICATION' : 'ENGINEERING PROJECT'}
            </span>
          </div>

          <h3 className="st-hero-title">{activeSelectedProject.name.toUpperCase()}</h3>
          <h4 className="st-hero-subtitle">
            {activeSelectedProject.subtitle || activeSelectedProject.title}
          </h4>

          <p className="st-hero-description">
            {activeSelectedProject.description || activeSelectedProject.shortDescription}
          </p>

          {/* Technology Chips - Specifically Highlighting Required Stack */}
          <div className="st-hero-tech-chips" aria-label="Project Technologies">
            {activeSelectedProject.id === 'sales-tracker' ? (
              [
                'Spring Boot',
                'React',
                'MySQL',
                'JWT Authentication',
                'Dynamic RBAC',
                'Lead → Deal → Sale workflow',
                'REST APIs',
                'Enterprise architecture',
              ].map((tech) => (
                <span key={tech} className="st-tech-chip interactive-badge highlighted">
                  {tech}
                </span>
              ))
            ) : (
              activeSelectedProject.technologies.map((tech) => (
                <span key={tech} className="st-tech-chip interactive-badge">
                  {tech}
                </span>
              ))
            )}
          </div>

          {/* Key Engineering Features Highlight for Active Project */}
          {activeSelectedProject.engineeringHighlights && (
            <div className="st-project-key-features">
              <span className="st-key-features-title">KEY ENGINEERING FEATURES:</span>
              <div className="st-key-features-grid">
                {activeSelectedProject.engineeringHighlights.map((feat, fIdx) => (
                  <div key={fIdx} className="st-key-feature-item">
                    <span className="feature-check-icon">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="st-hero-actions">
            {activeSelectedProject.githubUrl && (
              <a
                href={activeSelectedProject.githubUrl}
                className="btn btn-primary st-action-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${activeSelectedProject.name} on GitHub`}
              >
                <span>View GitHub</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            )}

            <a
              href="#product-interface"
              onClick={handleScrollToLiveDemo}
              className="btn btn-secondary st-action-btn"
              aria-label="View Product Interface"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>View Product Interface</span>
            </a>

            {activeSelectedProject.caseStudy && (
              <button
                type="button"
                className="btn btn-outline st-action-btn"
                onClick={() => {
                  setCaseStudyTab('overview')
                  setIsCaseStudyOpen(true)
                }}
                aria-label="Open Full Enterprise Case Study"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Case Study Details</span>
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* ====================================================================
            2. PROJECT STATS / CAPABILITY BADGES
            ==================================================================== */}
        <div className="st-stats-row" aria-label="Project Architectural Attributes">
          {[
            { label: 'Layered Architecture', detail: 'Controller → Service → Repository' },
            { label: 'Role-Based Access', detail: '5 Dynamic Roles & 25+ Authorities' },
            { label: 'JWT Authentication', detail: 'Stateless + MySQL Token Rotation' },
            { label: 'Hierarchical Data Scoping', detail: 'Recursive CTE Subtree Resolution' },
            { label: 'MySQL Persistence', detail: 'ACID Schema & Soft Deletes' },
          ].map((item, idx) => (
            <div key={idx} className="st-stat-card">
              <span className="st-stat-title">{item.label}</span>
              <span className="st-stat-detail">{item.detail}</span>
            </div>
          ))}
        </div>

        {/* ====================================================================
            3. PROJECT OVERVIEW: THE PROBLEM & THE SOLUTION
            ==================================================================== */}
        <div className="st-overview-grid">
          <div className="st-overview-card problem-card">
            <div className="st-overview-card-header">
              <div className="st-card-icon problem-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="st-overview-title">The Problem</h3>
            </div>
            <p className="st-overview-text">
              Enterprises struggle with fragmented spreadsheets, uncoordinated sales pipelines, and untracked sales opportunities. Without centralized authorization, organizations risk cross-branch data leaks, manual revenue miscalculations, and unmonitored representative quota attainment.
            </p>
          </div>

          <div className="st-overview-card solution-card">
            <div className="st-overview-card-header">
              <div className="st-card-icon solution-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="st-overview-title">The Solution</h3>
            </div>
            <p className="st-overview-text">
              SalesTracker provides a unified enterprise platform orchestrating the entire commercial lifecycle: automated lead qualification, recursive organizational data scoping (DataScopeService), single-use JWT refresh token rotation, unique invoice sync, and immutable audit logs.
            </p>
          </div>
        </div>

        {/* ====================================================================
            4. PRODUCT SCREENSHOTS (MAIN VISUAL CENTERPIECE)
            ==================================================================== */}
        <div id="product-interface" className="st-screenshots-section">
          <div className="st-section-head">
            <span className="st-section-eyebrow">PRODUCT INTERFACE</span>
            <h3 className="st-section-heading">Product Interface</h3>
            <p className="st-section-subtitle">
              Explore the SalesTracker application across its core modules.
            </p>
          </div>

          {/* Dominant Large Screenshot Display with Single-Direction Continuous Stream */}
          <div className="st-main-viewer-card">
            {/* Top Window Bar */}
            <div className="st-viewer-window-bar">
              <div className="code-dots">
                <span className="code-dot red"></span>
                <span className="code-dot yellow"></span>
                <span className="code-dot green"></span>
              </div>
              <div className="st-viewer-title-center">
                <span className="st-live-dot" aria-hidden="true" />
                <span>SalesTracker Executive Dashboard • Live Stream</span>
              </div>
              <div className="st-viewer-bar-right">
                <span className="st-module-count-tag">12 Modules</span>
                <button
                  type="button"
                  className="st-lightbox-trigger-btn"
                  onClick={handleToggleFullscreen}
                  aria-label="Toggle full screen stream"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Continuous Single-Direction Marquee Strictly Inside the Dashboard Area */}
            <DashboardSingleMarquee
              images={allImages}
              onSelectImage={handleSelectMarqueeImage}
            />

            {/* Screenshot Caption & Roles Bar */}
            <div className="st-caption-bar">
              <div className="st-caption-info">
                <h4 className="st-caption-title">Executive Analytics & Enterprise Performance Pipeline</h4>
                <p className="st-caption-desc">
                  Continuous live stream of all 12 core modules. Hover over the dashboard to pause the stream, or click any module card to inspect in full-screen resolution.
                </p>
              </div>

              <div className="st-caption-roles">
                <span className="st-roles-label">Accessible Roles:</span>
                <div className="st-role-pills">
                  {['SUPER_ADMIN', 'ADMIN', 'SALES_MANAGER', 'SALES_REP', 'VIEWER'].map((r) => (
                    <span key={r} className="st-role-pill">
                      {r.replace('ROLE_', '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Module Quick-Select Buttons (12 Screenshots) */}
          <div
            ref={thumbnailStripRef}
            className="st-thumbnails-strip"
            role="tablist"
            aria-label="SalesTracker Module Screenshots"
          >
            {allImages.map((img, idx) => {
              const isActive = activeImageIndex === idx
              return (
                <button
                  key={img.id || idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`st-thumb-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveImageIndex(idx)
                    setIsLightboxOpen(true)
                  }}
                  title={`View ${img.tag} in full resolution`}
                >
                  <div className="st-thumb-img-wrap">
                    <img src={img.thumb || img.src} alt={img.tag} className="st-thumb-img" loading="lazy" />
                  </div>
                  <span className="st-thumb-label">{img.tag}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ====================================================================
            5. KEY FEATURES / CORE CAPABILITIES GRID
            ==================================================================== */}
        <div className="st-capabilities-section">
          <div className="st-section-head">
            <span className="st-section-eyebrow">ENTERPRISE MODULES</span>
            <h3 className="st-section-heading">Core Capabilities</h3>
            <p className="st-section-subtitle">
              12 specialized business modules built to automate and secure enterprise sales operations.
            </p>
          </div>

          <div className="st-capabilities-grid">
            {coreCapabilities.map((cap, idx) => (
              <div key={idx} className="st-cap-card">
                <div className="st-cap-icon-box">{cap.icon}</div>
                <h4 className="st-cap-title">{cap.title}</h4>
                <p className="st-cap-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ====================================================================
            6. SYSTEM ARCHITECTURE VISUAL FLOW
            ==================================================================== */}
        <div className="st-architecture-section">
          <div className="st-section-head">
            <span className="st-section-eyebrow">SYSTEM DESIGN</span>
            <h3 className="st-section-heading">System Architecture</h3>
            <p className="st-section-subtitle">
              Layered architecture separating presentation, security, business logic and persistence.
            </p>
          </div>

          <div className="st-arch-flow-container">
            <div className="st-arch-pipeline">
              {[
                { node: 'React 19 / Vite', role: 'Client Presentation', tech: 'Axios Interceptors • React Router 7' },
                { node: 'Security Gateway', role: 'Filter Chain', tech: 'JwtAuthenticationFilter • JJWT' },
                { node: 'REST Controllers', role: 'API Boundary', tech: 'Spring Web • Jakarta @Valid DTOs' },
                { node: 'Service Layer', role: 'Business Transactions', tech: 'Domain Rules • Declarative @Transactional' },
                { node: 'Authorization & Scoping', role: 'Security & Access', tech: 'DataScopeService • Recursive CTEs' },
                { node: 'Repository Layer', role: 'Data Access', tech: 'Spring Data JPA • Hibernate ORM 7' },
                { node: 'MySQL 8.0', role: 'Relational Database', tech: 'InnoDB Engine • ACID • UTF8MB4' },
              ].map((step, idx, arr) => (
                <div key={idx} className="st-arch-node-group">
                  <div className="st-arch-pipeline-card">
                    <span className="st-node-step-tag">0{idx + 1}</span>
                    <strong className="st-node-name">{step.node}</strong>
                    <span className="st-node-role">{step.role}</span>
                    <span className="st-node-tech">{step.tech}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="st-arch-connector" aria-hidden="true">
                      <span className="st-connector-arrow">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ====================================================================
            7. TECHNICAL DEEP DIVE INTERACTIVE TABS
            ==================================================================== */}
        <div className="st-deep-dive-section">
          <div className="st-section-head">
            <div className="st-deep-dive-title-row">
              <div>
                <span className="st-section-eyebrow">TECHNICAL DEEP DIVE</span>
                <h3 className="st-section-heading">Technical Deep Dive</h3>
                <p className="st-section-subtitle">
                  Interactive breakdown of system design, database schemas, and security protocols.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-sm st-zoom-modal-btn"
                onClick={() => setIsUmlZoomed(true)}
                aria-label="Enlarge technical diagram in fullscreen"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <span>Fullscreen Diagram</span>
              </button>
            </div>
          </div>

          {/* Interactive Architecture & Technical Tabs */}
          <div className="st-deep-dive-tabs" role="tablist" aria-label="System Architecture & Technical Diagrams">
            {[
              { id: 'architecture', label: 'Architecture' },
              { id: 'datamodel', label: 'ER Schema' },
              { id: 'authentication', label: 'JWT Flow' },
              { id: 'workflow', label: 'Sales Lifecycle' },
              { id: 'authorization', label: 'RBAC' },
              { id: 'datascope', label: 'Data Scope' },
            ].map((tab) => {
              const isActive = activeDeepDiveTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`st-tab-button ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveDeepDiveTab(tab.id)}
                >
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Unified Deep Dive Panel Content */}
          <div className="st-deep-dive-card">
            {renderDeepDiveContent()}
          </div>
        </div>

        {/* ====================================================================
            8. ENGINEERING PILLARS (3 × 2 GRID)
            ==================================================================== */}
        <div className="st-pillars-section">
          <div className="st-section-head">
            <span className="st-section-eyebrow">PRODUCTION STANDARDS</span>
            <h3 className="st-section-heading">Engineering Pillars</h3>
            <p className="st-section-subtitle">
              Core architectural principles enforced across the codebase.
            </p>
          </div>

          <div className="st-pillars-grid">
            <div className="st-pillar-card">
              <div className="st-pillar-head">
                <span className="st-pillar-idx">01</span>
                <h4 className="st-pillar-title">Architecture</h4>
              </div>
              <span className="st-pillar-badge">Controller → Service → Repository</span>
              <p className="st-pillar-text">
                Strict layered separation of concerns. REST controllers validate DTOs with Jakarta Bean Validation, business logic resides in service interfaces, and JPA handles persistence.
              </p>
            </div>

            <div className="st-pillar-card">
              <div className="st-pillar-head">
                <span className="st-pillar-idx">02</span>
                <h4 className="st-pillar-title">Authentication</h4>
              </div>
              <span className="st-pillar-badge">Stateless JWT & Refresh Token Rotation</span>
              <p className="st-pillar-text">
                Issues 15-minute cryptographically signed access tokens and persists single-use refresh tokens in MySQL. Automatic token rotation and logout revocation eliminate session replay risks.
              </p>
            </div>

            <div className="st-pillar-card">
              <div className="st-pillar-head">
                <span className="st-pillar-idx">03</span>
                <h4 className="st-pillar-title">Authorization</h4>
              </div>
              <span className="st-pillar-badge">Role-Based & Method Security (@PreAuthorize)</span>
              <p className="st-pillar-text">
                Decoupled role-permission engine evaluating method-level security across endpoints. Anti-privilege escalation prevents lower tiers from assigning unpossessed rights.
              </p>
            </div>

            <div className="st-pillar-card">
              <div className="st-pillar-head">
                <span className="st-pillar-idx">04</span>
                <h4 className="st-pillar-title">Data Layer</h4>
              </div>
              <span className="st-pillar-badge">Spring Data JPA / Hibernate / MySQL</span>
              <p className="st-pillar-text">
                ACID-compliant InnoDB schema with foreign key constraints, composite keys, declarative @Transactional boundaries, and transparent soft deletion using @SQLDelete.
              </p>
            </div>

            <div className="st-pillar-card">
              <div className="st-pillar-head">
                <span className="st-pillar-idx">05</span>
                <h4 className="st-pillar-title">Frontend Integration</h4>
              </div>
              <span className="st-pillar-badge">React 19 + Vite + Axios Interceptors</span>
              <p className="st-pillar-text">
                High-performance React SPA with client route guards and Axios response interceptors that transparently handle 401 token refresh loops without interrupting user workflow.
              </p>
            </div>

            <div className="st-pillar-card">
              <div className="st-pillar-head">
                <span className="st-pillar-idx">06</span>
                <h4 className="st-pillar-title">Reliability & Error Handling</h4>
              </div>
              <span className="st-pillar-badge">Global @ControllerAdvice & DTO Validation</span>
              <p className="st-pillar-text">
                Centralized exception handler sanitizing database faults into structured JSON error contracts, preventing stack trace leakage while providing clear client feedback.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================================
            9. ENGINEERING DECISIONS (4 COMPACT CARDS)
            ==================================================================== */}
        <div className="st-decisions-section">
          <div className="st-section-head">
            <span className="st-section-eyebrow">TECHNICAL RATIONALE</span>
            <h3 className="st-section-heading">Engineering Decisions</h3>
            <p className="st-section-subtitle">
              Key architectural trade-offs and rationale behind the SalesTracker implementation.
            </p>
          </div>

          <div className="st-decisions-grid">
            <div className="st-decision-card">
              <div className="st-decision-top">
                <span className="st-decision-q">WHY?</span>
                <h4 className="st-decision-title">Why JWT?</h4>
              </div>
              <p className="st-decision-text">
                Stateless token verification eliminates distributed session caches; paired with single-use refresh tokens stored in MySQL to enable instant revocation upon logout or user deactivation without session bloat.
              </p>
            </div>

            <div className="st-decision-card">
              <div className="st-decision-top">
                <span className="st-decision-q">WHY?</span>
                <h4 className="st-decision-title">Why RBAC?</h4>
              </div>
              <p className="st-decision-text">
                Hardcoding roles in controller logic creates brittle code. Decoupling roles into fine-grained GrantedAuthorities allows flexible role restructuring and declarative method-level security with @PreAuthorize.
              </p>
            </div>

            <div className="st-decision-card">
              <div className="st-decision-top">
                <span className="st-decision-q">WHY?</span>
                <h4 className="st-decision-title">Why Data Scoping?</h4>
              </div>
              <p className="st-decision-text">
                Prevents cross-branch commercial data leaks at the database layer. MySQL recursive CTEs dynamically resolve subordinate user IDs so managers view only their organizational branch without manual filtering.
              </p>
            </div>

            <div className="st-decision-card">
              <div className="st-decision-top">
                <span className="st-decision-q">WHY?</span>
                <h4 className="st-decision-title">Why Layered Architecture?</h4>
              </div>
              <p className="st-decision-text">
                Strict separation between presentation, validation, business transactions (@Transactional), and JPA persistence prevents business logic duplication and keeps code testable and maintainable.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================================
            10. SECONDARY PROJECTS
            ==================================================================== */}
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
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </div>

                  <h4 className="secondary-title">{p.title}</h4>
                  <p className="secondary-desc">{p.description}</p>

                  {p.engineeringHighlights && (
                    <div className="secondary-highlights">
                      {p.engineeringHighlights.map((feat, fIdx) => (
                        <div key={fIdx} className="secondary-highlight-item">
                          <span className="secondary-check-icon">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="secondary-tech-chips">
                    {p.technologies.map((tech) => (
                      <span key={tech} className="tech-chip">
                        {tech}
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
        images={allImages}
        currentIndex={activeImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />

      {/* UML Zoom Modal */}
      {isUmlZoomed && (
        <div
          className="uml-zoom-modal-overlay"
          onClick={() => setIsUmlZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Architecture Diagram"
        >
          <div className="uml-zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="uml-zoom-header">
              <div className="uml-zoom-title-group">
                <span className="uml-category-pill">SYSTEM ARCHITECTURE</span>
                <h4 className="uml-zoom-title">Layered System Architecture & Flows</h4>
                <span className="uml-zoom-summary">Detailed inspection of SalesTracker components</span>
              </div>
              <button
                type="button"
                className="uml-zoom-close-btn"
                onClick={() => setIsUmlZoomed(false)}
                aria-label="Close fullscreen diagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {/* Interactive Tab Switcher in Fullscreen Mode */}
            <div className="uml-zoom-tabs-bar">
              {[
                { id: 'architecture', label: 'Architecture' },
                { id: 'datamodel', label: 'ER Schema' },
                { id: 'authentication', label: 'JWT Flow' },
                { id: 'workflow', label: 'Sales Lifecycle' },
                { id: 'authorization', label: 'RBAC' },
                { id: 'datascope', label: 'Data Scope' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeDeepDiveTab === tab.id}
                  className={`st-tab-button ${activeDeepDiveTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveDeepDiveTab(tab.id)}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="uml-zoom-body">
              {renderDeepDiveContent()}
            </div>
            <div className="uml-zoom-footer">
              <span>Press ESC or click outside to exit fullscreen</span>
            </div>
          </div>
        </div>
      )}

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
