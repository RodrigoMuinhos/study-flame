import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "./components/ui/toast";
import { CookieBanner } from "./components/ui/cookie-banner";
import { AuthProvider } from "@/contexts/AuthContext";
import { WhatsNew } from "./components/ui/whats-new";

export const metadata: Metadata = {
  title: "CRM Flame - Sistema de Gestão de Leads",
  description: "Sistema completo de CRM para gestão de leads e alunos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
            <WhatsNew />
            <CookieBanner />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
