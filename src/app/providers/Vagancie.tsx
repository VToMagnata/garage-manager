// app/providers/GaragemProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Client } from "./Clients";

export type Vagancie = {
  number: string;
  busy: boolean;
  ferias: {
    exit: string;
    returnDate: string;
    is: boolean;
  };
  client?: Client;
  pago: boolean;
  value: number;
};

type VagancieContextType = {
  ArrayVacancies: Vagancie[];
  total: number;
  occupied: number;
  setClient: (number: string, client: Client) => void;
  setNewVagancie: (valor: Vagancie) => void;
  setDeleteVagancie: (number: string) => void;
  setNewData: (number: string, changes: Partial<Vagancie>) => void;
};

const VagancieContext = createContext<VagancieContextType | null>(null);

export function VagancieProvider({ children }: { children: ReactNode }) {
  const [ArrayVacancies, setArrayVacancies] = useState<Vagancie[]>([]);

  const setNewVagancie = (valor: Vagancie) => {
    setArrayVacancies((atual) => [...atual, valor]);
  };

const setNewData = (number: string, changes: Partial<Vagancie>) => {
  setArrayVacancies((atual) =>
    atual.map((v) => (v.number === number ? { ...v, ...changes } : v))
  );
};

  const setClient = (number: string, client: Client) => {
    setArrayVacancies((atual) => 
      atual.map((v) => v.number === number ? { ...v, client, busy: true } : v)
    );
  };

  const setDeleteVagancie = (number: string) => {
    setArrayVacancies((atual) => atual.filter((v) => v.number !== number));
  };

  const total = ArrayVacancies.length;
  const occupied = ArrayVacancies.filter((v) => v.busy).length;

  return (
    <VagancieContext.Provider
      value={{ ArrayVacancies, setNewVagancie, setDeleteVagancie, total, occupied, setClient, setNewData }}
    >
      {children}
    </VagancieContext.Provider>
  );
}

export function useVagancie() {
  const ctx = useContext(VagancieContext);
  if (!ctx) throw new Error("useVagancie precisa estar dentro do VagancieProvider");
  return ctx;
}