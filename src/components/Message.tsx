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

  return (
    <div className={`message ${message.type}`}>
      <div className="message-content">
        {message.content}
        {message.type === 'assistant' && message.provider && (
          <>
            <div className={`provider-badge ${message.provider}`}>
              {providerLabels[message.provider]}
            </div>
            {message.responseTime !== undefined && (
              <div className="timing-indicator">{message.responseTime}ms</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}