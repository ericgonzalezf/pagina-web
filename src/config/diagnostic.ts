import { waLink } from "@/lib/whatsapp";

export type Question = { title: string; options: string[] };

export const Q_START: Question = {
  title: "¿Dónde quieres usar la IA?",
  options: ["En mi negocio", "En mi trabajo", "En mi vida diaria"],
};

const USAGE: Question = {
  title: "¿Hoy usas IA?",
  options: [
    "No, nunca la he usado",
    "La he probado un poco",
    "Sí, pero no le saco provecho",
    "Sí, todos los días",
  ],
};

export const FLOWS: Question[][] = [
  [
    {
      title: "¿A qué se dedica tu negocio?",
      options: [
        "Restaurante o cafetería",
        "Tienda o comercio",
        "Servicios profesionales",
        "Otro tipo de negocio",
      ],
    },
    {
      title: "¿Cuántos mensajes de WhatsApp recibes al día?",
      options: ["Menos de 10", "Entre 10 y 30", "Entre 30 y 100", "Más de 100"],
    },
    {
      title: "¿Qué es lo que más tiempo te quita?",
      options: [
        "Responder las mismas preguntas",
        "Agendar citas o tomar pedidos",
        "Crear contenido para redes",
        "Ordenar información y reportes",
      ],
    },
    USAGE,
  ],
  [
    {
      title: "¿A qué te dedicas?",
      options: [
        "Oficina o administración",
        "Ventas o atención a clientes",
        "Educación o docencia",
        "Otra área",
      ],
    },
    {
      title: "¿Cuántas horas a la semana se te van en tareas repetitivas?",
      options: ["Menos de 3", "Entre 3 y 8", "Entre 8 y 15", "Más de 15"],
    },
    {
      title: "¿Qué tarea te quita más tiempo?",
      options: [
        "Correos y mensajes",
        "Reportes y Excel",
        "Presentaciones y documentos",
        "Buscar y ordenar información",
      ],
    },
    USAGE,
  ],
  [
    {
      title: "¿Qué te gustaría resolver con IA?",
      options: [
        "Organizar mi tiempo y pendientes",
        "Aprender algo nuevo",
        "Planear viajes, comidas o gastos",
        "Escribir y comunicarme mejor",
      ],
    },
    {
      title: "¿Cómo te llevas con la tecnología?",
      options: [
        "Lo básico: WhatsApp y redes",
        "Me defiendo bien",
        "Me encanta, aprendo rápido",
      ],
    },
    USAGE,
  ],
];

const WORK_HOURS = [2, 5, 11, 18];
const WORK_DESC = [
  "Te ayudo a armar asistentes que redactan, resumen y responden correos y mensajes por ti, con tu estilo.",
  "Reportes y hojas de Excel que se arman en minutos con IA, sin fórmulas complicadas.",
  "Presentaciones y documentos listos en una fracción del tiempo, con la IA como tu asistente.",
  "Un asistente que busca, resume y ordena la información que necesitas para tu trabajo.",
];
const LIFE_RECS = [
  {
    title: "Tu asistente personal con IA",
    desc: "Aprende a usar la IA para organizar tu agenda, tus pendientes y tus recordatorios sin complicarte.",
  },
  {
    title: "Aprende IA sin miedo",
    desc: "Clases prácticas, a tu ritmo, para que uses la IA como tu tutor personal y aprendas lo que quieras.",
  },
  {
    title: "Recursos y plantillas para tu día a día",
    desc: "Guías y prompts listos para planear viajes, el menú de la semana o tus gastos del mes.",
  },
  {
    title: "Aprende IA sin miedo",
    desc: "Aprende a usar la IA para escribir mensajes, correos y textos con claridad y confianza.",
  },
];
const MSGS_PER_DAY = [5, 20, 60, 120];
const MSGS_LABEL = ["menos de 10", "10 a 30", "30 a 100", "más de 100"];
const RECS = [
  {
    title: "Tu negocio atendiendo en WhatsApp con IA",
    desc: "Un asistente que responde por ti las preguntas de siempre, las 24 horas, y te pasa solo a los clientes listos para comprar.",
  },
  {
    title: "Tu negocio atendiendo en WhatsApp con IA",
    desc: "Un asistente que agenda citas y toma pedidos por WhatsApp sin que tengas que estar pegado al celular.",
  },
  {
    title: "Contenido y creatividad con IA",
    desc: "Posts, guiones e imágenes con IA para que publiques constante sin que te consuma el día.",
  },
  {
    title: "Agentes internos con IA",
    desc: "Un asistente entrenado con tus documentos y procesos para encontrar respuestas al instante.",
  },
];

