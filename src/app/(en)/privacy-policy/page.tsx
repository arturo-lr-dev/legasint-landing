import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy of Legasint. Information about personal data processing, cookies and your rights.',
  alternates: {
    canonical: 'https://legasint.com/privacy-policy',
    languages: {
      'es': 'https://legasint.com/politica-de-privacidad',
      'en': 'https://legasint.com/privacy-policy',
      'x-default': 'https://legasint.com/politica-de-privacidad',
    },
  },
  openGraph: {
    title: 'Privacy Policy',
    description: 'Information about personal data processing, cookies and your rights.',
    url: 'https://legasint.com/privacy-policy',
    locale: 'en_US',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 pt-28 pb-16 px-4">
      <article className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/20 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-blue-200 mb-6">
          At Legasint we build custom software, automation and artificial intelligence solutions for businesses. We take your privacy very seriously. This policy explains what information we collect, for what purpose, and what your rights are.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">1. Data controller</h2>
          <p className="text-blue-100 leading-relaxed">
            <strong>Controller:</strong> Legasint — Custom software development<br />
            <strong>Contact email:</strong> arturo@legasint.com<br />
            <strong>Website:</strong> https://legasint.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">2. Data we collect</h2>
          <ul className="list-disc list-inside text-blue-100 leading-relaxed space-y-2">
            <li>
              <strong>Contact data:</strong> name, email, phone, company and message you send us through the contact form to request information or a quote for our software development services.
            </li>
            <li>
              <strong>Browsing data:</strong> information collected through cookies and similar technologies (IP address,
              device type, browser, pages visited, etc.).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">3. Purpose of processing</h2>
          <ul className="list-disc list-inside text-blue-100 leading-relaxed space-y-2">
            <li>Manage your enquiries and information requests.</li>
            <li>Provide the services you request.</li>
            <li>Carry out statistical analysis and improve the user experience.</li>
            <li>Measure the performance of our advertising campaigns.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">4. Cookies</h2>
          <p className="text-blue-100 leading-relaxed mb-3">
            We use our own and third-party cookies to improve your experience and analyse website traffic.
          </p>
          <p className="text-blue-100 leading-relaxed mb-3">
            <strong>Technical cookies:</strong> necessary for the website to function.
          </p>
          <p className="text-blue-100 leading-relaxed mb-3">
            <strong>Analytical cookies:</strong> we use Google Analytics 4 to understand how the website is used.
          </p>
          <p className="text-blue-100 leading-relaxed">
            <strong>Advertising cookies:</strong> we use Google Ads to measure the performance of our campaigns.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">5. Third parties</h2>
          <p className="text-blue-100 leading-relaxed">
            We share browsing data with technology service providers such as Google (Analytics, Ads) and Web3Forms (contact
            form management). These third parties may only access your data to provide their services and are obliged to
            process it in accordance with applicable regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">6. Your rights</h2>
          <p className="text-blue-100 leading-relaxed mb-3">
            You may exercise your rights of access, rectification, erasure, objection, restriction of processing and
            portability by writing to arturo@legasint.com.
          </p>
          <p className="text-blue-100 leading-relaxed">
            You also have the right to lodge a complaint with the relevant data protection authority.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. Data retention</h2>
          <p className="text-blue-100 leading-relaxed">
            We keep your contact data for as long as necessary to manage your enquiry and, where applicable, the contracted
            service. Browsing data is kept for the period established by Google in its terms of service.
          </p>
        </section>
      </article>
    </main>
  );
}
