import { CopilotSidebar } from "@copilotkit/react-ui";
import { MarketingContentProvider } from "@/lib/hooks/use-marketing-content";
import { MarketingContentThread } from "./MarketingContentThread";
 
export function CopybotSidebar() {
    return (
      <CopilotSidebar
        defaultOpen={true}
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Sidebar Assistant",
          initial: "How can I help you today?",
        }}
      />
    );
  }