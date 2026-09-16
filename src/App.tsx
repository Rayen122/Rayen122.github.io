import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import LogosSection from './components/LogosSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <main className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <LogosSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
