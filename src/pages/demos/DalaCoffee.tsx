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
import "./DalaCoffee.css";

const DEMO_ID = "dala-coffee";

const DEFAULT_BRAND: DemoBrand = {
  name: "Dala Coffee",
  accent: "#B85A33",
  city: "Алматы, центр",
  phone: "+7 700 000 00 00",
  whatsapp: "77000000000",
  tagline: "Обжарка и бронь столика без переписки в Direct",
};

const MENU = [
  { title: "Flat White", text: "Двойной шот, молоко 180 мл", price: "1 690 ₸", tone: "1" },
  { title: "Filter Dala", text: "Сезонный лот, V60", price: "1 490 ₸", tone: "2" },
  { title: "Matcha Latte", text: "Церемониальный грейд", price: "1 890 ₸", tone: "3" },
];

export function DalaCoffee() {
  const defaults = useMemo(() => DEFAULT_BRAND, []);
  const [brand, setBrand] = useState(() => loadBrand(DEMO_ID, defaults));
  const [open, setOpen] = useState(false);
  const [menuTab, setMenuTab] = useState("drinks");
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--accent", brand.accent);
    const root = heroRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = root.querySelectorAll<HTMLElement>("h1 .line span");
    const fade = root.querySelectorAll<HTMLElement>(".dala-fade");
    if (reduced) return;
    gsap.fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" });
    gsap.fromTo(
      fade,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.2, stagger: 0.08, ease: "power3.out" },
    );
    gsap.fromTo(
      root.querySelector(".dala__visual"),
      { opacity: 0, scale: 1.06, filter: "blur(8px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.05, ease: "power3.out" },
    );
  }, [brand.name, brand.accent]);

  const apply = (next: DemoBrand) => {
    setBrand(next);
    saveBrand(DEMO_ID, next);
  };

  return (
    <div className="dala" style={{ ["--accent" as string]: brand.accent }}>
      <div className="dala__topbar">
        <Link className="dala__back" to="/">
          ← KazSaq
        </Link>
        <ConceptBadge />
      </div>

      <nav className="dala__nav" aria-label="Навигация кофейни">
        <div className="dala__logo">
          {brand.name.split(" ")[0]}
          <i> {brand.name.split(" ").slice(1).join(" ") || "Coffee"}</i>
        </div>
        <ul className="dala__menu">
          <li className="is-on">Меню</li>
          <li>Бронь</li>
          <li>{brand.city}</li>
        </ul>
        <a className="dala__book" href={waLink(brand.whatsapp)} target="_blank" rel="noreferrer">
          Забронировать
        </a>
      </nav>

      <section className="dala__hero" ref={heroRef}>
        <div>
          <h1>
            <span className="line">
              <span>Кофе, который</span>
            </span>
            <span className="line">
              <span>
                гости <em>находят сами</em>
              </span>
            </span>
          </h1>
          <p className="dala-fade">{brand.tagline}</p>
          <div className="dala__actions dala-fade">
            <a className="dala__btn dala__btn--accent" href="#menu">
              Смотреть меню
            </a>
            <a className="dala__btn dala__btn--ghost" href={`tel:${brand.phone}`}>
              {brand.phone}
            </a>
          </div>
          <div className="dala__meta dala-fade">
            <div>
              <b>12–22</b>
              <small>ежедневно</small>
            </div>
            <div>
              <b>QR</b>
              <small>меню на столе</small>
            </div>
            <div>
              <b>{brand.city}</b>
              <small>локация</small>
            </div>
          </div>
        </div>

        <div className="dala__visual" aria-hidden="true">
          <div className="dala__visual-glow" />
          <div className="dala__steam" />
          <div className="dala__cup" />
          <div className="dala__float">
            <span className="dala__float-dot">✓</span>
            <div>
              <b>Стол свободен в 18:30</b>
              <small>бронь уходит в WhatsApp</small>
            </div>
          </div>
        </div>
      </section>

      <section className="dala__menu-section" id="menu">
        <h2>
          Меню <em>сегодня</em>
        </h2>
        <div className="dala__tabs" role="tablist" aria-label="Категории меню">
          {[
            { id: "drinks", label: "Напитки" },
            { id: "food", label: "Завтраки" },
            { id: "beans", label: "Зерно" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={menuTab === t.id}
              className={`dala__tab${menuTab === t.id ? " is-on" : ""}`}
              onClick={() => setMenuTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="dala__grid">
          {(menuTab === "drinks"
            ? MENU
            : menuTab === "food"
              ? [
                  { title: "Шакшука", text: "Яйца, томаты, лепёшка", price: "3 200 ₸", tone: "1" },
                  { title: "Гранола боул", text: "Йогурт, ягоды, мёд", price: "2 700 ₸", tone: "2" },
                  { title: "Круассан", text: "Масло 82%, миндаль", price: "1 450 ₸", tone: "3" },
                ]
              : [
                  { title: "Ethiopia Dala", text: "250 г, светлая", price: "4 900 ₸", tone: "1" },
                  { title: "Brazil House", text: "250 г, эспрессо", price: "3 900 ₸", tone: "2" },
                  { title: "Blend Office", text: "1 кг, под фильтр", price: "12 500 ₸", tone: "3" },
                ]
          ).map((item) => (
            <article className="dala__item" key={item.title}>
              <div className="dala__pic" data-tone={item.tone} />
              <div className="dala__item-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="dala__row">
                  <b>{item.price}</b>
                  <button type="button" className="dala__add" aria-label={`Добавить ${item.title}`}>
                    +
                  </button>
                </div>
              </div>
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
