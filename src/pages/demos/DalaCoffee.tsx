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

const MENU = {
  drinks: [
    { title: "Flat White", text: "Двойной шот, молоко 180 мл", price: "1 690 ₸" },
    { title: "Filter Dala", text: "Сезонный лот, V60", price: "1 490 ₸" },
    { title: "Matcha Latte", text: "Церемониальный грейд", price: "1 890 ₸" },
  ],
  food: [
    { title: "Шакшука", text: "Яйца, томаты, лепёшка", price: "3 200 ₸" },
    { title: "Гранола боул", text: "Йогурт, ягоды, мёд", price: "2 700 ₸" },
    { title: "Круассан", text: "Масло 82%, миндаль", price: "1 450 ₸" },
  ],
  beans: [
    { title: "Ethiopia Dala", text: "250 г, светлая", price: "4 900 ₸" },
    { title: "Brazil House", text: "250 г, эспрессо", price: "3 900 ₸" },
    { title: "Blend Office", text: "1 кг, под фильтр", price: "12 500 ₸" },
  ],
} as const;

export function DalaCoffee() {
  const defaults = useMemo(() => DEFAULT_BRAND, []);
  const [brand, setBrand] = useState(() => loadBrand(DEMO_ID, defaults));
  const [open, setOpen] = useState(false);
  const [menuTab, setMenuTab] = useState<keyof typeof MENU>("drinks");
  const [day, setDay] = useState("чт");
  const [time, setTime] = useState("18:30");
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.fromTo(
      root.querySelectorAll("h1 .line span"),
      { yPercent: 115 },
      { yPercent: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" },
    );
    gsap.fromTo(
      root.querySelectorAll(".dala-fade"),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.2, stagger: 0.08, ease: "power3.out" },
    );
    gsap.fromTo(
      root.querySelector(".dala__visual"),
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
    );
  }, [brand.name, brand.accent]);

  const apply = (next: DemoBrand) => {
    setBrand(next);
    saveBrand(DEMO_ID, next);
  };

  const nameParts = brand.name.trim().split(/\s+/);
  const first = nameParts[0] || "Dala";
  const rest = nameParts.slice(1).join(" ") || "Coffee";

  return (
    <div className="dala" style={{ ["--accent" as string]: brand.accent }}>
      <div className="dala__chrome">
        <Link className="dala__back" to="/">
          ← KazSaq
        </Link>
        <ConceptBadge />
      </div>

      <nav className="dala__nav" aria-label="Навигация кофейни">
        <div className="dala__logo">
          {first}
          <i> {rest}</i>
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
              <b>{brand.city.split(",")[0]}</b>
              <small>{brand.city.includes(",") ? brand.city.split(",")[1].trim() : "локация"}</small>
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
              <b>Стол свободен в {time}</b>
              <small>бронь уходит в WhatsApp</small>
            </div>
          </div>
        </div>
      </section>

      <section className="dala__section" id="menu">
        <h2>
          Меню <em>сегодня</em>
        </h2>
        <p className="dala__section-lead">
          Клиент листает позиции с телефона. Цены и состав видны сразу — без сторис и скринов.
        </p>
        <div className="dala__tabs" role="tablist" aria-label="Категории меню">
          {(
            [
              ["drinks", "Напитки"],
              ["food", "Завтраки"],
              ["beans", "Зерно"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={menuTab === id}
              className={`dala__tab${menuTab === id ? " is-on" : ""}`}
              onClick={() => setMenuTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="dala__grid">
          {MENU[menuTab].map((item) => (
            <article className="dala__item" key={item.title}>
              <div className="dala__pic" />
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

      <section className="dala__section" id="booking">
        <h2>
          Бронь <em>стола</em>
        </h2>
        <p className="dala__section-lead">
          Гость выбирает день и время. Вам приходит сообщение — без ночных ответов в Direct.
        </p>
        <div className="dala__booking">
          <div>
            <div className="dala__days" role="group" aria-label="День">
              {[
                ["вт", "10"],
                ["ср", "11"],
                ["чт", "12"],
                ["пт", "13"],
                ["сб", "14"],
              ].map(([d, n]) => (
                <button
                  key={d}
                  type="button"
                  className={`dala__day${day === d ? " is-on" : ""}`}
                  onClick={() => setDay(d)}
                >
                  <small>{d}</small>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="dala__times" role="group" aria-label="Время">
              {["17:00", "18:00", "18:30", "19:30"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`dala__time${time === t ? " is-on" : ""}`}
                  onClick={() => setTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <a className="dala__btn dala__btn--accent" href={waLink(brand.whatsapp)} target="_blank" rel="noreferrer">
                Забронировать на {day} {time}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="dala__section">
        <h2>
          Атмосфера <em>зала</em>
        </h2>
        <p className="dala__section-lead">
          На сайте — не абстрактный градиент, а ощущение места. Так клиент понимает, куда идёт.
        </p>
        <div className="dala__atmosphere">
          <div className="dala__atmos-card">
            <b>Утро</b>
            <span>Свет, фильтр, рабочие столы</span>
          </div>
          <div className="dala__atmos-card">
            <b>День</b>
            <span>Ланч и спокойный шум</span>
          </div>
          <div className="dala__atmos-card">
            <b>Вечер</b>
            <span>Бронь на двоих</span>
          </div>
        </div>
      </section>

      <footer className="dala__footer">
        <span>
          {brand.name} · {brand.city}
        </span>
        <span>Концепт KazSaq · не реальный клиент</span>
      </footer>

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