export type QuizResult = {
  hasHours: boolean;
  resultIntro: string;
  hoursLabel: string;
  resultSuffix: string;
  calcNote: string;
  recTitle: string;
  recDesc: string;
  extraNote: string;
  waHref: string;
};

// Lógica de resultados copiada del prototipo (función result()).
export function computeResult(path: number, a: (number | undefined)[]): QuizResult {
  const flow = FLOWS[path];
  const opt = (qi: number) => (a[qi] != null ? flow[qi].options[a[qi] as number] : "");
  const usageIdx = a[flow.length - 1];
  const usage = opt(flow.length - 1);
  const r = {
    hasHours: true,
    resultIntro: "",
    hoursLabel: "",
    resultSuffix: "",
    calcNote: "",
    recTitle: "",
    recDesc: "",
    extraNote: "",
    text: "",
  };

  if (path === 0) {
    const mi = a[1] != null ? (a[1] as number) : 1;
    const h = Math.max(1, Math.round((MSGS_PER_DAY[mi] * 2 * 6) / 60));
    const pain = a[2] != null ? (a[2] as number) : 0;
    const rec = RECS[pain];
    r.resultIntro = "Hoy se te van aproximadamente";
    r.hoursLabel = h === 1 ? "1 hora" : h + " horas";
    r.resultSuffix = "a la semana contestando WhatsApp a mano.";
    r.calcNote =
      "Cálculo aproximado: " + MSGS_LABEL[mi] + " mensajes al día × 2 minutos × 6 días.";
    r.recTitle = rec.title;
    r.recDesc = rec.desc;
    if (usageIdx === 0 || usageIdx === 1)
      r.extraNote =
        "Como apenas estás empezando con la IA, te recomiendo combinarlo con Aprende IA sin miedo.";
    r.text =
      "Hola Eric, hice el diagnóstico en tu página. Quiero usar IA en mi negocio. Mi negocio: " +
      opt(0) +
      ". Recibo " +
      MSGS_LABEL[mi] +
      " mensajes de WhatsApp al día. Lo que más tiempo me quita: " +
      opt(2) +
      ". Uso de IA: " +
      usage +
      ". Me interesa: " +
      rec.title +
      ".";
  } else if (path === 1) {
    const hi = a[1] != null ? (a[1] as number) : 1;
    const total = WORK_HOURS[hi];
    const save = Math.max(1, Math.round(total / 2));
    const task = a[2] != null ? (a[2] as number) : 0;
    r.resultIntro = "Podrías recuperar aproximadamente";
    r.hoursLabel = save === 1 ? "1 hora" : save + " horas";
    r.resultSuffix = "a la semana para lo que sí importa.";
    r.calcNote =
      "Cálculo aproximado: la mitad de tus ~" + total + " horas semanales en tareas repetitivas.";
    r.recTitle = "Automatiza tu trabajo";
    r.recDesc = WORK_DESC[task];
    if (usageIdx === 0 || usageIdx === 1)
      r.extraNote =
        "Como apenas estás empezando, te recomiendo arrancar con Aprende IA sin miedo, 1 a 1.";
    r.text =
      "Hola Eric, hice el diagnóstico en tu página. Quiero usar IA en mi trabajo. Me dedico a: " +
      opt(0) +
      ". Tareas repetitivas: " +
      opt(1).toLowerCase() +
      " horas a la semana. Lo que más tiempo me quita: " +
      opt(2) +
      ". Uso de IA: " +
      usage +
      ". Me interesa: Automatiza tu trabajo.";
  } else {
    const goal = a[0] != null ? (a[0] as number) : 0;
    const lrec = LIFE_RECS[goal];
    r.hasHours = false;
    r.recTitle = lrec.title;
    r.recDesc = lrec.desc;
    if (a[1] === 0 || usageIdx === 0)
      r.extraNote = "Vamos desde cero y a tu ritmo: no necesitas saber nada de tecnología.";
    r.text =
      "Hola Eric, hice el diagnóstico en tu página. Quiero usar IA en mi vida diaria. Me gustaría: " +
      opt(0) +
      ". Con la tecnología: " +
      opt(1) +
      ". Uso de IA: " +
      usage +
      ". Me interesa: " +
      lrec.title +
      ".";
  }

  const { text, ...rest } = r;
  return { ...rest, waHref: waLink(text) };
}
