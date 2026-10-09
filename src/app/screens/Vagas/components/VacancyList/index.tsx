"use client"

import Icon from "@/app/components/Icon";
import { useVagancie } from "@/app/providers/Vagancie";
import ModalEdit from "../ModalEdit";
import { useState } from "react";


export default function VacancyList() {
  const { ArrayVacancies, setDeleteVagancie } = useVagancie();

  const [openModal, setOpenModal] = useState(false);
  const [numero, setNumero] = useState("");

  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e5e0] bg-white shadow-sm shadow-emerald-950/5">
      <div className="flex flex-col gap-4 border-b border-[#edf0ed] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold">Vagas existentes</h2>
          <p className="mt-1 text-[10px] text-[#959c97]">
            {ArrayVacancies.length} vagas cadastradas no estacionamento
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-[#e2e6e2] bg-[#fafbfa] px-3 sm:w-52">
            <Icon name="search" className="size-3.5 text-[#9ba29d]" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[10px] outline-none placeholder:text-[#a5aba7]"
              type="search"
              placeholder="Buscar vaga..."
            />
          </label>
          <button
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#e2e6e2] bg-white text-[#79827c]"
            type="button"
            aria-label="Filtrar vagas"
          >
            <Icon name="filter" className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="bg-[#fafbf9] text-[9px] font-bold uppercase tracking-[0.08em] text-[#969d98]">
              <th className="px-5 py-3">Vaga</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Mensalidade</th>
              <th className="px-5 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ArrayVacancies.map((v) => (
              <tr
                className="border-t border-[#eff1ef] text-[11px] transition-colors hover:bg-[#fafcfb]"
                key={v.number}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-lg bg-[#edf4f0] font-bold text-[#2b654e]">
                      P
                    </span>
                    <strong>{v.number}</strong>
                  </div>
                </td>
                <td className="px-4 py-3.5">
<span
  className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ring-1 ${
    v.ferias.is
      ? "bg-amber-50 text-amber-700 ring-amber-100"
      : v.busy
        ? "bg-rose-50 text-rose-600 ring-rose-100"
        : "bg-emerald-50 text-emerald-700 ring-emerald-100"
  }`}
>
  {v.ferias.is ? "Em férias" : v.busy ? "Ocupada" : "Disponível"}
</span>
                </td>
                <td className="px-4 py-3.5 font-semibold">R$ {v.value}</td>
                <td className="px-5 py-3.5">
<div className="flex justify-end gap-2">
  <button
    className="flex cursor-pointer h-8 items-center gap-1.5 rounded-lg border border-[#dfe5e1] bg-white px-3 text-[10px] font-bold text-[#28664f] shadow-sm"
    type="button"
    onClick={() => {
      setNumero(v.number);
      setOpenModal(true);
    }}
  >
    <Icon name="edit" className="size-3 " />
    Editar
  </button>
  <button
    className="grid size-8 place-items-center rounded-lg border border-rose-100 bg-rose-50 text-rose-600 cursor-pointer"
    type="button"
    aria-label={`Apagar vaga ${v.number}`}
    onClick={() => setDeleteVagancie(v.number)}
  >
    <Icon name="trash" className="size-3.5" />
  </button>
</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#edf0ed] px-5 py-3.5 text-[9px] text-[#969d98]">
        <span>Mostrando 6 de 48 vagas</span>
        <div className="flex gap-1">
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#a0a6a2]" type="button">‹</button>
          <button className="grid size-7 place-items-center rounded-md bg-[#1d654b] font-bold text-white" type="button">1</button>
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#68716c]" type="button">2</button>
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#68716c]" type="button">3</button>
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#68716c]" type="button">›</button>
        </div>
      </div>

      {openModal && (
        <ModalEdit number={numero} onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
}