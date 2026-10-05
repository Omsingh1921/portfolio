import { experience } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import '../styles/Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience-section" aria-label="Work Experience">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal className="section-header">
          <div className="section-label-badge">
            <span className="section-label-dot"></span>
            <span className="section-label-text">EXPERIENCE</span>
          </div>

          <h2 className="section-heading">Professional Work History</h2>
          <p className="section-subheading">
            Practical backend engineering delivering secure REST APIs, role-based access control, and scalable relational schemas.
          </p>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="timeline-wrapper">
          <div className="timeline-track">
            {experience.map((item, idx) => (
              <ScrollReveal key={idx} className="timeline-item" delay={idx * 100}>
                {/* Timeline Node Indicator */}
                <div className="timeline-marker" aria-hidden="true">
                  <div className="timeline-dot"></div>
                </div>

                {/* Timeline Content Card */}
                <div className="timeline-card interactive-card">
                  <div className="timeline-card-header">
                    <div>
                      <h3 className="timeline-role">{item.role}</h3>
                      <div className="timeline-company-meta">
                        <span className="timeline-company">{item.company}</span>
                        <span className="timeline-separator">•</span>
                        <span className="timeline-location">{item.location}</span>
                      </div>
                    </div>

                    <span className="timeline-period-pill">{item.duration || item.period}</span>
                  </div>

                  {/* Core Responsibilities */}
                  <ul className="timeline-responsibilities">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="timeline-responsibility-item">
                        <span className="timeline-bullet" aria-hidden="true">›</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Engineering Achievements */}
                  {item.achievements && (
                    <div className="timeline-achievements">
                      <span className="timeline-subheading">KEY ACHIEVEMENTS:</span>
                      <ul className="timeline-achievements-list">
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="timeline-achievement-item">
                            <span className="achievement-check" aria-hidden="true">✓</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Stack Chips */}
                  {item.technologies && (
                    <div className="timeline-technologies">
                      <span className="timeline-subheading">TECHNOLOGIES:</span>
                      <div className="timeline-tech-chips">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="timeline-tech-chip interactive-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
