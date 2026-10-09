import Icon from "@/app/components/Icon";
import { useVagancie, Vagancie } from "@/app/providers/Vagancie";
import { useState } from "react";
import { useClient } from "@/app/providers/Clients";
import type { Client } from "@/app/providers/Clients";

export default function CreateVacancyCard() {

  const { ArrayClients } = useClient();
  const { setNewVagancie } = useVagancie();

  const [data, setData] = useState<Vagancie>({
    number: "",
    client: undefined,
    busy: false,
    ferias: {
      is: false,
      exit: "",
      returnDate: ""
    },
    pago: false,
    value: 0,
  });


  return (
    <aside className="h-fit overflow-hidden rounded-[17px] border border-[#dce5df] bg-white shadow-sm shadow-emerald-950/5 xl:sticky xl:top-5">
      <div className="bg-gradient-to-br from-[#226c51] to-[#18533d] px-5 py-6 text-white">
        <span className="mb-4 grid size-10 place-items-center rounded-xl bg-white/15">
          <Icon name="plus" className="size-5" />
        </span>
        <h2 className="text-lg font-bold tracking-[-0.03em]">Criar nova vaga</h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-white/65">
          Preencha os dados para adicionar uma nova vaga ao estacionamento.
        </p>
      </div>

      <form className="space-y-4 p-5">
        <div>
          <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="vacancy-code">
            Identificação da vaga
          </label>
          <input
            className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab] focus:border-[#5d907a]"
            onChange={(e) => setData({ ...data, number: e.target.value })}
            type="text"
            placeholder="Ex.: A-15"
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="w-full">
            <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="sector">
              Cliente
            </label>
<select
  value={data.client?.id ?? ""}
  onChange={(e) => {
    const client = ArrayClients.find((c) => c.id === e.target.value);
    setData({ ...data, client, busy: !!client });
  }}
  className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs text-[#78807b] outline-none"
>
  <option value="">Selecione um cliente</option>
  {ArrayClients.map((client) => (
    <option key={client.id} value={client.id}>
      {client.name}
    </option>
  ))}
</select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="price">
            Valor mensal
          </label>
          <div className="flex h-10 items-center rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 focus-within:border-[#5d907a]">
            <span className="mr-2 text-[10px] font-bold text-[#87908a]">R$</span>
            <input className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a9afab]" onChange={(e) => setData({ ...data, value: parseFloat(e.target.value) || 0 })} type="text" placeholder="0,00" />
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button className="h-10 flex-1 rounded-[9px] border border-[#dfe4e0] bg-white text-[10px] font-bold text-[#747d77]" type="button">
            Cancelar
          </button>
          <button onClick={() => setNewVagancie(data)} className="h-10 flex-[1.4] rounded-[9px] bg-[#1d654b] text-[10px] font-bold text-white shadow-md shadow-emerald-900/10" type="button">
            Criar vaga
          </button>
        </div>
      </form>
    </aside>
  );
}
