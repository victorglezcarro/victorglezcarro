
import useSectionObserver from "../../hooks/SectionObserver";
import "./NavBar.css";

const sections = ["inicio", "proyectos", "estudios", "tecnologias", "contacto"];

function NavBar() {
  const selected = useSectionObserver(sections);

  return (
    <nav>
      <ul>
        {sections.map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className={selected === section ? "selected" : ""}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
