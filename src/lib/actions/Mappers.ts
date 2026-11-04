import type { Client as DbClient, Vagancie as DbVaga } from "@/generated/prisma/client";
import type { Client, Vagancie } from "@/app/store/ADM";

export function toClient(c: DbClient): Client {
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    cpf: c.cpf,
    telefone: c.telefone,
    vagaAssociada: c.vagaNumber ?? "",
    carro: { modelo: c.modelo, placa: c.placa },
  };
}

export function toVaga(v: DbVaga & { client: DbClient | null }): Vagancie {
  return {
    number: v.number,
    busy: v.busy,
    pago: v.pago,
    value: v.value,
    feriasIs: v.feriasIs,
    feriasExit: v.feriasExit ?? "",
    feriasReturn: v.feriasReturn ?? "",
    client: v.client ? toClient(v.client) : undefined,
  };
}