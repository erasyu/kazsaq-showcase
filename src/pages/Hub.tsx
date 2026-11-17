import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { LiquidTabs } from "../components/LiquidTabs";
import { ConceptBadge } from "../components/ConceptBadge";
import "./Hub.css";

const TABS = [
  { id: "team", label: "Команда" },
  { id: "demos", label: "Демо" },
  { id: "how", label: "Как смотреть" },
];

export function Hub() {
  const [tab, setTab] = useState("team");
  const heroRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = root.querySelectorAll<HTMLElement>(".hub__title .line span");
    const rest = root.querySelectorAll<HTMLElement>(".hub-fade");
    if (reduced) {
      gsap.set([lines, rest], { clearProps: "all" });
      return;
    }
    gsap.fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" },
    );
    gsap.fromTo(
      rest,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.25, stagger: 0.08, ease: "power3.out" },
    );
  }, []);

  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 14, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.42, ease: "power3.out" },
    );
  }, [tab]);

  return (
    <div className="hub">
      <header className="hub__nav">
        <div className="hub__brand">
          <span className="hub__mark" aria-hidden="true">
            ‹›
          </span>
          KazSaq
        </div>
        <a
          className="hub__ig"
          href="https://instagram.com/saq_dev_team"
          target="_blank"
          rel="noreferrer"
        >
          @saq_dev_team
        </a>
      </header>

      <section className="hub__hero" ref={heroRef}>
        <p className="hub__eyebrow hub-fade">Студенческая команда · МИТУ · Алматы</p>
        <h1 className="hub__title">
          <span className="line">
            <span>Сайты и боты,</span>
          </span>
          <span className="line">
            <span>
              которые <em>продают</em>
            </span>
          </span>
          <span className="line">
            <span>за вас</span>
          </span>
        </h1>
        <p className="hub__lead hub-fade">
          Откройте концепт, подставьте название своего бизнеса и покажите команде — так будет
          выглядеть ваш продукт. Без обязательств.
        </p>
        <div className="hub__cta-row hub-fade">
          <button type="button" className="hub__cta hub__cta--primary" onClick={() => setTab("demos")}>
            Смотреть демо
          </button>
          <button type="button" className="hub__cta hub__cta--ghost" onClick={() => setTab("how")}>
            Как это работает
          </button>
        </div>
      </section>

      <div className="hub__tabs-wrap">
        <LiquidTabs tabs={TABS} activeId={tab} onChange={setTab} />
      </div>

      <section className="hub__panel" aria-live="polite">
        <div className="hub__panel-inner" ref={panelRef} key={tab}>
          {tab === "team" && (
            <div className="hub__grid">
              <article className="hub__card">
                <h2>KazSaq dev team</h2>
                <p>
                  Разрабатываем сайты, чат-боты и приложения для малого и среднего бизнеса.
                  Работаем официально через ИП, проекты курируют наставники университета. 50%
                  дохода идёт на студенческую лабораторию беспилотников МИТУ.
                </p>
                <div className="hub__stats">
                  <div className="hub__stat">
                    <b>3 дня</b>
                    <span>бесплатный прототип</span>
                  </div>
                  <div className="hub__stat">
                    <b>от 29k ₸</b>
                    <span>помесячно, без полной предоплаты</span>
                  </div>
                  <div className="hub__stat">
                    <b>50%</b>
                    <span>на лабораторию дронов</span>
                  </div>
                </div>
              </article>
            </div>
          )}

          {tab === "demos" && (
            <div className="demo-list">
              <article className="demo-card" data-demo="coffee">
                <div className="demo-card__top">
                  <span className="demo-card__type">Сайт · кофейня</span>
                  <ConceptBadge />
                </div>
                <h3>Dala Coffee</h3>
                <p>Меню, бронь столика, тёплый editorial-hero. Можно переименовать под вашу кофейню.</p>
                <div className="demo-card__actions">
                  <Link className="demo-card__link" to="/demo/dala-coffee">
                    Открыть демо
                  </Link>
                </div>
              </article>

              <article className="demo-card" data-demo="beauty">
                <div className="demo-card__top">
                  <span className="demo-card__type">Сайт · салон / запись</span>
                  <ConceptBadge />
                </div>
                <h3>Aru Beauty</h3>
                <p>Лендинг записи: услуги, мастера, слоты. Подставьте свой салон или барбершоп.</p>
                <div className="demo-card__actions">
                  <Link className="demo-card__link" to="/demo/aru-beauty">
                    Открыть демо
                  </Link>
                </div>
              </article>
            </div>
          )}

          {tab === "how" && (
            <article className="hub__card">
              <h2>Как показать клиенту</h2>
              <p>
                Отправьте ссылку на демо. Внутри нажмите «Под себя» — имя, цвет, телефон и WhatsApp
                сохраняются в ссылке. Можно сразу переслать готовый вариант владельцу бизнеса.
              </p>
              <div className="how-steps">
                <div className="how-step">
                  <b>01</b>
                  <p>Выберите нишу: кофейня или салон.</p>
                </div>
                <div className="how-step">
                  <b>02</b>
                  <p>Отредактируйте бренд прямо в демо.</p>
                </div>
                <div className="how-step">
                  <b>03</b>
                  <p>Скопируйте URL из адресной строки и отправьте.</p>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <footer className="hub__footer">
        <span>Концепт-проекты · не выдаём за реальных клиентов</span>
        <span>KazSaq · Instagram @saq_dev_team</span>
      </footer>
    </div>
  );
}
