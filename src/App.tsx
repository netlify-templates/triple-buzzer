import { useState, useCallback } from 'react'
import { ChatHeader } from './components/ChatHeader'
import { ChatMessages } from './components/ChatMessages'
import { TypingIndicator } from './components/TypingIndicator'
import { ProviderSelector } from './components/ProviderSelector'
import { ChatInput } from './components/ChatInput'
import { useModels } from './hooks/useModels'
import { useChat } from './hooks/useChat'
import type { Provider } from './types'
import './styles/App.css'

export function App() {
  const { models } = useModels()
  const { messages, isLoading, sendMessage } = useChat()
  const [selectedProviders, setSelectedProviders] = useState<
    Array<{ provider: Provider; model: string }>
  >([])

  const handleSend = useCallback(
    (message: string) => {
      if (selectedProviders.length === 0) {
        alert('Please select at least one provider')
        return
      }
      sendMessage({ message, providers: selectedProviders })
    },
    [selectedProviders, sendMessage]
  )

  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <TypingIndicator isVisible={isLoading} />
      <div className="chat-input-container">
        <ProviderSelector models={models} onSelectionChange={setSelectedProviders} />
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  )
}