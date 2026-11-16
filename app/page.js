import { Suspense } from "react";
import Confetti from "./components/Confetti";

const TABNEWS_URL = "https://www.tabnews.com.br";

async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?per_page=1&strategy=new`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) return null;
    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

async function TotalContents() {
  const totalContents = await getTotalContents();

  return (
    <p>
      {totalContents !== null
        ? `${totalContents.toLocaleString("pt-BR")} conteúdos publicados no TabNews`
        : "Não foi possível carregar o total de conteúdos publicados no TabNews"}
    </p>
  );
}

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Confetti />
      <h1>🚧 Em construção 🚧</h1>
      <p style={{ maxWidth: "40rem", fontSize: "1.25rem" }}>
        Estamos neste momento reconstruindo o TabNews, um lugar para quem
        trabalha com tech consumir e compartilhar conteúdos
      </p>
      <Suspense fallback={<p>Carregando total de conteúdos publicados…</p>}>
        <TotalContents />
      </Suspense>
      <a href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Acesse o site oficial do TabNews
      </a>
    </main>
  );
}
