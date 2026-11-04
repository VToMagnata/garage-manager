"use client";

import type { ReactNode } from "react";
import HomePage from "./screens/Home";
import VagasPage from "./screens/Vagas";
import RelatoriosPage from "./screens/Relatorios";
import ClientsPage from "./screens/Clients";
import { useControler } from "./provider/HeaderControler";
import type {Vagancie, Client} from "./store/ADM";
import { useADM_PROPS } from "./store/ADM";
import { useEffect } from "react";

const screens: Record<string, ReactNode> = {
  Home: <HomePage />,
  Vagas: <VagasPage />,
  Clientes: <ClientsPage />,
  Relatorios: <RelatoriosPage />,
};

type HomeClientProps = {
  vagas: Vagancie[];
  clientes: Client[];
};


export default function HomeClient({vagas, clientes}: HomeClientProps) {


  useEffect(() => {
  useADM_PROPS.setState({
    ArrayVagacie: vagas,
    ArrayClients: clientes,
    total: vagas.length,
    occupied: vagas.filter((v) => v.busy).length,
  });
}, [vagas, clientes]);

  const { ShowValue } = useControler();

  const current = ShowValue();

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-[#17211c]">
      {screens[current] ?? <HomePage />}
    </div>
  );
}