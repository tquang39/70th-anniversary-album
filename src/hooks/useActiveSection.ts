import { useEffect, useMemo, useState } from "react";
import { sectionIds } from "../data/navigation";

export function useActiveSection(): string {
  const key = useMemo(() => sectionIds.join(","), []);
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const ids = key.split(",");
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
