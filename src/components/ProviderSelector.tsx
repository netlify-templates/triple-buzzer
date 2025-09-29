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
        className={`provider-option ${state.enabled ? 'selected' : ''}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName !== 'SELECT') {
            toggleProvider(provider)
          }
        }}
      >
        <div className="provider-checkbox">
          <input
            type="checkbox"
            checked={state.enabled}
            onChange={() => toggleProvider(provider)}
            onClick={(e) => e.stopPropagation()}
          />
          <span>{label}</span>
        </div>
        {state.enabled && (
          <div className="model-selector" onClick={(e) => e.stopPropagation()}>
            <select
              value={state.selectedModel}
              onChange={(e) => updateModel(provider, e.target.value)}
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
    <div className="provider-selector">
      <label>Select contestants:</label>
      <div className="provider-options">
        {renderProviderOption('openai', 'OpenAI')}
        {renderProviderOption('anthropic', 'Anthropic')}
        {renderProviderOption('gemini', 'Gemini')}
      </div>
    </div>
  )
}