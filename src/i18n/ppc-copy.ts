// Contenido de las landings PPC (una por grupo de anuncios de la campaña Search - Leads B2B)
// Cada landing replica el mensaje del anuncio (message match) y concentra en una sola conversión: el formulario.

export type PpcServiceKey = 'software-a-medida' | 'cto-as-a-service' | 'automatizacion-ia';

export interface PpcLandingCopy {
  key: PpcServiceKey;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  ctaPrimary: string;
  benefitsTitle: string;
  benefits: { title: string; description: string }[];
  proofTitle: string;
  ctaFinal: { title: string; subtitle: string };
}

export const ppcCopy: Record<PpcServiceKey, PpcLandingCopy> = {
  'software-a-medida': {
    key: 'software-a-medida',
    metaTitle: 'Desarrollo de Software a Medida para Empresas | Legasint',
    metaDescription:
      'Desarrollamos software a medida para empresas en España: aplicaciones web, sistemas internos y SaaS. Equipo senior, entregas por sprints y precio cerrado. Pide presupuesto sin compromiso.',
    h1: 'Desarrollo de software a medida',
    tagline:
      'Aplicaciones web, sistemas internos y plataformas SaaS diseñadas para tus procesos. Equipo senior, entregas por sprints y precio cerrado desde el día uno.',
    ctaPrimary: 'Solicitar presupuesto sin compromiso',
    benefitsTitle: 'Por qué empresas como la tuya nos eligen',
    benefits: [
      {
        title: 'Precio cerrado, sin sorpresas',
        description: 'Definimos alcance, plazos y precio en la propuesta. Lo que firmamos es lo que pagas.',
      },
      {
        title: 'Entregas funcionales cada pocas semanas',
        description: 'Trabajamos por sprints: ves el software funcionando desde la primera entrega, no al final del proyecto.',
      },
      {
        title: 'Equipo senior, sin intermediarios',
        description: 'Hablas directamente con quien construye tu software. Nada de gestores de gestores.',
      },
      {
        title: 'Soporte evolutivo continuo',
        description: 'Despliegue, documentación y mantenimiento. Tu software no se queda obsoleto al entregarse.',
      },
    ],
    proofTitle: 'Software real que ya está en producción',
    ctaFinal: {
      title: '¿Hablamos de tu proyecto?',
      subtitle: 'Cuéntanos qué necesitas y te preparamos una propuesta cerrada en menos de 24 horas.',
    },
  },
  'cto-as-a-service': {
    key: 'cto-as-a-service',
    metaTitle: 'CTO as a Service | Dirección Tecnológica Externa | Legasint',
    metaDescription:
      'CTO externo para tu empresa: estrategia tecnológica, arquitectura y liderazgo técnico sin el coste de un directivo a tiempo completo. Primera consulta gratuita.',
    h1: 'CTO as a Service',
    tagline:
      'Dirección tecnológica externa para tu empresa: estrategia, arquitectura y liderazgo técnico, sin el coste de un directivo a tiempo completo.',
    ctaPrimary: 'Primera consulta gratuita',
    benefitsTitle: 'Lo que un CTO fraccional aporta a tu negocio',
    benefits: [
      {
        title: 'Decisiones tecnológicas con criterio de negocio',
        description: 'Qué construir, qué comprar y qué no hacer. Cada decisión técnica evaluada por su impacto en tu cuenta de resultados.',
      },
      {
        title: 'Tu equipo rinde más desde la primera semana',
        description: 'Ordenamos prioridades, procesos y arquitectura. Tu equipo deja de apagar fuegos y empieza a entregar.',
      },
      {
        title: 'Flexibilidad real',
        description: 'Por horas, por proyecto o mensual. Escala la dedicación según el momento de tu empresa.',
      },
      {
        title: 'Auditoría técnica incluida',
        description: 'Evaluamos tu stack, tu código y tus proveedores actuales. Sabrás exactamente dónde estás y qué te conviene.',
      },
    ],
    proofTitle: 'Ya dirigimos la tecnología de productos en producción',
    ctaFinal: {
      title: '¿Hablamos de tu situación?',
      subtitle: 'Primera consulta gratuita. Analizamos tu caso y te decimos con franqueza si un CTO externo te conviene.',
    },
  },
  'automatizacion-ia': {
    key: 'automatizacion-ia',
    metaTitle: 'Automatización con IA para Empresas | Legasint',
    metaDescription:
      'Automatizamos procesos repetitivos con inteligencia artificial: documentos, compliance y atención al cliente. ROI medible en semanas. Pide una demo sin compromiso.',
    h1: 'Automatización con IA para empresas',
    tagline:
      'De 40 horas a 4: automatizamos tus procesos repetitivos con inteligencia artificial integrada en tus herramientas actuales. Sin cambiar de software.',
    ctaPrimary: 'Pide una demo sin compromiso',
    benefitsTitle: 'Qué automatizamos con IA',
    benefits: [
      {
        title: 'Documentos y contratos',
        description: 'Generación, revisión y clasificación automática de documentación repetitiva. De horas a minutos.',
      },
      {
        title: 'Compliance y reporting',
        description: 'Informes periódicos de RGPD, compliance o seguimiento de plazos generados solos y a tiempo.',
      },
      {
        title: 'Atención y triage de entrada',
        description: 'Clasificación y respuesta inicial de emails y formularios. Tu equipo solo ve lo que importa.',
      },
      {
        title: 'Integrado en tus herramientas',
        description: 'Trabajamos sobre lo que ya usas (n8n, Make, tus APIs). Sin migraciones ni software nuevo que aprender.',
      },
    ],
    proofTitle: 'Automatización real, no promesas',
    ctaFinal: {
      title: '¿Cuántas horas pierde tu equipo cada semana?',
      subtitle: 'Cuéntanos tu proceso más repetitivo y te enseñamos en una demo cómo quedaría automatizado.',
    },
  },
};
