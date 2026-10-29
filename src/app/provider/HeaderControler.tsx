"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ControlerContextType = {
  name: string;
  setName: (name: string) => void;
  ShowValue: () => string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
};

const ControlerContext = createContext<ControlerContextType | null>(null);

export function ControlerProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Ao trocar de tela, fecha o menu mobile automaticamente
  const setName = (novo: string) => {
    setNameState(novo);
    setMenuOpen(false);
  };

  const ShowValue = () => name;
  const toggleMenu = () => setMenuOpen((atual) => !atual);

  return (
    <ControlerContext.Provider
      value={{ name, setName, ShowValue, menuOpen, setMenuOpen, toggleMenu }}
    >
      {children}
    </ControlerContext.Provider>
  );
}

export function useControler() {
  const ctx = useContext(ControlerContext);
  if (!ctx) throw new Error("useControler precisa estar dentro do ControlerProvider");
  return ctx;
}