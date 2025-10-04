import { useState, useEffect } from "react";
import type { Provider, ModelsByProvider } from "../types";

interface ProviderSelectorProps {
  models: ModelsByProvider;
  onSelectionChange: (
    selections: Array<{ provider: Provider; model: string }>
  ) => void;
}

interface ProviderState {
  enabled: boolean;
  selectedModel: string;
}

const DEFAULT_MODELS: Record<Provider, string> = {
  openai: "gpt-5-mini",
  anthropic: "claude-3-5-haiku-latest",
  gemini: "gemini-flash-latest",
};

export function ProviderSelector({
  models,
  onSelectionChange,
}: ProviderSelectorProps) {
  const [providers, setProviders] = useState<Record<Provider, ProviderState>>({
    openai: { enabled: true, selectedModel: DEFAULT_MODELS.openai },
    anthropic: { enabled: true, selectedModel: DEFAULT_MODELS.anthropic },
    gemini: { enabled: true, selectedModel: DEFAULT_MODELS.gemini },
  });

  useEffect(() => {
    const selections = (
      Object.entries(providers) as Array<[Provider, ProviderState]>
    )
      .filter(([, state]) => state.enabled)
      .map(([provider, state]) => ({
        provider,
        model: state.selectedModel,
      }));
    onSelectionChange(selections);
  }, [providers, onSelectionChange]);

  const toggleProvider = (provider: Provider) => {
    setProviders((prev) => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        enabled: !prev[provider].enabled,
      },
    }));
  };

  const updateModel = (provider: Provider, model: string) => {
    setProviders((prev) => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        selectedModel: model,
      },
    }));
  };

  const renderProviderOption = renderProvider(
    providers,
    models,
    toggleProvider,
    updateModel
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-full justify-items-stretch join">
      {renderProviderOption("openai", "OpenAI")}
      {renderProviderOption("anthropic", "Anthropic")}
      {renderProviderOption("gemini", "Gemini")}
    </div>
  );
}

function renderProvider(
  providers: Record<Provider, ProviderState>,
  models: ModelsByProvider,
  toggleProvider: (provider: Provider) => void,
  updateModel: (provider: Provider, model: string) => void
) {
  return (provider: Provider, label: string) => {
    const state = providers[provider];
    const availableModels = models[provider];

    return (
      <div
        key={provider}
        className={
          `join-item flex lg:flex-col btn lg:h-28 rounded-none justify-between lg:justify-center   ` +
          (state.enabled ? "btn-primary" : "btn-outline border-base-300 text-base-content opacity-80  ")
        }
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName !== "SELECT") {
            toggleProvider(provider);
          }
        }}
      >
        <span className="lg:text-xl normal-case">{label}</span>
          <div className="w-max" onClick={(e) => e.stopPropagation()}>
            {availableModels.length > 0 ? (
              <select
                value={state.selectedModel}
                onChange={(e) => updateModel(provider, e.target.value)}
                className="select select-ghost lg:select-sm lg:border-base-200 font-sans"
                disabled={!state.enabled}
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            ) : (
              <span className="font-sans text-sm">Loading...</span>
            )}
          </div>
      </div>
    );
  };
}
