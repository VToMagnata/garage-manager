import CreateVacancyCard from "./components/CreateVacancyCard";
import DashboardHeader from "../../components/DashboardHeader";
import Icon from "@/app/components/Icon";
import Sidebar from "../../components/Sidebar";
import VacancyList from "./components/VacancyList";
import VacationVacancies from "./components/VacationVacancies";
import { useVagancie } from "@/app/providers/Vagancie";

export default function App() {

  const { ArrayVacancies } = useVagancie();

  const total = ArrayVacancies.length;
  const ocupadas = ArrayVacancies.filter((v) => v.busy).length;
  const ferias = ArrayVacancies.filter((v) => v.ferias.is).length;
  const disponiveis = ArrayVacancies.filter((v) => !v.busy && !v.ferias.is).length;

  const pct = (n: number) =>
    total === 0 ? "0%" : `${((n / total) * 100).toFixed(1).replace(".", ",")}%`;

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-[#17211c]">
      <Sidebar />

      <main className="min-h-screen lg:ml-[246px]">
        <DashboardHeader />

        <div className="mx-auto max-w-[1500px] px-3.5 py-6 sm:px-6 lg:px-[34px] lg:py-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-[28px] font-bold tracking-[-0.045em]">
                Vagas
              </h1>
              <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#808983]">
                Cadastre, edite e acompanhe a disponibilidade de todas as vagas.
              </p>
            </div>
          </div>

          <section className="mb-[18px] grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
                { label: "Total de vagas", value: total, note: "Todos os setores", tone: "text-[#285e49] bg-[#e9f2ed]" },
                { label: "Disponíveis", value: disponiveis, note: `${pct(disponiveis)} do total`, tone: "text-emerald-700 bg-emerald-50" },
                { label: "Ocupadas", value: ocupadas, note: `${pct(ocupadas)} do total`, tone: "text-sky-700 bg-sky-50" },
                { label: "Em férias", value: ferias, note: `${pct(ferias)} do total`, tone: "text-amber-700 bg-amber-50" },
            ].map((item) => (
              <article
                className="rounded-2xl border border-[#e1e6e1] bg-white p-4 shadow-sm shadow-emerald-950/5 sm:p-[19px]"
                key={item.label}
              >
                <div className={`mb-4 grid size-9 place-items-center rounded-[10px] ${item.tone}`}>
                  <Icon name={item.label === "Em férias" ? "calendar" : "parking"} className="size-[18px]" />
                </div>
                <p className="text-[10px] text-[#89918c]">{item.label}</p>
                <strong className="mt-0.5 block text-2xl tracking-[-0.05em] sm:text-[29px]">
                  {item.value}
                </strong>
                <small className="mt-1 block text-[9px] text-[#a0a6a2]">
                  {item.note}
                </small>
              </article>
            ))}
          </section>

          <div className="grid grid-cols-1 gap-[18px]">
            <div className="space-y-[18px]">
              <VacancyList />
              <VacationVacancies />
                          <CreateVacancyCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}