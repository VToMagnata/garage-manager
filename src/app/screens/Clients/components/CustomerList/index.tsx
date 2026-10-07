import Icon from "@/app/components/Icon";

const customers = [
  {
    initials: "RL",
    name: "Roberto Lima",
    email: "roberto.lima@email.com",
    car: "Toyota Corolla",
    color: "Prata",
    plate: "BRA-2E19",
    garage: "Ed. Aurora",
    spot: "A-01",
    status: "Ativo",
  },
  {
    initials: "CD",
    name: "Camila Duarte",
    email: "camila.duarte@email.com",
    car: "Jeep Renegade",
    color: "Branco",
    plate: "KLP-8J71",
    garage: "Residencial Sol",
    spot: "A-14",
    status: "Ativo",
  },
  {
    initials: "FR",
    name: "Fernando Reis",
    email: "fernando.reis@email.com",
    car: "Honda Civic",
    color: "Cinza",
    plate: "GHT-9M03",
    garage: "Torre Central",
    spot: "B-03",
    status: "Ativo",
  },
  {
    initials: "MS",
    name: "Mariana Souza",
    email: "mariana.souza@email.com",
    car: "Hyundai HB20",
    color: "Vermelho",
    plate: "CVB-3N98",
    garage: "Ed. Alameda",
    spot: "C-04",
    status: "Ativo",
  },
  {
    initials: "AP",
    name: "André Pereira",
    email: "andre.pereira@email.com",
    car: "Chevrolet Onix",
    color: "Preto",
    plate: "RTY-7U54",
    garage: "Residencial Park",
    spot: "B-08",
    status: "Inativo",
  },
  {
    initials: "LS",
    name: "Larissa Santos",
    email: "larissa.santos@email.com",
    car: "Nissan Kicks",
    color: "Azul",
    plate: "HJK-5L10",
    garage: "Ed. Horizonte",
    spot: "C-12",
    status: "Ativo",
  },
];

export default function CustomerList() {
  return (
    <section className="overflow-hidden rounded-[17px] border border-[#e0e5e0] bg-white shadow-sm shadow-emerald-950/5">
      <div className="flex flex-col gap-4 border-b border-[#edf0ed] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold">Clientes cadastrados</h2>
          <p className="mt-1 text-[10px] text-[#959c97]">
            184 clientes encontrados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-[#e2e6e2] bg-[#fafbfa] px-3 sm:w-56">
            <Icon name="search" className="size-3.5 text-[#9ba29d]" />
            <input
              className="min-w-0 flex-1 bg-transparent text-[10px] outline-none placeholder:text-[#a5aba7]"
              type="search"
              placeholder="Buscar nome ou placa..."
            />
          </label>
          <button
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#e2e6e2] bg-white text-[#79827c]"
            type="button"
            aria-label="Filtrar clientes"
          >
            <Icon name="filter" className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="bg-[#fafbf9] text-[9px] font-bold uppercase tracking-[0.08em] text-[#969d98]">
              <th className="px-5 py-3">Cliente</th>
              <th className="px-4 py-3">Carro</th>
              <th className="px-4 py-3">Placa</th>
              <th className="px-4 py-3">Garagem de origem</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-5 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                className="border-t border-[#eff1ef] text-[11px] transition-colors hover:bg-[#fafcfb]"
                key={customer.plate}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e4efe9] text-[10px] font-bold text-[#2b654e]">
                      {customer.initials}
                    </span>
                    <div>
                      <strong className="block">{customer.name}</strong>
                      <span className="mt-0.5 block text-[9px] text-[#979e99]">
                        {customer.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-sky-50 text-sky-700">
                      <Icon name="car" className="size-4" />
                    </span>
                    <div>
                      <strong className="block font-semibold">{customer.car}</strong>
                      <span className="mt-0.5 block text-[9px] text-[#979e99]">
                        {customer.color}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="rounded-md border border-[#dfe5e1] bg-[#f8faf8] px-2 py-1 font-mono text-[10px] font-bold tracking-wider">
                    {customer.plate}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <strong className="block font-semibold text-[#5f6963]">
                    {customer.garage}
                  </strong>
                  <span className="mt-0.5 block text-[9px] text-[#979e99]">
                    Vaga {customer.spot}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-bold ring-1 ${
                      customer.status === "Ativo"
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                        : "bg-slate-100 text-slate-500 ring-slate-200"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-2">
                    <button
                      className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe5e1] bg-white px-2.5 text-[10px] font-bold text-[#28664f] shadow-sm"
                      type="button"
                    >
                      <Icon name="edit" className="size-3" />
                      Editar
                    </button>
                    <button
                      className="grid size-8 place-items-center rounded-lg border border-rose-100 bg-rose-50 text-rose-600"
                      type="button"
                      aria-label={`Apagar cliente ${customer.name}`}
                    >
                      <Icon name="trash" className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#edf0ed] px-5 py-3.5 text-[9px] text-[#969d98]">
        <span>Mostrando 6 de 184 clientes</span>
        <div className="flex gap-1">
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#a0a6a2]" type="button">‹</button>
          <button className="grid size-7 place-items-center rounded-md bg-[#1d654b] font-bold text-white" type="button">1</button>
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#68716c]" type="button">2</button>
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#68716c]" type="button">3</button>
          <button className="grid size-7 place-items-center rounded-md border border-[#e3e7e3] text-[#68716c]" type="button">›</button>
        </div>
      </div>
    </section>
  );
}
