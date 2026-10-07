// app/providers/Controler.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ControlerContextType = {
  name: string;
  setName: (name: string) => void;
  ShowValue: () => string;
};

const ControlerContext = createContext<ControlerContextType | null>(null);

export function ControlerProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("Home");

  const ShowValue = () => {
    return name;
  };
  

  return (
    <ControlerContext.Provider value={{ name, setName, ShowValue }}>
      {children}
    </ControlerContext.Provider>
  );
}

export function useControler() {
  const ctx = useContext(ControlerContext);
  if (!ctx) throw new Error("useControler precisa estar dentro do ControlerProvider");
  return ctx;
}