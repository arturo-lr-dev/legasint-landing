'use client';

import { useEffect } from 'react';

const ConsoleEasterEgg = () => {
  useEffect(() => {
    const styles = `
      color: #581c87;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      padding: 10px;
    `;
    console.log('%cLegasint', styles);

    const subStyles = `
      color: #ffffff;
      font-size: 16px;
      font-style: italic;
    `;
    console.log('%cYour Vision, Our Technology', subStyles);
  }, []);

  return null;
};

export default ConsoleEasterEgg;
