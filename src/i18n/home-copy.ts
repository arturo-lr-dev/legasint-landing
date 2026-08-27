export type Locale = 'es' | 'en';

export interface HomeCopy {
  hero: {
    h1: string;
    tagline: string;
    description: string;
    whatsappAria: string;
    emailAria: string;
    seoParagraph: string;
    techStack: string;
    industries: string;
  };
  portfolio: {
    title: string;
    cta: string;
    projects: { title: string; description: string; tags: string[] }[];
  };
  social: {
    title: string;
    subtitle: string;
    causes: { title: string; description: string }[];
    ctaPre: string;
    ctaHighlight: string;
    ctaPost: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
}

export const homeCopy: Record<Locale, HomeCopy> = {
  es: {
    hero: {
      h1: 'Legasint - Desarrollo de software a medida y socio tecnológico',
      tagline: 'Tu Visión, Nuestra Tecnología',
      description:
        'Transformamos tus ideas en soluciones de software a medida. Desarrollamos tecnología que impulsa tu negocio hacia el futuro.',
      whatsappAria: 'Contáctanos por WhatsApp',
      emailAria: 'Contáctanos por email',
      seoParagraph:
        'Legasint es un socio tecnológico especializado en desarrollo de software a medida, automatización de procesos e inteligencia artificial para empresas en España y Europa. Ofrecemos CTO as a Service, desarrollo web, APIs, integraciones y soluciones de cumplimiento normativo (AI Act, RGPD, NIS2, DORA).',
      techStack:
        'Stack tecnológico: Angular, React, Node.js, Python, Java, AWS, Azure, Google Cloud, Docker, Kubernetes',
      industries:
        'Sectores: Finanzas, Salud, E-commerce, Industria, Educación, Tecnología, Legal',
    },
    portfolio: {
      title: '// Nuestros Proyectos',
      cta: 'Explora nuestro portafolio de soluciones innovadoras',
      projects: [
        {
          title: 'Valle Hub',
          description: 'Descubre tu ciudad',
          tags: ['Ubicación', 'Comercios', 'Ofertas', 'Claude', 'Supabase'],
        },
        {
          title: 'SF Education',
          description: 'Cambia la forma de aprender',
          tags: ['Educación', 'Cursos', 'Responsive'],
        },
        {
          title: 'LeCrep',
          description: 'Un sitio web moderno y atractivo para el cliente',
          tags: ['Cliente Pequeño', 'Landing Page', 'Responsive'],
        },
        {
          title: 'Sumeria',
          description: 'Tu mejor asistente de IA para tu negocio',
          tags: ['IA', 'Negocio', 'Asistente', 'Open Source'],
        },
        {
          title: 'Smart Stadium Pricing',
          description: 'Precios dinámicos para eventos en estadios',
          tags: ['ML', 'Pricing', 'Eventos', 'Open Source'],
        },
        {
          title: 'Ambar PRO',
          description: 'Soluciones avanzadas de modelado para sistemas industriales complejos',
          tags: ['Modelado', 'Industrial', 'Soluciones'],
        },
      ],
    },
    social: {
      title: '/* Nuestro Impacto Social */',
      subtitle: 'Tecnología con propósito, más allá del código',
      causes: [
        {
          title: 'Educación Digital',
          description:
            'Ofrecemos formación tecnológica gratuita a comunidades desfavorecidas',
        },
        {
          title: 'Sostenibilidad',
          description:
            'Desarrollamos soluciones tecnológicas para reducir el impacto ambiental',
        },
        {
          title: 'Inclusión Digital',
          description:
            'Hacemos la tecnología accesible para personas con diversidad funcional',
        },
      ],
      ctaPre: 'Únete a nuestra misión de crear',
      ctaHighlight: 'impacto positivo',
      ctaPost: 'a través de la tecnología',
    },
    faq: {
      title: '// Preguntas Frecuentes',
      subtitle: 'Lo que necesitas saber antes de trabajar con nosotros',
      items: [
        {
          question: '¿Qué servicios ofrece Legasint?',
          answer:
            'Desarrollo de software a medida, automatización de procesos, soluciones de inteligencia artificial y CTO as a Service. También trabajamos el cumplimiento normativo tecnológico (AI Act, RGPD, NIS2, DORA).',
        },
        {
          question: '¿Cuánto cuesta desarrollar un software a medida?',
          answer:
            'Depende del alcance del proyecto. Tras una primera conversación gratuita, preparamos una propuesta cerrada con precio y plazos definidos, sin sorpresas ni costes ocultos.',
        },
        {
          question: '¿Cuánto tiempo tarda un proyecto típico?',
          answer:
            'Un MVP suele estar listo en 6-12 semanas. Proyectos más complejos se planifican por fases, con entregas funcionales cada pocas semanas para que veas progreso real desde el primer mes.',
        },
        {
          question: '¿Trabajáis con empresas fuera de España?',
          answer:
            'Sí. Aunque nuestra base está en España, trabajamos con clientes en toda Europa en remoto, tanto en español como en inglés.',
        },
        {
          question: '¿Qué es un socio tecnológico y en qué se diferencia de una consultora?',
          answer:
            'Un socio tecnológico se implica a largo plazo en tu negocio: no solo entrega código, sino que te acompaña en las decisiones técnicas, la estrategia de producto y la evolución continua de tu software.',
        },
      ],
    },
  },
  en: {
    hero: {
      h1: 'Legasint - Custom Software Development & Tech Partner',
      tagline: 'Your Vision, Our Technology',
      description:
        'We transform your ideas into custom software solutions. We develop technology that drives your business into the future.',
      whatsappAria: 'Contact us via WhatsApp',
      emailAria: 'Contact us via email',
      seoParagraph:
        'Legasint is a technology partner specialized in custom software development, process automation and artificial intelligence for businesses in Spain and Europe. We offer CTO as a Service, web development, APIs, integrations and regulatory compliance solutions (AI Act, GDPR, NIS2, DORA).',
      techStack:
        'Technology Stack: Angular, React, Node.js, Python, Java, AWS, Azure, Google Cloud, Docker, Kubernetes',
      industries:
        'Industries Served: Finance, Healthcare, E-commerce, Manufacturing, Education, Technology, Legal',
    },
    portfolio: {
      title: '// Our Projects',
      cta: 'Explore our portfolio of innovative solutions',
      projects: [
        {
          title: 'Valle Hub',
          description: 'Discover your city',
          tags: ['Location', 'Commerces', 'Offers', 'Claude', 'Supabase'],
        },
        {
          title: 'SF Education',
          description: 'Change the way of learning',
          tags: ['Education', 'Courses', 'Responsive'],
        },
        {
          title: 'LeCrep',
          description: 'A modern, attractive website for the client',
          tags: ['Small Client', 'Landing Page', 'Responsive'],
        },
        {
          title: 'Sumeria',
          description: 'Your best AI assistant for your business',
          tags: ['AI', 'Business', 'Assistant', 'Open Source'],
        },
        {
          title: 'Smart Stadium Pricing',
          description: 'Dynamic pricing for stadium events',
          tags: ['ML', 'Pricing', 'Events', 'Open Source'],
        },
        {
          title: 'Ambar PRO',
          description: 'Advanced Modelling Solutions for Complex Industrial Systems',
          tags: ['Modelling', 'Industrial', 'Solutions'],
        },
      ],
    },
    social: {
      title: '/* Our Social Impact */',
      subtitle: 'Technology with purpose, beyond the code',
      causes: [
        {
          title: 'Digital Education',
          description:
            'We provide free technology training to underprivileged communities',
        },
        {
          title: 'Sustainability',
          description:
            'We develop technological solutions to reduce environmental impact',
        },
        {
          title: 'Digital Inclusion',
          description:
            'Making technology accessible for people with diverse abilities',
        },
      ],
      ctaPre: 'Join us in our mission to create',
      ctaHighlight: 'positive impact',
      ctaPost: 'through technology',
    },
    faq: {
      title: '// Frequently Asked Questions',
      subtitle: 'What you need to know before working with us',
      items: [
        {
          question: 'What services does Legasint offer?',
          answer:
            'Custom software development, process automation, artificial intelligence solutions, and CTO as a Service. We also handle technology regulatory compliance (AI Act, GDPR, NIS2, DORA).',
        },
        {
          question: 'How much does custom software development cost?',
          answer:
            'It depends on the project scope. After a free initial conversation, we prepare a fixed proposal with defined pricing and timelines — no surprises or hidden costs.',
        },
        {
          question: 'How long does a typical project take?',
          answer:
            'An MVP is usually ready in 6-12 weeks. More complex projects are planned in phases, with working deliveries every few weeks so you see real progress from the first month.',
        },
        {
          question: 'Do you work with companies outside Spain?',
          answer:
            'Yes. Although we are based in Spain, we work remotely with clients across Europe, in both Spanish and English.',
        },
        {
          question: 'What is a tech partner and how is it different from a consultancy?',
          answer:
            'A tech partner is involved in your business for the long term: we don\u2019t just deliver code, we support you in technical decisions, product strategy and the continuous evolution of your software.',
        },
      ],
    },
  },
};
