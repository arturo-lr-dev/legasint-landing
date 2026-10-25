export type Locale = 'es' | 'en';

export type ServiceId = 'software' | 'apis' | 'ia' | 'consultoria';

export interface ProjectCopy {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  challenge?: string;
  solution?: string;
  outcome?: string;
}

export interface HomeCopy {
  hero: {
    h1: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    microcopy: string;
    whatsappLabel: string;
    whatsappAria: string;
    visual: {
      beforeLabel: string;
      beforeItems: string[];
      afterLabel: string;
      afterTitle: string;
      afterItems: string[];
      caption: string;
    };
  };
  problems: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    cta: string;
    projects: ProjectCopy[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: { step: string; title: string; description: string }[];
  };
  social: {
    title: string;
    subtitle: string;
    causes: { title: string; description: string }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      id: ServiceId;
      title: string;
      description: string;
      features: string[];
      deliverable: string;
      cta: string;
      relatedCase?: string;
    }[];
  };
  servicesPage: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    navigationTitle: string;
    proofTitle: string;
    proofSubtitle: string;
    proofCta: string;
    serviceContactCta: string;
    faqTitle: string;
    faqSubtitle: string;
    faqItems: { question: string; answer: string }[];
    finalTitle: string;
    finalSubtitle: string;
    directContact: string;
    whatsappLabel: string;
  };
}

