"use client";

import Icon from "../Icon";
import { useControler } from "../../providers/HeaderControler";

export default function DashboardHeader() {
  const { toggleMenu } = useControler();

  return (
    <header className="flex h-[72px] items-center justify-between gap-3 border-b border-[#e0e5e0] bg-white/85 px-4 backdrop-blur-xl sm:px-6 lg:px-[34px]">
      <button
        className="grid size-10 place-items-center rounded-[10px] border border-[#e0e4e0] bg-white lg:hidden"
        type="button"
        aria-label="Abrir menu"
        onClick={toggleMenu}
      >
        <Icon name="menu" className="size-[18px]" />
      </button>

      <label className="hidden h-10 w-full max-w-[365px] items-center gap-2 rounded-[10px] border border-[#e0e4e0] bg-white px-3 sm:flex">
        <Icon name="search" className="size-[17px] text-[#919a94]" />
        <input
          className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#9da49f]"
          type="search"
          placeholder="Buscar veículo ou placa..."
        />
        <kbd className="rounded border border-[#e1e4e1] bg-[#f6f7f6] px-1.5 py-0.5 text-[9px] text-[#929993]">
          ⌘ S
        </kbd>
      </label>

      <div className="ml-auto flex items-center gap-3">
        <button
          className="relative grid size-10 place-items-center rounded-[10px] border border-[#e0e4e0] bg-white"
          type="button"
          aria-label="Notificações"
        >
          <Icon name="bell" className="size-[17px]" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#d56a57] ring-2 ring-white" />
        </button>
        <button
          className="flex h-10 items-center gap-2 rounded-[10px] bg-[#1d654b] px-3.5 text-xs font-semibold text-white shadow-lg shadow-emerald-900/10"
          type="button"
        >
          <Icon name="settings" className="size-4" />
          <span className="hidden sm:inline">Opções</span>
        </button>
      </div>
    </header>
  );
}