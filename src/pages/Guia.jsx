import { useState } from "react";
import { guideTabs, goodPractices, terminals } from "../data/content.js";

export default function Guia({ go }) {
  const [tab, setTab] = useState("voltaje");
  const g = guideTabs[tab] ?? guideTabs.voltaje;
  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "3rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div style={{ textAlign: "center", maxWidth: "38rem", margin: "0 auto" }}>
        <span className="pill">⚡ Manual Rápido de Laboratorio</span>
        <h1 className="hero" style={{ fontSize: "2.2rem" }}>Guía Rápida del Multímetro</h1>
        <p className="lead">Paso a paso conciso para configurar tu equipo con seguridad, exactitud y rapidez.</p>
      </div>

      <div className="card">
        <h2 className="title" style={{ fontSize: "1.1rem" }}>Anatomía rápida de los terminales</h2>
        <div className="cards3" style={{ marginTop: "1rem" }}>
          {terminals.map((t) => (
            <div className="step" key={t.id}>
              <h4><span className="t" style={{ display: "inline-grid", width: "1.4rem", height: "1.4rem", borderRadius: "50%", background: t.color, color: "#fff", placeItems: "center", fontSize: ".55rem", marginRight: ".5rem" }}>●</span>Borne {t.id}</h4>
              <p><b style={{ color: "var(--dark)" }}>{t.label}.</b> {t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="title">Procedimiento por tipo de medición</h2>
        <div className="tabs" style={{ margin: "1rem 0" }}>
          {Object.entries(guideTabs).map(([id, v]) => (
            <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{v.label}</button>
          ))}
        </div>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: ".6rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem", marginBottom: "1.2rem" }}>
            <b style={{ color: "var(--dark)" }}>{g.label} — paso a paso</b>
            <span className="pill"><i />{g.tag}</span>
          </div>
          <div className={`steps ${g.steps.length === 4 ? "four" : ""}`}>
            {g.steps.map((s, i) => (
              <div className="step" key={i}><div className="n">0{i + 1}</div><h4>{s.t}</h4><p>{s.d}</p></div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="title" style={{ fontSize: "1.1rem" }}>✔ Buenas prácticas y errores más comunes</h2>
        <div className="cards3" style={{ marginTop: "1rem" }}>
          {goodPractices.map((p) => (
            <div className="step" key={p.title}><h4>{p.title}</h4><p>{p.desc}</p></div>
          ))}
        </div>
      </div>

      <div className="cta-dark">
        <div><b>¿Dudas con tu modelo específico?</b><p style={{ margin: ".3rem 0 0", fontSize: ".8rem", color: "#cbd5e1" }}>Pregunta al tutor con la referencia de tu instrumento.</p></div>
        <button className="btn" onClick={() => go("chatbot")}>💬 Consultar Asistente IA</button>
      </div>
    </div>
  );
}
