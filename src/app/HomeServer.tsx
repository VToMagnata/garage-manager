import HomeClient from "./HomeClient";
import { listVagas, listClients } from "../lib/actions/Fun-PRIS";

export default async function HomeServer() {
  const vagas = await listVagas();
  const clientes = await listClients();

  return <HomeClient vagas={vagas} clientes={clientes} />;
}