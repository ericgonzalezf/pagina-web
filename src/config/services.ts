export const SVC_TABS = [
  "Tengo un negocio",
  "Quiero usar IA en mi trabajo",
  "Quiero usar IA en mi vida diaria",
];

export type SvcCard = {
  title: string;
  desc: string;
  featured?: boolean;
  badge?: string;
};

export const SVC_CARDS: SvcCard[][] = [
  [],
  [
    {
      title: "Aprende IA sin miedo, 1 a 1",
      desc: "Clases prácticas y personalizadas para que uses ChatGPT, Claude y otras herramientas en tu día a día laboral.",
    },
    {
      title: "Automatiza tu trabajo",
      desc: "Te ayudo a armar tus propios asistentes y atajos para correos, reportes, Excel y presentaciones.",
      featured: true,
      badge: "Más horas libres",
    },
    {
      title: "Recursos y plantillas",
      desc: "Prompts, guías y plantillas listas para usar desde hoy, a un precio accesible.",
    },
  ],
  [
    {
      title: "Aprende IA sin miedo, desde cero",
      desc: "A tu ritmo y sin tecnicismos. Ideal si sientes que la tecnología no es lo tuyo.",
      featured: true,
      badge: "Para empezar",
    },
    {
      title: "Tu asistente personal con IA",
      desc: "Organiza tu agenda, pendientes, viajes, comidas y gastos con ayuda de la IA.",
    },
    {
      title: "Recursos y plantillas para tu día a día",
      desc: "Guías y prompts listos para aprender, planear y escribir mejor.",
    },
  ],
];

export const SVC_CONTEXT = ["", "para mi trabajo", "para mi vida diaria"];

export const NEGOCIO_FEATURED = {
  badge: "El más pedido",
  title: "Tu negocio atendiendo en WhatsApp con IA",
  desc: "Un asistente que responde, agenda y vende por WhatsApp las 24 horas, entrenado con la información de tu negocio.",
  bullets: [
    "Responde preguntas al instante",
    "Agenda citas y toma pedidos",
    "Te pasa a los clientes listos para comprar",
  ],
};

export const NEGOCIO_CARDS = [
  {
    title: "Diagnóstico de IA para tu negocio",
    desc: "Te digo en qué parte de tu negocio la IA te ahorra tiempo y dinero, con un plan paso a paso. Sin promesas vacías.",
    icon: "diagnostico",
  },
  {
    title: "Aprende IA sin miedo",
    desc: "Acompañamiento práctico para dueños de negocio y equipos que sienten que se quedaron atrás. Nunca es tarde.",
    icon: "aprende",
  },
] as const;

export const TAMBIEN_TE_AYUDO = [
  "Páginas web",
  "Agentes internos con IA",
  "Marca personal",
  "Contenido y creatividad con IA",
  "Mantenimiento y soporte mensual",
  "Recursos y plantillas con IA",
];
