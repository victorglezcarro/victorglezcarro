import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactForm.css";

const ContactForm = () => {
  const [sent, setSent] = useState(false);

  const initialValues = { name: "", email: "", message: "" };

  const Schema = Yup.object({
    name: Yup.string().trim().min(2, "Mínimo 2 caracteres").required("Obligatorio"),
    email: Yup.string().email("Email no válido").required("Obligatorio"),
    message: Yup.string().max(1000, "Máx. 1000 caracteres"),
  });

  const handleSubmit = async (
    values: { name: string; email: string; message: string },
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await new Promise(r => setTimeout(r, 600));

      setSent(true);
      resetForm();
      setTimeout(() => setSent(false), 4000);
    } catch (e) {
      alert(
        "No se pudo enviar. Inténtalo de nuevo." +
        " Error: " + e +
        "\nValores enviados: " + JSON.stringify(values)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="contact-wrap">
      <div className={`top-banner ${sent ? "show" : ""}`} role="status" aria-live="polite">
        <span>✅ Mensaje enviado correctamente</span>
      </div>

      <div className="contact-card">

        <Formik initialValues={initialValues} validationSchema={Schema} onSubmit={handleSubmit}>
          {({ isSubmitting, isValid, dirty }) => (
            <Form noValidate>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Nombre</label>
                  <Field id="name" name="name" placeholder="Tu nombre" />
                  <ErrorMessage name="name" component="span" className="error" />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <Field id="email" name="email" type="email" placeholder="tucorreo@ejemplo.com" />
                  <ErrorMessage name="email" component="span" className="error" />
                </div>

                <div className="form-field form-field--full">
                  <label htmlFor="message">
                    Mensaje <span className="optional">(opcional)</span>
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    placeholder="Cuéntame brevemente en qué te puedo ayudar…"
                    rows={5}
                  />
                  <ErrorMessage name="message" component="span" className="error" />
                </div>
              </div>

              <div className="actions">
                <button type="submit" disabled={isSubmitting || !(dirty && isValid)}>
                  {isSubmitting ? "Enviando…" : "Enviar mensaje"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ContactForm;