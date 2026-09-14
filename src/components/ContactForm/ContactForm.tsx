import { profile } from "../../data/portfolio";
import { useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { sendContactEmail } from "../../services/email";
import type { ContactPayload } from "../../services/email";
import "./ContactForm.css";

type FieldName = keyof ContactPayload;
type FormErrors = Partial<Record<FieldName, string>>;
type SubmitStatus = "idle" | "sending" | "success" | "error";

const emptyValues: ContactPayload = { name: "", email: "", message: "" };
const fieldOrder: FieldName[] = ["name", "email", "message"];

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return {
      name: "Escribe tu nombre para saber cómo llamarte.",
      email: "Añade un correo para que pueda responderte.",
      message: "Cuéntame un poco sobre tu idea o propuesta.",
    }[field];
  }

  if (field === "name" && (trimmed.length < 2 || trimmed.length > 100)) {
    return "El nombre debe tener entre 2 y 100 caracteres.";
  }

  if (field === "email" && (trimmed.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))) {
    return "Revisa el correo. Por ejemplo: nombre@empresa.com.";
  }

  if (field === "message" && trimmed.length > 3000) {
    return "Puedes escribir hasta 3.000 caracteres.";
  }

  return undefined;
}

const ContactForm = () => {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const pendingRef = useRef(false);
  const [values, setValues] = useState<ContactPayload>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const isSending = status === "sending";

  const fieldId = (field: FieldName) => `${formId}-${field}`;
  const errorId = (field: FieldName) => `${fieldId(field)}-error`;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));

    if (touched[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
    }

    if (status === "success" || status === "error") setStatus("idle");
  };

  const handleBlur = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }));
  };

  const resetForm = () => {
    setValues(emptyValues);
    setErrors({});
    setTouched({});
    formRef.current?.reset();
    setStatus("success");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pendingRef.current) return;

    const honeypot = new FormData(event.currentTarget).get("website");
    if (typeof honeypot === "string" && honeypot.trim()) {
      resetForm();
      return;
    }

    const nextErrors: FormErrors = {};
    for (const field of fieldOrder) {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      setStatus("idle");
      requestAnimationFrame(() => {
        const field = formRef.current?.elements.namedItem(firstInvalidField);
        if (field instanceof HTMLElement) field.focus();
      });
      return;
    }

    pendingRef.current = true;
    setStatus("sending");

    try {
      await sendContactEmail(values);
      resetForm();
    } catch {
      setStatus("error");
    } finally {
      pendingRef.current = false;
    }
  };

  return (
    <form
      ref={formRef}
      className="contact-form"
      aria-label="Enviar un mensaje a Víctor"
      aria-busy={isSending}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor={fieldId("name")}>Tu nombre</label>
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
            value={values.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            minLength={2}
            maxLength={100}
            required
            readOnly={isSending}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
          />
          {errors.name && <span id={errorId("name")} className="contact-form__error">{errors.name}</span>}
        </div>

        <div className="contact-form__field">
          <label htmlFor={fieldId("email")}>Tu email</label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="nombre@empresa.com"
            value={values.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            maxLength={254}
            required
            readOnly={isSending}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
          />
          {errors.email && <span id={errorId("email")} className="contact-form__error">{errors.email}</span>}
        </div>

        <div className="contact-form__field contact-form__field--message">
          <label htmlFor={fieldId("message")}>¿Qué tienes en mente?</label>
          <textarea
            id={fieldId("message")}
            name="message"
            placeholder="Un proyecto, una oportunidad o simplemente un hola…"
            value={values.message}
            onChange={handleChange}
            onBlur={() => handleBlur("message")}
            rows={4}
            maxLength={3000}
            required
            readOnly={isSending}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? errorId("message") : undefined}
          />
          {errors.message && <span id={errorId("message")} className="contact-form__error">{errors.message}</span>}
        </div>
      </div>

      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Deja este campo vacío</label>
        <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="contact-form__note">Todos los campos son obligatorios. Usaré tu email para responder a tu mensaje.</p>

      <button className="contact-form__submit" type="submit" disabled={isSending}>
        <span>{isSending ? "Enviando mensaje…" : "Enviar mensaje"}</span>
        {isSending ? (
          <span className="contact-form__spinner" aria-hidden="true" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="contact-form__status" role="status" aria-live="polite" aria-atomic="true">
        {status === "sending" && <p>Tu mensaje se está enviando.</p>}
        {status === "success" && <p className="contact-form__success">Mensaje enviado. Gracias por escribir, te responderé por email.</p>}
        {status === "error" && (
          <p className="contact-form__error">
            No se ha podido enviar. Tus datos siguen aquí para intentarlo de nuevo. También puedes escribir a{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
