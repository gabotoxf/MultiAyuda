import MultimeterDiagram from "../components/MultimeterDiagram.jsx";
import { learnCards, errorCards } from "../data/content.js";

export default function Inicio({ go }) {
  return (
    <>
      <section className="block">
        <div className="container grid-2">
          <div>
            <span className="pill"><i />Laboratorio de Electrónica Inicial</span>
            <h1 className="hero">Aprende a usar el <span style={{ color: "var(--brand)" }}>multímetro</span> con seguridad.</h1>
            <p className="lead">Domina las mediciones básicas sin quemar fusibles ni arriesgar tus componentes.</p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => go("guia")}>Comenzar guía →</button>
              <button className="btn" onClick={() => go("chatbot")}>💬 Consultar chatbot</button>
            </div>
            <div className="stats">
              <div><b>100%</b>Práctico</div>
              <div><b>V · Ω · A</b>Magnitudes clave</div>
              <div><b>0 Daños</b>Método guiado</div>
            </div>
          </div>
          <div className="hero-img">
            <img src="/images/img-hero.jpg" alt="Estudiante usando multímetro en laboratorio" style={{ width: "100%", height: "18rem", objectFit: "cover", borderRadius: ".8rem", display: "block" }} />
            <div className="bar"><span><span className="dot-live" />Puntas calibradas</span><span>&lt; 0.2 Ω</span></div>
          </div>
        </div>
      </section>

      <section className="block band">
        <div className="container">
          <span className="eyebrow">Diagrama Interactivo</span>
          <h2 className="title">Conoce las partes del multímetro</h2>
          <p className="lead" style={{ fontSize: ".85rem" }}>Selecciona un elemento para ver su función técnica.</p>
          <div style={{ marginTop: "1.5rem" }}><MultimeterDiagram /></div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <span className="eyebrow">Temario</span>
          <h2 className="title">¿Qué aprenderás?</h2>
          <div className="cards4" style={{ marginTop: "1.2rem" }}>
            {learnCards.map((c) => (
              <div className="card" key={c.title}><div className="icon-box">{c.icon}</div><h3>{c.title}</h3><p>{c.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="block band">
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--rose)" }}>Prevención</span>
          <h2 className="title">Errores comunes a evitar</h2>
          <div className="cards3" style={{ marginTop: "1.2rem" }}>
            {errorCards.map((e) => (
              <div className="card" key={e.title}>
                <div className="icon-box" style={{ background: "#fef2f2", color: e.color }}>{e.icon}</div>
                <h3>{e.title}</h3><p>{e.desc}</p>
                <div className="rule"><b>Regla:</b> {e.rule}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <div className="card" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", padding: "2rem" }}>
            <div><h2 className="title">¿Listo para tu práctica de laboratorio?</h2><p className="lead" style={{ fontSize: ".85rem" }}>Accede al paso a paso guiado o consulta dudas con la IA.</p></div>
            <div style={{ display: "flex", gap: ".6rem" }}>
              <button className="btn btn-primary" onClick={() => go("guia")}>Ir a la guía</button>
              <button className="btn" onClick={() => go("chatbot")}>Preguntar al bot</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
