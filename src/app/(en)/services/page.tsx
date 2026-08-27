import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { homeCopy } from '@/i18n/home-copy';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Custom software development, APIs, integrations, artificial intelligence and technology consulting services for businesses.',
  alternates: {
    canonical: 'https://legasint.com/services',
    languages: {
      'es': 'https://legasint.com/servicios',
      'en': 'https://legasint.com/services',
      'x-default': 'https://legasint.com/servicios',
    },
  },
  openGraph: {
    title: 'Services | Legasint',
    description: 'Custom software, automation and AI solutions for businesses.',
    url: 'https://legasint.com/services',
    locale: 'en_US',
  },
};

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We understand your business, processes and goals in a free first session.',
  },
  {
    step: '02',
    title: 'Proposal',
    description: 'We define scope, technologies, timelines and fixed pricing. No surprises.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'We build in sprints with working deliveries every few weeks.',
  },
  {
    step: '04',
    title: 'Launch & support',
    description: 'Deployment, documentation and ongoing maintenance.',
  },
];

export default function ServicesPage() {
  const services = homeCopy.en.services.items;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 pt-28 pb-16 px-4">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Services
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
            We build custom software that adapts to your business, not the other way around.
          </p>
        </header>

        {/* Services Grid */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors"
            >
              <h2 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h2>
              <p className="text-blue-200 leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-blue-100 flex items-center gap-2">
                    <span className="text-violet-400" aria-hidden="true">›</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How we work
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <span className="font-mono text-sm text-violet-400 font-bold">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to talk about your project?
          </h2>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Tell us what you need and we will prepare a no-obligation proposal.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
          >
            Request a quote
          </Link>
        </section>

        {/* Form */}
        <section>
          <ContactForm locale="en" />
        </section>
      </article>
    </main>
  );
}
