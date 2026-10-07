import Icon, { type IconName } from "../../../../../components/Icon"
type Stat = {
  icon: IconName;
  label: string;
  value: string;
  note: string;
  tone: string;
};

export default function StatCard({ stat }: { stat: Stat }) {
  return (
    <article className="min-h-[165px] rounded-2xl border border-[#e1e6e1] bg-white p-[19px] shadow-sm shadow-emerald-950/5">
      <div className="flex items-center justify-between">
        <span
          className={`grid size-9 place-items-center rounded-[10px] ${stat.tone}`}
        >
          <Icon name={stat.icon} className="size-[18px]" />
        </span>
        <button
          className="grid size-[30px] place-items-center rounded-lg border border-[#edf0ed] bg-[#fafbfa] text-[#8b938e]"
          type="button"
          aria-label={`Ver ${stat.label.toLowerCase()}`}
        >
          <Icon name="arrow" className="size-3.5" />
        </button>
      </div>
      <p className="mb-1 mt-4 text-[11px] text-[#89918c]">{stat.label}</p>
      <strong
        className={`${stat.value.length > 4 ? "text-2xl" : "text-[29px]"} tracking-[-0.055em]`}
      >
        {stat.value}
      </strong>
      <small className="mt-1.5 block text-[10px] text-[#a0a6a2]">
        {stat.note}
      </small>
    </article>
  );
}