import Icon from "@/app/components/Icon";

export default function CreateCustomerCard() {
  return (
    <aside className="h-fit overflow-hidden rounded-[17px] border border-[#dce5df] bg-white shadow-sm shadow-emerald-950/5 xl:sticky xl:top-5">
      <div className="bg-gradient-to-br from-[#226c51] to-[#18533d] px-5 py-6 text-white">
        <span className="mb-4 grid size-10 place-items-center rounded-xl bg-white/15">
          <Icon name="users" className="size-5" />
        </span>
        <h2 className="text-lg font-bold tracking-[-0.03em]">
          Adicionar cliente
        </h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-white/65">
          Cadastre os dados pessoais, o veículo e a garagem de origem.
        </p>
      </div>

      <form className="space-y-4 p-5">
        <div>
          <label
            className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
            htmlFor="customer-name"
          >
            Nome completo
          </label>
          <input
            className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab] focus:border-[#5d907a]"
            id="customer-name"
            type="text"
            placeholder="Nome do cliente"
          />
        </div>

        <div>
          <label
            className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
            htmlFor="customer-email"
          >
            E-mail
          </label>
          <input
            className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab] focus:border-[#5d907a]"
            id="customer-email"
            type="email"
            placeholder="cliente@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
              htmlFor="customer-phone"
            >
              Telefone
            </label>
            <input
              className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab]"
              id="customer-phone"
              type="tel"
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <label
              className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
              htmlFor="customer-document"
            >
              CPF
            </label>
            <input
              className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab]"
              id="customer-document"
              type="text"
              placeholder="000.000.000-00"
            />
          </div>
        </div>

        <div className="border-t border-[#edf0ed] pt-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-sky-50 text-sky-700">
              <Icon name="car" className="size-3.5" />
            </span>
            <strong className="text-[11px]">Dados do veículo</strong>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                  htmlFor="car-model"
                >
                  Carro
                </label>
                <input
                  className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab]"
                  id="car-model"
                  type="text"
                  placeholder="Modelo"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                  htmlFor="car-plate"
                >
                  Placa
                </label>
                <input
                  className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs uppercase outline-none placeholder:text-[#a9afab]"
                  id="car-plate"
                  type="text"
                  placeholder="ABC-1D23"
                />
              </div>
            </div>

            <div>
              <label
                className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                htmlFor="origin-garage"
              >
                Garagem de origem
              </label>
              <input
                className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs outline-none placeholder:text-[#a9afab]"
                id="origin-garage"
                type="text"
                placeholder="Ex.: Residencial Aurora"
              />
            </div>

            <div>
              <label
                className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                htmlFor="linked-spot"
              >
                Vaga vinculada
              </label>
              <select
                className="h-10 w-full rounded-[9px] border border-[#dfe4e0] bg-[#fafbfa] px-3 text-xs text-[#78807b] outline-none"
                id="linked-spot"
              >
                <option>Selecione uma vaga</option>
                <option>A-01</option>
                <option>A-03</option>
                <option>B-09</option>
                <option>C-05</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            className="h-10 flex-1 rounded-[9px] border border-[#dfe4e0] bg-white text-[10px] font-bold text-[#747d77]"
            type="button"
          >
            Cancelar
          </button>
          <button
            className="h-10 flex-[1.4] rounded-[9px] bg-[#1d654b] text-[10px] font-bold text-white shadow-md shadow-emerald-900/10"
            type="button"
          >
            Salvar cliente
          </button>
        </div>
      </form>
    </aside>
  );
}
