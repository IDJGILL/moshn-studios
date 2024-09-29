import Inner from '@/components/layout/inner'
import ClientsSection from '@/components/pages/home/clients-section'
import { HeroSection } from '@/components/pages/home/hero-section'
import Sbi from '@/assets/clients/sbi.png'
import Bewakoof from '@/assets/clients/bewakoof.png'
import Bluorng from '@/assets/clients/bluorng.png'
import JackAndJones from '@/assets/clients/jack&jones.png'
import Zara from '@/assets/clients/zara.png'
import ProjectsSection from '@/components/pages/home/projects-section'
import IndustriesSection from '@/components/pages/home/industries-section'
import AboutUs from '@/components/pages/home/about-us'
import OurService from '@/components/pages/home/our-service'
import ContactSection from '@/components/pages/home/contact-section'

export default function Home() {
  return (
    <Inner>
      <div className='bg-black'>
        <HeroSection />

        <ProjectsSection />

        <div className='max-w-[1800px] mx-auto'>
          <IndustriesSection />

          <AboutUs />

          <OurService />
        </div>

        <ClientsSection
          items={[
            { name: 'SBI', image: Sbi },
            { name: 'Bewakoof', image: Bewakoof },
            { name: 'Bluorng', image: Bluorng },
            { name: 'JackAndJones', image: JackAndJones },
            { name: 'Zara', image: Zara },
          ]}
          pauseOnHover={false}
        />

        <ContactSection />
      </div>
    </Inner>
  )
}
