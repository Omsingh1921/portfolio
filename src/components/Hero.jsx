import { useState } from 'react'
import { personalDetails, primaryFocus } from '../data/portfolioData'
import AntigravityCanvas from './AntigravityCanvas'
import '../styles/Hero.css'

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

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
      <AntigravityCanvas />
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
              Building reliable backend systems, secure REST APIs, and scalable web applications with Java, Spring Boot, MySQL, and modern engineering practices.
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

          {/* RIGHT: Professional Portrait & Developer Composition */}
          <div className="hero-visual">
            <div className="hero-portrait-card">
              {/* Soft ambient glow with subtle parallax */}
              <div
                className="hero-portrait-ambient"
                style={{
                  transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 12}px, 0)`,
                }}
                aria-hidden="true"
              ></div>

              {/* Main Photo Frame with subtle parallax */}
              <div
                className="hero-image-frame"
                style={{
                  transform: `translate3d(${parallax.x * -6}px, ${parallax.y * -6}px, 0)`,
                }}
              >
                <img
                  src={personalDetails.profilePhoto || '/photo/1782923021949.png'}
                  alt="Om Thakur - Java Full Stack Developer"
                  className="hero-portrait-img"
                  loading="eager"
                />
                <div className="hero-image-scrim" aria-hidden="true"></div>
              </div>

              {/* Floating Credential Badge: Java Developer • Dollop Infotech */}
              <div
                className="hero-floating-badge top-right"
                style={{
                  transform: `translate3d(${parallax.x * -14}px, ${parallax.y * -14}px, 0)`,
                }}
              >
                <span className="badge-indicator verified"></span>
                <span className="badge-text">Java Developer • Dollop Infotech</span>
              </div>

              {/* Floating Architecture Badge: Spring Boot & REST APIs */}
              <div
                className="hero-floating-badge bottom-left"
                style={{
                  transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -10}px, 0)`,
                }}
              >
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
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
                <span className="badge-text">Spring Boot & REST APIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
