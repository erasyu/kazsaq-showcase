import { useEffect, useId, useState } from "react";
import type { DemoBrand } from "../lib/customize";
import "./CustomizeDrawer.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: DemoBrand;
  onChange: (next: DemoBrand) => void;
  onReset: () => void;
};

export function CustomizeDrawer({ open, onOpenChange, brand, onChange, onReset }: Props) {
  const titleId = useId();
  const [draft, setDraft] = useState(brand);

  useEffect(() => {
    setDraft(brand);
  }, [brand, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const set = <K extends keyof DemoBrand>(key: K, value: DemoBrand[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const apply = () => {
    onChange(draft);
    onOpenChange(false);
  };

  return (
    <>
      <button type="button" className="customize-fab" onClick={() => onOpenChange(true)}>
        Под себя
      </button>

      {open ? (
        <div className="customize-layer is-open">
          <button
            type="button"
            className="customize-backdrop"
            aria-label="Закрыть редактор"
            onClick={() => onOpenChange(false)}
          />
          <aside className="customize-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <header className="customize-drawer__head">
              <div>
                <p className="customize-drawer__eyebrow">Редактор концепта</p>
                <h2 id={titleId}>Как будет выглядеть у вас</h2>
              </div>
              <button type="button" className="customize-drawer__close" onClick={() => onOpenChange(false)}>
                Закрыть
              </button>
            </header>

            <div className="customize-drawer__body">
              <label>
                Название бизнеса
                <input value={draft.name} onChange={(e) => set("name", e.target.value)} />
              </label>
              <label>
                Слоган
                <input value={draft.tagline} onChange={(e) => set("tagline", e.target.value)} />
              </label>
              <label>
                Город / район
                <input value={draft.city} onChange={(e) => set("city", e.target.value)} />
              </label>
              <label>
                Телефон
                <input value={draft.phone} onChange={(e) => set("phone", e.target.value)} />
              </label>
              <label>
                WhatsApp
                <input value={draft.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
              </label>
              <label>
                Акцентный цвет
                <span className="customize-color">
                  <input
                    type="color"
                    value={draft.accent}
                    onChange={(e) => set("accent", e.target.value)}
                    aria-label="Выбор цвета"
                  />
                  <input value={draft.accent} onChange={(e) => set("accent", e.target.value)} />
                </span>
              </label>
            </div>

            <footer className="customize-drawer__foot">
              <button type="button" className="btn-ghost" onClick={onReset}>
                Сбросить
              </button>
              <button type="button" className="btn-primary" onClick={apply}>
                Применить
              </button>
            </footer>
          </aside>
        </div>
      ) : null}
    </>
  );
}
