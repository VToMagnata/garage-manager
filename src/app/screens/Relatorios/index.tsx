import Icon from "@/app/components/Icon";

import DashboardHeader from "@/app/components/DashboardHeader";
import Sidebar from "@/app/components/Sidebar";
import FinancialOverview from "./components/FinancialOverview";
import ReportBuilder from "./components/ReportBuilder";
import ReportHistory from "./components/ReportHistory";



export default function Relatorios() {
  return (
    <div className="min-h-screen bg-[#f4f6f3] text-[#17211c]">
      <Sidebar />

      <main className="min-h-screen lg:ml-[246px]">
        <DashboardHeader />

        <div className="mx-auto max-w-[1500px] px-3.5 py-6 sm:px-6 lg:px-[34px] lg:py-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-[11px] text-[#919994]">
                Gestão e desempenho
              </p>
              <h1 className="text-[28px] font-bold tracking-[-0.045em]">
                Relatórios e financeiro
              </h1>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#808983]">
                Gere relatórios operacionais e acompanhe os principais números
                financeiros do estacionamento.
              </p>
            </div>
            <button
              className="flex h-11 w-fit items-center gap-2 rounded-[11px] bg-[#1d654b] px-4 text-xs font-bold text-white shadow-lg shadow-emerald-900/15"
              type="button"
            >
              <Icon name="plus" className="size-4" />
              Criar relatório
            </button>
          </div>

          <FinancialOverview />

          <div className="mt-[18px] grid grid-cols-1 gap-[18px] xl:grid-cols-[minmax(310px,.7fr)_minmax(0,1.45fr)]">
            <ReportBuilder />
            <ReportHistory />
          </div>
        </div>
      </main>
    </div>
  );
}