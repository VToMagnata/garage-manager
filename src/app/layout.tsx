import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { ControlerProvider } from "./provider/HeaderControler";

export const metadata: Metadata = {
  title: "Gerenciador de Garagem",
  description: "Sistema de gerenciamento de vagas e clientes",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <ControlerProvider>
          {children}
        </ControlerProvider>
      </body>
    </html>
  );
}