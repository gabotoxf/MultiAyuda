import { Suspense, lazy, useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/Inicio.jsx";
import Guia from "./pages/Guia.jsx";
import Faq from "./pages/Faq.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import "./styles.css";

const FloatingChat = lazy(() => import("./components/FloatingChat.jsx"));

const routes = { "/": "inicio", "/guia": "guia", "/faq": "faqs", "/faqs": "faqs", "/chatbot": "chatbot" };
const titles = {
  inicio: "MultiAyuda - Guía de Multímetro para Laboratorio",
  guia: "Guía rápida · MultiAyuda",
  faqs: "Preguntas frecuentes · MultiAyuda",
  chatbot: "Asistente IA · MultiAyuda",
};
const paths = { inicio: "/", guia: "/guia", faqs: "/faqs", chatbot: "/chatbot" };
const fromPath = () => routes[window.location.pathname.replace(/\/+$/, "") || "/"] ?? "inicio";

export default function App() {
  const [page, setPage] = useState(fromPath);
  useEffect(() => {
    const onPop = () => { setPage(fromPath()); window.scrollTo(0, 0); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => { document.title = titles[page]; }, [page]);
  const go = (id) => {
    const p = paths[id] ?? "/";
    if (window.location.pathname === p) window.scrollTo(0, 0);
    else window.history.pushState({}, "", p);
    setPage(id);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Header page={page} go={go} />
      <main>
        {page === "inicio" && <Inicio go={go} />}
        {page === "guia" && <Guia go={go} />}
        {page === "faqs" && <Faq go={go} />}
        {page === "chatbot" && <Chatbot go={go} />}
      </main>
      <Footer go={go} />
      {page !== "chatbot" && (
        <Suspense fallback={null}>
          <FloatingChat go={go} />
        </Suspense>
      )}
    </>
  );
}
