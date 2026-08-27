// Global 404 (unknown routes). With multiple root layouts ((es)/(en) route
// groups) this page must render its own <html> and <body>.
import { Montserrat } from 'next/font/google';
import NotFoundContent from '@/components/NotFoundContent';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: '404 - Página no encontrada | Legasint',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased overflow-x-hidden`}>
        <NotFoundContent locale="es" />
      </body>
    </html>
  );
}
