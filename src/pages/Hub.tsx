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
    const lines = root.querySelectorAll<HTMLElement>(".hub__title .hub-line");
    const rest = root.querySelectorAll<HTMLElement>(".hub-fade");
    if (reduced) {
      gsap.set([lines, rest], { clearProps: "all" });
      return;
    }
    gsap.fromTo(
      lines,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.09, ease: "power3.out" },
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
          <span className="hub-line">Сайты и боты,</span>
          <span className="hub-line">которые</span>
          <span className="hub-line">
            <em>продают</em> за вас
          </span>
        </h1>
        <p className="hub__lead hub-fade">
          Живые концепты под ваш бизнес: откройте демо, подставьте название и цвет — и отправьте
          ссылку клиенту. Так выглядит продукт до договора, без риска.
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
        <div ref={panelRef} key={tab}>
          {tab === "team" && (
            <div className="hub__card">
              <h2>KazSaq dev team</h2>
              <p>
                Делаем сайты, чат-боты и приложения для малого и среднего бизнеса. Работаем через
                ИП, проекты курируют наставники университета. Половина дохода идёт в лабораторию
                беспилотников МИТУ — поэтому каждый заказ двигает и бизнес клиента, и инженерную
                школу.
              </p>
              <div className="hub__stats">
                <div className="hub__stat">
                  <b>3 дня</b>
                  <span>бесплатный прототип</span>
                </div>
                <div className="hub__stat">
                  <b>от 29 000 ₸</b>
                  <span>помесячно, без полной предоплаты</span>
                </div>
                <div className="hub__stat">
                  <b>50%</b>
                  <span>на лабораторию дронов</span>
                </div>
              </div>
              <div className="hub__pillars">
                <div className="hub__pillar">
                  <b>Сайты</b>
                  <p>Лендинги, бизнес-сайты и магазины с Kaspi Pay, двуязычием и правками каждый месяц.</p>
                </div>
                <div className="hub__pillar">
                  <b>Боты</b>
                  <p>Запись, прайс, оплата и CRM. Клиент пишет ночью — бот отвечает сразу.</p>
                </div>
                <div className="hub__pillar">
                  <b>Приложения</b>
                  <p>CRM и мобильные сервисы на Flutter: роли, пуши, еженедельный прогресс.</p>
                </div>
              </div>
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
                <p>
                  Полноценный лендинг: hero, меню, бронь стола, атмосфера зала. Переименуйте под
                  свою кофейню и покажите владельцу.
                </p>
                <div className="demo-card__features">
                  <span className="demo-card__chip">Меню</span>
                  <span className="demo-card__chip">Бронь</span>
                  <span className="demo-card__chip">WhatsApp</span>
                </div>
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
                <p>
                  Лендинг записи: услуги, мастера, слоты, напоминания. Подставьте салон или
                  барбершоп — клиент сразу видит «своё».
                </p>
                <div className="demo-card__features">
                  <span className="demo-card__chip">Слоты</span>
                  <span className="demo-card__chip">Услуги</span>
                  <span className="demo-card__chip">Мастера</span>
                </div>
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
              <h2>Как показать клиенту за 2 минуты</h2>
              <p>
                Не нужно объяснять «мы сделаем сайт». Откройте демо на телефоне, нажмите «Под себя»,
                впишите название бизнеса — и отправьте готовую ссылку. Параметры остаются в URL.
              </p>
              <div className="how-steps">
                <div className="how-step">
                  <b>01</b>
                  <p>Выберите нишу: кофейня или салон.</p>
                </div>
                <div className="how-step">
                  <b>02</b>
                  <p>Отредактируйте бренд, цвет и WhatsApp.</p>
                </div>
                <div className="how-step">
                  <b>03</b>
                  <p>Скопируйте URL и отправьте владельцу.</p>
                </div>
              </div>
              <p className="hub__note">
                Все кейсы — концепт-проекты. Мы не выдаём их за реальных клиентов.
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="hub__strip" aria-label="Дополнительно">
        <article className="hub__strip-card">
          <h3>Что чувствует клиент</h3>
          <p>
            Не PDF и не скрин из Figma — рабочая страница с анимациями, кнопками и записью. Легче
            сказать «да» после того, как увидел свой бренд на экране.
          </p>
        </article>
        <article className="hub__strip-card">
          <h3>Дальше после демо</h3>
          <p>
            Бесплатный прототип за 3 дня на данных клиента, затем договор и помесячный запуск. Цены
            и скрипты — у команды в Instagram @saq_dev_team.
          </p>
        </article>
      </section>

      <footer className="hub__footer">
        <span>Концепт-проекты · не выдаём за реальных клиентов</span>
        <span>KazSaq · Instagram @saq_dev_team</span>
      </footer>
    </div>
  );
}
