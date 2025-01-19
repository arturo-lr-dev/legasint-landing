// app/page.tsx
import { useMemo } from 'react';
import AnimatedLanding from '@/components/landing/AnimatedLanding';
import PortfolioSection from '@/components/landing/PortfolioSection';
import SocialImpactSection from '@/components/landing/SocialSection';

export default function Home() {

  useMemo(() => {
    // Estilos para el texto en la consola
    const styles = `
      color: #581c87;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      padding: 10px;
    `;

    // Mensaje principal
    console.log('%cLegaSint', styles);

    // Submensaje con estilo diferente
    const subStyles = `
      color: #ffffff;
      font-size: 16px;
      font-style: italic;
    `;

    console.log('%cYour Vision, Our Technology', subStyles);
  }, [])

  return (
    <>
      <AnimatedLanding />
      <PortfolioSection />
      <SocialImpactSection />
    </>
  );
}