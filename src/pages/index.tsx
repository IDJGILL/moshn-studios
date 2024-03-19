import ClientsSection from '@/components/clients-section'
import Cursor from '@/components/cursor'
import HeroSection from '@/components/hero-section'
import ImageSequencer from '@/components/image-sequencer'
import Inner from '@/components/layout/inner'
import ProjectsSlider from '@/components/projects-slider'
import ServicesSection from '@/components/services-section'

export default function Home() {
  return (
    <Inner>
      <HeroSection />
      <ClientsSection />
      <ImageSequencer />
      <ProjectsSlider />

      <Cursor initialSize={20} hoveredSize={200} />
    </Inner>
  )
}
