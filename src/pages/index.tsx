import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import ImageSequencer from '@/components/image-sequencer'
import Inner from '@/components/layout/inner'
import ProjectsSlider from '@/components/projects-slider'
import ServicesSection from '@/components/services-section'

export default function Home() {
  return (
    <Inner>
      <HeroSection />
      <ImageSequencer />
      <ProjectsSlider />
      <ServicesSection />
    </Inner>
  )
}
