import { RefObject, useEffect, useRef } from "react";

export type UseAosInViewOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  initialClass?: string; // default 'aos-init'
  activeClass?: string;  // default 'aos-animate'
};

/**
 * Adds AOS classes when the element enters the viewport (or a custom scroll container).
 * Works with component-level scrolling because it uses IntersectionObserver with an optional root.
 */
export function useAosInView<T extends HTMLElement = HTMLElement>(
  options: UseAosInViewOptions = {}
): RefObject<T> {
  const {
    root = null,
    rootMargin,
    threshold = 0.15,
    once = true,
    initialClass = "aos-init",
    activeClass = "aos-animate",
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add(initialClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add(activeClass);
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // Only re-create when these primitives change; avoid re-creating on every render
  }, [root, rootMargin, threshold, once, initialClass, activeClass]);

  return ref as RefObject<T>;
}

export default useAosInView;
