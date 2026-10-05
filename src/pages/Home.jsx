import Hero from '../components/Hero'
import About from '../components/About'
import EngineeringEcosystem from '../components/EngineeringEcosystem'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <EngineeringEcosystem />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </div>
  )
}
