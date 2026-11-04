import { create } from "zustand";
import * as db from "@/lib/actions/Fun-PRIS";

// Tipagem dos objetos \\

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
  };
};

export type Vagancie = {
  number: string;
  busy: boolean;
  feriasIs: boolean;
  feriasExit: string;
  feriasReturn: string;
  client?: Client;
  pago: boolean;
  value: number;
};

// -------------------------------------------------------------------------- \\

type Result = { ok: true } | { ok: false; erro: string };

type ADM_propsStore = {
  ArrayVagacie: Vagancie[];
  ArrayClients: Client[];
  total: number;
  occupied: number;
  hydrate: (vagas: Vagancie[], clients: Client[]) => void;
  setClient: (number: string, client: Client) => Promise<Result>;
  setNewVagancie: (valor: Vagancie) => Promise<Result>;
  setDeleteVagancie: (number: string) => Promise<Result>;
  setNewData: (number: string, changes: Partial<Vagancie>) => Promise<Result>;

  createNewClient: (valor: Client) => Promise<Result>;
  deleteClient: (id: string) => Promise<Result>;
  updateClient: (id: string, valor: Client) => Promise<Result>;
};

// recalcula total e ocupadas sempre que o array de vagas muda
const stats = (vagas: Vagancie[]) => ({
  total: vagas.length,
  occupied: vagas.filter((v) => v.busy).length,
});

const ok: Result = { ok: true };
const falhou = (erro: string): Result => ({ ok: false, erro });

export const useADM_PROPS = create<ADM_propsStore>((set) => ({
  ArrayVagacie: [],
  ArrayClients: [],
  total: 0,
  occupied: 0,
  hydrate: (vagas, clients) =>
    set({ ArrayVagacie: vagas, ArrayClients: clients, ...stats(vagas) }),

  // vincula um cliente a uma vaga
  setClient: async (number, client) => {
    try {
      await db.setClient(number, client.id);
    } catch {
      return falhou("Não foi possível vincular o cliente à vaga.");
    }

    set((state) => {
      const vagas = state.ArrayVagacie.map((v) =>
        v.number === number
          ? { ...v, busy: true, client: { ...client, vagaAssociada: number } }
          : v
      );
      const clients = state.ArrayClients.map((c) =>
        c.id === client.id ? { ...c, vagaAssociada: number } : c
      );
      return { ArrayVagacie: vagas, ArrayClients: clients, ...stats(vagas) };
    });
    return ok;
  },

  setNewVagancie: async (valor) => {
    let criada: Vagancie | null;
    try {
      criada = await db.setNewVagancie(valor);
    } catch {
      return falhou("Não foi possível criar a vaga.");
    }
    if (!criada) return falhou("Já existe uma vaga com esse número.");

    const nova = criada;
    set((state) => {
      const vagas = [...state.ArrayVagacie, nova];
      return { ArrayVagacie: vagas, ...stats(vagas) };
    });
    return ok;
  },

  setDeleteVagancie: async (number) => {
    try {
      await db.setDeleteVagancie(number);
    } catch {
      return falhou("Não foi possível apagar a vaga.");
    }

    set((state) => {
      const vagas = state.ArrayVagacie.filter((v) => v.number !== number);
      // limpa a vaga associada nos clientes que estavam nela
      const clients = state.ArrayClients.map((c) =>
        c.vagaAssociada === number ? { ...c, vagaAssociada: "" } : c
      );
      return { ArrayVagacie: vagas, ArrayClients: clients, ...stats(vagas) };
    });
    return ok;
  },

  setNewData: async (number, changes) => {
    try {
      await db.setNewData(number, changes);
    } catch {
      return falhou("Não foi possível atualizar a vaga.");
    }

    set((state) => {
      const vagas = state.ArrayVagacie.map((v) =>
        v.number === number ? { ...v, ...changes } : v
      );
      return { ArrayVagacie: vagas, ...stats(vagas) };
    });
    return ok;
  },

  createNewClient: async (valor) => {
    const res = await db.createNewClient(valor);
    if (!res.ok) return falhou(res.erro);

    // o id verdadeiro vem do banco
    const novo: Client = { ...valor, id: res.id, vagaAssociada: "" };
    set((state) => ({ ArrayClients: [...state.ArrayClients, novo] }));
    return ok;
  },

  deleteClient: async (id) => {
    try {
      await db.deleteClient(id);
    } catch {
      return falhou("Não foi possível apagar o cliente.");
    }

    set((state) => {
      const vagas = state.ArrayVagacie.map((v) =>
        v.client?.id === id ? { ...v, busy: false, client: undefined } : v
      );
      return {
        ArrayClients: state.ArrayClients.filter((c) => c.id !== id),
        ArrayVagacie: vagas,
        ...stats(vagas),
      };
    });
    return ok;
  },

  updateClient: async (id, valor) => {
    try {
      await db.updateClient(id, valor);
    } catch {
      return falhou("Não foi possível atualizar o cliente.");
    }

    set((state) => ({
      ArrayClients: state.ArrayClients.map((c) => (c.id === id ? valor : c)),
      // mantém o cliente "espelhado" dentro da vaga também
      ArrayVagacie: state.ArrayVagacie.map((v) =>
        v.client?.id === id ? { ...v, client: valor } : v
      ),
    }));
    return ok;
  },
}));