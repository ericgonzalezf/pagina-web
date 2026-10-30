import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import Footer from "@/components/Footer";

// Aviso de privacidad integral (LFPDPPP 2025). Si cambian los servicios, los proveedores
// o el asistente de WhatsApp, actualiza este texto y la fecha de "Última actualización".

const title = "Aviso de privacidad";
const description =
  "Cómo Eric González trata tus datos personales en su sitio web, su WhatsApp, su asistente con IA y la app de marca personal.";
const actualizacion = "30 de octubre de 2026";

export const metadata: Metadata = {
  title: `${title} | ${site.name}`,
  description,
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

function Seccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{titulo}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Lista({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const proveedores: [string, string][] = [
  ["Meta Platforms (WhatsApp, Instagram, Facebook)", "Recibir y enviar los mensajes que nos escribes por esos canales."],
  ["Anthropic (Claude)", "Generar las respuestas del asistente con inteligencia artificial."],
  ["Cloudflare", "Alojar el asistente de WhatsApp y la app de marca personal."],
  ["Vercel", "Alojar este sitio web."],
  ["Supabase", "Guardar conversaciones y datos de prospectos del asistente."],
  ["Stripe", "Procesar pagos con tarjeta u OXXO. Nunca recibimos los datos completos de tu tarjeta."],
  ["MailerLite y Resend", "Enviar correos, entregables y, si lo aceptas, comunicaciones."],
  ["Google Workspace", "Correo electrónico y agenda."],
];

export default function PrivacidadPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-[760px] items-center px-5 py-3">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2.5 font-mono text-base font-semibold !text-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            <span>
              eric<span className="text-accent">gonzalezf</span>.com
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[760px] px-5 pb-16 pt-12 sm:pt-16">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">●</span> Legal
        </div>
        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-dim">Última actualización: {actualizacion}</p>

        <Seccion titulo="1. Quién es responsable de tus datos">
          <p>
            <span className="text-foreground">Eric González Flores</span>, persona física con actividad empresarial
            (en adelante, “Eric González”), con domicilio en Don Refugio 4, Col. Ex-Hacienda Coapa, Alcaldía Tlalpan, C.P. 14330, Ciudad de
            México, México, es responsable del
            tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares.
          </p>
          <p>
            Contacto para cualquier tema de privacidad:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </Seccion>

        <Seccion titulo="2. Qué datos personales tratamos">
          <p>Según cómo te comuniques o qué uses, podemos tratar:</p>
          <Lista
            items={[
              "Datos de identificación y contacto: nombre, número de WhatsApp, nombre de perfil de WhatsApp o redes sociales y correo electrónico.",
              "Contenido de las conversaciones que tienes con nosotros o con nuestro asistente, incluidos textos, notas de voz, imágenes o documentos que nos envíes.",
              "Información de tu negocio o proyecto que tú compartas: giro, necesidades, presupuesto o fechas.",
              "Respuestas que das en el diagnóstico de la web o en la app de marca personal.",
              "Datos de facturación, si solicitas factura: RFC, razón social, régimen fiscal y domicilio fiscal.",
              "Datos de pago procesados por Stripe; no almacenamos los datos completos de tu tarjeta.",
            ]}
          />
          <p>
            No solicitamos datos personales sensibles. Te pedimos no enviarlos por WhatsApp ni por ningún otro canal.
          </p>
        </Seccion>

        <Seccion titulo="3. Para qué usamos tus datos">
          <p className="text-foreground">Finalidades necesarias para atenderte:</p>
          <Lista
            items={[
              "Responder tus mensajes y dudas sobre nuestros servicios y productos.",
              "Entender qué necesitas, preparar una propuesta o cotización y darte seguimiento a tu solicitud.",
              "Prestar los servicios o entregar los productos que contrates.",
              "Procesar pagos y emitir facturas.",
              "Mantener la seguridad, evitar abusos y mejorar la calidad del servicio de atención.",
            ]}
          />
          <p className="text-foreground">Finalidades adicionales (puedes negarte):</p>
          <Lista
            items={[
              "Enviarte contenido, novedades o promociones por correo o WhatsApp.",
              "Elaborar estadísticas generales sobre las consultas que recibimos.",
            ]}
          />
          <p>
            Si no quieres que usemos tus datos para las finalidades adicionales, escríbenos a{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> o responde “baja” en WhatsApp. Negarte no afecta los
            servicios que nos pidas.
          </p>
        </Seccion>

        <Seccion titulo="4. Asistente con inteligencia artificial">
          <p>
            En nuestro sitio web y en nuestro WhatsApp te puede atender un{" "}
            <span className="text-foreground">asistente virtual con inteligencia artificial</span>. El asistente
            responde con la información pública de nuestros servicios, puede registrar los datos que tú le compartes
            para darte seguimiento y le pasa la conversación a Eric cuando hace falta. Si le preguntas, te dirá que es
            un asistente.
          </p>
          <p>
            El asistente no toma decisiones que te afecten jurídicamente: cotizaciones, contrataciones y cualquier
            compromiso los define una persona. Los mensajes se procesan con proveedores de inteligencia artificial
            únicamente para generar las respuestas.
          </p>
        </Seccion>

        <Seccion titulo="5. Con quién compartimos tus datos">
          <p>
            Para operar usamos proveedores de tecnología que tratan datos por nuestra cuenta y bajo nuestras
            instrucciones. Algunos están fuera de México, por lo que tus datos pueden almacenarse o procesarse en
            otros países:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-strong text-left text-foreground">
                  <th className="py-2 pr-4 font-semibold">Proveedor</th>
                  <th className="py-2 font-semibold">Para qué</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map(([nombre, uso]) => (
                  <tr key={nombre} className="border-b border-border align-top">
                    <td className="py-2 pr-4 text-foreground">{nombre}</td>
                    <td className="py-2">{uso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            No vendemos tus datos. Solo los compartiríamos con autoridades cuando una ley o una orden lo exija.
          </p>
        </Seccion>

        <Seccion titulo="6. Cuánto tiempo los conservamos">
          <p>
            Los mensajes del asistente de WhatsApp se borran automáticamente a los 90 días. Los datos de contacto y
            seguimiento de prospectos se conservan mientras exista una relación o hasta que pidas su eliminación. Los
            datos de facturación se conservan el tiempo que exigen las leyes fiscales.
          </p>
        </Seccion>

        <Seccion titulo="7. Tus derechos (ARCO) y cómo ejercerlos">
          <p>
            Puedes <span className="text-foreground">acceder</span> a tus datos,{" "}
            <span className="text-foreground">rectificarlos</span>,{" "}
            <span className="text-foreground">cancelarlos</span> u{" "}
            <span className="text-foreground">oponerte</span> a su uso, así como revocar tu consentimiento o limitar su
            uso. Para hacerlo, envía un correo a <a href={`mailto:${site.email}`}>{site.email}</a> con:
          </p>
          <Lista
            items={[
              "Tu nombre y un medio para responderte.",
              "Un documento que acredite tu identidad (o la de tu representante).",
              "Qué derecho quieres ejercer y sobre qué datos.",
              "Cualquier información que nos ayude a localizar tus datos, como el número de WhatsApp con el que nos escribiste.",
            ]}
          />
          <p>
            Te responderemos en un máximo de 20 días hábiles y, si procede, haremos el cambio dentro de los 15 días
            hábiles siguientes. Si consideras que no atendimos tu solicitud, puedes acudir a la Secretaría
            Anticorrupción y Buen Gobierno, autoridad en materia de protección de datos personales.
          </p>
        </Seccion>

        <Seccion titulo="8. Cookies">
          <p>
            Este sitio no usa cookies de publicidad. Las herramientas que lo alojan pueden usar cookies técnicas
            necesarias para que funcione.
          </p>
        </Seccion>

        <Seccion titulo="9. Cambios a este aviso">
          <p>
            Si este aviso cambia, publicaremos la nueva versión en esta misma página con su fecha de actualización.
          </p>
        </Seccion>
      </main>

      <Footer />
    </>
  );
}
