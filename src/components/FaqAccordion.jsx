import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0);
  if (!items?.length) return null;
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <div className="faq-item" key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span><span style={{ color: "var(--brand)", marginRight: ".6rem" }}>•</span>{f.q}</span>
            <span style={{ color: "var(--subtle)", transform: open === i ? "rotate(180deg)" : "none" }}>▾</span>
          </button>
          {open === i && <div className="faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  );
}
