import { aboutDetails } from '../data/portfolioData'
import '../styles/About.css'

export default function About() {
  const getHighlightIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'role':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        )
      case 'location':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        )
      case 'education':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        )
      case 'focus':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )
    }
  }

  return (
    <section id="about" className="about-section" aria-label="About Me">
      <div className="container">
        <div className="about-grid">
          {/* LEFT: Engineering Profile & Architecture Highlights */}
          <div className="about-visual-col">
            <div className="about-architecture-card">
              <div className="arch-card-header">
                <div className="arch-card-badge">
                  <span className="arch-badge-dot"></span>
                  <span className="arch-badge-text">ENGINEERING PROFILE</span>
                </div>
                <span className="arch-card-tech">Java 21 • Spring Boot</span>
              </div>

              <div className="arch-profile-identity">
                <h3 className="arch-profile-name">Om Thakur</h3>
                <span className="arch-profile-role">Java Full Stack Developer</span>
              </div>

              <div className="arch-capabilities-list">
                <div className="arch-cap-item">
                  <div className="arch-cap-icon">
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
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                    </svg>
                  </div>
                  <div className="arch-cap-text">
                    <strong className="arch-cap-title">Backend Architecture</strong>
                    <span className="arch-cap-desc">Spring Boot, Layered Services, REST APIs, DTOs</span>
                  </div>
                </div>

                <div className="arch-cap-item">
                  <div className="arch-cap-icon">
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
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div className="arch-cap-text">
                    <strong className="arch-cap-title">Security & Auth</strong>
                    <span className="arch-cap-desc">Spring Security, Stateless JWT, RBAC & Method Security</span>
                  </div>
                </div>

                <div className="arch-cap-item">
                  <div className="arch-cap-icon">
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
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </div>
                  <div className="arch-cap-text">
                    <strong className="arch-cap-title">Persistence & Data</strong>
                    <span className="arch-cap-desc">Spring Data JPA, Hibernate ORM, MySQL & PostgreSQL</span>
                  </div>
                </div>

                <div className="arch-cap-item">
                  <div className="arch-cap-icon">
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
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div className="arch-cap-text">
                    <strong className="arch-cap-title">Algorithms & Problem Solving</strong>
                    <span className="arch-cap-desc">100+ LeetCode problems solved in Java</span>
                  </div>
                </div>
              </div>

              {/* Verified Credential Badge */}
              <div className="about-credential-card">
                <div className="credential-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                <div className="credential-text">
                  <span className="credential-title">Dollop Infotech</span>
                  <span className="credential-subtitle">Java Developer Intern • Indore</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: About Details & Information Grid */}
          <div className="about-content-col">
            <div className="section-label-badge">
              <span className="section-label-dot"></span>
              <span className="section-label-text">{aboutDetails.sectionLabel}</span>
            </div>

            <h2 className="about-heading">{aboutDetails.heading}</h2>

            <div className="about-paragraphs">
              {aboutDetails.paragraphs.map((p, idx) => (
                <p key={idx} className="about-p">
                  {p}
                </p>
              ))}
            </div>

            {/* Information Grid: Role, Location, Education, Focus */}
            <div className="about-highlights-grid">
              {aboutDetails.highlights.map((item, idx) => (
                <div key={idx} className="about-highlight-card">
                  <div className="highlight-icon-box">
                    {getHighlightIcon(item.label)}
                  </div>
                  <div className="highlight-meta">
                    <span className="highlight-label">{item.label}</span>
                    <span className="highlight-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
