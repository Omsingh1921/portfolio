import { useEffect, useState } from 'react'
import '../styles/CaseStudy.css'

export default function CaseStudyModal({
  isOpen,
  project,
  initialTab = 'overview',
  onClose,
  onOpenLightbox,
}) {
  const [userSelectedTab, setUserSelectedTab] = useState(null)
  const [prevOpenState, setPrevOpenState] = useState(isOpen)
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab)

  if (isOpen !== prevOpenState || initialTab !== prevInitialTab) {
    setPrevOpenState(isOpen)
    setPrevInitialTab(initialTab)
    setUserSelectedTab(null)
  }

  const activeTab = userSelectedTab || initialTab || 'overview'
  const setActiveTab = setUserSelectedTab

  const [activeLayer, setActiveLayer] = useState(0)
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('ALL')
  const [selectedDiagram, setSelectedDiagram] = useState(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedDiagram) {
          setSelectedDiagram(null)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, selectedDiagram])

  if (!isOpen || !project || !project.caseStudy) return null

  const { caseStudy } = project

  const filteredImages =
    selectedModuleFilter === 'ALL'
      ? project.images
      : project.images.filter(
          (img) => img.tag.toLowerCase() === selectedModuleFilter.toLowerCase()
        )

  const architectureLayers = [
    {
      name: 'Client Presentation Layer',
      tech: 'React 19, Vite, Axios, React Router 7',
      desc: 'High-performance SPA providing responsive interfaces, form validation, client-side route guarding, and Axios interceptors for transparent JWT re-authentication.',
      details: 'Automatic token refresh on HTTP 401, error toasts, and role-conditioned action buttons.',
    },
    {
      name: 'Security Gateway & Filter Chain',
      tech: 'Spring Security 6, JJWT 0.12, JwtAuthenticationFilter',
      desc: 'Intercepts incoming HTTP requests, validates HS256 signatures, verifies account active status in database, and populates SecurityContext with GrantedAuthorities.',
      details: 'Immediate rejection of deactivated/soft-deleted users; single-use refresh token rotation defense.',
    },
    {
      name: 'API Controller Layer',
      tech: 'Spring Web REST Controllers, Jakarta Bean Validation (@Valid)',
      desc: 'Exposes versioned REST endpoints (/api/v1/*), enforces method-level authorization via @PreAuthorize, and maps input DTOs with strict boundary validation.',
      details: 'Consistent JSON schema for responses and sanitized error maps masking internal SQL faults.',
    },
    {
      name: 'Service Layer (Business Logic)',
      tech: 'Spring Service Interfaces & Impls, Declarative @Transactional',
      desc: 'Executes core sales domain rules: lead qualification validation, mandatory closed-lost justification, automated deal-to-sale synchronization, and quota formulas.',
      details: 'Anti-escalation guards prevent users from assigning permissions or creating roles beyond their own rights.',
    },
    {
      name: 'Data Scoping Subsystem',
      tech: 'DataScopeService, MySQL Recursive CTE Traversal',
      desc: 'Dynamically computes permitted user IDs based on the actor position in the organizational tree. Isolates regional sales branches from cross-team data leaks.',
      details: 'SUPER_ADMIN & ADMIN have global scope; SALES_MANAGER sees self + direct/indirect reporting subtree.',
    },
    {
      name: 'Persistence Layer (ORM)',
      tech: 'Spring Data JPA, Hibernate ORM 7',
      desc: 'Manages entity mapping, foreign key constraints, cascading integrity, and transparent soft deletion via @SQLDelete and @SQLRestriction("is_deleted = false").',
      details: 'Custom repository queries, pagination (Pageable), and composite keys for role_permissions.',
    },
    {
      name: 'Relational Database',
      tech: 'MySQL 8.0 (InnoDB Engine, UTF8MB4)',
      desc: 'Persistent storage with strict foreign keys, unique constraint on invoiceNumber and email, ACID compliance, and indexed lookup trees.',
      details: 'Self-referencing parent_user_id and parent_role_id hierarchies.',
    },
  ]

  return (
    <div
      className="case-study-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} Enterprise Case Study`}
    >
      <div
        className="case-study-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="case-study-header">
          <div>
            <div className="case-study-badge">ENTERPRISE CASE STUDY & SYSTEM DESIGN</div>
            <h2 className="case-study-title">{project.title}</h2>
          </div>

          <div className="case-study-header-actions">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm header-gh-btn"
              aria-label="View SalesTracker Repository on GitHub"
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
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>GitHub</span>
            </a>

            <button
              type="button"
              className="case-study-close-btn"
              onClick={onClose}
              aria-label="Close Case Study"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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

        {/* Tab Navigation */}
        <div className="case-study-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'overview'}
            className={`case-study-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Metrics
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'architecture'}
            className={`case-study-tab ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            Interactive Architecture
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'gallery'}
            className={`case-study-tab ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Module Gallery
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'roles'}
            className={`case-study-tab ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            Role-Based Access (RBAC)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'uml'}
            className={`case-study-tab ${activeTab === 'uml' ? 'active' : ''}`}
            onClick={() => setActiveTab('uml')}
          >
            System Design & UML
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'workflow'}
            className={`case-study-tab ${activeTab === 'workflow' ? 'active' : ''}`}
            onClick={() => setActiveTab('workflow')}
          >
            Sales Lifecycle
          </button>
        </div>

        {/* Body Content */}
        <div className="case-study-body">
          {/* TAB 1: Overview & Metrics */}
          {activeTab === 'overview' && (
            <div className="case-study-panel">
              {/* Verified Project Statistics */}
              <div className="case-study-section">
                <h3 className="section-title">Verified Engineering Metrics (Source Audit)</h3>
                <div className="metrics-grid">
                  {caseStudy.statistics?.map((stat, idx) => (
                    <div key={idx} className="metric-box">
                      <span className="metric-value">{stat.value}</span>
                      <span className="metric-label">{stat.label}</span>
                      <span className="metric-detail">{stat.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Specifications Table */}
              <div className="case-study-section">
                <h3 className="section-title">Enterprise System Specifications</h3>
                <div className="specs-table">
                  <div className="spec-row">
                    <span className="spec-key">Project Type</span>
                    <span className="spec-val">{caseStudy.projectOverview?.type}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Architecture</span>
                    <span className="spec-val">{caseStudy.projectOverview?.architecture}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Security Engine</span>
                    <span className="spec-val">{caseStudy.projectOverview?.security}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Relational Database</span>
                    <span className="spec-val">{caseStudy.projectOverview?.database}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Role Management</span>
                    <span className="spec-val">{caseStudy.projectOverview?.roleManagement}</span>
                  </div>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="case-study-section">
                <h3 className="section-title">Operational Challenge</h3>
                <p className="section-p">{caseStudy.problem}</p>
              </div>

              <div className="case-study-section">
                <h3 className="section-title">Engineered Solution</h3>
                <p className="section-p">{caseStudy.solution}</p>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Architecture */}
          {activeTab === 'architecture' && (
            <div className="case-study-panel">
              <div className="case-study-section">
                <h3 className="section-title">Decoupled Full-Stack Architecture</h3>
                <p className="section-p">{caseStudy.architectureDetail}</p>
              </div>

              <div className="case-study-section">
                <h3 className="section-title">Interactive 7-Layer Architectural Stack</h3>
                <p className="section-subtext">Click or hover over any layer to inspect its operational role, technologies, and security responsibilities.</p>

                <div className="interactive-layers-container">
                  <div className="layers-nav-strip">
                    {architectureLayers.map((layer, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`layer-nav-item ${activeLayer === idx ? 'active' : ''}`}
                        onClick={() => setActiveLayer(idx)}
                        onMouseEnter={() => setActiveLayer(idx)}
                      >
                        <span className="layer-number">{idx + 1}</span>
                        <div className="layer-summary-info">
                          <span className="layer-title-text">{layer.name}</span>
                          <span className="layer-tech-badge">{layer.tech.split(',')[0]}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Active Layer Inspector */}
                  <div className="active-layer-card">
                    <div className="active-layer-header">
                      <span className="active-layer-pill">LAYER {activeLayer + 1} OF 7</span>
                      <h4 className="active-layer-name">{architectureLayers[activeLayer].name}</h4>
                    </div>
                    <div className="active-layer-tech">
                      <strong>Core Technologies:</strong> {architectureLayers[activeLayer].tech}
                    </div>
                    <p className="active-layer-desc">{architectureLayers[activeLayer].desc}</p>
                    <div className="active-layer-details">
                      <strong>Implementation Details:</strong> {architectureLayers[activeLayer].details}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Controls */}
              <div className="case-study-section">
                <h3 className="section-title">Security & Authorization Controls</h3>
                <p className="section-p">{caseStudy.securityDetail}</p>
                <ul className="security-controls-list">
                  <li>
                    <strong>Stateless Dual-Token JWT:</strong> 15-minute access token + 7-day single-use refresh token with replay invalidation.
                  </li>
                  <li>
                    <strong>Database Inactive Revocation:</strong> Inactive or soft-deleted accounts fail immediately at the filter layer.
                  </li>
                  <li>
                    <strong>Permission-Decoupled Guarding:</strong> Endpoints evaluated via <code>@PreAuthorize(&quot;hasAuthority(...)&quot;)</code> rather than static role strings.
                  </li>
                  <li>
                    <strong>BCrypt Password Hashing:</strong> Salted password encryption with cost factor 10.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Module Gallery & Screenshots */}
          {activeTab === 'gallery' && (
            <div className="case-study-panel">
              <div className="case-study-section">
                <div className="gallery-header-row">
                  <div>
                    <h3 className="section-title">Actual Frontend Screenshots</h3>
                    <p className="section-subtext">Click any screenshot to open the high-resolution interactive lightbox with keyboard navigation.</p>
                  </div>

                  {/* Module Filter Pills */}
                  <div className="module-filter-pills" role="toolbar" aria-label="Filter by module">
                    {['ALL', ...Array.from(new Set(project.images.map((img) => img.tag || img.module))).filter(Boolean)].map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        className={`filter-pill ${selectedModuleFilter.toLowerCase() === filter.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setSelectedModuleFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Screenshots Grid */}
                <div className="module-screenshots-grid">
                  {filteredImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="screenshot-card"
                      onClick={() => onOpenLightbox && onOpenLightbox(project.images.indexOf(img))}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox && onOpenLightbox(project.images.indexOf(img))}
                      aria-label={`View ${img.title} screenshot`}
                    >
                      <div className="screenshot-img-wrap">
                        <img src={img.src} alt={img.title} loading="lazy" className="screenshot-img" />
                        <div className="screenshot-hover-overlay">
                          <span className="view-screenshot-btn">
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
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                              <line x1="11" y1="8" x2="11" y2="14" />
                              <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                            <span>View Full Screenshot</span>
                          </span>
                        </div>
                        <span className="screenshot-tag-badge">{img.tag}</span>
                      </div>
                      <div className="screenshot-meta-block">
                        <h4 className="screenshot-title">{img.title}</h4>
                        <p className="screenshot-caption">{img.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All 11 Verified Modules Checklist */}
              <div className="case-study-section">
                <h3 className="section-title">All 11 Verified Functional Modules</h3>
                <div className="case-study-modules-grid">
                  {[
                    'Authentication & Refresh Token Rotation',
                    'User Management & Tree Hierarchy',
                    'Dynamic Roles & Hierarchy Bounds',
                    'Granular System Permissions Catalog',
                    'Lead Ingestion & Qualification Rules',
                    'Chronological Lead Activities Logging',
                    'Multi-Stage Deal Pipeline Funnel',
                    'Sales & Unique Invoice Synchronization',
                    'Representative Quota & Target Management',
                    'Reports & Executive Dashboard Analytics',
                    'Immutable Security & Event Audit Logging',
                  ].map((mod, idx) => (
                    <div key={idx} className="module-item-pill">
                      <span className="module-check">✓</span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Role-Based Access & Workflows (RBAC) */}
          {activeTab === 'roles' && (
            <div className="case-study-panel">
              <div className="case-study-section">
                <h3 className="section-title">Dynamic Role-Based Access Control (RBAC)</h3>
                <p className="section-p">
                  SalesTracker implements database-persisted roles linked to 27 granular permission authorities. Authorization is enforced at the method level using <code>@PreAuthorize(&quot;hasAuthority(...)&quot;)</code>, preventing hardcoded role checks while supporting organizational hierarchies and data scoping.
                </p>
              </div>

              <div className="roles-showcase-grid">
                {caseStudy.roles?.map((role) => {
                  const roleScreenshots = project.images.filter((img) =>
                    role.screenshotModules
                      ? role.screenshotModules.some(
                          (m) =>
                            m.toLowerCase() === (img.tag || '').toLowerCase() ||
                            m.toLowerCase() === (img.module || '').toLowerCase()
                        )
                      : img.roles?.includes(role.name)
                  )

                  return (
                    <div key={role.id} className="role-card">
                      <div className="role-card-header">
                        <div>
                          <span className="role-level-badge">{role.level}</span>
                          <h4 className="role-name">{role.name}</h4>
                          <span className="role-title-sub">{role.title}</span>
                        </div>
                        <span className="role-scope-badge">{role.scope}</span>
                      </div>

                      <p className="role-desc">{role.description}</p>

                      {/* Permissions list */}
                      <div className="role-permissions-section">
                        <span className="role-section-label">Granted Permissions:</span>
                        <div className="role-perms-pills">
                          {role.permissions.map((p, pIdx) => (
                            <span key={pIdx} className="role-perm-chip">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Workflows */}
                      <div className="role-workflows-section">
                        <span className="role-section-label">Primary Enterprise Workflows:</span>
                        <ul className="role-workflows-list">
                          {role.workflows.map((wf, wIdx) => (
                            <li key={wIdx}>{wf}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Role-Specific Frontend Screenshots Grid */}
                      <div className="role-screenshots-container">
                        <div className="role-screenshots-head">
                          <span className="role-section-label">Accessible Module Interfaces ({roleScreenshots.length}):</span>
                          <span className="role-screens-tip">Click to enlarge</span>
                        </div>
                        <div className="role-screenshots-flex-grid">
                          {roleScreenshots.map((img) => (
                            <button
                              key={img.id}
                              type="button"
                              className="role-mini-thumb-btn"
                              onClick={() => {
                                const globalIdx = project.images.indexOf(img)
                                if (globalIdx !== -1 && onOpenLightbox) {
                                  onOpenLightbox(globalIdx)
                                }
                              }}
                              title={`View ${img.title} in Lightbox`}
                            >
                              <div className="role-mini-img-wrap">
                                <img src={img.thumb} alt={img.title} className="role-mini-img" loading="lazy" />
                                <span className="role-mini-badge">{img.tag}</span>
                              </div>
                              <span className="role-mini-label">{img.module || img.tag}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 5: System Design & UML Diagrams */}
          {activeTab === 'uml' && (
            <div className="case-study-panel">
              <div className="case-study-section">
                <h3 className="section-title">System Design & UML Diagrams</h3>
                <p className="section-p">
                  Formal system architectures and engineering flows generated strictly from the SalesTracker source code, JPA entities, security configuration, and database relationships.
                </p>
              </div>

              <div className="uml-diagrams-grid">
                {caseStudy.umlDiagrams?.map((diag) => (
                  <div key={diag.id} className="uml-diagram-card">
                    <div className="uml-card-header">
                      <span className="uml-category-pill">{diag.category}</span>
                      <h4 className="uml-diag-title">{diag.title}</h4>
                      <p className="uml-diag-summary">{diag.summary}</p>
                    </div>

                    {/* Visual Diagram Content based on ID */}
                    <div className="uml-visual-box">
                      {diag.id === 'arch-diagram' && (
                        <div className="arch-flow-diagram">
                          {diag.flow?.map((item, fIdx) => (
                            <div key={fIdx} className="arch-flow-node">
                              <span className="flow-step-num">{fIdx + 1}</span>
                              <div className="flow-step-content">
                                <strong className="flow-step-title">{item.step}</strong>
                                <span className="flow-step-tech">{item.tech}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {diag.id === 'er-diagram' && (
                        <div className="er-schema-diagram">
                          {diag.entities?.map((ent, eIdx) => (
                            <div key={eIdx} className="er-entity-card">
                              <div className="er-entity-header">
                                <span className="er-table-icon">TABLE</span>
                                <strong className="er-entity-name">{ent.name}</strong>
                              </div>
                              <div className="er-entity-fields">{ent.fields}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {diag.id === 'jwt-auth-flow' && (
                        <div className="seq-flow-diagram">
                          {diag.steps?.map((step, sIdx) => (
                            <div key={sIdx} className="seq-step-item">
                              <div className="seq-step-index">{sIdx + 1}</div>
                              <div className="seq-step-body">
                                <strong className="seq-step-title">{step.step}</strong>
                                <p className="seq-step-detail">{step.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {diag.id === 'sales-lifecycle' && (
                        <div className="state-machine-diagram">
                          {diag.steps?.map((step, sIdx) => (
                            <div key={sIdx} className="state-step-node">
                              <div className="state-node-header">
                                <span className="state-bullet">{sIdx + 1}</span>
                                <strong className="state-title">{step.step}</strong>
                              </div>
                              <p className="state-detail">{step.detail}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {diag.id === 'role-hierarchy' && (
                        <div className="hierarchy-diagram">
                          {diag.levels?.map((lvl, lIdx) => (
                            <div key={lIdx} className="hierarchy-node">
                              <span className="hierarchy-rank">Rank {lIdx + 1}</span>
                              <strong className="hierarchy-role">{lvl.role}</strong>
                              <span className="hierarchy-desc">{lvl.desc}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {diag.id === 'datascope-flow' && (
                        <div className="datascope-diagram">
                          {diag.rules?.map((rule, rIdx) => (
                            <div key={rIdx} className="datascope-rule-card">
                              <strong className="datascope-scope">{rule.scope}</strong>
                              <p className="datascope-desc">{rule.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Sales Lifecycle Workflow */}
          {activeTab === 'workflow' && (
            <div className="case-study-panel">
              <div className="case-study-section">
                <h3 className="section-title">Commercial Sales Lifecycle</h3>
                <p className="section-p">
                  SalesTracker models an end-to-end commercial pipeline with strict validation state machines. Deals cannot skip qualification stages, lost deals require non-blank reasons, and completed invoice payments automatically finalize deals and update rep quota pacing.
                </p>
              </div>

              {/* Step-by-step Funnel Steps */}
              <div className="workflow-funnel-steps">
                {[
                  {
                    step: 'Stage 1: Lead Intake',
                    code: 'STATUS: NEW',
                    desc: 'Leads are ingested from web inquiries or manual representative creation, tagged with marketing source and assigned to regional sales reps.',
                  },
                  {
                    step: 'Stage 2: Initial Outreach',
                    code: 'STATUS: CONTACTED',
                    desc: 'The sales representative logs chronological activities (phone calls, emails, demos). Direct transition from NEW to QUALIFIED without outreach is rejected.',
                  },
                  {
                    step: 'Stage 3: Opportunity Qualification',
                    code: 'STATUS: QUALIFIED',
                    desc: 'Prospect criteria are confirmed. Converting the lead promotes status to QUALIFIED and automatically spawns an Opportunity Deal in PROSPECTING stage.',
                  },
                  {
                    step: 'Stage 4: Deal Stage Advancement',
                    code: 'STAGES: QUALIFICATION → NEEDS ANALYSIS → VALUE PROP → PROPOSAL → NEGOTIATION',
                    desc: 'Multi-stage opportunity progression with deal value tracking, customer interaction updates, and expected closing timelines.',
                  },
                  {
                    step: 'Stage 5: Win / Loss Finalization',
                    code: 'STAGE: CLOSED_WON or CLOSED_LOST',
                    desc: 'If an opportunity is lost, a mandatory non-blank lostReason is required for root-cause loss intelligence. Once closed, deals become immutable to non-administrators.',
                  },
                  {
                    step: 'Stage 6: Invoicing & Quota Achievement',
                    code: 'SALES INVOICE → TARGET SYNC',
                    desc: 'Generating a unique invoice transitions deal to CLOSED_WON. Marking payment as COMPLETED immediately updates the representative and team monthly quota attainment percentage.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="funnel-step-card">
                    <div className="funnel-step-header">
                      <span className="funnel-step-badge">{item.step}</span>
                      <span className="funnel-step-code">{item.code}</span>
                    </div>
                    <p className="funnel-step-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="case-study-footer">
          <div className="case-study-footer-left">
            <span className="footer-repo-label">Verified Repository:</span>
            <code className="footer-repo-code">github.com/Omsingh1921/SalesTracker</code>
          </div>

          <div className="case-study-footer-right">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              aria-label="View SalesTracker on GitHub"
            >
              <span>View on GitHub</span>
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
            </a>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
