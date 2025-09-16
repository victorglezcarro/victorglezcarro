
import useSectionObserver from "../../hooks/sectionObserver";
import "./NavBar.css";

const sections = ["inicio", "sobre-mí", "proyectos", "estudios", "contacto"];

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
              {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
