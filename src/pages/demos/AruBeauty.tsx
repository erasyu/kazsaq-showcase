import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ConceptBadge } from "../../components/ConceptBadge";
import { CustomizeDrawer } from "../../components/CustomizeDrawer";
import {
  loadBrand,
  saveBrand,
  waLink,
  type DemoBrand,
} from "../../lib/customize";
import "./AruBeauty.css";

const DEMO_ID = "aru-beauty";

const DEFAULT_BRAND: DemoBrand = {
  name: "Aru Beauty",
  accent: "#C85A7C",
  city: "Алматы, Самал",
  phone: "+7 777 000 00 00",
  whatsapp: "77770000000",
  tagline: "Клиент выбирает услугу и время сам — вам приходит уведомление",
};

const SERVICES = [
  { title: "Стрижка и укладка", meta: "60 мин · мастер Айгерим", price: "8 000 ₸" },
  { title: "Маникюр + покрытие", meta: "90 мин · мастер Дария", price: "9 500 ₸" },
  { title: "Окрашивание", meta: "от 2 ч · колорист", price: "25 000 ₸" },
  { title: "Брови и ресницы", meta: "45 мин", price: "6 000 ₸" },
];

export function AruBeauty() {
  const defaults = useMemo(() => DEFAULT_BRAND, []);
  const [brand, setBrand] = useState(() => loadBrand(DEMO_ID, defaults));
  const [open, setOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.fromTo(
      root.querySelectorAll("h1 .line span"),
      { yPercent: 115 },
      { yPercent: 0, duration: 0.88, stagger: 0.08, ease: "power3.out" },
    );
    gsap.fromTo(
      root.querySelectorAll(".aru-fade"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.65, delay: 0.2, stagger: 0.07, ease: "power3.out" },
    );
    gsap.fromTo(
      root.querySelector(".aru__stage"),
      { opacity: 0, y: 24, rotate: 1.5 },
      { opacity: 1, y: 0, rotate: 0, duration: 0.95, ease: "power3.out" },
    );
    gsap.fromTo(
      root.querySelector(".aru__phone"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, delay: 0.18, ease: "power3.out" },
    );
  }, [brand.name, brand.accent]);

  const apply = (next: DemoBrand) => {
    setBrand(next);
    saveBrand(DEMO_ID, next);
  };

  return (
    <div className="aru" style={{ ["--accent" as string]: brand.accent }}>
      <div className="aru__topbar">
        <Link className="aru__back" to="/">
          ← KazSaq
        </Link>
        <ConceptBadge />
      </div>

      <section className="aru__hero" ref={heroRef}>
        <div>
          <p className="aru__kicker aru-fade">{brand.city}</p>
          <h1>
            <span className="line">
              <span>{brand.name}</span>
            </span>
            <span className="line">
              <span>
                запись без <em>ночных</em>
              </span>
            </span>
            <span className="line">
              <span>ответов в Direct</span>
            </span>
          </h1>
          <p className="aru-fade">{brand.tagline}</p>
          <div className="aru__actions aru-fade">
            <a className="aru__btn aru__btn--primary" href={waLink(brand.whatsapp)} target="_blank" rel="noreferrer">
              Записаться
            </a>
            <a className="aru__btn aru__btn--ghost" href={`tel:${brand.phone}`}>
              {brand.phone}
            </a>
          </div>
        </div>

        <div className="aru__stage" aria-hidden="true">
          <span className="aru__orb aru__orb--a" />
          <span className="aru__orb aru__orb--b" />
          <div className="aru__phone">
            <div className="aru__phone-bar" />
            <h3>Выберите время</h3>
            <p>Услуга уже выбрана · мастер свободен</p>
            <div className="aru__slot">14:00 <span>занято</span></div>
            <div className="aru__slot is-on">15:30 <span>свободно</span></div>
            <div className="aru__slot">17:00 <span>свободно</span></div>
          </div>
        </div>
      </section>

      <section className="aru__section">
        <h2>Услуги</h2>
        <div className="aru__services">
          {SERVICES.map((s) => (
            <article className="aru__service" key={s.title}>
              <div>
                <b>{s.title}</b>
                <span>{s.meta}</span>
              </div>
              <strong>{s.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <CustomizeDrawer
        open={open}
        onOpenChange={setOpen}
        brand={brand}
        onChange={apply}
        onReset={() => apply(defaults)}
      />
    </div>
  );
}
