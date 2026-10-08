// Render mínimo para respuestas del bot: **texto** -> <strong>.
// Todo lo demás se muestra como texto plano (React lo escapa solo).
export function renderRich(text) {
  return String(text ?? "").split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}
