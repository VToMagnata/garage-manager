import { create } from 'zustand';




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
  ferias: {
    exit: string;
    returnDate: string;
    is: boolean;
  };
  client?: Client;
  pago: boolean;
  value: number;
};

// -------------------------------------------------------------------------- \\


type ADM_propsStore = {
  ArrayVagacie: Vagancie[];
  ArrayClients: Client[];
  total: number;
  occupied: number;

  setClient: (number: string, client: Client) => void;
  setNewVagancie: (valor: Vagancie) => void;
  setDeleteVagancie: (number: string) => void;
  setNewData: (number: string, changes: Partial<Vagancie>) => void;

  createNewClient: (valor: Client) => void;
  deleteClient: (id: string) => void;
  updateClient: (id: string, valor: Client) => void;
};

// recalcula total e ocupadas sempre que o array de vagas muda
const stats = (vagas: Vagancie[]) => ({
  total: vagas.length,
  occupied: vagas.filter((v) => v.busy).length,
});

export const useADM_PROPS = create<ADM_propsStore>((set) => ({
  ArrayVagacie: [],
  ArrayClients: [],
  total: 0,
  occupied: 0,

  // vincula um cliente a uma vaga
  setClient: (number, client) =>
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
    }),

  setNewVagancie: (valor) =>
    set((state) => {
      // evita número de vaga duplicado
      if (state.ArrayVagacie.some((v) => v.number === valor.number)) return state;
      const vagas = [...state.ArrayVagacie, valor];
      return { ArrayVagacie: vagas, ...stats(vagas) };
    }),

  setDeleteVagancie: (number) =>
    set((state) => {
      const vagas = state.ArrayVagacie.filter((v) => v.number !== number);
      // limpa a vaga associada nos clientes que estavam nela
      const clients = state.ArrayClients.map((c) =>
        c.vagaAssociada === number ? { ...c, vagaAssociada: "" } : c
      );
      return { ArrayVagacie: vagas, ArrayClients: clients, ...stats(vagas) };
    }),

  setNewData: (number, changes) =>
    set((state) => {
      const vagas = state.ArrayVagacie.map((v) =>
        v.number === number
          ? {
              ...v,
              ...changes,
              // mescla o objeto ferias em vez de substituir tudo
              ferias: { ...v.ferias, ...changes.ferias },
            }
          : v
      );
      return { ArrayVagacie: vagas, ...stats(vagas) };
    }),

  createNewClient: (valor) =>
    set((state) => ({ ArrayClients: [...state.ArrayClients, valor] })),

  deleteClient: (id) =>
    set((state) => {
      const vagas = state.ArrayVagacie.map((v) =>
        v.client?.id === id ? { ...v, busy: false, client: undefined } : v
      );
      return {
        ArrayClients: state.ArrayClients.filter((c) => c.id !== id),
        ArrayVagacie: vagas,
        ...stats(vagas),
      };
    }),

  updateClient: (id, valor) =>
    set((state) => ({
      ArrayClients: state.ArrayClients.map((c) => (c.id === id ? valor : c)),
      // mantém o cliente "espelhado" dentro da vaga também
      ArrayVagacie: state.ArrayVagacie.map((v) =>
        v.client?.id === id ? { ...v, client: valor } : v
      ),
    })),
}));