// Contenido real extraído de /plantillas — única fuente de verdad.
export const multimeterParts = {
  screen: { badge: "Pantalla LCD", title: "Visualización de lectura", desc: "Presenta el valor medido, los decimales y la unidad activa (voltios, ohmios o amperios).", tip: "Si aparece “OL”, el valor excede el rango seleccionado. Aumenta la escala.", val: "5.00", unit: "V" },
  dial: { badge: "Perilla Selectora", title: "Selector de magnitud", desc: "Permite cambiar entre voltaje, resistencia, corriente y prueba de continuidad.", tip: "Nunca cambies de escala con las puntas conectadas a alta tensión.", val: "12.0", unit: "V DC" },
  com: { badge: "Borne COM", title: "Referencia común (tierra)", desc: "Punto de referencia base del multímetro. La punta negra siempre permanece conectada aquí.", tip: "La punta negra no cambia de posición en ninguna medición.", val: "0.00", unit: "COM" },
  volts: { badge: "Borne V / Ω", title: "Entrada para tensión y resistencia", desc: "Punto donde se conecta la punta roja para medir voltaje, ohmios y continuidad.", tip: "Es el conector principal para el 90% de tus prácticas de laboratorio.", val: "1.00", unit: "kΩ" },
  current: { badge: "Borne 10A / mA", title: "Entrada de corriente protegida", desc: "Uso exclusivo para medir flujo de corriente en serie. Cuenta con fusible interno.", tip: "Nunca conectes este borne en paralelo con una fuente.", val: "25.0", unit: "mA" },
};

export const dialModes = {
  off: { short: "OFF", badge: "Perilla · OFF", title: "Apagado", desc: "Posición de reposo. Gira aquí al terminar para cuidar la batería.", tip: "Termina siempre en OFF y devuelve la punta roja a V/Ω.", val: "– – – –", unit: "" },
  vdc: { short: "V⎓", badge: "Perilla · V⎓", title: "Voltaje DC", desc: "Mide tensión continua (baterías, fuentes DC) con puntas en paralelo.", tip: "Empieza en el rango más alto y baja hasta lograr buena resolución.", val: "5.00", unit: "V DC" },
  vac: { short: "V~", badge: "Perilla · V~", title: "Voltaje AC", desc: "Mide tensión alterna (red eléctrica) con puntas en paralelo.", tip: "Verifica AC/DC antes de leer: un modo equivocado da valores engañosos.", val: "120.4", unit: "V AC" },
  ohm: { short: "Ω", badge: "Perilla · Ω", title: "Resistencia", desc: "Mide ohmios solo con el circuito desenergizado y una patilla aislada.", tip: "Sin energía: medir con fuente encendida falsea el valor y daña el equipo.", val: "1.00", unit: "kΩ" },
  cont: { short: "•)))", badge: "Perilla · •)))", title: "Continuidad", desc: "Pita si hay camino eléctrico (R < 50 Ω). Ideal para cables, pistas y fusibles.", tip: "Verifica juntando las puntas: debe sonar antes de medir.", val: "0.2", unit: "Ω" },
  amp: { short: "A", badge: "Perilla · A", title: "Corriente", desc: "Mide amperios con el circuito abierto y el multímetro en serie.", tip: "Mueve la roja a mA/10A y al terminar devuélvela a V/Ω.", val: "25.0", unit: "mA" },
};

export const learnCards = [
  { icon: "bolt", title: "Medir voltaje", desc: "Conexión en paralelo en corriente continua (DC) y alterna (AC)." },
  { icon: "ohm", title: "Medir resistencia", desc: "Medición con circuito 100% desenergizado para no dañar el equipo." },
  { icon: "sound", title: "Continuidad", desc: "Comprobación sonora de pistas, cables y fusibles en buen estado." },
  { icon: "current", title: "Medir corriente", desc: "Apertura del circuito para conectar el instrumento en serie." },
];

export const errorCards = [
  { icon: "plug", color: "#e11d48", title: "Puntas en borne equivocado", desc: "Medir voltaje con la sonda en el borne de corriente provoca cortocircuito inmediato.", rule: "Mantén la punta roja en V/Ω por defecto." },
  { icon: "alert", color: "#d97706", title: "Ohmios con energía activa", desc: "Medir resistencia con la fuente encendida altera el valor y quema la protección interna.", rule: "Apaga la fuente antes de medir ohmios." },
  { icon: "current", color: "#2563eb", title: "Amperímetro en paralelo", desc: "Conectar el modo de corriente en paralelo quema el fusible instantáneamente.", rule: "Abre el circuito y mide siempre en serie." },
];

