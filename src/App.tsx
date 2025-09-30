import { useState, useCallback } from 'react'
import { ChatHeader } from './components/ChatHeader'
import { ChatMessages } from './components/ChatMessages'
import { TypingIndicator } from './components/TypingIndicator'
import { ProviderSelector } from './components/ProviderSelector'
import { ChatInput } from './components/ChatInput'
import { useModels } from './hooks/useModels'
import { useChat } from './hooks/useChat'
import type { Provider } from './types'
import './index.css'

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
    <div className="flex min-h-screen items-center justify-center gradient-primary p-5">
      <div className="flex w-full max-w-[1200px] flex-col overflow-hidden rounded-xl bg-white shadow-xl xl:max-w-[1400px] max-md:h-screen max-md:rounded-none">
        <ChatHeader />
        <ChatMessages messages={messages} />
        <TypingIndicator isVisible={isLoading} />
        <div className="border-t bg-gray-50 p-5">
          <ProviderSelector models={models} onSelectionChange={setSelectedProviders} />
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  )
}