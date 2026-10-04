import { education, problemSolving } from '../data/portfolioData'
import '../styles/Education.css'

export default function Education() {
  const primaryEducation = education[0]

  return (
    <section id="education" className="education-section" aria-label="Education and Algorithms">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-badge">
            <span className="section-label-dot"></span>
            <span className="section-label-text">EDUCATION</span>
          </div>

          <h2 className="section-heading">Academic & Algorithmic Background</h2>
          <p className="section-subheading">
            Formal technical education in Information Technology paired with disciplined problem solving.
          </p>
        </div>

        {/* Education & Algorithms Grid */}
        <div className="education-grid">
          {/* Primary Education Card */}
          <div className="education-card">
            <div className="education-card-top">
              <div className="education-icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
              </div>
              <span className="education-period-badge">{primaryEducation.period}</span>
            </div>

            <h3 className="education-degree">{primaryEducation.degree}</h3>
            <p className="education-institution">{primaryEducation.institution}</p>
            <div className="education-score-pill">
              <span>{primaryEducation.score}</span>
            </div>

            <p className="education-details">{primaryEducation.details}</p>
          </div>

          {/* Problem Solving & DSA Card */}
          <div className="education-card problem-solving-card">
            <div className="education-card-top">
              <div className="education-icon-box leetcode-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
              <span className="education-period-badge">{problemSolving.platform}</span>
            </div>

            <h3 className="education-degree">{problemSolving.problemsSolved}</h3>
            <p className="education-institution">Core Data Structures & Algorithms</p>

            <p className="education-details">{problemSolving.description}</p>

            {/* DSA Topics Chips */}
            <div className="dsa-topics-wrap">
              {problemSolving.topics.map((topic, idx) => (
                <span key={idx} className="dsa-topic-chip">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
