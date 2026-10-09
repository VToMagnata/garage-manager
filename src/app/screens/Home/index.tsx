"use client";

import { useEffect, useState } from "react";
import ActivityPanel from "./components/ActivityPanel";
import DashboardHeader from "../../components/DashboardHeader";
import ParkingMap from "./components/ParkingMap";
import Sidebar from "../../components/Sidebar";
import StatsGrid from "./components/StatsGrid";

const HomePage = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  return (
    <>
      <Sidebar />

      <main className="min-h-screen lg:ml-[246px]">
        <DashboardHeader />

        <div className="mx-auto max-w-[1500px] px-3.5 py-6 sm:px-6 lg:px-[34px] lg:py-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 min-h-[16px] text-[11px] text-[#919994] first-letter:uppercase">
                {now
                  ? now.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <h1 className="text-[28px] font-bold tracking-[-0.045em]">
                Visão geral
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#77817b]">
              <span className="size-2 rounded-full bg-[#36a371] ring-4 ring-[#dbede3]" />
              Atualizado agora
            </div>
          </div>

          <StatsGrid />

          <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-[minmax(0,1.9fr)_minmax(270px,.72fr)]">
            <ParkingMap />
            <ActivityPanel />
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;