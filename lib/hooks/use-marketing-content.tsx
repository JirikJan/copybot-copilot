import { createContext, useContext, useState, ReactNode } from "react";
import { MarketingContent } from "../marketingContent.types";
import marketingContentHistory from "./marketing-content-history.json";
import { useCopilotReadable } from "@copilotkit/react-core";

type MarketingContentContextType = {
  marketingContents: MarketingContent[];
  addMarketingContent: ({
    body,
    category
  }: {
    body: string;
    category: string;
  }) => void;
};

const MarketingContentContext = createContext<MarketingContentContextType | undefined>(undefined);

export const MarketingContentProvider = ({ children }: { children: ReactNode }) => {
  const [marketingContents, setMarketingContents] = useState<MarketingContent[]>(marketingContentHistory);

  useCopilotReadable({
    description: "Historie marketingového obsahu",
    value: marketingContents,
  });

  const addMarketingContent = ({
    body,
    category
  }: {
    body: string;
    category: string;
  }) => {
    const marketingContent = {
      from: "Já",
      to: "Marketingový tým",
      body,
      category,
      timestamp: new Date().toISOString(),
    };
    setMarketingContents([...marketingContents, marketingContent]);
  };

  return (
    <MarketingContentContext.Provider
      value={{ marketingContents, addMarketingContent }}
    >
      {children}
    </MarketingContentContext.Provider>
  );
};

export const useMarketingContent = () => {
  const context = useContext(MarketingContentContext);
  if (context === undefined) {
    throw new Error("useMarketingContent musí být použit uvnitř MarketingContentProvider");
  }
  return context;
}; 