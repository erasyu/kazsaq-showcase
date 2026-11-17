import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./LiquidTabs.css";

export type LiquidTab = {
  id: string;
  label: string;
};

type Props = {
  tabs: LiquidTab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
};

export function LiquidTabs({ tabs, activeId, onChange, className }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  const moveBlob = (animate: boolean) => {
    const list = listRef.current;
    const blob = blobRef.current;
    if (!list || !blob) return;
    const active = list.querySelector<HTMLElement>(`[data-tab="${activeId}"]`);
    if (!active) return;

    const listBox = list.getBoundingClientRect();
    const tabBox = active.getBoundingClientRect();
    const x = tabBox.left - listBox.left;
    const y = tabBox.top - listBox.top;
    const w = tabBox.width;
    const h = tabBox.height;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduced || !ready) {
      gsap.set(blob, { x, y, width: w, height: h, scaleX: 1, scaleY: 1 });
      setReady(true);
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(blob, { x, width: w, duration: 0.42 }, 0)
      .to(blob, { y, height: h, duration: 0.38 }, 0)
      .fromTo(blob, { scaleX: 1.18, scaleY: 0.82 }, { scaleX: 1, scaleY: 1, duration: 0.42 }, 0);
  };

  useLayoutEffect(() => {
    moveBlob(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    moveBlob(true);
    const onResize = () => moveBlob(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, tabs]);

  return (
    <div className={`liquid-tabs ${className ?? ""}`}>
      <svg className="liquid-tabs__filter" aria-hidden="true">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="liquid-tabs__shell" role="tablist" aria-label="Разделы витрины">
        <div className="liquid-tabs__goo" ref={listRef}>
          <span className="liquid-tabs__blob" ref={blobRef} aria-hidden="true" />
          {tabs.map((tab) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                data-tab={tab.id}
                aria-selected={selected}
                className={`liquid-tabs__btn${selected ? " is-active" : ""}`}
                onClick={() => onChange(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