export const terminals = [
  { id: "COM", label: "Punta Negra (Común)", desc: "Siempre conectada aquí. No cambia.", color: "#0f172a" },
  { id: "V/Ω", label: "Voltaje, Ohms y Diodo", desc: "Punta roja para 90% de mediciones.", color: "#dc2626" },
  { id: "10A", label: "Corriente (En serie)", desc: "Solo amperímetro con circuito abierto.", color: "#d97706" },
];

export const guideTabs = {
  voltaje: {
    label: "Voltaje (V)", tag: "Medición siempre en PARALELO",
    steps: [
      { t: "Puntas en COM y V", d: "Clavija negra en COM y la roja en V/Ω." },
      { t: "Elegir Tipo (DC / AC)", d: "Gira el dial a V⎓ (DC) para baterías o a V~ (AC) para red eléctrica." },
      { t: "Conectar en Paralelo", d: "Toca los dos extremos del componente sin desconectar cables." },
      { t: "Leer y Apagar", d: "Anota el valor estable. Al terminar, gira a OFF." },
    ],
  },
  resistencia: {
    label: "Resistencia (Ω)", tag: "Sin energía en el circuito",
    steps: [
      { t: "Desenergizar", d: "Apaga la fuente. Medir con corriente falsea el valor y daña el sensor." },
      { t: "Aislar una patilla", d: "Levanta un terminal para no medir resistencias en paralelo." },
      { t: "Colocar puntas", d: "Toca cada extremo. Sin polaridad, no importa el color." },
    ],
  },
  continuidad: {
    label: "Continuidad", tag: "Pitido si R < 50 Ω",
    steps: [
      { t: "Girar al ícono de sonido", d: "Selecciona bocina o diodo. Puntas en COM y V/Ω." },
      { t: "Autocomprobación", d: "Junta ambas puntas: debe sonar un pitido." },
      { t: "Verificar cable o pista", d: "Toca inicio y fin. Si pita hay continuidad; si hay “OL”, está cortado." },
    ],
  },
  corriente: {
    label: "Corriente (A)", tag: "Obligatorio en SERIE",
    steps: [
      { t: "Mover punta roja a mA / A", d: "Saca la punta de V/Ω y conéctala al jack de corriente." },
      { t: "Abrir el circuito", d: "Desconecta un cable: la corriente debe atravesar el multímetro." },
      { t: "Restablecer la punta", d: "Al terminar, devuelve la roja a V/Ω para evitar accidentes." },
    ],
  },
};

export const goodPractices = [
  { title: "Fusible fundido al medir voltaje", desc: "Ocurre al olvidar la punta roja en amperaje. Revisa la posición del conector rojo antes de medir." },
  { title: "Lecturas erráticas o flotantes", desc: "Batería baja o tocar los metales con los dedos al medir alta resistencia." },
  { title: "Símbolo “OL” o “1” en pantalla", desc: "Fuera de rango (Over Limit). Gira a una escala superior, no significa circuito roto." },
];

export const faqs = [
  { q: "¿Dónde se conectan correctamente las puntas de prueba?", keywords: "puntas com negra roja bornes", a: "Negra siempre en COM. Roja en V/Ω para voltaje, resistencia o continuidad. Solo muévela a mA/10A para corriente en serie. Nunca midas voltaje con la roja en 10A: provocas cortocircuito." },
  { q: "¿Cuál es la diferencia entre medir voltaje y corriente?", keywords: "voltaje corriente paralelo serie", a: "Voltaje: en paralelo, sin desconectar nada. Corriente: en serie, apagando la fuente, abriendo la pista e intercalando el multímetro." },
  { q: "¿Cómo medir resistencia sin dañar el instrumento?", keywords: "resistencia ohms desenergizado", a: "Circuito 100% desenergizado y capacitores descargados. Desconecta al menos un pin si está soldada para evitar paralelos que falseen el valor." },
  { q: "¿Cómo usar la función de continuidad y cuándo suena el bip?", keywords: "continuidad diodo bocina bip", a: "Selector en bocina/diodo, verifica juntando puntas (debe pitar), luego toca inicio y fin del tramo. Pita si R < 30-50 Ω; silencio u “OL” = corte." },
  { q: "¿Qué significa la lectura “OL” en la pantalla?", keywords: "ol over limit fuera de rango", a: "Over Limit / Open Loop: supera el rango o hay resistencia infinita. Sube la escala (ej. de 2kΩ a 200kΩ)." },
  { q: "¿Cuáles son los 3 errores más comunes que debes evitar?", keywords: "errores fusible seguridad ac dc", a: "1) Voltaje con punta en 10A (cortocircuito). 2) Resistencia con fuente encendida. 3) No revisar AC/DC (lecturas engañosas)." },
];

export const chatSuggestions = [
  "¿Cómo mido voltaje?",
  "¿Dónde conecto la punta roja?",
  "¿Cómo mido resistencia con seguridad?",
  "¿Por qué la pantalla muestra OL?",
];
