import { useState, useEffect } from 'react'
import type { Provider, ModelsByProvider } from '../types'

interface ProviderSelectorProps {
  models: ModelsByProvider
  onSelectionChange: (selections: Array<{ provider: Provider; model: string }>) => void
}

interface ProviderState {
  enabled: boolean
  selectedModel: string
}

const DEFAULT_MODELS: Record<Provider, string> = {
  openai: 'gpt-5',
  anthropic: 'claude-3-5-haiku-latest',
  gemini: 'gemini-2.5-flash',
}

export function ProviderSelector({ models, onSelectionChange }: ProviderSelectorProps) {
  const [providers, setProviders] = useState<Record<Provider, ProviderState>>({
    openai: { enabled: true, selectedModel: DEFAULT_MODELS.openai },
    anthropic: { enabled: true, selectedModel: DEFAULT_MODELS.anthropic },
    gemini: { enabled: true, selectedModel: DEFAULT_MODELS.gemini },
  })

  useEffect(() => {
    const selections = (Object.entries(providers) as Array<[Provider, ProviderState]>)
      .filter(([, state]) => state.enabled)
      .map(([provider, state]) => ({
        provider,
        model: state.selectedModel,
      }))
    onSelectionChange(selections)
  }, [providers, onSelectionChange])

  const toggleProvider = (provider: Provider) => {
    setProviders((prev) => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        enabled: !prev[provider].enabled,
      },
    }))
  }

  const updateModel = (provider: Provider, model: string) => {
    setProviders((prev) => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        selectedModel: model,
      },
    }))
  }

  const renderProviderOption = (provider: Provider, label: string) => {
    const state = providers[provider]
    const availableModels = models[provider]

    return (
      <div
        key={provider}
        className={`flex cursor-pointer flex-col gap-2 rounded-[5px] border-2 bg-white p-3 text-[0.8rem] transition-all hover:border-[#1a237e] ${
          state.enabled ? 'border-[#1a237e] bg-[#1a237e] text-[#ffd700]' : 'border-[#e9ecef]'
        }`}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName !== 'SELECT') {
            toggleProvider(provider)
          }
        }}
      >
        <div className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={state.enabled}
            onChange={() => toggleProvider(provider)}
            onClick={(e) => e.stopPropagation()}
            className="m-0"
          />
          <span>{label}</span>
        </div>
        {state.enabled && (
          <div className="mt-1.5" onClick={(e) => e.stopPropagation()}>
            <select
              value={state.selectedModel}
              onChange={(e) => updateModel(provider, e.target.value)}
              className="w-full border border-[#ddd] bg-white px-2 py-1 text-[0.75rem]"
            >
              {availableModels.length > 0 ? (
                availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))
              ) : (
                <option value="">Loading models...</option>
              )}
            </select>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mb-[15px] text-[0.9rem] text-[#666]">
      <label className="mb-2 block font-semibold">Select contestants:</label>
      <div className="flex flex-wrap gap-2.5 max-md:flex-col max-md:gap-2">
        {renderProviderOption('openai', 'OpenAI')}
        {renderProviderOption('anthropic', 'Anthropic')}
        {renderProviderOption('gemini', 'Gemini')}
      </div>
    </div>
  )
}