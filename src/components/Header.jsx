export default function Header({ page, go }) {
  const items = [
    ["inicio", "Inicio"],
    ["guia", "Guía"],
    ["faq", "Preguntas frecuentes"],
    ["chatbot", "Chatbot"],
  ];
  return (
    <header className="header">
      <div className="header-inner">
        <button onClick={() => go("inicio")} style={{ border: 0, background: "none" }} className="logo">
          <img src="/logos/logotipo.png" alt="MultiAyuda" style={{ height: "2.6rem", width: "auto" }} />
        </button>
        <nav className="nav">
          {items.map(([id, label]) => (
            <button key={id} className={page === id ? "active" : ""} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <button className="btn btn-sm" onClick={() => go("chatbot")}>Asistente IA</button>
      </div>
    </header>
  );
}
