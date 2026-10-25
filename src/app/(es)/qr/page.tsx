import type { Metadata } from "next";
import QrLandingClient from "./QrLandingClient";

export const metadata: Metadata = {
  title: "Contacto y diagnóstico gratuito",
  description: "Solicita un diagnóstico gratuito de 30 minutos, guarda nuestro contacto o visita los proyectos de Legasint.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QrPage() {
  return <QrLandingClient />;
}
