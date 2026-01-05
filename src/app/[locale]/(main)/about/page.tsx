import { HeroSection, MissionSection, TeamSection } from '@/components/about'
import { CTASection } from '@/components/home/CTASection'

const AboutPage = () => {
  return (
    <>
      <HeroSection />
      <div className="bg-background flex-1">
        <MissionSection />
        <TeamSection />
        <CTASection />
      </div>
    </>
  )
}

export default AboutPage
