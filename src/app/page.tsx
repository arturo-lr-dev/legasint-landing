// app/page.tsx
import AnimatedLanding from '@/components/landing/AnimatedLanding';
import PortfolioSection from '@/components/landing/PortfolioSection';
import SocialImpactSection from '@/components/landing/SocialSection';
import SmoothScroll from '@/components/landing/SmoothScroll';
import ScrollProgress from '@/components/landing/ScrollProgress';
import ConsoleEasterEgg from '@/components/landing/ConsoleEasterEgg';
import HeroBackground from '@/components/landing/three/HeroBackground';

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <ConsoleEasterEgg />
      <HeroBackground />
      {/* Single continuous gradient under every section so colors flow
          smoothly across section boundaries with no visible seams */}
      <div
        className="relative"
        style={{
          background:
            'linear-gradient(180deg, #1e3a8a 0%, #581c87 30%, #46217e 55%, #1e3a8a 78%, #581c87 100%)',
        }}
      >
        <AnimatedLanding />
        <PortfolioSection />
        <SocialImpactSection />
      </div>
    </>
  );
}
