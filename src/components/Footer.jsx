import { personalDetails, navLinks } from '../data/portfolioData'
import '../styles/Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {

  const handleScrollTo = (e, href) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        e.preventDefault()
        targetEl.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a
              href="#home"
              className="footer-logo"
              onClick={(e) => handleScrollTo(e, '#home')}
            >
              <span>OM THAKUR</span>
              <span className="footer-logo-dot">.</span>
            </a>
            <p className="footer-tagline">
              Java Full Stack Developer specializing in secure Spring Boot architectures, RESTful APIs, and relational persistence.
            </p>
          </div>

          <div className="footer-nav">
            <span className="footer-nav-title">Navigation</span>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-link"
                    onClick={(e) => handleScrollTo(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-connect">
            <span className="footer-nav-title">Connect</span>
            <div className="footer-social-links">
              <a
                href={personalDetails.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                GitHub
              </a>
              <a
                href={personalDetails.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${personalDetails.email}`}
                className="footer-social-link"
                aria-label="Email"
              >
                Email
              </a>
              <a
                href={personalDetails.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Resume PDF"
              >
                Resume PDF
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {CURRENT_YEAR} Om Thakur. Built with React & modern software design principles.
          </p>
          <a
            href="#home"
            className="footer-back-to-top"
            onClick={(e) => handleScrollTo(e, '#home')}
            aria-label="Back to top"
          >
            <span>Back to top</span>
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
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
