import Icon from "@/app/components/Icon";

const vacations = [
  { code: "C-12", holder: "Roberto Lima", exit: "28 set. 2024", returnDate: "14 out. 2024", days: "16 dias" },
  { code: "A-14", holder: "Camila Duarte", exit: "02 out. 2024", returnDate: "21 out. 2024", days: "19 dias" },
  { code: "B-03", holder: "Fernando Reis", exit: "05 out. 2024", returnDate: "12 out. 2024", days: "7 dias" },
];

export default function VacationVacancies() {
  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e5e0] bg-white shadow-sm shadow-emerald-950/5">
      <div className="flex items-start justify-between border-b border-[#edf0ed] px-5 py-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-amber-50 text-amber-700">
              <Icon name="calendar" className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold">Vagas em férias</h2>
              <p className="mt-0.5 text-[10px] text-[#959c97]">
                Períodos de ausência programados
              </p>
            </div>
          </div>
        </div>
        <button className="text-[#929993]" type="button" aria-label="Mais opções">
          <Icon name="more" className="size-[18px]" />
        </button>
      </div>

      <div className="grid gap-3 p-4 md:grid-cols-3">
        {vacations.map((vacation) => (
          <article
            className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-white p-4"
            key={vacation.code}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700">
                  Vaga {vacation.code}
                </span>
                <strong className="mt-1 block text-xs">{vacation.holder}</strong>
              </div>
              <button
                className="grid size-7 place-items-center rounded-md border border-amber-200 bg-white text-amber-700"
                type="button"
                aria-label={`Editar férias da vaga ${vacation.code}`}
              >
                <Icon name="edit" className="size-3" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div>
                <span className="block text-[8px] font-bold uppercase tracking-wide text-[#9b9f9c]">Saída</span>
                <strong className="mt-1 block text-[10px]">{vacation.exit}</strong>
              </div>
              <Icon name="arrow" className="size-3.5 text-amber-400" />
              <div className="text-right">
                <span className="block text-[8px] font-bold uppercase tracking-wide text-[#9b9f9c]">Volta</span>
                <strong className="mt-1 block text-[10px]">{vacation.returnDate}</strong>
              </div>
            </div>

            <div className="mt-3 border-t border-amber-100 pt-3 text-[9px] text-[#8f958f]">
              Período total: <strong className="text-[#626a65]">{vacation.days}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
