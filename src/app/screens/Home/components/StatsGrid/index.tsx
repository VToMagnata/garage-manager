"use client";

import Icon, { type IconName } from "../../../../components/Icon"
import { useVagancie } from "@/app/providers/Vagancie";
import StatCard from "./SubComponents/StatCard";

type Stat = {
  icon: IconName;
  label: string;
  value: string;
  note: string;
  tone: string;
};


export default function StatsGrid() {
  const { total, occupied } = useVagancie();

  const percent = total > 0 ? (occupied / total) * 100 : 0;

  const freeSpots: Stat = {
    icon: "garageEmpty",
    label: "Vagas livres",
    value: String(total - occupied),
    note: "Disponíveis neste momento",
    tone: "bg-emerald-50 text-emerald-700",
  };

  const revenue: Stat = {
    icon: "chart",
    label: "Receita mês",
    value: "colocar ganacias",
    note: "Padrão ganhos: R$ 0,00",
    tone: "bg-violet-50 text-violet-700",
  };

  return (
    <section
      className="w-full mb-[18px] grid-center grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Resumo do estacionamento"
    >
      <article className="min-h-[165px] rounded-2xl border border-[#1d654b] bg-gradient-to-br from-[#226c51] to-[#18533d] p-[19px] text-white shadow-xl shadow-emerald-900/10">
        <div className="flex items-center justify-between">
          <span className="grid size-9 place-items-center rounded-[10px] bg-white/15">
            <Icon name="garageCar" className="size-[18px]" />
          </span>
          <span className="text-[10px] font-bold text-[#b9e0cc]"> {percent.toFixed(1)}%</span>
        </div>
        <p className="mb-1 mt-4 text-[11px] text-white/65">Vagas atribuída</p>
        <div className="flex items-baseline gap-1">
          <strong className="text-[29px] tracking-[-0.055em]">{occupied}</strong>
          <span className="text-xs text-white/55">/ {total}</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15">
          <span
            className="block h-full rounded-full bg-[#8bd0ad]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </article>

      <StatCard stat={freeSpots} />
      <StatCard stat={revenue} />
    </section>
  );
}