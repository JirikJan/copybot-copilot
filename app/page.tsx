"use client";

import { MarketingContentProvider } from "@/lib/hooks/use-marketing-content";
import "@copilotkit/react-textarea/styles.css";
import "@copilotkit/react-ui/styles.css";
import { Inter } from 'next/font/google';
import { useMarketingActions } from "@/lib/actions/marketingActions";
import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";
import { MarketingContentThread } from '@/components/marketing/MarketingContentThread';

const inter = Inter({ subsets: ['latin'] });

// Komponenta pro obsah stránky
function PageContent() {
  // Registrujeme všechny marketingové akce - aby je Copybot mohl používat
  useMarketingActions();
  
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-[#0F133F]/5 to-[#0F133F]/10">
      <Header />
      <MainContent />
    </div>
  );
}

export default function Home() {
  return (
    <MarketingContentProvider>
      <PageContent />
    </MarketingContentProvider>
  );
}

