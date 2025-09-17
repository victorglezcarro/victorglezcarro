import { useRef } from "react";
import VariableProximity from "../../TextAnimations/VariableProximity/VariableProximity";
import "./Contact.css"
import ContactForm from "../../components/ContactForm/ContactForm";

function Contact({ sectionId }: { sectionId: string }) {
    const containerRef = useRef(null);

    return (
        <section id={sectionId} className="contact-content" ref={containerRef}>
            <VariableProximity
                label={'Contacto'}
                className={'variable-proximity-projects'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='gaussian'
            />
            <ContactForm />
        </section>
    );
}

export default Contact;