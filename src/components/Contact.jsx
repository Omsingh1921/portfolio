import { useState } from 'react'
import { personalDetails } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import '../styles/Contact.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalDetails.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="contact-section" aria-label="Contact Om Thakur">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal className="section-header">
          <div className="section-label-badge">
            <span className="section-label-dot"></span>
            <span className="section-label-text">GET IN TOUCH</span>
          </div>

          <h2 className="section-heading">Let's build something useful.</h2>
          <p className="section-subheading">
            I'm actively seeking software engineering and Java backend developer opportunities. Feel free to connect directly.
          </p>
        </ScrollReveal>

        {/* Contact Layout */}
        <ScrollReveal className="contact-card-wrapper" delay={100}>
          <div className="contact-main-card">
            {/* Primary Email Block */}
            <div className="contact-primary-channel">
              <div className="contact-channel-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>

              <div className="contact-channel-info">
                <span className="contact-channel-label">Direct Email</span>
                <a
                  href={`mailto:${personalDetails.email}`}
                  className="contact-channel-value"
                >
                  {personalDetails.email}
                </a>
              </div>

              <div className="contact-actions">
                <a
                  href={`mailto:${personalDetails.email}`}
                  className="btn btn-primary btn-sm"
                  aria-label="Send email"
                >
                  <span>Send Email</span>
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
                  onClick={handleCopyEmail}
                  className="btn btn-secondary btn-sm"
                  aria-label="Copy email address"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="contact-details-grid">
              {/* Phone */}
              <div className="contact-detail-item">
                <div className="detail-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="detail-meta">
                  <span className="detail-label">Phone</span>
                  <a href={`tel:${personalDetails.phone}`} className="detail-value">
                    {personalDetails.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="contact-detail-item">
                <div className="detail-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                </div>
                <div className="detail-meta">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{personalDetails.location}</span>
                </div>
              </div>

              {/* GitHub Profile */}
              <div className="contact-detail-item">
                <div className="detail-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                </div>
                <div className="detail-meta">
                  <span className="detail-label">GitHub</span>
                  <a
                    href={personalDetails.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-value link"
                  >
                    github.com/Omsingh1921
                  </a>
                </div>
              </div>

              {/* LinkedIn Profile */}
              <div className="contact-detail-item">
                <div className="detail-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                </div>
                <div className="detail-meta">
                  <span className="detail-label">LinkedIn</span>
                  <a
                    href={personalDetails.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-value link"
                  >
                    linkedin.com/in/om-thakur-
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
