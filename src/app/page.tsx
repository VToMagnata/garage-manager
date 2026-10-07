"use client";

import type { ReactNode } from "react";
import HomePage from "./screens/Home";
import VagasPage from "./screens/Vagas";
import ClientsPage from "./screens/Clients";
import { useControler } from "./providers/HeaderControler";

const screens: Record<string, ReactNode> = {
  Home: <HomePage />,
  Vagas: <VagasPage />,
  Clientes: <ClientsPage />,
};

export default function Home() {
  const { ShowValue } = useControler();

  const current = ShowValue();

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-[#17211c]">
      {screens[current] ?? <HomePage />}
    </div>
  );
}