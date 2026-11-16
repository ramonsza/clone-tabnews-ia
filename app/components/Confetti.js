"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// react-confetti é puramente decorativo e só roda no navegador:
// carregá-lo sob demanda tira a lib do bundle inicial da página.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      recycle={false}
      numberOfPieces={400}
    />
  );
}
