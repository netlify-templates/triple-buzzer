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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a227ee9] to-[#3949ab] p-5">
      <div className="flex w-full max-w-[1200px] h-[min(90vh,800px)] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] xl:max-w-[1400px] xl:h-[min(85vh,900px)] max-md:h-screen max-md:max-w-full max-md:rounded-none max-md:m-0">
        <ChatHeader />
        <ChatMessages messages={messages} />
        <TypingIndicator isVisible={isLoading} />
        <div className="border-t border-[#e9ecef] bg-[#f8f9fa] p-5 max-md:p-[15px]">
          <ProviderSelector models={models} onSelectionChange={setSelectedProviders} />
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </div>
  )
}