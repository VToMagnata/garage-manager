import Icon from "@/app/components/Icon";

export default function ReportBuilder() {
  return (
    <aside className="h-fit overflow-hidden rounded-[17px] border border-[#dce5df] bg-white shadow-sm shadow-emerald-950/5">
      <div className="bg-gradient-to-br from-[#263d34] to-[#172a22] px-5 py-6 text-white">
        <span className="mb-4 grid size-10 place-items-center rounded-xl bg-white/10">
          <Icon name="file" className="size-5" />
        </span>
        <h2 className="text-lg font-bold tracking-[-0.03em]">Criar relatório</h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">
          Selecione as informações e o período que deseja analisar.
        </p>
      </div>

      <form className="space-y-4 p-5">
        <div>
          <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="report-name">
            Nome do relatório
          </label>
          <input className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab]" id="report-name" type="text" placeholder="Ex.: Ocupação mensal" />
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="report-type">
            Tipo de relatório
          </label>
          <select className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs text-[#78807b] outline-none" id="report-type">
            <option>Ocupação de vagas</option>
            <option>Movimentação de veículos</option>
            <option>Clientes e mensalistas</option>
            <option>Receitas e despesas</option>
            <option>Relatório completo</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="start-date">Data inicial</label>
            <input className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-2.5 text-[10px] text-[#78807b] outline-none" id="start-date" type="date" />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold text-[#59635d]" htmlFor="end-date">Data final</label>
            <input className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-2.5 text-[10px] text-[#78807b] outline-none" id="end-date" type="date" />
          </div>
        </div>

        <div>
          <span className="mb-2 block text-[10px] font-bold text-[#59635d]">Incluir no relatório</span>
          <div className="space-y-2">
            {["Resumo geral", "Gráficos comparativos", "Lista detalhada", "Indicadores financeiros"].map((option, index) => (
              <label className="flex items-center gap-2.5 rounded-[9px] border border-[#e4e8e4] px-3 py-2.5 text-[10px] text-[#68716c]" key={option}>
                <input defaultChecked={index < 3} className="size-3.5 accent-emerald-700" type="checkbox" />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-[10px] font-bold text-[#59635d]">Formato do arquivo</span>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 rounded-[9px] border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-[10px] font-semibold text-emerald-700">
              <input defaultChecked name="format" type="radio" className="accent-emerald-700" />
              PDF
            </label>
            <label className="flex items-center gap-2 rounded-[9px] border border-[#e2e6e2] px-3 py-2.5 text-[10px] font-semibold text-[#78807b]">
              <input name="format" type="radio" className="accent-emerald-700" />
              Excel
            </label>
          </div>
        </div>

        <button className="flex h-11 w-full items-center justify-center gap-2 rounded-[9px] bg-[#1d654b] text-[10px] font-bold text-white shadow-md shadow-emerald-900/10" type="button">
          <Icon name="file" className="size-3.5" />
          Gerar relatório
        </button>
      </form>
    </aside>
  );
}
