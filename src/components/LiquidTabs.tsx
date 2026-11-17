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
  const trackRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  const moveBlob = (animate: boolean) => {
    const track = trackRef.current;
    const blob = blobRef.current;
    if (!track || !blob) return;
    const active = track.querySelector<HTMLElement>(`[data-tab="${activeId}"]`);
    if (!active) return;

    const trackBox = track.getBoundingClientRect();
    const tabBox = active.getBoundingClientRect();
    const x = tabBox.left - trackBox.left;
    const y = tabBox.top - trackBox.top;
    const w = tabBox.width;
    const h = tabBox.height;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduced || !ready) {
      gsap.set(blob, { x, y, width: w, height: h, borderRadius: 999, scaleX: 1, scaleY: 1 });
      setReady(true);
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(blob, { x, width: Math.max(w * 1.08, w + 10), duration: 0.28 }, 0)
      .to(blob, { scaleY: 1.18, borderRadius: "40% 40% 46% 46%", duration: 0.22 }, 0)
      .to(blob, { x, y, width: w, height: h, scaleX: 1, scaleY: 1, borderRadius: 999, duration: 0.36 }, 0.18);
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
      <svg className="liquid-tabs__filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id="liquid-goo" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="liquid-tabs__shell" role="tablist" aria-label="Разделы витрины">
        <div className="liquid-tabs__track" ref={trackRef}>
          <div className="liquid-tabs__blob-layer" aria-hidden="true">
            <span className="liquid-tabs__blob" ref={blobRef} />
          </div>
          <div className="liquid-tabs__labels">
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
    </div>
  );
}
