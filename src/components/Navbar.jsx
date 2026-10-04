import { useState, useEffect } from 'react'
import { personalDetails, navLinks } from '../data/portfolioData'
import ThemeToggle from './ThemeToggle'
import '../styles/Navbar.css'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Track scroll position for subtle frosted navbar background and active nav state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollYOffset = window.scrollY + 140

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && scrollYOffset >= el.offsetTop) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetEl = document.getElementById(targetId)

      if (targetEl) {
        e.preventDefault()
        targetEl.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
        setActiveSection(targetId)
      }
    }
    closeMobileMenu()
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* LEFT: Clean Brand / Logo */}
        <div className="navbar-left">
          <a
            href="#home"
            className="navbar-brand"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Om Thakur - Home"
          >
            <span className="navbar-brand-name">OM THAKUR</span>
            <span className="navbar-brand-dot">.</span>
          </a>
        </div>

        {/* CENTER: Desktop Navigation Links */}
        <nav className="navbar-center" aria-label="Main Navigation">
          <ul className="navbar-links">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`navbar-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* RIGHT: Separated Actions [Theme Toggle] [Download Resume] */}
        <div className="navbar-right">
          <div className="navbar-actions-group">
            <ThemeToggle />
            <a
              href={personalDetails.resumeUrl}
              className="btn btn-primary btn-sm navbar-resume-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume PDF"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="resume-icon"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`navbar-mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="mobile-toggle-bar"></span>
            <span className="mobile-toggle-bar"></span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className="mobile-drawer-links">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="mobile-drawer-actions">
            <a
              href={personalDetails.resumeUrl}
              className="btn btn-primary mobile-drawer-resume"
              onClick={closeMobileMenu}
              target="_blank"
              rel="noopener noreferrer"
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
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
