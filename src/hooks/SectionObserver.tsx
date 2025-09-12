import { useEffect, useState } from "react";

function useSectionObserver(sections: string[]) {
  const [selected, setSelected] = useState("inicio");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      let mostVisibleSection = selected;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mostVisibleSection = entry.target.id;
        }
      });

      setSelected(mostVisibleSection);
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, selected]);

  return selected;
}

export default useSectionObserver;