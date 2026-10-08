import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/Inicio.jsx";
import Guia from "./pages/Guia.jsx";
import Faq from "./pages/Faq.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("inicio");
  return (
    <>
      <Header page={page} go={setPage} />
      <main>
        {page === "inicio" && <Inicio go={setPage} />}
        {page === "guia" && <Guia go={setPage} />}
        {page === "faq" && <Faq go={setPage} />}
        {page === "chatbot" && <Chatbot go={setPage} />}
      </main>
      <Footer go={setPage} />
    </>
  );
}
