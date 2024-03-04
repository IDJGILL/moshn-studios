import HeroSection from '@/components/hero-section'
import ImageSequencer from '@/components/image-sequencer'
import Inner from '@/components/layout/inner'
import ProjectsSectionV3 from '@/components/projects-section-v3'
import ProjectsSlider from '@/components/projects-slider'
import TestGsap from '@/components/test-gsap'

export default function Home() {
  return (
    <Inner>
      <HeroSection />
      <ImageSequencer />
      <ProjectsSlider />
    </Inner>
  )
}
