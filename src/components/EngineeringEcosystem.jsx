import { useState, useRef } from 'react'
import { ecosystemData } from '../data/portfolioData'
import ScrollReveal from './ScrollReveal'
import '../styles/EngineeringEcosystem.css'

export default function EngineeringEcosystem() {
  const [activeNode, setActiveNode] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const containerRef = useRef(null)

  const { center, nodes } = ecosystemData

  // 8 nodes positioned in a balanced radial arrangement around center
  // Angles: 0, 45, 90, 135, 180, 225, 270, 315 degrees
  const nodeLayoutConfig = [
    { position: 'top-left', label: '01', x: -320, y: -190 },
    { position: 'top-center', label: '02', x: 0, y: -260 },
    { position: 'top-right', label: '03', x: 320, y: -190 },
    { position: 'middle-right', label: '04', x: 370, y: 30 },
    { position: 'bottom-right', label: '05', x: 320, y: 240 },
    { position: 'bottom-center', label: '06', x: 0, y: 280 },
    { position: 'bottom-left', label: '07', x: -320, y: 240 },
    { position: 'middle-left', label: '08', x: -370, y: 30 },
  ]

  return (
    <section id="ecosystem" className="ecosystem-section" aria-label="Engineering Ecosystem">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal className="section-header">
          <div className="section-label-badge">
            <span className="section-label-dot" />
            <span className="section-label-text">CONNECTED ARCHITECTURE</span>
          </div>
          <h2 className="section-heading">ENGINEERING ECOSYSTEM</h2>
          <p className="section-subheading">
            A cohesive full-stack technical ecosystem bridging production Java Spring Boot backends with modern React applications.
          </p>
        </ScrollReveal>

        {/* ====================================================================
            DESKTOP CONNECTED RADIAL ECOSYSTEM
            ==================================================================== */}
        <div ref={containerRef} className="ecosystem-desktop-canvas" aria-label="Interactive Connected Architecture Map">
          {/* SVG Animated Connection Web */}
          <svg className="ecosystem-svg-lines" viewBox="-480 -340 960 680" aria-hidden="true">
            <defs>
              <linearGradient id="lineGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="lineActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22B8F0" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Rays from Center (0,0) to each card position */}
            {nodeLayoutConfig.map((cfg, idx) => {
              const isHovered = hoveredNode === idx || activeNode === idx
              return (
                <g key={`svg-ray-${idx}`}>
                  {/* Subtle static guide ray */}
                  <line
                    x1="0"
                    y1="0"
                    x2={cfg.x}
                    y2={cfg.y}
                    className="ecosystem-ray-base"
                  />
                  {/* Glowing dynamic pulse ray */}
                  <line
                    x1="0"
                    y1="0"
                    x2={cfg.x}
                    y2={cfg.y}
                    className={`ecosystem-ray-pulse ${isHovered ? 'active' : ''}`}
                    stroke={isHovered ? 'url(#lineActiveGrad)' : 'url(#lineGlowGrad)'}
                  />
                  {/* End node anchor dot */}
                  <circle
                    cx={cfg.x}
                    cy={cfg.y}
                    r={isHovered ? 4.5 : 3}
                    className={`ecosystem-ray-dot ${isHovered ? 'active' : ''}`}
                  />
                </g>
              )
            })}
          </svg>

          {/* Central Anchor Element: OM THAKUR • Java Full Stack Developer */}
          <div className="ecosystem-central-core">
            <div className="central-core-ambient" aria-hidden="true" />
            <div className="central-core-ring ring-1" aria-hidden="true" />
            <div className="central-core-ring ring-2" aria-hidden="true" />
            <div className="central-core-card">
              <div className="central-core-badge">
                <span className="central-badge-dot" />
                <span>CORE ARCHITECT</span>
              </div>
              <h3 className="central-core-name">{center.name}</h3>
              <p className="central-core-role">{center.role}</p>
              <span className="central-core-tag">FULL STACK SYSTEMS</span>
            </div>
          </div>

          {/* 8 Connected Cards in Radial Coordinates */}
          <div className="ecosystem-radial-nodes">
            {nodes.map((node, idx) => {
              const cfg = nodeLayoutConfig[idx] || { x: 0, y: 0, label: '01' }
              const isHovered = hoveredNode === idx || activeNode === idx

              return (
                <div
                  key={node.id}
                  className={`ecosystem-node-card interactive-card pos-${cfg.position} ${isHovered ? 'is-active' : ''}`}
                  style={{
                    transform: `translate3d(calc(-50% + ${cfg.x}px), calc(-50% + ${cfg.y}px), 0)`,
                  }}
                  onMouseEnter={() => setHoveredNode(idx)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setActiveNode(activeNode === idx ? null : idx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isHovered}
                  aria-label={`${node.title} - ${node.category}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveNode(activeNode === idx ? null : idx)
                    }
                  }}
                >
                  <div className="node-card-header">
                    <span className="node-card-num">{cfg.label}</span>
                    <span className="node-card-cat">{node.category}</span>
                  </div>
                  <h4 className="node-card-title">{node.title}</h4>
                  <p className="node-card-desc">{node.description}</p>
                  <div className="node-card-skills">
                    {node.skills.map((s) => (
                      <span key={s} className="node-skill-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ====================================================================
            RESPONSIVE TABLET & MOBILE VIEW (2-COL / VERTICAL STACK)
            ==================================================================== */}
        <div className="ecosystem-responsive-flow" aria-label="Engineering Ecosystem Capabilities">
          {/* Central Mobile Highlight Card */}
          <div className="ecosystem-mobile-center-card">
            <div className="central-core-badge">
              <span className="central-badge-dot" />
              <span>CORE ARCHITECT</span>
            </div>
            <h3 className="central-core-name">{center.name}</h3>
            <p className="central-core-role">{center.role}</p>
            <p className="mobile-core-sub">{center.subtitle}</p>
          </div>

          {/* Timeline / Grid of Connected Capabilities */}
          <div className="ecosystem-responsive-grid">
            {nodes.map((node, idx) => (
              <ScrollReveal
                key={node.id}
                className="ecosystem-mobile-card interactive-card"
                delay={idx * 60}
              >
                <div className="node-card-header">
                  <span className="node-card-num">0{idx + 1}</span>
                  <span className="node-card-cat">{node.category}</span>
                </div>
                <h4 className="node-card-title">{node.title}</h4>
                <p className="node-card-desc">{node.description}</p>
                <div className="node-card-skills">
                  {node.skills.map((s) => (
                    <span key={s} className="node-skill-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
