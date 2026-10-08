import { useState } from "react";
import { multimeterParts, dialModes } from "../data/content.js";

const keys = ["screen", "dial", "com", "volts", "current"];
const labels = { screen: "Pantalla", dial: "Perilla", com: "Borne COM", volts: "Borne V/Ω", current: "Borne 10A" };
const dialOrder = Object.keys(dialModes);

export default function MultimeterDiagram() {
  const [sel, setSel] = useState("screen");
  const [mode, setMode] = useState("vdc");
  const d = sel === "dial" ? dialModes[mode] ?? dialModes.vdc : multimeterParts[sel] ?? multimeterParts.screen;
  const turn = () => {
    setSel("dial");
    setMode((m) => dialOrder[(dialOrder.indexOf(m) + 1) % dialOrder.length]);
  };
  return (
    <div className="dmm-grid">
      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="dmm">
          <div className="dmm-top"><span>DMM-600</span><span style={{ color: "#fbbf24" }}>CAT III</span></div>
          <button className="dmm-screen" onClick={() => setSel("screen")}>
            <div className="row"><span>DC</span><span>AUTO</span></div>
            <div className="val"><b>{d.val}</b><span>{d.unit}</span></div>
          </button>
          <div className="dmm-dial">
            <button className={sel === "dial" ? "on" : ""} onClick={turn} aria-label="Perilla: clic para girar">
              <div className="ptr" /><span style={{ fontSize: ".6rem" }}>{dialModes[mode]?.short ?? "MODO"}</span>
            </button>
          </div>
          <div className="dmm-jacks">
            <button onClick={() => setSel("current")}><div className="jack" style={{ borderColor: "#ef4444" }} />10A</button>
            <button onClick={() => setSel("com")}><div className="jack" style={{ borderColor: "#64748b" }} />COM</button>
            <button onClick={() => setSel("volts")}><div className="jack" style={{ borderColor: "#ef4444" }} />V / Ω</button>
          </div>
        </div>
        <div className="chips">
          {keys.map((k) => (
            <button key={k} className={sel === k ? "on" : ""} onClick={() => setSel(k)}>{labels[k]}</button>
          ))}
        </div>
        {sel === "dial" && (
          <div className="chips">
            {dialOrder.map((m) => (
              <button key={m} className={mode === m ? "on" : ""} onClick={() => setMode(m)}>{dialModes[m].short}</button>
            ))}
          </div>
        )}
      </div>
      <div className="card detail">
        <div>
          <span className="badge">{d.badge}</span>
          <h3 style={{ fontSize: "1.25rem", margin: "0 0 .4rem" }}>{d.title}</h3>
          <p>{d.desc}</p>
        </div>
        <div className="tip"><div className="tip-inner"><span>💡</span><span>{d.tip}</span></div></div>
      </div>
    </div>
  );
}
