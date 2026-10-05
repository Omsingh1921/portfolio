import { useState, useRef, useEffect } from 'react'
import { personalDetails, primaryFocus } from '../data/portfolioData'
import '../styles/Hero.css'

const orbitTechBadges = [
  { name: 'Java', dotClass: 'java-dot' },
  { name: 'Spring Boot', dotClass: 'spring-dot' },
  { name: 'React', dotClass: 'react-dot' },
  { name: 'MySQL', dotClass: 'mysql-dot' },
  { name: 'JWT / RBAC', dotClass: 'jwt-dot' },
]

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [isOrbitPaused, setIsOrbitPaused] = useState(false)
  const badgeRefs = useRef([])

  // Continuous single-direction orbital movement completely outside the photo
  useEffect(() => {
    let animId
    let angle = 0
    let lastTime = performance.now()

    const getTrackConfig = () => {
      const w = window.innerWidth
      if (w <= 480) return { rx: 165, ry: 195, power: 0.38 }
      if (w <= 880) return { rx: 215, ry: 245, power: 0.38 }
      return { rx: 250, ry: 275, power: 0.38 }
    }

    let { rx, ry, power } = getTrackConfig()
    const handleResize = () => {
      const cfg = getTrackConfig()
      rx = cfg.rx
      ry = cfg.ry
      power = cfg.power
    }
    window.addEventListener('resize', handleResize)

    const loop = (now) => {
      const delta = Math.min((now - lastTime) / 16.667, 2.5)
      lastTime = now

      // Single-direction clockwise progression (~26s complete rotation)
      const speed = isOrbitPaused ? 0.001 : 0.004
      angle = (angle + speed * delta) % (Math.PI * 2)

      orbitTechBadges.forEach((_, idx) => {
        const el = badgeRefs.current[idx]
        if (el) {
          const offset = (idx / orbitTechBadges.length) * (Math.PI * 2)
          const currentBadgeAngle = angle + offset
          const c = Math.cos(currentBadgeAngle)
          const s = Math.sin(currentBadgeAngle)
          const x = Math.sign(c) * Math.pow(Math.abs(c), power) * rx
          const y = Math.sign(s) * Math.pow(Math.abs(s), power) * ry
          el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0)`
        }
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOrbitPaused])

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const normX = (clientX / window.innerWidth - 0.5) * 2
    const normY = (clientY / window.innerHeight - 0.5) * 2
    setParallax({ x: normX, y: normY })
  }

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 })
  }

  const handleScrollToProjects = (e) => {
    e.preventDefault()
    const projectsEl = document.getElementById('projects')
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', '#projects')
    }
  }

  return (
    <section
      id="home"
      className="hero-section"
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <div className="hero-grid">
          {/* LEFT: Personal & Technical Positioning */}
          <div className="hero-content">
            {/* Status Badge */}
            <div className="hero-status-badge">
              <span className="hero-status-dot"></span>
              <span className="hero-status-text">Available for Software Development Roles</span>
            </div>

            <p className="hero-greeting">{personalDetails.greeting}</p>
            <h1 className="hero-title">{personalDetails.name}</h1>
            <h2 className="hero-role">{personalDetails.role}</h2>

            <p className="hero-description">
              Building scalable backend systems, REST APIs and modern web applications using Java, Spring Boot and React.
            </p>

            {/* Core Tech Stack Micro-Pills */}
            <div className="hero-tech-pills" aria-label="Core Technologies">
              {primaryFocus.map((tech) => (
                <span key={tech} className="hero-tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            {/* Primary & Secondary Call To Actions */}
            <div className="hero-actions">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="btn btn-primary hero-btn-primary"
                aria-label="View My Work"
              >
                <span>View My Work</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="btn-arrow-icon"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a
                href={personalDetails.resumeUrl}
                className="btn btn-secondary hero-btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume PDF"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="btn-download-icon"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>

            {/* Professional Social Links Bar */}
            <div className="hero-socials">
              <span className="hero-socials-label">Connect:</span>
              <div className="hero-socials-group">
                <a
                  href={personalDetails.socialLinks.github}
                  className="hero-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
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

                <a
                  href={personalDetails.socialLinks.linkedin}
                  className="hero-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
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
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Engineering-Focused Visual Composition (Code Panel + Floating Tech Labels) */}
          <div className="hero-visual">
            {/* Ambient Backlight Glow reacting to mouse */}
            <div
              className="hero-workstation-ambient"
              style={{
                transform: `translate3d(${parallax.x * 14}px, ${parallax.y * 14}px, 0)`,
              }}
              aria-hidden="true"
            />

            <div
              className="hero-workstation-wrapper"
              onMouseEnter={() => setIsOrbitPaused(true)}
              onMouseLeave={() => setIsOrbitPaused(false)}
            >
              {/* DealController.java Code Editor Architecture Panel */}
              <div
                className="hero-code-card interactive-card hero-code-editor-panel"
                style={{
                  transform: `translate3d(${parallax.x * -6}px, ${parallax.y * -6}px, 0)`,
                }}
                aria-label="DealController.java Spring Boot Architecture Visual"
              >
                <div className="code-card-header">
                  <div className="code-dots">
                    <span className="code-dot red"></span>
                    <span className="code-dot yellow"></span>
                    <span className="code-dot green"></span>
                  </div>
                  <div className="code-tab-title">
                    <svg
                      className="code-tab-icon"
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
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <span className="code-file-name">DealController.java</span>
                    <span className="code-git-branch">git:(main)</span>
                  </div>
                  <span className="code-framework-pill">Spring Boot 3.2 • REST</span>
                </div>

                {/* Developer Code Visual Panel */}
                <div className="code-editor-view">
                  <pre className="code-editor-pre">
                    <code>
                      <span className="code-line"><span className="code-ln">01</span><span className="c-ann">@RestController</span></span>
                      <span className="code-line"><span className="code-ln">02</span><span className="c-ann">@RequestMapping</span>(<span className="c-str">"/api/v1/deals"</span>)</span>
                      <span className="code-line"><span className="code-ln">03</span><span className="c-kw">public class</span> <span className="c-cls">DealController</span> &#123;</span>
                      <span className="code-line"><span className="code-ln">04</span></span>
                      <span className="code-line"><span className="code-ln">05</span>  <span className="c-kw">private final</span> <span className="c-type">DealService</span> <span className="c-var">dealService</span>;</span>
                      <span className="code-line"><span className="code-ln">06</span>  <span className="c-kw">private final</span> <span className="c-type">DataScopeService</span> <span className="c-var">dataScopeService</span>;</span>
                      <span className="code-line"><span className="code-ln">07</span></span>
                      <span className="code-line"><span className="code-ln">08</span>  <span className="c-ann">@GetMapping</span></span>
                      <span className="code-line"><span className="code-ln">09</span>  <span className="c-ann">@PreAuthorize</span>(<span className="c-str">"hasAuthority('DEAL_READ')"</span>)</span>
                      <span className="code-line"><span className="code-ln">10</span>  <span className="c-kw">public</span> <span className="c-type">ResponseEntity</span>&lt;<span className="c-type">Page</span>&lt;<span className="c-type">DealDto</span>&gt;&gt; <span className="c-fn">getDeals</span>(</span>
                      <span className="code-line"><span className="code-ln">11</span>      <span className="c-ann">@AuthenticationPrincipal</span> <span className="c-type">UserPrincipal</span> <span className="c-var">user</span>,</span>
                      <span className="code-line"><span className="code-ln">12</span>      <span className="c-ann">@RequestParam</span>(<span className="c-kw">defaultValue</span> = <span className="c-str">"0"</span>) <span className="c-kw">int</span> <span className="c-var">page</span>) &#123;</span>
                      <span className="code-line"><span className="code-ln">13</span>    <span className="c-type">Set</span>&lt;<span className="c-type">Long</span>&gt; <span className="c-var">ids</span> = <span className="c-var">dataScopeService</span>.<span className="c-fn">getPermittedIds</span>(<span className="c-var">user</span>);</span>
                      <span className="code-line"><span className="code-ln">14</span>    <span className="c-kw">return</span> <span className="c-type">ResponseEntity</span>.<span className="c-fn">ok</span>(<span className="c-var">dealService</span>.<span className="c-fn">findAll</span>(<span className="c-var">ids</span>, <span className="c-var">page</span>));</span>
                      <span className="code-line"><span className="code-ln">15</span>  &#125;</span>
                      <span className="code-line"><span className="code-ln">16</span></span>
                      <span className="code-line"><span className="code-ln">17</span>  <span className="c-ann">@PostMapping</span></span>
                      <span className="code-line"><span className="code-ln">18</span>  <span className="c-ann">@PreAuthorize</span>(<span className="c-str">"hasAuthority('DEAL_CREATE')"</span>)</span>
                      <span className="code-line"><span className="code-ln">19</span>  <span className="c-kw">public</span> <span className="c-type">ResponseEntity</span>&lt;<span className="c-type">DealDto</span>&gt; <span className="c-fn">createDeal</span>(</span>
                      <span className="code-line"><span className="code-ln">20</span>      <span className="c-ann">@Valid @RequestBody</span> <span className="c-type">DealCreateDto</span> <span className="c-var">dto</span>,</span>
                      <span className="code-line"><span className="code-ln">21</span>      <span className="c-ann">@AuthenticationPrincipal</span> <span className="c-type">UserPrincipal</span> <span className="c-var">user</span>) &#123;</span>
                      <span className="code-line"><span className="code-ln">22</span>    <span className="c-kw">return</span> <span className="c-type">ResponseEntity</span>.<span className="c-fn">status</span>(<span className="c-type">HttpStatus</span>.<span className="c-prop">CREATED</span>)</span>
                      <span className="code-line"><span className="code-ln">23</span>        .<span className="c-fn">body</span>(<span className="c-var">dealService</span>.<span className="c-fn">create</span>(<span className="c-var">dto</span>, <span className="c-var">user</span>.<span className="code-fn">getId</span>()));</span>
                      <span className="code-line"><span className="code-ln">24</span>  &#125;</span>
                      <span className="code-line"><span className="code-ln">25</span>&#125;</span>
                    </code>
                  </pre>
                </div>

                {/* Clean Status Footer Bar inside Code Editor */}
                <div className="code-card-clean-footer">
                  <div className="clean-footer-status">
                    <span className="clean-status-dot" />
                    <span>SYSTEM READY • REST 200 OK</span>
                  </div>
                  <span className="clean-footer-tech">PORT 8080 • JVM 21</span>
                </div>
              </div>

              {/* Dedicated Single-Direction Continuous Marquee Strip OUTSIDE beneath the photo */}
              <div className="hero-outside-marquee-pill" aria-label="Core Technology Pipeline">
                <div className="outside-marquee-track">
                  <span>JAVA 21 • SPRING BOOT 3 • APACHE KAFKA • REDIS • REACT 18 • MYSQL • DOCKER • REST APIS • JWT & RBAC • MICROSERVICES • DISTRIBUTED SYSTEMS • </span>
                  <span>JAVA 21 • SPRING BOOT 3 • APACHE KAFKA • REDIS • REACT 18 • MYSQL • DOCKER • REST APIS • JWT & RBAC • MICROSERVICES • DISTRIBUTED SYSTEMS • </span>
                </div>
              </div>

              {/* Technology Badges Orbiting COMPLETELY OUTSIDE the Image in a Single Continuous Direction */}
              <div className="hero-orbit-container" aria-label="Technology Stack Orbit">
                {orbitTechBadges.map((badge, idx) => (
                  <div
                    key={badge.name}
                    ref={(el) => (badgeRefs.current[idx] = el)}
                    className="hero-orbit-pill interactive-badge"
                  >
                    <span className={`pill-dot ${badge.dotClass}`} />
                    <span className="pill-name">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
