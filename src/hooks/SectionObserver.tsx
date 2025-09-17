import { useCallback, useEffect, useRef, useState } from "react";

interface Options {
  offsetTop?: number;            // compensar navbar fija
  baseThreshold?: number;        // threshold principal (default 0.5)
  adaptive?: boolean;            // adaptar threshold segun viewport (default true)
  debounceResize?: number;       // ms (default 120)
  defaultSection?: string;       // sección inicial por defecto
}

function useSectionObserver(sections: string[], options: Options = {}) {
  const {
    offsetTop = 0,
    baseThreshold = 0.5,
    adaptive = true,
    debounceResize = 120,
    defaultSection = sections[0] || "",
  } = options;

  const [active, setActive] = useState<string>(defaultSection);
  // Cache para ratios por id
  const ratiosRef = useRef<Record<string, number>>({});
  // Última dirección de scroll
  const lastScrollY = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollDir = useRef<'up' | 'down'>('down');
  // Histeresis para evitar parpadeos: el nuevo debe superar al actual por este delta
  const HYSTERESIS_DELTA = 0.04; // 4%
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeTimer = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const computeThreshold = useCallback(() => {
    if (!adaptive) return baseThreshold;
    const vw = window.innerWidth;
    if (vw <= 480) return Math.min(0.28, baseThreshold);
    if (vw <= 768) return Math.min(0.38, baseThreshold);
    if (vw <= 1024) return Math.min(0.45, baseThreshold);
    return baseThreshold;
  }, [adaptive, baseThreshold]);

  const buildObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    const threshold = computeThreshold();
    const rootMargin = offsetTop ? `-${offsetTop}px 0px 0px 0px` : "0px";
    observerRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        ratiosRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      }

      // Estrategia de selección estable:
      // 1. Mantener la actual salvo que otra la supere con histeresis.
      // 2. Si la actual cae a ~0 y desplazamos hacia abajo, elegir la siguiente con algo de visibilidad (>0).
      // 3. Fallback: elegir la sección cuyo top está más cerca del centro del viewport.

      const currentRatio = active ? (ratiosRef.current[active] ?? 0) : 0;

      // Candidatos ordenados por ratio desc
      const ordered = sections
        .map(id => ({ id, ratio: ratiosRef.current[id] ?? 0 }))
        .sort((a, b) => b.ratio - a.ratio);

      let candidate: string = active;
      if (ordered.length) {
        const topCandidate = ordered[0];
        if (topCandidate.id !== active) {
          if (topCandidate.ratio > currentRatio + HYSTERESIS_DELTA) {
            candidate = topCandidate.id;
          }
        }
        if (currentRatio === 0 && topCandidate.ratio > 0) {
          candidate = topCandidate.id;
        }
      }

      // Si sigue siendo la misma o no hay ratios válidos, intentar fallback por posición relativa al viewport.
      if (candidate === active) {
        const mid = window.innerHeight / 2 + lastScrollY.current;
        let closestId = active;
        let closestDist = Number.POSITIVE_INFINITY;
        for (const id of sections) {
          const el = document.getElementById(id);
            if (!el) continue;
          const rect = el.getBoundingClientRect();
          const elMid = rect.top + window.scrollY + rect.height / 2;
          const dist = Math.abs(elMid - mid);
          if (dist < closestDist) {
            closestDist = dist;
            closestId = id;
          }
        }
        candidate = closestId;
      }

      if (candidate && candidate !== active) {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => setActive(candidate));
      }
    }, { root: null, threshold, rootMargin });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
  }, [sections, offsetTop, computeThreshold, active]);

  useEffect(() => {
    buildObserver();
    return () => observerRef.current?.disconnect();
  }, [buildObserver]);

  // Detectar dirección de scroll para ayudar a la lógica
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollDir.current = y > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (resizeTimer.current) window.clearTimeout(resizeTimer.current);
      resizeTimer.current = window.setTimeout(() => {
        buildObserver();
      }, debounceResize);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeTimer.current) window.clearTimeout(resizeTimer.current);
    };
  }, [buildObserver, debounceResize]);

  return active;
}

export default useSectionObserver;