import { useMemo, useState } from "react";
import FaqAccordion from "../components/FaqAccordion.jsx";
import { faqs } from "../data/content.js";

export default function Faq({ go }) {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return faqs;
    return faqs.filter((f) => `${f.q} ${f.a} ${f.keywords ?? ""}`.toLowerCase().includes(s));
  }, [q]);
  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "3rem", maxWidth: "52rem" }}>
      <div style={{ textAlign: "center" }}>
        <span className="eyebrow">Ayuda rápida en laboratorio</span>
        <h1 className="hero" style={{ fontSize: "2.2rem" }}>Preguntas frecuentes</h1>
        <p className="lead">Dudas esenciales y soluciones directas para medir con seguridad.</p>
        <div className="search-wrap">
          <span className="ico">🔍</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por tema: puntas, voltaje, OL, continuidad..." />
        </div>
      </div>
      <div style={{ marginTop: "1.6rem" }}>
        <FaqAccordion items={items} />
        {items.length === 0 && (
          <div className="card" style={{ textAlign: "center", marginTop: "1rem" }}>
            <p>No encontramos coincidencias.</p>
            <button className="btn btn-sm" onClick={() => setQ("")}>Ver todas</button>
          </div>
        )}
      </div>
      <div className="card" style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <div><b style={{ color: "var(--dark)" }}>¿Duda sobre una práctica específica?</b><p style={{ margin: ".2rem 0 0", fontSize: ".78rem", color: "var(--muted)" }}>El asistente responde sobre componentes y diagramas.</p></div>
        <button className="btn btn-primary btn-sm" onClick={() => go("chatbot")}>💬 Preguntar al chatbot</button>
      </div>
    </div>
  );
}
