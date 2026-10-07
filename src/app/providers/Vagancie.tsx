// app/providers/GaragemProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Vagancie = {
  number: string;
  busy: boolean;
  ferias: boolean;
};

type VagancieContextType = {
  ArrayVacancies: Vagancie[];
  total: number;
  occupied: number;
  setNewVagancie: (valor: Vagancie) => void;
  setDeleteVagancie: (number: string) => void;
};

const VagancieContext = createContext<VagancieContextType | null>(null);

export function VagancieProvider({ children }: { children: ReactNode }) {
  const [ArrayVacancies, setArrayVacancies] = useState<Vagancie[]>([]);

  const setNewVagancie = (valor: Vagancie) => {
    setArrayVacancies((atual) => [...atual, valor]);
  };

  const setDeleteVagancie = (number: string) => {
    setArrayVacancies((atual) => atual.filter((v) => v.number !== number));
  };

  const total = ArrayVacancies.length;
  const occupied = ArrayVacancies.filter((v) => v.busy).length;

  return (
    <VagancieContext.Provider
      value={{ ArrayVacancies, setNewVagancie, setDeleteVagancie, total, occupied }}
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