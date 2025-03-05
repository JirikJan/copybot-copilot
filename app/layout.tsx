// app/layout.tsx
"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import "@copilotkit/react-textarea/styles.css";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;
  
  // Kontrola, zda je API klíč nastaven
  if (!COPILOT_CLOUD_PUBLIC_API_KEY) {
    console.warn("NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY není nastaven. CopilotKit nemusí fungovat správně.");
  }
  
  return (
    <html lang="en">
      <head>
        <title>Copybotí Asisteent</title>
        <meta name="description" content="Aplikace pro správu marketingového obsahu" />
      </head>
      <body className={inter.className}>
        <CopilotKit 
          publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY || ""}
          
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}