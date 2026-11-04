import { Suspense } from "react";
import HomeServer from "./HomeServer";

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando garagem... 🚗</p>}>
      <HomeServer />
    </Suspense>
  );
}