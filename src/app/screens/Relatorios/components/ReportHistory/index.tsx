import Icon from "@/app/components/Icon";

const reports = [
  { title: "Ocupação mensal — Setembro", type: "Ocupação de vagas", period: "01 set. – 30 set. 2024", format: "PDF", size: "2,4 MB", date: "Hoje, 10:42", tone: "bg-emerald-50 text-emerald-700" },
  { title: "Fechamento financeiro — Agosto", type: "Receitas e despesas", period: "01 ago. – 31 ago. 2024", format: "XLSX", size: "1,8 MB", date: "02 set. 2024", tone: "bg-sky-50 text-sky-700" },
  { title: "Movimentação semanal", type: "Entrada e saída de veículos", period: "19 ago. – 25 ago. 2024", format: "PDF", size: "980 KB", date: "26 ago. 2024", tone: "bg-amber-50 text-amber-700" },
  { title: "Clientes ativos e inadimplência", type: "Clientes e mensalistas", period: "Agosto de 2024", format: "XLSX", size: "740 KB", date: "20 ago. 2024", tone: "bg-violet-50 text-violet-700" },
  { title: "Relatório operacional completo", type: "Relatório completo", period: "Julho de 2024", format: "PDF", size: "4,1 MB", date: "02 ago. 2024", tone: "bg-rose-50 text-rose-700" },
];

export default function ReportHistory() {
  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e5e0] bg-white shadow-sm shadow-emerald-950/5">
      <div className="flex flex-col gap-4 border-b border-[#edf0ed] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold">Relatórios gerados</h2>
          <p className="mt-1 text-[10px] text-[#959c97]">
            Histórico de arquivos e exportações
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-[#e2e6e2] bg-[#fafbfa] px-3 sm:w-52">
            <Icon name="search" className="size-3.5 text-[#9ba29d]" />
            <input className="min-w-0 flex-1 bg-transparent text-[10px] outline-none placeholder:text-[#a5aba7]" type="search" placeholder="Buscar relatório..." />
          </label>
          <button className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#e2e6e2] bg-white text-[#79827c]" type="button" aria-label="Filtrar relatórios">
            <Icon name="filter" className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-[#eff1ef] px-5">
        {reports.map((report) => (
          <article className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center" key={report.title}>
            <span className={`grid size-10 shrink-0 place-items-center rounded-[10px] ${report.tone}`}>
              <Icon name="file" className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-[11px]">{report.title}</strong>
                <span className="rounded bg-[#f1f3f1] px-1.5 py-0.5 text-[8px] font-bold text-[#77807a]">
                  {report.format}
                </span>
              </div>
              <p className="mt-1 text-[9px] text-[#929a95]">
                {report.type} · {report.period}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="text-right">
                <span className="block text-[9px] font-semibold text-[#68716c]">{report.size}</span>
                <time className="mt-0.5 block text-[8px] text-[#a0a6a2]">{report.date}</time>
              </div>
              <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe5e1] bg-white px-2.5 text-[9px] font-bold text-[#28664f] shadow-sm" type="button">
                <Icon name="download" className="size-3" />
                Baixar
              </button>
              <button className="grid size-8 place-items-center rounded-lg text-[#929993]" type="button" aria-label={`Mais opções para ${report.title}`}>
                <Icon name="more" className="size-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#edf0ed] px-5 py-3.5 text-[9px] text-[#969d98]">
        <span>Mostrando 5 de 26 relatórios</span>
        <button className="font-bold text-[#2b684f]" type="button">Ver todos</button>
      </div>
    </section>
  );
}
