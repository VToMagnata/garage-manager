"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Icon, { type IconName } from "../Icon";
import { useControler } from "../../providers/HeaderControler";

const menuItems: { label: string; name: string; icon: IconName }[] = [
  { label: "Visão geral", name: "Home", icon: "grid" },
  { label: "Vagas", name: "Vagas", icon: "garageEmpty" },
  { label: "Relatórios", name: "Relatorios", icon: "chart" },
  { label: "Clientes", name: "Clientes", icon: "cliente" },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { name, setName } = useControler();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 px-2.5 text-xl font-bold tracking-[-0.04em]">
          <span className="grid size-[34px] place-items-center rounded-[10px] bg-[#1f6b4f] text-white shadow-lg shadow-emerald-900/15">
            <Icon name="parking" className="size-[19px]" />
          </span>
          Salin
        </div>

        {onClose && (
          <button
            className="grid size-9 place-items-center rounded-lg border border-[#e1e6e2] bg-white text-[#7c857f]"
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
          >
            <Icon name="close" className="size-4" />
          </button>
        )}
      </div>

      <nav className="mt-9" aria-label="Navegação principal">
        <p className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9aa29d]">
          Menu
        </p>

        {menuItems.map((item) => {
          const active = name === item.name;

          return (
            <button
              key={item.name}
              className={`my-0.5 flex h-[45px] w-full items-center gap-3 rounded-[10px] px-3 text-left text-[13px] ${
                active
                  ? "bg-[#e9f2ed] font-semibold text-[#195d44]"
                  : "font-medium text-[#737d77] hover:bg-[#f0f4f0] hover:text-[#1c5a43]"
              }`}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => setName(item.name)}
            >
              <Icon name={item.icon} className="size-[18px]" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2.5 border-t border-[#e5e8e5] px-1 pt-4">
        <div className="grid size-[37px] shrink-0 place-items-center rounded-full bg-[#dcebe3] text-[11px] font-bold text-[#285b48]">
          MC
        </div>
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-xs">Miguel Salin</strong>
          <span className="mt-0.5 block text-[10px] text-[#919993]">
            Administrador
          </span>
        </div>
        <button className="text-[#929993]" type="button" aria-label="Mais opções">
          <Icon name="more" className="size-4" />
        </button>
      </div>
    </>
  );
}

export default function Sidebar() {
  const { menuOpen, setMenuOpen } = useControler();

  // ESC fecha e bloqueia o scroll do fundo enquanto o menu está aberto
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, setMenuOpen]);

  // Se a tela crescer para desktop com o menu aberto, fecha a gaveta
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [setMenuOpen]);

  return (
    <>
      {/* Desktop: sidebar fixa */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[246px] flex-col border-r border-[#e3e7e2] bg-[#fbfcfa] px-[18px] pb-5 pt-7 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile: gaveta renderizada direto no <body> (portal) */}
      {menuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div
              className="absolute inset-0 bg-[#101a15]/45 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu principal"
              className="absolute inset-y-0 left-0 flex w-[260px] max-w-[85vw] flex-col border-r border-[#e3e7e2] bg-[#fbfcfa] px-[18px] pb-5 pt-7 shadow-2xl"
            >
              <SidebarContent onClose={() => setMenuOpen(false)} />
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}