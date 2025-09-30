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
  openai: 'gpt-5-mini',
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
        className={`card ${
          state.enabled ? 'gradient-primary' : 'border bg-base-300'
        }`}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName !== 'SELECT') {
            toggleProvider(provider)
          }
        }}
      >
        <div className="card-body p-2 items-center">
            <div className={"card-title " + (state.enabled ? 'text-gold' : 'text-base-400') }>
              <input type="checkbox" checked={state.enabled} className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-400 checked:bg-orange-300 checked:text-orange-900" />
              <span>{label}</span>
            </div>
          {state.enabled && (
            <div onClick={(e) => e.stopPropagation()}>
              <select
                value={state.selectedModel}
                onChange={(e) => updateModel(provider, e.target.value)}
                className="select select-ghost w-full bg-base-300"
              >
                {availableModels.length > 0 ? (
                  availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))
                ) : (
                  <option value="">Loading...</option>
                )}
              </select>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center gap-2 my-3'>
      <span className="text-lg">Select your contestants!</span>
      <div className="grid grid-cols-3 grow w-full justify-items-stretch gap-2">
        {renderProviderOption('openai', 'OpenAI')}
        {renderProviderOption('anthropic', 'Anthropic')}
        {renderProviderOption('gemini', 'Gemini')}
      </div>
    </div>
  )
}