import { profile } from "../data/portfolio";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;

// Confirmed in the CV. The visitor's address is only used as the reply address.
const RECIPIENT_EMAIL = profile.email;

export async function sendContactEmail(data: ContactPayload): Promise<void> {
  if (!PUBLIC_KEY?.trim() || !SERVICE_ID?.trim() || !TEMPLATE_ID?.trim()) {
    throw new Error("El envío de mensajes no está disponible en este momento.");
  }

  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (
    name.length < 2 || name.length > 100 ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message || message.length > 3000
  ) {
    throw new Error("Revisa los campos del formulario antes de enviarlo.");
  }

  // Load the delivery SDK only when a valid form is submitted.
  const { default: emailjs } = await import("emailjs-com");

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_name: profile.name,
      to_email: RECIPIENT_EMAIL,
      from_name: name,
      from_email: email,
      reply_to: email,
      name,
      email,
      message,
    },
    PUBLIC_KEY,
  );
}
