import emailjs from 'emailjs-com';

// Tipos para claridad
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

// Cargamos variables de entorno (Vite expone import.meta.env)
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;

function ensureEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Falta variable de entorno: ${name}`);
  }
  return value;
}

// Inicializamos una sola vez (emailjs-com lo permite múltiples pero es innecesario)
let initialized = false;
function initIfNeeded() {
  if (!initialized) {
    const key = ensureEnv('VITE_EMAILJS_PUBLIC_KEY', PUBLIC_KEY);
    emailjs.init(key);
    initialized = true;
  }
}

/**
 * Envía el correo usando EmailJS.
 * Mapea los campos del formulario a las variables de la plantilla.
 */
interface TemplateParams {
  to_name: string;
  to_email: string;
  message: string;
  [key: string]: string | undefined; // permitir extensiones futuras
}

export async function sendContactEmail(data: ContactPayload) {
  initIfNeeded();

  const serviceId = ensureEnv('VITE_EMAILJS_SERVICE_ID', SERVICE_ID);
  const templateId = ensureEnv('VITE_EMAILJS_TEMPLATE_ID', TEMPLATE_ID);

  // Variables que espera tu plantilla en EmailJS
  // Ajusta los nombres (e.g. from_name, reply_to, message) según hayas configurado en la plantilla.
  const templateParams: TemplateParams = {
    to_name: data.name,
    to_email: data.email,
    message: data.message || '(Sin mensaje)',
  };

  try {
    const result = await emailjs.send(serviceId, templateId, templateParams);
    return result; // contiene status/text
  } catch (err) {
    const e = err as { text?: string; message?: string };
    const rawMsg = e?.text || e?.message || '';
    if (/recipients address is empty/i.test(rawMsg)) {
      throw new Error(
        'No hay destinatario configurado. Opciones:\n' +
        '1) En tu plantilla EmailJS pon un email estático en el campo "To".\n' +
        '2) O añade VITE_EMAILJS_TO_EMAIL en .env y asegúrate de que la plantilla use {{to_email}}.'
      );
    }
    throw new Error(rawMsg || 'Error desconocido enviando email');
  }
}
