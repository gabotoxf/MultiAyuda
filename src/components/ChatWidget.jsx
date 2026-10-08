import { useEffect, useRef, useState } from "react";
import { botpressConfig } from "../botpress.js";
import { chatSuggestions, localAnswer } from "../data/content.js";

// Carga el Webchat de Botpress si hay botId; si no, usa respaldo local.
export default function ChatWidget() {
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hola. Estoy listo para asistirte con conexiones, escalas seguras y dudas en tu banco de trabajo. ¿Qué necesitas medir hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [bpReady, setBpReady] = useState(false);
  const threadRef = useRef(null);

  useEffect(() => {
    if (!botpressConfig.botId || !botpressConfig.clientId) return;
    if (document.getElementById("bp-inject")) { setBpReady(true); return; }
    const s = document.createElement("script");
    s.id = "bp-inject";
    s.src = `${botpressConfig.hostUrl}/inject.js`;
    s.async = true;
    s.onload = () => {
      try {
        window.botpress?.init({
          botId: botpressConfig.botId,
          clientId: botpressConfig.clientId,
          configuration: { botName: botpressConfig.botName, color: "#2563eb" },
        });
        setBpReady(true);
      } catch { /* respaldo local sigue activo */ }
    };
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    threadRef.current?.scrollTo(0, threadRef.current.scrollHeight);
  }, [msgs]);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { from: "user", text }]);
    // Si Botpress está listo, se abre el widget oficial; igual damos respuesta local inmediata.
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: localAnswer(text) }]);
    }, 350);
  };

  return (
    <div>
      <div className="suggest" style={{ marginBottom: ".9rem" }}>
        <span style={{ fontSize: ".75rem", color: "var(--subtle)" }}>✨ Sugerencias:</span>
        {chatSuggestions.map((s) => (
          <button key={s} onClick={() => send(s)}>{s}</button>
        ))}
      </div>
      <div className="thread" ref={threadRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            <div className={`avatar ${m.from === "bot" ? "bot" : "you"}`}>{m.from === "bot" ? "🤖" : "Tú"}</div>
            <div>
              <div className="meta">{m.from === "bot" ? "MultiAyuda" : "Tú"}</div>
              <div className={`bubble ${m.from}`}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pregunta sobre puertos, escalas o errores del multímetro..." />
        <button className="btn btn-primary btn-sm" type="submit">Enviar ↑</button>
      </form>
      <p style={{ fontSize: ".7rem", color: "var(--subtle)", marginTop: ".5rem" }}>
        🛡 {botpressConfig.botId ? (bpReady ? "Botpress conectado. También puedes abrir el widget flotante." : "Conectando con Botpress…") : "Modo local activo: pega tu Bot ID en src/botpress.js para activar Botpress Cloud."}{" "}
        Consulta el manual antes de medir alta energía.
      </p>
      {bpReady && (
        <button className="btn btn-sm" style={{ marginTop: ".4rem" }} onClick={() => window.botpress?.open()}>
          Abrir chat de Botpress
        </button>
      )}
    </div>
  );
}
