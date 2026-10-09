"use client";

import Icon from "@/app/components/Icon";
import { useClient, type Client } from "@/app/providers/Clients";
import { useVagancie } from "@/app/providers/Vagancie";
import { useEffect, useState } from "react";

type FormData = {
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  vagaAssociada: string;
  modelo: string;
  placa: string;
};

const inputClass =
  "h-11 w-full rounded-[10px] border border-[#dce3de] bg-[#fafbfa] px-3 text-xs font-semibold text-[#25332b] outline-none focus:border-[#5d907a]";
const labelClass = "mb-1.5 block text-[10px] font-bold text-[#59635d]";

export default function ModalEditClient({
  client,
  onClose,
}: {
  client: Client;
  onClose: () => void;
}) {
  const { updateClient } = useClient();
  const { ArrayVacancies, setNewData } = useVagancie();

  // Já começa preenchido com os dados atuais do cliente
  const [data, setData] = useState<FormData>({
    name: client.name,
    email: client.email,
    cpf: client.cpf,
    telefone: client.telefone,
    vagaAssociada: client.vagaAssociada,
    modelo: client.carro.modelo,
    placa: client.carro.placa,
  });

  // Fecha com ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function change<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((atual) => ({ ...atual, [key]: value }));
  }

  function handleSave() {
    const updatedClient: Client = {
      ...client,
      name: data.name.trim(),
      email: data.email.trim(),
      cpf: data.cpf.trim(),
      telefone: data.telefone.trim(),
      vagaAssociada: data.vagaAssociada.trim(),
      carro: {
        ...client.carro,
        modelo: data.modelo.trim(),
        placa: data.placa.trim().toUpperCase(),
      },
    };

    updateClient(client.id, updatedClient);

    // Mantém sincronizadas as vagas que guardam uma cópia deste cliente
    ArrayVacancies.forEach((v) => {
      if (v.client?.id === client.id) {
        setNewData(v.number, { client: updatedClient });
      }
    });

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#101a15]/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="edit-client-title"
        aria-modal="true"
        className="max-h-[95dvh] w-full overflow-y-auto rounded-t-[22px] border border-white/70 bg-white shadow-2xl shadow-emerald-950/25 sm:max-w-[520px] sm:rounded-[22px]"
        role="dialog"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e9eeea] bg-white px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e9f3ee] text-[#23654d]">
              <Icon name="users" className="size-5" />
            </span>
            <div>
              <h2
                className="text-lg font-bold tracking-[-0.03em] text-[#17211c]"
                id="edit-client-title"
              >
                Editar cliente
              </h2>
              <p className="mt-1 text-[10px] text-[#8a938d]">
                Atualize os dados do cliente e do veículo.
              </p>
            </div>
          </div>

          <button
            aria-label="Fechar modal"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#e1e6e2] bg-[#fafbfa] text-[#7c857f]"
            type="button"
            onClick={onClose}
          >
            <Icon name="close" className="size-4" />
          </button>
        </header>

        <form
          className="space-y-5 px-5 py-5 sm:px-6 sm:py-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <label className={labelClass} htmlFor="edit-client-name">
              Nome completo
            </label>
            <input
              id="edit-client-name"
              className={inputClass}
              value={data.name}
              onChange={(e) => change("name", e.target.value)}
              required
              autoFocus
              type="text"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="edit-client-email">
              E-mail
            </label>
            <input
              id="edit-client-email"
              className={inputClass}
              value={data.email}
              onChange={(e) => change("email", e.target.value)}
              required
              type="email"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="edit-client-cpf">
                CPF
              </label>
              <input
                id="edit-client-cpf"
                className={inputClass}
                value={data.cpf}
                onChange={(e) => change("cpf", e.target.value)}
                inputMode="numeric"
                type="text"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="edit-client-phone">
                Telefone
              </label>
              <input
                id="edit-client-phone"
                className={inputClass}
                value={data.telefone}
                onChange={(e) => change("telefone", e.target.value)}
                inputMode="tel"
                type="tel"
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="edit-client-vacancy">
              Garagem de origem
            </label>
            <input
              id="edit-client-vacancy"
              className={inputClass}
              value={data.vagaAssociada}
              onChange={(e) => change("vagaAssociada", e.target.value)}
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="edit-client-model">
                Modelo do carro
              </label>
              <input
                id="edit-client-model"
                className={inputClass}
                value={data.modelo}
                onChange={(e) => change("modelo", e.target.value)}
                type="text"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="edit-client-plate">
                Placa
              </label>
              <input
                id="edit-client-plate"
                className={`${inputClass} font-mono uppercase tracking-wider`}
                value={data.placa}
                onChange={(e) => change("placa", e.target.value)}
                maxLength={8}
                type="text"
              />
            </div>
          </div>

          <footer className="-mx-5 flex gap-2.5 border-t border-[#e9eeea] bg-[#fafbfa] px-5 py-4 sm:-mx-6 sm:justify-end sm:px-6">
            <button
              className="h-10 flex-1 rounded-[9px] border border-[#dce3de] bg-white px-5 text-[10px] font-bold text-[#6f7973] sm:flex-none"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="h-10 flex-[1.25] rounded-[9px] bg-[#1d654b] px-5 text-[10px] font-bold text-white shadow-md shadow-emerald-900/15 sm:flex-none"
              type="submit"
            >
              Salvar alterações
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}