export const homeCopy: Record<Locale, HomeCopy> = {
  es: {
    hero: {
      h1: 'Software a medida para eliminar trabajo manual en tu pyme',
      description:
        'ERP, integraciones y automatizaciones para pymes industriales, logísticas y despachos profesionales. Entregas por sprints, precio cerrado y trato directo con quien desarrolla.',
      primaryCta: 'Solicitar diagnóstico gratuito de 30 min',
      secondaryCta: 'Ver proyectos reales',
      microcopy: 'Analizamos tu proceso y te llevas recomendaciones concretas, sin compromiso.',
      whatsappLabel: 'Hablar por WhatsApp',
      whatsappAria: 'Solicitar el diagnóstico gratuito por WhatsApp',
      visual: {
        beforeLabel: 'Antes',
        beforeItems: ['Excel y versiones', 'Correos y WhatsApp', 'Datos duplicados'],
        afterLabel: 'Después',
        afterTitle: 'Una herramienta compartida',
        afterItems: ['Pedidos y expedientes centralizados', 'Datos actualizados', 'Tareas automatizadas'],
        caption: 'Un ejemplo de cómo ordenamos tu proceso.',
      },
    },
    problems: {
      title: 'Si tu proceso se sostiene con parches, se puede mejorar',
      subtitle: 'No hace falta cambiarlo todo. Empezamos por el punto que más tiempo o errores os cuesta.',
      items: [
        {
          title: 'Pedidos y almacén, entre Excel y WhatsApp',
          description: 'La información cambia en varios sitios y nadie sabe cuál es la última versión.',
        },
        {
          title: 'Expedientes repartidos entre correo y carpetas',
          description: 'Buscar documentos, comprobar estados y preparar informes consume horas cada semana.',
        },
        {
          title: 'Datos copiados a mano entre herramientas',
          description: 'ERP, CRM, ecommerce y hojas de cálculo no se comunican y tu equipo repite el mismo trabajo.',
        },
      ],
    },
    portfolio: {
      title: 'Proyectos reales, explicados con claridad',
      subtitle: 'Qué necesitaba cada proyecto, qué construimos y qué permite hacer la solución.',
      cta: 'Visitar proyecto',
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
          title: 'Cronos',
          description: 'Aula virtual marca blanca para academias de oposiciones',
          tags: ['Aula virtual', 'Multi-tenant', 'SaaS'],
          featured: true,
          challenge: 'Disponer de un aula virtual de marca blanca para academias, sin depender de una experiencia formativa genérica.',
          solution: 'Una plataforma SaaS multi-tenant para centralizar contenidos y adaptar la experiencia a cada academia.',
          outcome: 'Un entorno de aprendizaje bajo la marca de cada academia, con espacios de formación independientes.',
        },
        {
          title: 'Smart Stadium Pricing',
          description: 'Precios dinámicos para eventos en estadios',
          tags: ['Machine learning', 'Pricing', 'Open source'],
          featured: true,
          challenge: 'Explorar cómo ajustar los precios de eventos según la demanda en lugar de mantener una tarifa estática.',
          solution: 'Un modelo de machine learning para precios dinámicos, publicado como proyecto open source.',
          outcome: 'Una base técnica abierta para analizar y experimentar con estrategias de pricing en estadios.',
        },
        {
          title: 'Ambar PRO',
          description: 'Soluciones avanzadas de modelado para sistemas industriales complejos',
          tags: ['Modelado', 'Industrial', 'Software especializado'],
          featured: true,
          challenge: 'Trabajar con modelos de sistemas industriales complejos mediante una herramienta especializada.',
          solution: 'Una aplicación orientada al modelado avanzado y a las particularidades de cada sistema industrial.',
          outcome: 'Una solución específica para explorar y trabajar con modelos industriales complejos.',
        },
      ],
    },
    process: {
      title: 'De la primera conversación a una solución en producción',
      subtitle: 'Sabes qué ocurre en cada fase y qué puedes esperar antes de invertir en el proyecto.',
      steps: [
        {
          step: '01',
          title: 'Diagnóstico gratuito',
          description: 'En 30 minutos revisamos tu proceso, detectamos el principal cuello de botella y valoramos las opciones.',
        },
        {
          step: '02',
          title: 'Propuesta clara',
          description: 'Definimos alcance, tecnología, plazos y precio cerrado antes de empezar.',
        },
        {
          step: '03',
          title: 'Entregas por sprints',
          description: 'Ves el software funcionando desde las primeras entregas y puedes priorizar con información real.',
        },
        {
          step: '04',
          title: 'Lanzamiento y evolución',
          description: 'Despliegue, documentación y un plan de soporte adaptado a lo que necesite tu equipo.',
        },
      ],
    },
    social: {
      title: 'Tecnología también con propósito',
      subtitle: 'Iniciativas que conectan nuestro trabajo con educación, sostenibilidad e inclusión.',
      causes: [
        {
          title: 'Educación digital',
          description: 'Ofrecemos formación tecnológica gratuita a comunidades desfavorecidas.',
        },
        {
          title: 'Sostenibilidad',
          description: 'Desarrollamos soluciones tecnológicas para reducir el impacto ambiental.',
        },
        {
          title: 'Inclusión digital',
          description: 'Hacemos la tecnología accesible para personas con diversidad funcional.',
        },
      ],
    },
    faq: {
      title: 'Antes de empezar',
      subtitle: 'Respuestas a las preguntas habituales sobre el trabajo con Legasint.',
      items: [
        {
          question: '¿Qué servicios ofrece Legasint?',
          answer: 'Desarrollo de software a medida, automatización de procesos, soluciones de inteligencia artificial y CTO as a Service. También trabajamos el cumplimiento normativo tecnológico (AI Act, RGPD, NIS2, DORA).',
        },
        {
          question: '¿Cuánto cuesta desarrollar un software a medida?',
          answer: 'Depende del alcance del proyecto. Tras una primera conversación gratuita, preparamos una propuesta cerrada con precio y plazos definidos, sin sorpresas ni costes ocultos.',
        },
        {
          question: '¿Cuánto tiempo tarda un proyecto típico?',
          answer: 'Un MVP suele estar listo en 6–12 semanas. Proyectos más complejos se planifican por fases, con entregas funcionales cada pocas semanas para que veas progreso real desde el primer mes.',
        },
        {
          question: '¿Trabajáis con empresas fuera de España?',
          answer: 'Sí. Aunque nuestra base está en España, trabajamos con clientes en toda Europa en remoto, tanto en español como en inglés.',
        },
        {
          question: '¿Qué es un socio tecnológico y en qué se diferencia de una consultora?',
          answer: 'Un socio tecnológico se implica a largo plazo en tu negocio: no solo entrega código, sino que te acompaña en las decisiones técnicas, la estrategia de producto y la evolución continua de tu software.',
        },
      ],
    },
    services: {
      title: 'Servicios para pasar del proceso manual al sistema adecuado',
      subtitle: 'Empezamos por el problema de negocio y elegimos la tecnología después.',
      items: [
        {
          id: 'software',
          title: 'Software a medida',
          description: 'Centraliza pedidos, expedientes o gestión interna en una herramienta diseñada para tu forma de trabajar.',
          features: ['ERP y sistemas internos', 'Aplicaciones web y SaaS', 'MVP y prototipos'],
          deliverable: 'Una aplicación adaptada a tu proceso, con alcance, plazos y precio definidos antes de empezar.',
          cta: 'Ver software a medida',
          relatedCase: 'Cronos',
        },
        {
          id: 'apis',
          title: 'APIs e integraciones',
          description: 'Haz que ERP, CRM, ecommerce y herramientas internas compartan datos sin copiar información a mano.',
          features: ['Integraciones con terceros', 'APIs REST y webhooks', 'Workflows con n8n y Make'],
          deliverable: 'Un flujo de datos documentado que conecta tus herramientas y reduce el trabajo repetitivo.',
          cta: 'Consultar integraciones',
        },
        {
          id: 'ia',
          title: 'Automatización e inteligencia artificial',
          description: 'Automatiza documentos, clasificación de entradas y tareas repetitivas dentro de tus herramientas actuales.',
          features: ['Agentes y chatbots', 'Búsqueda semántica y RAG', 'Automatización de documentos'],
          deliverable: 'Una automatización integrada en tu operación, con revisión humana donde sea necesaria.',
          cta: 'Ver automatización con IA',
          relatedCase: 'Smart Stadium Pricing',
        },
        {
          id: 'consultoria',
          title: 'Consultoría y CTO externo',
          description: 'Ordena decisiones técnicas, moderniza sistemas y prioriza la inversión tecnológica con criterio de negocio.',
          features: ['Auditoría técnica', 'Modernización y escalabilidad', 'Dirección tecnológica externa'],
          deliverable: 'Un plan técnico priorizado por impacto y acompañamiento para ejecutarlo con tu equipo.',
          cta: 'Ver CTO as a Service',
        },
      ],
    },
    servicesPage: {
      title: 'Desarrollo y automatización adaptados a cómo trabaja tu empresa',
      subtitle: 'Elige el problema que quieres resolver. Te ayudamos a definir la solución, el alcance y el siguiente paso sin compromiso.',
      primaryCta: 'Solicitar diagnóstico gratuito de 30 min',
      secondaryCta: 'Explorar servicios',
      navigationTitle: '¿Qué necesitas resolver?',
      proofTitle: 'Soluciones construidas para necesidades concretas',
      proofSubtitle: 'Dos ejemplos del enfoque: una plataforma multi-tenant y una herramienta de modelado industrial.',
      proofCta: 'Ver cómo trabajamos los proyectos',
      serviceContactCta: 'Consultar este servicio',
      faqTitle: 'Lo que conviene saber antes de contratar',
      faqSubtitle: 'Condiciones claras para decidir con información.',
      faqItems: [
        {
          question: '¿Cómo se calcula el presupuesto?',
          answer: 'Después del diagnóstico definimos alcance, entregables y dependencias. Recibes una propuesta con precio y plazos cerrados antes de empezar.',
        },
        {
          question: '¿Qué recibo durante el desarrollo?',
          answer: 'Entregas funcionales por sprints, revisiones periódicas y visibilidad sobre las siguientes prioridades. No esperas hasta el final para probar la solución.',
        },
        {
          question: '¿Quién es propietario del código?',
          answer: 'La propiedad del código, las licencias y las condiciones de uso quedan detalladas por escrito en cada propuesta y contrato.',
        },
        {
          question: '¿Qué ocurre después del lanzamiento?',
          answer: 'Nos ocupamos del despliegue y la documentación. El soporte y el mantenimiento evolutivo se adaptan a lo que necesite tu equipo y quedan definidos en la propuesta.',
        },
        {
          question: '¿Cuándo no encaja un desarrollo a medida?',
          answer: 'Si solo necesitas una web sencilla o una herramienta estándar ya resuelve tu proceso, te lo diremos. El desarrollo a medida tiene sentido cuando tu forma de trabajar necesita una solución específica.',
        },
      ],
      finalTitle: 'Empecemos por el proceso que más tiempo os cuesta',
      finalSubtitle: 'En 30 minutos analizamos tu situación y te llevas recomendaciones concretas, hagamos un proyecto después o no.',
      directContact: '¿Prefieres hablar directamente?',
      whatsappLabel: 'Solicitar diagnóstico por WhatsApp',
    },
  },
  en: {
    hero: {
      h1: 'Custom software that removes manual work from your business',
      description:
        'ERP, integrations and automation for industrial and logistics SMEs and professional firms. Sprint-based deliveries, fixed-scope pricing and direct contact with the people building your solution.',
      primaryCta: 'Request a free 30-minute assessment',
      secondaryCta: 'See real projects',
      microcopy: 'We review your process and give you practical recommendations, with no obligation.',
      whatsappLabel: 'Chat on WhatsApp',
      whatsappAria: 'Request the free assessment on WhatsApp',
      visual: {
        beforeLabel: 'Before',
        beforeItems: ['Spreadsheets and versions', 'Emails and WhatsApp', 'Duplicated data'],
        afterLabel: 'After',
        afterTitle: 'One shared tool',
        afterItems: ['Centralised orders and records', 'Up-to-date data', 'Automated tasks'],
        caption: 'An example of how we organise your process.',
      },
    },
    problems: {
      title: 'If your process relies on workarounds, it can be improved',
      subtitle: 'You do not need to replace everything. We start with the bottleneck costing you the most time or errors.',
      items: [
        {
          title: 'Orders and stock spread across Excel and WhatsApp',
          description: 'Information changes in several places and nobody knows which version is current.',
        },
        {
          title: 'Records scattered across inboxes and folders',
          description: 'Finding documents, checking statuses and preparing reports takes hours every week.',
        },
        {
          title: 'Data copied manually between tools',
          description: 'ERP, CRM, ecommerce and spreadsheets do not communicate, so your team repeats the same work.',
        },
      ],
    },
    portfolio: {
      title: 'Real projects, explained clearly',
      subtitle: 'What each project needed, what we built and what the solution makes possible.',
      cta: 'Visit project',
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
          title: 'Cronos',
          description: 'White-label virtual classroom for exam preparation academies',
          tags: ['Virtual classroom', 'Multi-tenant', 'SaaS'],
          featured: true,
          challenge: 'Provide academies with a white-label virtual classroom instead of a generic learning experience.',
          solution: 'A multi-tenant SaaS platform that centralises content and adapts the experience to each academy.',
          outcome: 'A learning environment under each academy’s own brand, with independent training spaces.',
        },
        {
          title: 'Smart Stadium Pricing',
          description: 'Dynamic pricing for stadium events',
          tags: ['Machine learning', 'Pricing', 'Open source'],
          featured: true,
          challenge: 'Explore how event prices could respond to demand instead of remaining fixed.',
          solution: 'A machine learning model for dynamic pricing, published as an open-source project.',
          outcome: 'An open technical foundation for analysing and experimenting with stadium pricing strategies.',
        },
        {
          title: 'Ambar PRO',
          description: 'Advanced modelling solutions for complex industrial systems',
          tags: ['Modelling', 'Industrial', 'Specialised software'],
          featured: true,
          challenge: 'Work with models of complex industrial systems through a specialised tool.',
          solution: 'An application designed for advanced modelling and the specific characteristics of each industrial system.',
          outcome: 'A dedicated solution for exploring and working with complex industrial models.',
        },
      ],
    },
    process: {
      title: 'From the first conversation to a solution in production',
      subtitle: 'You know what happens at each stage and what to expect before investing in the project.',
      steps: [
        {
          step: '01',
          title: 'Free assessment',
          description: 'In 30 minutes, we review your process, identify the main bottleneck and assess the available options.',
        },
        {
          step: '02',
          title: 'Clear proposal',
          description: 'We define scope, technology, timelines and fixed pricing before starting.',
        },
        {
          step: '03',
          title: 'Sprint deliveries',
          description: 'You see working software from the early deliveries and can prioritise using real feedback.',
        },
        {
          step: '04',
          title: 'Launch and evolution',
          description: 'Deployment, documentation and a support plan tailored to your team’s needs.',
        },
      ],
    },
    social: {
      title: 'Technology with a wider purpose',
      subtitle: 'Initiatives connecting our work with education, sustainability and inclusion.',
      causes: [
        {
          title: 'Digital education',
          description: 'We provide free technology training to underprivileged communities.',
        },
        {
          title: 'Sustainability',
          description: 'We develop technology solutions that help reduce environmental impact.',
        },
        {
          title: 'Digital inclusion',
          description: 'We make technology accessible to people with diverse abilities.',
        },
      ],
    },
    faq: {
      title: 'Before we start',
      subtitle: 'Answers to common questions about working with Legasint.',
      items: [
        {
          question: 'What services does Legasint offer?',
          answer: 'Custom software development, process automation, artificial intelligence solutions and CTO as a Service. We also work on technology regulatory compliance (AI Act, GDPR, NIS2, DORA).',
        },
        {
          question: 'How much does custom software development cost?',
          answer: 'It depends on the project scope. After a free initial conversation, we prepare a fixed proposal with defined pricing and timelines, with no surprises or hidden costs.',
        },
        {
          question: 'How long does a typical project take?',
          answer: 'An MVP is usually ready in 6–12 weeks. More complex projects are planned in phases, with working deliveries every few weeks so you see real progress from the first month.',
        },
        {
          question: 'Do you work with companies outside Spain?',
          answer: 'Yes. Although we are based in Spain, we work remotely with clients across Europe in both English and Spanish.',
        },
        {
          question: 'What is a tech partner and how is it different from a consultancy?',
          answer: 'A tech partner stays involved in your business over the long term: beyond delivering code, we support technical decisions, product strategy and the continuous evolution of your software.',
        },
      ],
    },
    services: {
      title: 'Services that take you from manual processes to the right system',
      subtitle: 'We start with the business problem and choose the technology afterwards.',
      items: [
        {
          id: 'software',
          title: 'Custom software',
          description: 'Centralise orders, records or internal management in a tool designed around the way you work.',
          features: ['ERP and internal systems', 'Web applications and SaaS', 'MVPs and prototypes'],
          deliverable: 'An application tailored to your process, with scope, timelines and pricing defined before starting.',
          cta: 'Explore custom software',
          relatedCase: 'Cronos',
        },
        {
          id: 'apis',
          title: 'APIs & integrations',
          description: 'Let your ERP, CRM, ecommerce and internal tools share data without manual copying.',
          features: ['Third-party integrations', 'REST APIs and webhooks', 'Workflows with n8n and Make'],
          deliverable: 'A documented data flow that connects your tools and reduces repetitive work.',
          cta: 'Discuss integrations',
        },
        {
          id: 'ia',
          title: 'Automation & artificial intelligence',
          description: 'Automate documents, incoming request triage and repetitive tasks inside your current tools.',
          features: ['Agents and chatbots', 'Semantic search and RAG', 'Document automation'],
          deliverable: 'Automation integrated into your operation, with human review where needed.',
          cta: 'Explore AI automation',
          relatedCase: 'Smart Stadium Pricing',
        },
        {
          id: 'consultoria',
          title: 'Consulting & fractional CTO',
          description: 'Make better technical decisions, modernise systems and prioritise technology investment around business impact.',
          features: ['Technical audits', 'Modernisation and scalability', 'External technology leadership'],
          deliverable: 'A technical plan prioritised by impact and support to implement it with your team.',
          cta: 'Explore CTO as a Service',
        },
      ],
    },
    servicesPage: {
      title: 'Development and automation designed around the way your company works',
      subtitle: 'Choose the problem you want to solve. We help you define the solution, scope and next step with no obligation.',
      primaryCta: 'Request a free 30-minute assessment',
      secondaryCta: 'Explore services',
      navigationTitle: 'What do you need to solve?',
      proofTitle: 'Solutions built for specific needs',
      proofSubtitle: 'Two examples of our approach: a multi-tenant platform and an industrial modelling tool.',
      proofCta: 'See how we approach projects',
      serviceContactCta: 'Discuss this service',
      faqTitle: 'What to know before hiring us',
      faqSubtitle: 'Clear terms to help you make an informed decision.',
      faqItems: [
        {
          question: 'How is the budget calculated?',
          answer: 'After the assessment, we define scope, deliverables and dependencies. You receive a proposal with fixed pricing and timelines before we start.',
        },
        {
          question: 'What do I receive during development?',
          answer: 'Working sprint deliveries, regular reviews and visibility into upcoming priorities. You do not wait until the end to try the solution.',
        },
        {
          question: 'Who owns the code?',
          answer: 'Code ownership, licences and terms of use are detailed in writing in each proposal and contract.',
        },
        {
          question: 'What happens after launch?',
          answer: 'We handle deployment and documentation. Support and ongoing development are tailored to your team’s needs and defined in the proposal.',
        },
        {
          question: 'When is custom development not a good fit?',
          answer: 'If you only need a simple website or an off-the-shelf tool already solves your process, we will tell you. Custom development makes sense when your way of working needs a specific solution.',
        },
      ],
      finalTitle: 'Let’s start with the process costing your team the most time',
      finalSubtitle: 'In 30 minutes, we review your situation and give you practical recommendations, whether we work together afterwards or not.',
      directContact: 'Prefer to talk directly?',
      whatsappLabel: 'Request an assessment on WhatsApp',
    },
  },
};
