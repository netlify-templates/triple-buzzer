import type { Message as MessageType } from '../types'

interface MessageProps {
  message: MessageType
}

export function Message({ message }: MessageProps) {
  const providerLabels = {
    openai: 'OpenAI',
    anthropic: 'Claude',
    gemini: 'Gemini',
  }

  const providerColors = {
    openai: 'gradient-openai',
    anthropic: 'gradient-anthropic',
    gemini: 'gradient-gemini',
  }

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative max-w-[80%] rounded-lg px-4 py-3 ${
        message.type === 'user'
          ? 'gradient-primary font-semibold text-gold'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {message.content}
        {message.type === 'assistant' && message.provider && (
          <>
            <div className={`absolute -top-2 -right-2 rounded px-1.5 py-0.5 text-xs font-semibold uppercase text-gold ${providerColors[message.provider]}`}>
              {providerLabels[message.provider]}
            </div>
            {message.responseTime !== undefined && (
              <div className="absolute -bottom-2 -right-2 rounded bg-black/60 px-1 text-xs text-white">{message.responseTime}ms</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}