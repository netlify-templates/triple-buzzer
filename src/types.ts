export type Provider = 'openai' | 'anthropic' | 'gemini'

export interface Message {
  content: string
  type: 'user' | 'assistant'
  provider?: Provider
  responseTime?: number
}

export interface ProviderSelection {
  provider: Provider
  enabled: boolean
  model: string
}

export interface ModelsByProvider {
  openai: string[]
  anthropic: string[]
  gemini: string[]
}