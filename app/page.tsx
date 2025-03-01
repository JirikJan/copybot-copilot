"use client";

import { MarketingContentThread } from "@/components/MarketingContentThread";
import { MarketingContentProvider } from "@/lib/hooks/use-marketing-content";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-textarea/styles.css";
import { CopybotSidebar } from "@/components/CopybotSidebar";

export default function Home() {
  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;

  return (
    <div className="h-screen">
      <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY}>
        <MarketingContentProvider>
          <MarketingContentThread />
        </MarketingContentProvider>
      </CopilotKit>
    </div>
  );
}
