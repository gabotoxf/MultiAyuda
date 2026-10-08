import { useEffect, useRef, useState } from "react";
import { useWebchat } from "@botpress/webchat";
import Icon from "./Icon.jsx";
import { renderRich } from "./RichText.jsx";
import { botpressConfig } from "../botpress.js";
import { chatSuggestions } from "../data/content.js";

const GREETING = "Hola, ¿qué vas a medir hoy? Pregunta por voltaje, resistencia, continuidad o corriente.";
const QUICK = chatSuggestions.slice(0, 3);
// BlockMessage trae el texto en message.block.text (TextBlock).
const bpText = (m) => {
  const b = m?.block;
  if (b && typeof b.text === "string" && b.text) return b.text;
  return m?.text ?? m?.payload?.text ?? m?.payload?.message ?? "";
};

export default function FloatingChat({ go }) {
  if (!botpressConfig.clientId) return null;
  return <FloatThread go={go} />;
}

function FloatThread({ go }) {
  const { client, messages, isTyping, user, clientState, error } = useWebchat({ clientId: botpressConfig.clientId, apiUrl: botpressConfig.apiUrl });
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [input, setInput] = useState("");
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState([]);
  const [unread, setUnread] = useState(0);
  const threadRef = useRef(null);
  const inputRef = useRef(null);
  const prevBot = useRef(0);

  const mine = (m) => m.authorId && user?.userId && m.authorId === user.userId;
  const shown = messages
    .map((m) => ({ from: mine(m) ? "user" : "bot", text: bpText(m) }))
    .filter((m) => m.text);
  const echoed = pending.filter((t) => !shown.some((m) => m.from === "user" && m.text === t));
  const all = [...shown, ...echoed.map((text) => ({ from: "user", text }))];
  const botCount = messages.filter((m) => !mine(m) && bpText(m)).length;

  useEffect(() => {
    if (botCount > prevBot.current) {
      prevBot.current = botCount;
      if (!open) setUnread((u) => u + 1);
    }
  }, [botCount, open]);

  useEffect(() => {
    threadRef.current?.scrollTo(0, threadRef.current.scrollHeight);
  }, [messages, isTyping, open, pending]);

  useEffect(() => {
    if (open) {
      setSeen(true);
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || !client) {
      if (!client) setFailed(true);
      return;
    }
    setInput("");
    setFailed(false);
    setOpen(true);
    setPending((p) => [...p, text]);
    try {
      const p = client.sendMessage({ type: "text", text });
      if (p?.catch) p.catch(() => {
        setFailed(true);
        setPending((prev) => prev.filter((x) => x !== text));
      });
    } catch {
      setFailed(true);
      setPending((prev) => prev.filter((x) => x !== text));
    }
  };

  const restart = () => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("bp-webchat-"))
        .forEach((k) => localStorage.removeItem(k));
    } catch { /* sigue con el reload */ }
    window.location.reload();
  };

  return (
    <div className="float-wrap" aria-label="Asistente MultiAyuda">
      {!seen && !open && (
        <button className="float-hint" onClick={() => setOpen(true)}>
          ¿Dudas con tu medición? Pregúntame
          <span className="float-hint-x" aria-hidden="true">×</span>
        </button>
      )}
      {open && (
        <section className="float-panel" role="dialog" aria-label="Chat con el asistente">
          <header className="float-head">
            <span className="float-avatar"><Icon name="bot" size={18} /></span>
            <span style={{ flex: 1 }}>
              <b>MultiBot</b>
            </span>
            <button className="float-icon" onClick={() => { setOpen(false); go("chatbot"); }} title="Abrir asistente completo" aria-label="Abrir asistente completo">
              <Icon name="expand" size={16} />
            </button>
            <button className="float-icon" onClick={() => setOpen(false)} title="Cerrar" aria-label="Cerrar chat">
              <Icon name="close" size={16} />
            </button>
          </header>
          <div className="float-thread" ref={threadRef} role="log" aria-live="polite">
            {all.length === 0 && (
              <div className="msg bot">
                <div className="avatar bot"><Icon name="bot" size={14} /></div>
                <div className="bubble bot">{GREETING}</div>
              </div>
            )}
            {all.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                <div className={`avatar ${m.from === "bot" ? "bot" : "you"}`}><Icon name={m.from === "bot" ? "bot" : "user"} size={14} /></div>
                <div className={`bubble ${m.from}`}>{renderRich(m.text)}</div>
              </div>
            ))}
            {isTyping && (
              <div className="msg bot"><div className="avatar bot"><Icon name="bot" size={14} /></div><div className="bubble bot typing"><span /><span /><span /></div></div>
            )}
            {failed && <div className="warn">No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.{error?.message ? ` Detalle: ${error.message}` : ""}</div>}
            {clientState === "error" && (
              <div className="warn" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <span>La sesión guardada caducó.</span>
                <button className="btn btn-sm" onClick={restart}>Reiniciar</button>
              </div>
            )}
            {clientState !== "connected" && <div className="warn">{clientState === "connecting" ? "Conectando con MultiBot…" : "Sin conexión con MultiBot. Revisa tu internet."}</div>}
          </div>
          <div className="float-quick">
            {QUICK.map((s) => (
              <button key={s} onClick={() => send(s)}>{s}</button>
            ))}
          </div>
          <form className="float-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={!client ? "Conectando…" : "Escribe tu duda…"} aria-label="Escribe tu duda" disabled={!client} />
            <button type="submit" aria-label="Enviar" disabled={!client}><Icon name="send" size={16} /></button>
          </form>
        </section>
      )}
      <button
        className={`float-btn ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
        aria-expanded={open}
      >
        <Icon name={open ? "close" : "chat"} size={22} />
        {!open && unread > 0 && <span className="float-badge">{unread}</span>}
        {!open && !seen && <span className="float-ping" />}
      </button>
    </div>
  );
}
