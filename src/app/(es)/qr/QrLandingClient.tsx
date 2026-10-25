'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import company from '@/data/company.json';
import { GA_EVENTS, trackEvent } from '@/lib/analytics';

type LinkItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const webLinks: LinkItem[] = [
  {
    label: 'Inicio',
    href: '/',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3 12 9-9 9 9M5 10v10h14V10M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    label: 'Proyectos',
    href: '/#casos',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m-3 0h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-3 7a23.9 23.9 0 0 0 18 0M12 12v3" />
      </svg>
    ),
  },
  {
    label: 'Servicios',
    href: '/servicios',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m8 9-4 3 4 3m8-6 4 3-4 3m-3-9-2 12" />
      </svg>
    ),
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

const socialLinks: LinkItem[] = [
  {
    label: 'LinkedIn',
    href: company.linkedin,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: company.instagram,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function QrLandingClient() {
  const whatsappUrl = `https://wa.me/${company.phone.replace(/\D/g, '')}?text=${encodeURIComponent(company.whatsappMessage)}`;
  const vcardUrl = '/contacto.vcf';
  const emailUrl = `mailto:${company.email}`;

  return (
    <main id="main-content" className="brand-page relative min-h-[100dvh] w-full overflow-hidden px-4 py-12 sm:py-16 lg:flex lg:items-center">
      <div className="pointer-events-none absolute inset-0 bg-[url('/bg.svg')] bg-cover bg-center opacity-[0.05]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="brand-card overflow-hidden rounded-3xl border border-brand-blue/20 shadow-[0_30px_90px_-35px_rgba(37,99,235,0.45)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <section className="border-b border-white/10 p-6 sm:p-9 lg:border-b-0 lg:border-r" aria-labelledby="qr-profile-title">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-brand-blue/35 bg-white shadow-lg shadow-blue-950/25">
                  <Image src="/qr-avatar.png" alt="Logotipo de Legasint" width={96} height={96} priority className="h-full w-full object-cover" />
                </div>
                <div>
                  <h1 id="qr-profile-title" className="text-3xl font-bold tracking-tight text-brand-heading">{company.name}</h1>
                  <p className="mt-1 text-sm leading-relaxed text-brand-body">{company.tagline}</p>
                </div>
              </div>

              <h2 className="mt-8 text-balance text-2xl font-semibold text-brand-heading">Diagnóstico gratuito de 30 minutos</h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-body sm:text-base">
                Revisamos el proceso que más tiempo os cuesta y te llevas recomendaciones concretas, sin compromiso.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Solicitar el diagnóstico gratuito por WhatsApp"
                  onClick={() => trackEvent(GA_EVENTS.WHATSAPP_CLICK, { event_category: 'lead', event_label: 'qr_whatsapp' })}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-green-700 px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  Solicitar diagnóstico por WhatsApp
                </a>

                <a
                  href={vcardUrl}
                  download="Legasint_contacto.vcf"
                  aria-label="Guardar contacto de Legasint"
                  onClick={() => trackEvent(GA_EVENTS.CONTACT_DOWNLOAD, { event_category: 'lead', event_label: 'qr_save_contact' })}
                  className="brand-button-primary inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-center text-sm font-semibold text-white transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
                  </svg>
                  Guardar contacto
                </a>
              </div>

              <a
                href={emailUrl}
                onClick={() => trackEvent(GA_EVENTS.EMAIL_CLICK, { event_category: 'lead', event_label: 'qr_email' })}
                className="mt-5 inline-flex rounded text-sm font-medium text-brand-body underline decoration-white/20 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {company.email}
              </a>
            </section>

            <section className="p-6 sm:p-9" aria-labelledby="qr-links-title">
              <h2 id="qr-links-title" className="text-lg font-semibold text-brand-heading">También puedes visitar</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {webLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => trackEvent('qr_navigation', { event_category: 'navigation', event_label: `qr_${link.label.toLowerCase()}` })}
                    className={`${index % 2 === 0 ? 'brand-card' : 'brand-card-violet'} flex min-h-20 items-center gap-3 rounded-xl border border-white/10 p-4 text-brand-heading transition-colors hover:border-brand-blue/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue`}
                  >
                    <span className="text-brand-blue">{link.icon}</span>
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>

              <h2 className="mt-10 text-lg font-semibold text-brand-heading">Síguenos</h2>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    onClick={() => trackEvent(
                      link.label === 'LinkedIn' ? GA_EVENTS.LINKEDIN_CLICK : GA_EVENTS.INSTAGRAM_CLICK,
                      { event_category: 'social', event_label: `qr_${link.label.toLowerCase()}` },
                    )}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-brand-body transition-colors hover:border-brand-blue/45 hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              <div className="mt-10 border-t border-white/10 pt-5">
                <p className="text-sm leading-relaxed text-brand-body">Software a medida, integraciones y automatización para empresas en España y Europa.</p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="rounded text-sm text-brand-body/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">
            legasint.com
          </Link>
        </div>
      </div>
    </main>
  );
}
