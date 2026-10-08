import { useEffect, useRef, useState } from "react";
import { useWebchat } from "@botpress/webchat";
import Icon from "./Icon.jsx";
import { renderRich } from "./RichText.jsx";
import { botpressConfig } from "../botpress.js";
import { chatSuggestions } from "../data/content.js";

const GREETING = "Hola. Estoy listo para asistirte con conexiones, escalas seguras y dudas en tu banco de trabajo. ¿Qué necesitas medir hoy?";
// BlockMessage trae el texto en message.block.text (TextBlock).
const bpText = (m) => {
  const b = m?.block;
  if (b && typeof b.text === "string" && b.text) return b.text;
  return m?.text ?? m?.payload?.text ?? m?.payload?.message ?? "";
};
const STATUS = {
  connected: "Conectado con MultiBot. Consulta el manual antes de medir alta energía.",
  connecting: "Conectando con MultiBot…",
  error: "Sin conexión con MultiBot. Revisa tu internet e intenta de nuevo.",
  disconnected: "Sin conexión con MultiBot. Revisa tu internet e intenta de nuevo.",
};

// Borra sesiones viejas guardadas (apuntan a integraciones que ya no existen) y recarga.
export function restartConversation() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("bp-webchat-"))
      .forEach((k) => localStorage.removeItem(k));
  } catch { /* sigue con el reload */ }
  window.location.reload();
}

export default function ChatWidget() {
  if (!botpressConfig.clientId) {
    return <div className="card">Asistente no configurado: falta el Client ID de Botpress en src/botpress.js.</div>;
  }
  return <BpThread />;
}

// Hilo conectado al bot de Botpress (UI propia, sin respuestas locales).
function BpThread() {
  const { client, messages, isTyping, user, clientState } = useWebchat({ clientId: botpressConfig.clientId, apiUrl: botpressConfig.apiUrl });
  const [input, setInput] = useState("");
  const [failed, setFailed] = useState(false);
  const threadRef = useRef(null);

  const mine = (m) => m.authorId && user?.userId && m.authorId === user.userId;
  const shown = messages
    .map((m) => ({ from: mine(m) ? "user" : "bot", text: bpText(m) }))
    .filter((m) => m.text);

  useEffect(() => {
    threadRef.current?.scrollTo(0, threadRef.current.scrollHeight);
  }, [messages, isTyping]);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || !client) {
      if (!client) setFailed(true);
      return;
    }
    setInput("");
    setFailed(false);
    try {
      const p = client.sendMessage({ type: "text", text });
      if (p?.catch) p.catch(() => setFailed(true));
    } catch {
      setFailed(true);
    }
  };

  return (
    <ChatUI
      threadRef={threadRef}
      input={input}
      setInput={setInput}
      send={send}
      isTyping={isTyping}
      empty={shown.length === 0}
      msgs={shown}
      failed={failed}
      disabled={!client}
      showRestart={clientState === "error"}
      onRestart={restartConversation}
      status={STATUS[clientState] ?? STATUS.connecting}
    />
  );
}

export function ChatUI({ threadRef, input, setInput, send, isTyping, empty, msgs, failed, disabled, showRestart, onRestart, status }) {
  return (
    <div>
      <div className="suggest" style={{ marginBottom: ".9rem" }}>
        <span style={{ fontSize: ".75rem", color: "var(--subtle)" }}>Sugerencias:</span>
        {chatSuggestions.map((s) => (
          <button key={s} onClick={() => send(s)}>{s}</button>
        ))}
      </div>
      <div className="thread" ref={threadRef} role="log" aria-live="polite">
        {empty && (
          <div className="msg bot">
            <div className="avatar bot"><Icon name="bot" size={16} /></div>
            <div>
              <div className="meta">MultiAyuda</div>
              <div className="bubble bot">{GREETING}</div>
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            <div className={`avatar ${m.from === "bot" ? "bot" : "you"}`}><Icon name={m.from === "bot" ? "bot" : "user"} size={15} /></div>
            <div>
              <div className="meta">{m.from === "bot" ? "MultiAyuda" : "Tú"}</div>
              <div className={`bubble ${m.from}`}>{renderRich(m.text)}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="msg bot">
            <div className="avatar bot"><Icon name="bot" size={16} /></div>
            <div>
              <div className="meta">MultiAyuda</div>
              <div className="bubble bot typing"><span /><span /><span /></div>
            </div>
          </div>
        )}
        {failed && <div className="warn">No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.</div>}
        {showRestart && (
          <div className="warn" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <span>La sesión guardada caducó.</span>
            <button className="btn btn-sm" onClick={onRestart}>Reiniciar conversación</button>
          </div>
        )}
      </div>
      <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={disabled ? "Conectando con MultiBot…" : "Pregunta sobre puertos, escalas o errores del multímetro..."} aria-label="Escribe tu pregunta" disabled={disabled} />
        <button className="btn btn-primary btn-sm" type="submit" aria-label="Enviar" disabled={disabled}><Icon name="send" size={15} /> Enviar</button>
      </form>
      <p style={{ fontSize: ".7rem", color: "var(--subtle)", marginTop: ".5rem", display: "flex", gap: ".35rem", alignItems: "center" }}>
        <Icon name="shield" size={14} /> {status}
      </p>
    </div>
  );
}
