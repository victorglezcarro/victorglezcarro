
import useSectionObserver from "../../hooks/SectionObserver";
import "./NavBar.css";

const sections = ["inicio", "sobre-mí", "proyectos", "estudios", "contacto"];

function NavBar() {
  // Aproximar altura del nav para compensar highlight correcto
  const selected = useSectionObserver(sections, { offsetTop: 80, baseThreshold: 0.5, adaptive: true });

  return (
    <nav>
      <ul>
        {sections.map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className={selected === section ? "selected" : ""}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
