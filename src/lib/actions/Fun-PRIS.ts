"use server";

import type { Vagancie, Client } from "@/app/store/ADM";
import prisma from "@/lib/prisma";
import { toVaga, toClient } from "./Mappers";

// BUSCAR todos os clientes
export async function listClients(): Promise<Client[]> {
  const clients = await prisma.client.findMany();
  return clients.map(toClient);
}

// LIGAR cliente a uma vaga
export async function setClient(number: string, clientId: string) {
  await prisma.$transaction([
    // 1. liga o cliente à vaga
    prisma.client.update({
      where: { id: clientId },
      data: { vagaNumber: number },
    }),
    // 2. marca a vaga como ocupada
    prisma.vagancie.update({
      where: { number },
      data: { busy: true },
    }),
  ]);
}

// BUSCAR todas as vagas (já com o cliente de cada uma)
export async function listVagas(): Promise<Vagancie[]> {
  const vagas = await prisma.vagancie.findMany({
    include: { client: true },
  });

  return vagas.map(toVaga);
}

// CRIAR vaga
export async function setNewVagancie(valor: Vagancie): Promise<Vagancie | null> {
  const existe = await prisma.vagancie.findUnique({
    where: { number: valor.number },
  });
  if (existe) return null;

  const criada = await prisma.vagancie.create({
    data: {
      number: valor.number,
      busy: valor.busy,
      pago: valor.pago,
      value: valor.value,
      feriasIs: valor.feriasIs,
      feriasExit: valor.feriasExit,
      feriasReturn: valor.feriasReturn,
    },
    include: { client: true },
  });

  return toVaga(criada);
}

// APAGAR vaga
export async function setDeleteVagancie(number: string) {
  await prisma.vagancie.delete({ where: { number } });
}

// MUDAR só alguns campos da vaga
export async function setNewData(number: string, changes: Partial<Vagancie>) {
  await prisma.vagancie.update({
    where: { number },
    data: {
      busy: changes.busy,
      pago: changes.pago,
      value: changes.value,
      feriasIs: changes.feriasIs,
      feriasExit: changes.feriasExit,
      feriasReturn: changes.feriasReturn,
    },
  });
}

// CRIAR um cliente
export async function createNewClient(valor: {
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  carro: { modelo: string; placa: string };
}) {
  try {
    const novo = await prisma.client.create({
      data: {
        name: valor.name,
        email: valor.email,
        cpf: valor.cpf,
        telefone: valor.telefone,
        modelo: valor.carro.modelo,
        placa: valor.carro.placa,
      },
    });
    return { ok: true as const, id: novo.id };
  } catch (e) {
    // P2002 = valor único repetido (e-mail ou CPF já existem)
    if ((e as { code?: string }).code === "P2002") {
      return { ok: false as const, erro: "E-mail ou CPF já cadastrado." };
    }
    return { ok: false as const, erro: "Não foi possível salvar o cliente." };
  }
}

// APAGAR cliente (e liberar a vaga dele)
export async function deleteClient(id: string) {
  const cliente = await prisma.client.findUnique({ where: { id } });

  await prisma.$transaction([
    ...(cliente?.vagaNumber
      ? [
          prisma.vagancie.update({
            where: { number: cliente.vagaNumber },
            data: { busy: false },
          }),
        ]
      : []),
    prisma.client.delete({ where: { id } }),
  ]);
}

// EDITAR cliente
export async function updateClient(id: string, valor: Client) {
  await prisma.client.update({
    where: { id },
    data: {
      name: valor.name,
      email: valor.email,
      cpf: valor.cpf,
      telefone: valor.telefone,
      modelo: valor.carro.modelo,
      placa: valor.carro.placa,
    },
  });
}