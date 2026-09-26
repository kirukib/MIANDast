"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-reveal-stagger]";

/**
 * Reveal-on-scroll (spec §8): elements marked data-reveal / data-reveal-stagger fade up once.
 * Arms the CSS only after JS runs, and marks anything already on screen as revealed first,
 * so above-the-fold content never flashes.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = (el: HTMLElement) => {
      el.classList.add("is-in");
      window.setTimeout(() => el.classList.add("is-done"), 900);
    };

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in", "is-done"));
      return;
    }

    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("is-in", "is-done");
    });
    root.setAttribute("data-reveal-armed", "");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          finish(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    els.filter((el) => !el.classList.contains("is-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
