"use client";

import Icon from "@/app/components/Icon";
import { useClient } from "@/app/providers/Clients";
import { useState } from "react";
import { useVagancie } from "@/app/providers/Vagancie";

type Data = {
  number: string;
  value: string;
  client: string;
  ferias: boolean;
  exit: string;
  returnDate: string;
};

export default function ModalEdit({
  number,
  onClose,
}: {
  number: string;
  onClose: () => void;
}) {
  const { setNewData, ArrayVacancies } = useVagancie();
  const { ArrayClients } = useClient();

  const vacancy = ArrayVacancies.find((v) => v.number === number);

  const [data, setData] = useState<Data>({
    number: vacancy?.number ?? number,
    value: String(vacancy?.value ?? 0),
    client: vacancy?.client?.id?.toString() ?? "",
    ferias: vacancy?.ferias.is ?? false,
    exit: vacancy?.ferias.exit ?? "",
    returnDate: vacancy?.ferias.returnDate ?? "",
  });

  function handleSave() {
    const client = ArrayClients.find(
      (client) => String(client.id) === data.client
    );

    setNewData(number, {
      number: data.number,
      value: Number(data.value.replace(",", ".")),
      client,
      busy: !!client,
      ferias: {
        exit: data.ferias ? data.exit : "",
        returnDate: data.ferias ? data.returnDate : "",
        is: data.ferias,
      },
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#101a15]/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-6">
      <section
        aria-labelledby="edit-vacancy-title"
        aria-modal="true"
        className="w-full overflow-hidden rounded-t-[22px] border border-white/70 bg-white shadow-2xl shadow-emerald-950/25 sm:max-w-[520px] sm:rounded-[22px]"
        role="dialog"
      >
        <header className="flex items-start justify-between border-b border-[#e9eeea] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e9f3ee] text-[#23654d]">
              <Icon name="parking" className="size-5" />
            </span>

            <div>
              <h2
                className="text-lg font-bold tracking-[-0.03em] text-[#17211c]"
                id="edit-vacancy-title"
              >
                Editar configurações
              </h2>
              <p className="mt-1 text-[10px] text-[#8a938d]">
                Atualize os dados e o vínculo desta vaga.
              </p>
            </div>
          </div>

          <button
            aria-label="Fechar modal"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#e1e6e2] bg-[#fafbfa] text-[#7c857f]"
            type="button"
            onClick={onClose}
          >
            <Icon name="close" className="size-4" />
          </button>
        </header>

        <form
          className="space-y-5 px-5 py-5 sm:px-6 sm:py-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                htmlFor="edit-vacancy-number"
              >
                Número da vaga
              </label>

              <div className="flex h-11 items-center rounded-[10px] border border-[#dce3de] bg-[#fafbfa] px-3.5">
                <Icon name="parking" className="mr-2.5 size-4 text-[#7f8a83]" />
                <input
                  id="edit-vacancy-number"
                  className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#25332b] outline-none"
                  value={data.number}
                  onChange={(e) =>
                    setData({ ...data, number: e.target.value })
                  }
                  required
                  type="text"
                />
              </div>
            </div>

            <div>
              <label
                className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                htmlFor="edit-vacancy-price"
              >
                Valor mensal
              </label>

              <div className="flex h-11 items-center rounded-[10px] border border-[#dce3de] bg-[#fafbfa] px-3.5">
                <span className="mr-2.5 text-[10px] font-bold text-[#738078]">
                  R$
                </span>
                <input
                  id="edit-vacancy-price"
                  className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-[#25332b] outline-none"
                  value={data.value}
                  onChange={(e) =>
                    setData({ ...data, value: e.target.value })
                  }
                  inputMode="decimal"
                  required
                  type="text"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
              htmlFor="edit-vacancy-customer"
            >
              Cliente vinculado
            </label>

            <div className="relative">
              <Icon
                name="users"
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#7f8a83]"
              />

              <select
                id="edit-vacancy-customer"
                className="h-11 w-full appearance-none rounded-[10px] border border-[#dce3de] bg-[#fafbfa] pl-10 pr-10 text-xs font-semibold text-[#25332b] outline-none"
                value={data.client}
                onChange={(e) =>
                  setData({ ...data, client: e.target.value })
                }
              >
                <option value="">Sem cliente</option>

                {ArrayClients.map((client) => (
                  <option key={client.id} value={String(client.id)}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-[#dce3de] bg-[#fafbfa] p-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={data.ferias}
                onChange={(e) =>
                  setData({ ...data, ferias: e.target.checked })
                }
                className="size-4 accent-[#1d654b]"
              />

              <span className="text-xs font-bold text-[#25332b]">
                Férias
              </span>
            </label>

            {data.ferias && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="vacation-start"
                    className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                  >
                    Dia inicial
                  </label>

                  <input
                    id="vacation-start"
                    type="date"
                    value={data.exit}
                    onChange={(e) =>
                      setData({ ...data, exit: e.target.value })
                    }
                    required={data.ferias}
                    className="h-11 w-full rounded-[10px] border border-[#dce3de] bg-white px-3 text-xs text-[#25332b] outline-none focus:border-[#5d907a]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vacation-end"
                    className="mb-1.5 block text-[10px] font-bold text-[#59635d]"
                  >
                    Dia final
                  </label>

                  <input
                    id="vacation-end"
                    type="date"
                    value={data.returnDate}
                    min={data.exit || undefined}
                    onChange={(e) =>
                      setData({ ...data, returnDate: e.target.value })
                    }
                    required={data.ferias}
                    className="h-11 w-full rounded-[10px] border border-[#dce3de] bg-white px-3 text-xs text-[#25332b] outline-none focus:border-[#5d907a]"
                  />
                </div>
              </div>
            )}
          </div>

          <footer className="-mx-5 flex gap-2.5 border-t border-[#e9eeea] bg-[#fafbfa] px-5 py-4 sm:-mx-6 sm:justify-end sm:px-6">
            <button
              className="h-10 flex-1 rounded-[9px] border border-[#dce3de] bg-white px-5 text-[10px] font-bold text-[#6f7973] sm:flex-none"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              className="h-10 flex-[1.25] rounded-[9px] bg-[#1d654b] px-5 text-[10px] font-bold text-white shadow-md shadow-emerald-900/15 sm:flex-none"
              type="submit"
            >
              Salvar alterações
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}