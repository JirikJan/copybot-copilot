"use client";
import { MarketingContentProvider } from "@/lib/hooks/use-marketing-content";
import { MarketingContentThread } from "@/components/MarketingContentThread";

export function Main() {
  return (
    <MarketingContentProvider>
      <MarketingContentThread />
    </MarketingContentProvider>
  );
}