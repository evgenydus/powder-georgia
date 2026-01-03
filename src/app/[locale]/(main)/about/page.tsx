import { HeroSection, MissionSection, TeamSection } from '@/components/about'
import { CTASection } from '@/components/home/CTASection'

const AboutPage = () => {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <HeroSection />
      <MissionSection />
      <TeamSection />
      <CTASection />
    </main>
  )
}

export default AboutPage
