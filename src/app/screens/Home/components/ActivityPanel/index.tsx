import Icon, { type IconName } from "../../../../components/Icon"

const activities: {
  icon: IconName;
  plate: string;
  detail: string;
  time: string;
  tone: string;
}[] = [
  {
    icon: "car",
    plate: "GHT-9M03",
    detail: "Entrada · Vaga B02",
    time: "2 min",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: "car",
    plate: "NMB-2C77",
    detail: "Saída · R$ 24,00",
    time: "8 min",
    tone: "bg-rose-50 text-rose-700",
  },
  {
    icon: "car",
    plate: "CVB-3N98",
    detail: "Entrada · Vaga C04",
    time: "14 min",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: "calendar",
    plate: "Reserva #2841",
    detail: "Criada para 11:00",
    time: "21 min",
    tone: "bg-amber-50 text-amber-700",
  },
  {
    icon: "car",
    plate: "XYZ-6D32",
    detail: "Saída · R$ 16,00",
    time: "35 min",
    tone: "bg-rose-50 text-rose-700",
  },
];

export default function ActivityPanel() {
  return (
    <aside className="overflow-hidden rounded-[17px] border border-[#e0e5e0] bg-white shadow-sm shadow-emerald-950/5">
      <div className="flex items-start justify-between px-5 pb-4 pt-5">
        <div>
          <h2 className="text-sm font-bold">Atividade recente</h2>
          <p className="mt-1 text-[10px] text-[#959c97]">
            Movimentações de hoje
          </p>
        </div>
        <button className="text-[#929993]" type="button" aria-label="Opções">
          <Icon name="more" className="size-[18px]" />
        </button>
      </div>

      <div className="grid px-5 sm:grid-cols-2 sm:gap-x-5 xl:grid-cols-1">
        {activities.map((activity) => (
          <div
            className="grid grid-cols-[34px_1fr_auto] items-center gap-2.5 border-b border-[#eff1ef] py-3"
            key={`${activity.plate}-${activity.time}`}
          >
            <span
              className={`grid size-[34px] place-items-center rounded-[9px] ${activity.tone}`}
            >
              <Icon name={activity.icon} className="size-4" />
            </span>
            <div>
              <strong className="block text-[11px]">{activity.plate}</strong>
              <p className="mt-0.5 text-[9px] text-[#969d98]">
                {activity.detail}
              </p>
            </div>
            <time className="text-[9px] text-[#a7ada9]">{activity.time}</time>
          </div>
        ))}
      </div>
      <button
        className="mx-5 mb-5 mt-[18px] flex h-[38px] w-[calc(100%-40px)] items-center justify-center gap-2 rounded-[9px] border border-[#e5e9e5] bg-[#fafbfa] text-[10px] font-semibold text-[#36715a]"
        type="button"
      >
        Ver todas as atividades
        <Icon name="arrow" className="size-3" />
      </button>
    </aside>
  );
}
