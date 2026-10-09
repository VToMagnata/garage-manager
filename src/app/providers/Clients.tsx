// app/providers/GaragemProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Client = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    vagaAssociada: string;
    telefone: string;
    carro: {
        modelo: string;
        placa: string;
    }


};

type ClientContextType = {
  ArrayClients: Client[];
  createNewClient: (valor: Client) => void;
  deleteClient: (id: string) => void;
  updateClient: (id: string, valor: Client) => void;
};

const ClientContext = createContext<ClientContextType | null>(null);

export function ClientProvider({ children }: { children: ReactNode }) {

    const [ArrayClients, setArrayClients] = useState<Client[]>([]);

    const createNewClient = (valor: Client) => {
        setArrayClients((atual) => [...atual, valor]);
    }

    const deleteClient = (id: string) => {
        setArrayClients((atual) => atual.filter((c) => c.id !== id));
    }

      const updateClient = (id: string, valor: Client) => {
    setArrayClients((atual) =>
      atual.map((client) =>
        client.id === id ? valor : client
      )
    );
  };

  return (
    <ClientContext.Provider
      value={{ ArrayClients, createNewClient, deleteClient, updateClient }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error("useClient precisa estar dentro do ClientProvider");
  return ctx;
}