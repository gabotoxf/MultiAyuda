import { Suspense, lazy } from "react";
import Icon from "../components/Icon.jsx";
import { terminals } from "../data/content.js";

const ChatWidget = lazy(() => import("../components/ChatWidget.jsx"));

export default function Chatbot({ go }) {
  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.2rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ color: "var(--dark)", margin: 0, fontSize: "1.4rem" }}>MultiBot <span className="pill" style={{ background: "#ecfdf5", color: "#047857" }}>● En línea</span></h1>
          <p className="lead" style={{ fontSize: ".85rem", margin: ".3rem 0 0" }}>Asistente de laboratorio: respuestas directas y seguras sobre multímetros. Especializado en DC/AC.</p>
        </div>
      </div>
      <div className="chat-layout">
        <section className="chat-card">
          <header className="chat-card-head">
            <span className="chat-card-avatar"><Icon name="bot" size={20} /></span>
            <span style={{ flex: 1 }}>
              <b>MultiBot</b>
              <small>Pregunta sobre conexiones, escalas y seguridad</small>
            </span>
            <span className="chat-card-live"><span className="dot-live" /> En línea</span>
          </header>
          <div className="chat-card-body">
            <Suspense fallback={<div className="card">Cargando asistente…</div>}>
              <ChatWidget />
            </Suspense>
          </div>
        </section>
        <aside style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="side-card">
            <b style={{ color: "var(--dark)", fontSize: ".85rem", display: "inline-flex", gap: ".4rem", alignItems: "center" }}><Icon name="plug" size={16} /> Bornes Esenciales</b>
            {terminals.map((t) => (
              <div className="term" key={t.id}>
                <span className="t" style={{ background: t.color }}>{t.id}</span>
                <span><b>{t.label}</b>{t.desc}</span>
              </div>
            ))}
          </div>
          <div className="side-card" style={{ background: "var(--surface-muted)" }}>
            <b style={{ fontSize: ".78rem", display: "inline-flex", gap: ".4rem", alignItems: "center" }}><Icon name="bulb" size={15} /> Regla rápida</b>
            <p style={{ fontSize: ".76rem", lineHeight: 1.7 }}>• <b>Voltaje:</b> en paralelo.<br />• <b>Resistencia:</b> sin energía.<br />• <b>Corriente:</b> en serie.</p>
            <button className="btn btn-sm" onClick={() => go("guia")}>Ver guía completa →</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
