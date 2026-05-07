import type { Metadata } from "next";
import QrLandingClient from "./QrLandingClient";

export const metadata: Metadata = {
  title: "Legasint - Conecta con nosotros",
  description: "Guarda nuestro contacto, visita nuestra web o escríbenos por WhatsApp.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QrPage() {
  return <QrLandingClient />;
}
