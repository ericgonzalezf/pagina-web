import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio vive en www.ericgonzalezf.com (ver site.url). La redirección principal del
  // dominio sin www es una regla de Cloudflare ("Redirecciones" en la zona), que corre antes
  // que el sitio y conserva los parámetros (?utm_...). Esta queda solo de respaldo: con vinext
  // no conserva los parámetros, así que no la uses como redirección principal.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ericgonzalezf.com" }],
        destination: "https://www.ericgonzalezf.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
