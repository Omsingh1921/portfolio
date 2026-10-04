import { experience } from '../data/portfolioData'
import '../styles/Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience-section" aria-label="Work Experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-badge">
            <span className="section-label-dot"></span>
            <span className="section-label-text">EXPERIENCE</span>
          </div>

          <h2 className="section-heading">Professional Work History</h2>
          <p className="section-subheading">
            Practical backend development delivering secure REST APIs, role-based security, and database architectures.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-wrapper">
          <div className="timeline-track">
            {experience.map((item, idx) => (
              <div key={idx} className="timeline-item">
                {/* Timeline Node Indicator */}
                <div className="timeline-marker" aria-hidden="true">
                  <div className="timeline-dot"></div>
                </div>

                {/* Timeline Content Card */}
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div>
                      <h3 className="timeline-role">{item.role}</h3>
                      <div className="timeline-company-meta">
                        <span className="timeline-company">{item.company}</span>
                        <span className="timeline-separator">•</span>
                        <span className="timeline-location">{item.location}</span>
                      </div>
                    </div>

                    <span className="timeline-period-pill">{item.period}</span>
                  </div>

                  <ul className="timeline-responsibilities">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="timeline-responsibility-item">
                        <span className="timeline-bullet" aria-hidden="true">›</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
