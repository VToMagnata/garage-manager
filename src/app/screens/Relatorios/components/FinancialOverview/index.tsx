import Icon from "@/app/components/Icon";

const transactions = [
  { label: "Mensalidades recebidas", date: "Hoje, 10:32", value: "+ R$ 3.460,00", positive: true },
  { label: "Manutenção do portão", date: "Hoje, 09:15", value: "- R$ 480,00", positive: false },
  { label: "Diárias avulsas", date: "Ontem, 18:40", value: "+ R$ 864,00", positive: true },
  { label: "Serviço de limpeza", date: "Ontem, 14:10", value: "- R$ 320,00", positive: false },
];

const chart = [
  { month: "Abr", income: "h-[46%]", expense: "h-[23%]" },
  { month: "Mai", income: "h-[58%]", expense: "h-[28%]" },
  { month: "Jun", income: "h-[52%]", expense: "h-[32%]" },
  { month: "Jul", income: "h-[67%]", expense: "h-[27%]" },
  { month: "Ago", income: "h-[76%]", expense: "h-[35%]" },
  { month: "Set", income: "h-[86%]", expense: "h-[31%]" },
];

export default function FinancialOverview() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold">Resumo financeiro</h2>
          <p className="mt-1 text-[10px] text-[#959c97]">
            Resultado consolidado de setembro
          </p>
        </div>
        <select className="h-9 rounded-lg border border-[#dfe4e0] bg-white px-3 text-[10px] font-semibold text-[#68716c] outline-none">
          <option>Setembro 2024</option>
          <option>Agosto 2024</option>
          <option>Julho 2024</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-[#1d654b] bg-gradient-to-br from-[#226c51] to-[#18533d] p-[19px] text-white shadow-xl shadow-emerald-900/10">
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-[10px] bg-white/15">
              <Icon name="wallet" className="size-[18px]" />
            </span>
            <span className="text-[9px] font-bold text-[#b9e0cc]">↗ 8,2%</span>
          </div>
          <p className="mb-1 mt-4 text-[10px] text-white/65">Saldo do mês</p>
          <strong className="text-[25px] tracking-[-0.055em]">R$ 28.640</strong>
          <small className="mt-1.5 block text-[9px] text-white/50">
            Após despesas operacionais
          </small>
        </article>

        {[
          { label: "Receitas", value: "R$ 41.820", note: "+ 6,4% no período", icon: "chart" as const, tone: "bg-emerald-50 text-emerald-700" },
          { label: "Despesas", value: "R$ 13.180", note: "31,5% das receitas", icon: "wallet" as const, tone: "bg-rose-50 text-rose-700" },
          { label: "A receber", value: "R$ 6.240", note: "18 mensalidades", icon: "calendar" as const, tone: "bg-amber-50 text-amber-700" },
        ].map((item) => (
          <article className="rounded-2xl border border-[#e1e6e1] bg-white p-[19px] shadow-sm shadow-emerald-950/5" key={item.label}>
            <span className={`grid size-9 place-items-center rounded-[10px] ${item.tone}`}>
              <Icon name={item.icon} className="size-[18px]" />
            </span>
            <p className="mb-1 mt-4 text-[10px] text-[#89918c]">{item.label}</p>
            <strong className="text-[23px] tracking-[-0.055em]">{item.value}</strong>
            <small className="mt-1.5 block text-[9px] text-[#a0a6a2]">{item.note}</small>
          </article>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1.35fr_.85fr]">
        <article className="rounded-[17px] border border-[#e0e5e0] bg-white p-5 shadow-sm shadow-emerald-950/5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xs font-bold">Receitas e despesas</h3>
              <p className="mt-1 text-[9px] text-[#969d98]">Últimos 6 meses</p>
            </div>
            <div className="flex gap-3 text-[9px] text-[#8e9691]">
              <span className="flex items-center gap-1.5"><i className="size-2 rounded-sm bg-[#2d7357]" />Receitas</span>
              <span className="flex items-center gap-1.5"><i className="size-2 rounded-sm bg-[#e5a397]" />Despesas</span>
            </div>
          </div>

          <div className="mt-6 flex h-40 items-end justify-around gap-3 border-b border-[#e8ebe8] px-2">
            {chart.map((item) => (
              <div className="flex h-full flex-1 flex-col items-center justify-end" key={item.month}>
                <div className="flex h-[125px] w-full max-w-12 items-end justify-center gap-1">
                  <span className={`w-[38%] rounded-t bg-[#2d7357] ${item.income}`} />
                  <span className={`w-[38%] rounded-t bg-[#e5a397] ${item.expense}`} />
                </div>
                <span className="mt-2 text-[8px] text-[#9ba29d]">{item.month}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[17px] border border-[#e0e5e0] bg-white p-5 shadow-sm shadow-emerald-950/5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-xs font-bold">Movimentações recentes</h3>
              <p className="mt-1 text-[9px] text-[#969d98]">Entradas e saídas</p>
            </div>
            <button className="text-[#929993]" type="button" aria-label="Mais opções">
              <Icon name="more" className="size-4" />
            </button>
          </div>

          <div>
            {transactions.map((transaction) => (
              <div className="flex items-center gap-3 border-b border-[#eff1ef] py-2.5 last:border-0" key={transaction.label}>
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${transaction.positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                  <Icon name={transaction.positive ? "arrow" : "wallet"} className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-[10px]">{transaction.label}</strong>
                  <span className="mt-0.5 block text-[8px] text-[#9ba19d]">{transaction.date}</span>
                </div>
                <strong className={`text-[9px] ${transaction.positive ? "text-emerald-700" : "text-rose-600"}`}>
                  {transaction.value}
                </strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
