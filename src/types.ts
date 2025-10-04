export type Provider = "openai" | "anthropic" | "gemini";

export const ProviderLabels: Record<Provider, string> = {
  openai: "OpenAI",
  anthropic: "Claude",
  gemini: "Gemini",
};

export type Message =
  | {
      content: string;
      type: "user";
    }
  | {
      content: string;
      type: "assistant";
      provider: Provider;
      responseTime?: number;
    };

export interface ProviderSettings {
  provider: Provider;
  enabled: boolean;
  model: string;
}

export type ModelsByProvider = Record<Provider, string[]>;
