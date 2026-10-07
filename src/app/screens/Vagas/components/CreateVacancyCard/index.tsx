import Icon from "@/app/components/Icon";

export default function CreateVacancyCard() {
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
            id="vacancy-code"
            type="text"
            placeholder="Ex.: A-15"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="sector">
              Setor
            </label>
            <select className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs text-[#78807b] outline-none" id="sector">
              <option>Setor A</option>
              <option>Setor B</option>
              <option>Setor C</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="type">
              Tipo
            </label>
            <select className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs text-[#78807b] outline-none" id="type">
              <option>Coberta</option>
              <option>Descoberta</option>
              <option>PCD</option>
              <option>Moto</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="price">
            Valor mensal
          </label>
          <div className="flex h-10 items-center rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 focus-within:border-[#5d907a]">
            <span className="mr-2 text-[10px] font-bold text-[#87908a]">R$</span>
            <input className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a9afab]" id="price" type="text" placeholder="0,00" />
          </div>
        </div>

        <div>
          <span className="mb-2 block text-[10px] font-bold text-[#59635d]">Status inicial</span>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 rounded-[9px] border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-[10px] font-semibold text-emerald-700">
              <input defaultChecked name="status" type="radio" className="accent-emerald-700" />
              Disponível
            </label>
            <label className="flex items-center gap-2 rounded-[9px] border border-[#e2e6e2] px-3 py-2.5 text-[10px] font-semibold text-[#78807b]">
              <input name="status" type="radio" className="accent-emerald-700" />
              Inativa
            </label>
          </div>
        </div>

        <label className="flex gap-2.5 rounded-[10px] bg-[#f5f7f5] p-3">
          <input type="checkbox" className="mt-0.5 size-3.5 accent-emerald-700" />
          <span>
            <strong className="block text-[10px]">Possui ponto de recarga</strong>
            <small className="mt-0.5 block text-[9px] leading-relaxed text-[#969d98]">
              Marque para vagas destinadas a veículos elétricos.
            </small>
          </span>
        </label>

        <div className="flex gap-2 pt-1">
          <button className="h-10 flex-1 rounded-[9px] border border-[#dfe4e0] bg-white text-[10px] font-bold text-[#747d77]" type="button">
            Cancelar
          </button>
          <button className="h-10 flex-[1.4] rounded-[9px] bg-[#1d654b] text-[10px] font-bold text-white shadow-md shadow-emerald-900/10" type="button">
            Criar vaga
          </button>
        </div>
      </form>
    </aside>
  );
}
