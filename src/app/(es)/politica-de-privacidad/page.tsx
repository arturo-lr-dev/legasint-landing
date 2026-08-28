import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad de Legasint. Información sobre el tratamiento de datos personales, cookies y tus derechos.',
  alternates: {
    canonical: 'https://legasint.com/politica-de-privacidad',
    languages: {
      'es': 'https://legasint.com/politica-de-privacidad',
      'en': 'https://legasint.com/privacy-policy',
      'x-default': 'https://legasint.com/politica-de-privacidad',
    },
  },
  openGraph: {
    title: 'Política de privacidad',
    description: 'Información sobre el tratamiento de datos personales, cookies y tus derechos.',
    url: 'https://legasint.com/politica-de-privacidad',
    locale: 'es_ES',
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 pt-28 pb-16 px-4">
      <article className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/20 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Política de privacidad</h1>

        <p className="text-blue-200 mb-6">
          En Legasint desarrollamos software a medida, automatización e inteligencia artificial para empresas. Nos tomamos muy en serio la privacidad de tus datos. Esta política explica qué información recopilamos, con qué finalidad y cuáles son tus derechos.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">1. Responsable del tratamiento</h2>
          <p className="text-blue-100 leading-relaxed">
            <strong>Responsable:</strong> Legasint — Desarrollo de software a medida<br />
            <strong>Email de contacto:</strong> arturo@legasint.com<br />
            <strong>Web:</strong> https://legasint.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">2. Datos que recopilamos</h2>
          <ul className="list-disc list-inside text-blue-100 leading-relaxed space-y-2">
            <li>
              <strong>Datos de contacto:</strong> nombre, email, teléfono, empresa y mensaje que nos envías a través del
              formulario de contacto para solicitar información o un presupuesto sobre nuestros servicios de desarrollo de
              software.
            </li>
            <li>
              <strong>Datos de navegación:</strong> información recopilada mediante cookies y tecnologías similares
              (dirección IP, tipo de dispositivo, navegador, páginas visitadas, etc.).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">3. Finalidad del tratamiento</h2>
          <ul className="list-disc list-inside text-blue-100 leading-relaxed space-y-2">
            <li>Gestionar tus consultas y solicitudes de información.</li>
            <li>Prestar los servicios que nos solicites.</li>
            <li>Realizar análisis estadísticos y mejorar la experiencia de usuario.</li>
            <li>Medir el rendimiento de nuestras campañas publicitarias.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">4. Cookies</h2>
          <p className="text-blue-100 leading-relaxed mb-3">
            Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico de la web.
          </p>
          <p className="text-blue-100 leading-relaxed mb-3">
            <strong>Cookies técnicas:</strong> necesarias para el funcionamiento de la web.
          </p>
          <p className="text-blue-100 leading-relaxed mb-3">
            <strong>Cookies analíticas:</strong> utilizamos Google Analytics 4 para conocer cómo se utiliza la web.
          </p>
          <p className="text-blue-100 leading-relaxed">
            <strong>Cookies publicitarias:</strong> utilizamos Google Ads para medir el rendimiento de nuestras campañas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">5. Terceros</h2>
          <p className="text-blue-100 leading-relaxed">
            Compartimos datos de navegación con proveedores de servicios tecnológicos como Google (Analytics, Ads) y
            Web3Forms (gestión de formularios de contacto). Estos terceros pueden tener acceso a tus datos únicamente para
            prestar sus servicios y están obligados a tratarlos conforme a la normativa vigente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">6. Tus derechos</h2>
          <p className="text-blue-100 leading-relaxed mb-3">
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
            portabilidad escribiendo a arturo@legasint.com.
          </p>
          <p className="text-blue-100 leading-relaxed">
            También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. Conservación de los datos</h2>
          <p className="text-blue-100 leading-relaxed">
            Conservamos tus datos de contacto durante el tiempo necesario para gestionar tu consulta y, en su caso, el
            servicio contratado. Los datos de navegación se conservan durante el plazo establecido por Google en sus
            condiciones de servicio.
          </p>
        </section>
      </article>
    </main>
  );
}
