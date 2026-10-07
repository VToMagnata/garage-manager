import Icon from "@/app/components/Icon";
import CustomerList from "./components/CustomerList";
import CreateCustomerCard from "./components/CreateCustomerCard";
import DashboardHeader from "../../components/DashboardHeader";
import Sidebar from "../../components/Sidebar";

const stats = [
  {
    label: "Total de clientes",
    value: "184",
    note: "+12 neste mês",
    icon: "users" as const,
    tone: "bg-[#e9f2ed] text-[#285e49]",
  },
  {
    label: "Clientes ativos",
    value: "167",
    note: "90,7% da base",
    icon: "users" as const,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Veículos vinculados",
    value: "213",
    note: "1,15 por cliente",
    icon: "car" as const,
    tone: "bg-sky-50 text-sky-700",
  },
  {
    label: "Novos cadastros",
    value: "12",
    note: "Últimos 30 dias",
    icon: "plus" as const,
    tone: "bg-violet-50 text-violet-700",
  },
];

export default function ClientsPage() {
  return (
    <>
      <Sidebar />

      <main className="min-h-screen lg:ml-[246px]">
        <DashboardHeader />

        <div className="p-4 sm:p-6">
          <section className="mb-[18px] grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((item) => (
              <article
                className="rounded-2xl border border-[#e1e6e1] bg-white p-4 shadow-sm shadow-emerald-950/5 sm:p-[19px]"
                key={item.label}
              >
                <div
                  className={`mb-4 grid size-9 place-items-center rounded-[10px] ${item.tone}`}
                >
                  <Icon name={item.icon} className="size-[18px]" />
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

          <div className="flex flex-col gap-[18px] xl:grid-cols-[minmax(0,1.7fr)_minmax(310px,.72fr)]">
            <CustomerList />
            <CreateCustomerCard />
          </div>
        </div>
      </main>
    </>
  );
}