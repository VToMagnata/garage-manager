"use client";

import Icon from "@/app/components/Icon";
import { useState } from "react";
import type { Client } from "@/app/store/ADM";
import { useADM_PROPS } from "@/app/store/ADM";
import { createNewClient as createClientDb } from "@/lib/actions/Fun-PRIS"; 

const vazio: Client = {
  id: "",
  name: "",
  email: "",
  cpf: "",
  telefone: "",
  vagaAssociada: "",
  carro: { modelo: "", placa: "" },
};

const inputClass =
  "h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab] focus:border-[#5d907a]";
const labelClass = "mb-1.5 block text-[10px] font-bold text-[#59635d]";

export default function CreateCustomerCard() {
  const createNewClient = useADM_PROPS((s) => s.createNewClient);

  const [data, setData] = useState<Client>(vazio);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSave() {
    if (
      !data.name.trim() ||
      !data.email.trim() ||
      !data.cpf.trim() ||
      !data.carro.placa.trim()
    ) {
      setErro("Preencha nome, e-mail, CPF e placa.");
      return;
    }

    setErro("");
    setSalvando(true);

    // 1. manda pro banco
    const res = await createClientDb({
      name: data.name.trim(),
      email: data.email.trim(),
      cpf: data.cpf.trim(),
      telefone: data.telefone.trim(),
      carro: {
        modelo: data.carro.modelo.trim(),
        placa: data.carro.placa.trim().toUpperCase(),
      },
    });

    setSalvando(false);

    if (!res.ok) {
      setErro(res.erro);
      return;
    }

    // 2. coloca no store com o id que o banco gerou
    createNewClient({
      ...data,
      id: res.id,
      name: data.name.trim(),
      email: data.email.trim(),
      cpf: data.cpf.trim(),
      telefone: data.telefone.trim(),
      carro: {
        modelo: data.carro.modelo.trim(),
        placa: data.carro.placa.trim().toUpperCase(),
      },
    });

    // 3. limpa o formulário
    setData(vazio);
  }

  return (
    <aside className="h-fit overflow-hidden rounded-[17px] border border-[#dce5df] bg-white shadow-sm shadow-emerald-950/5 xl:sticky xl:top-5">
      <div className="bg-gradient-to-br from-[#226c51] to-[#18533d] px-5 py-6 text-white">
        <span className="mb-4 grid size-10 place-items-center rounded-xl bg-white/15">
          <Icon name="users" className="size-5" />
        </span>
        <h2 className="text-lg font-bold tracking-[-0.03em]">Adicionar cliente</h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-white/65">
          Cadastre os dados pessoais, o veículo e a garagem de origem.
        </p>
      </div>

      <form className="space-y-4 p-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className={labelClass} htmlFor="customer-name">
            Nome completo
          </label>
          <input
            id="customer-name"
            className={inputClass}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            type="text"
            placeholder="Nome do cliente"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="customer-email">
            E-mail
          </label>
          <input
            id="customer-email"
            className={inputClass}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            placeholder="cliente@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="customer-phone">
              Telefone
            </label>
            <input
              id="customer-phone"
              className={inputClass}
              value={data.telefone}
              onChange={(e) => setData({ ...data, telefone: e.target.value })}
              type="tel"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="customer-document">
              CPF
            </label>
            <input
              id="customer-document"
              className={inputClass}
              value={data.cpf}
              onChange={(e) => setData({ ...data, cpf: e.target.value })}
              type="text"
              placeholder="000.000.000-00"
            />
          </div>
        </div>

        <div className="border-t border-[#edf0ed] pt-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-sky-50 text-sky-700">
              <Icon name="car" className="size-3.5" />
            </span>
            <strong className="text-[11px]">Dados do veículo</strong>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="car-model">
                Carro
              </label>
              <input
                id="car-model"
                className={inputClass}
                value={data.carro.modelo}
                onChange={(e) =>
                  setData({ ...data, carro: { ...data.carro, modelo: e.target.value } })
                }
                type="text"
                placeholder="Modelo"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="car-plate">
                Placa
              </label>
              <input
                id="car-plate"
                className={`${inputClass} uppercase`}
                value={data.carro.placa}
                onChange={(e) =>
                  setData({ ...data, carro: { ...data.carro, placa: e.target.value } })
                }
                type="text"
                placeholder="ABC-1D23"
              />
            </div>
          </div>
        </div>

        {erro && <p className="text-[11px] font-semibold text-rose-600">{erro}</p>}

        <div className="flex gap-2 pt-1">
          <button
            className="h-10 flex-1 rounded-[9px] border border-[#dfe4e0] bg-white text-[10px] font-bold text-[#747d77]"
            type="button"
            onClick={() => {
              setData(vazio);
              setErro("");
            }}
          >
            Cancelar
          </button>
          <button
            className="h-10 flex-[1.4] rounded-[9px] bg-[#1d654b] text-[10px] font-bold text-white shadow-md shadow-emerald-900/10 disabled:opacity-60"
            type="button"
            onClick={handleSave}
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar cliente"}
          </button>
        </div>
      </form>
    </aside>
  );
}