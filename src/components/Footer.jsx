export default function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div><b style={{ color: "var(--dark)" }}>MultiAyuda</b> — Guía práctica de laboratorio para ingeniería.</div>
        <nav>
          <button onClick={() => go("inicio")}>Inicio</button>
          <button onClick={() => go("guia")}>Guía</button>
          <button onClick={() => go("faq")}>Preguntas</button>
          <button onClick={() => go("chatbot")}>Chatbot</button>
        </nav>
        <div>© 2025 MultiAyuda. Libre de errores.</div>
      </div>
    </footer>
  );
}
