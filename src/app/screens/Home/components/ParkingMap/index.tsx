"use client";

import Icon from "../../../../components/Icon";
import { useVagancie } from "@/app/providers/Vagancie";
import { useState } from "react";

type Filter = "all" | "free" | "busy" | "reserved";

const spotTones: Record<string, string> = {
  free: "border-emerald-200 bg-emerald-50 text-emerald-700",
  busy: "border-emerald-300 bg-emerald-100 text-emerald-800",
  reserved: "border-amber-200 bg-amber-50 text-amber-700",
};

const filters: { label: string; value: Filter }[] = [
  { label: "Todas", value: "all" },
  { label: "Livres", value: "free" },
  { label: "Ocupadas", value: "busy" },
  { label: "Férias", value: "reserved" },
];

export default function ParkingMap() {
  const [filter, setFilter] = useState<Filter>("all");
  const { ArrayVacancies } = useVagancie();

  const spots = ArrayVacancies.map((spot) => {
    const tone = spot.busy ? "busy" : spot.ferias.is ? "reserved" : "free";
    return {
      number: spot.number,
      tone,
      status: spot.busy ? "Ocupada" : spot.ferias.is ? "Férias" : "Livre",
      plate: spot.busy ? spot.client?.carro.placa ?? null : null,
    };
  }).filter((spot) => filter === "all" || spot.tone === filter);

  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e5e0] bg-white shadow-sm shadow-emerald-950/5">
      <div className="flex items-start justify-between px-[22px] pb-4 pt-5">
        <div>
          <h2 className="text-sm font-bold">Mapa de vagas</h2>
          <p className="mt-1 text-[10px] text-[#959c97]">
            Estacionamento principal
          </p>
        </div>
        <button className="text-[#929993]" type="button" aria-label="Opções">
          <Icon name="more" className="size-[18px]" />
        </button>
      </div>

      <div className="flex flex-col gap-3 border-b border-[#edf0ed] px-[22px] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-fit gap-1 rounded-[9px] bg-[#f3f5f3] p-1">
          {filters.map((f) => (
            <button
              className={`rounded-[7px] px-2.5 py-1.5 text-[10px] font-semibold cursor-pointer ${
                filter === f.value
                  ? "bg-white text-[#285e49] shadow-sm"
                  : "text-[#8a928d]"
              }`}
              type="button"
              key={f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-3 text-[9px] text-[#909792]">
          <span className="flex items-center gap-1">
            <i className="size-[7px] rounded-sm bg-emerald-100" />
            Livre
          </span>
          <span className="flex items-center gap-1">
            <i className="size-[7px] rounded-sm bg-emerald-700" />
            Ocupada
          </span>
          <span className="flex items-center gap-1">
            <i className="size-[7px] rounded-sm bg-amber-300" />
            Férias
          </span>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#fafbf9] px-[22px] py-6">
        {spots.length === 0 ? (
          <p className="py-6 text-center text-[11px] text-[#959c97]">
            Nenhuma vaga para mostrar.
          </p>
        ) : (
          <div className="grid min-w-[570px] grid-cols-6 gap-2">
            {spots.map((spot) => (
              <button
                className={`relative flex h-[91px] flex-col items-center justify-center rounded-[9px] border p-2 transition-transform hover:-translate-y-0.5 ${spotTones[spot.tone]}`}
                type="button"
                key={spot.number}
              >
                <span className="absolute left-2 top-1.5 text-[9px] font-bold opacity-65">
                  {spot.number}
                </span>
                {spot.plate ? (
                  <>
                    <Icon name="car" className="mt-2 size-6" />
                    <strong className="mt-1.5 text-[9px] tracking-wide">
                      {spot.plate}
                    </strong>
                  </>
                ) : (
                  <span className="mt-3 text-[9px] font-semibold">
                    {spot.status}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        <div className="relative mt-3 h-9 border-y border-dashed border-[#cfd5d0]">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fafbf9] px-2 text-[8px] text-[#abb2ad]">
            Fluxo de circulação
          </span>
        </div>
      </div>
    </section>
  );
}