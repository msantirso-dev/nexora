import "./globals.css";

export const metadata = {
  title: "PIT — Auditoría y transformación digital empresarial",
  description:
    "Descubrimos dónde tu empresa pierde tiempo y dinero, y diseñamos soluciones tecnológicas que automatizan procesos, reducen costos y permiten escalar el negocio.",
  metadataBase: new URL("https://nexora.pit.com.ar"),
  icons: {
    icon: "/pit-logo-dark.png",
  },
  openGraph: {
    title: "PIT — Auditoría y transformación digital empresarial",
    description:
      "No implementamos software. Transformamos la manera en que funcionan las empresas.",
    url: "https://nexora.pit.com.ar",
    siteName: "PIT",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
