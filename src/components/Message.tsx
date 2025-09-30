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
    openai: 'bg-gradient-to-br from-[#11998e] to-[#38ef7d]',
    anthropic: 'bg-gradient-to-br from-[#f093fb] to-[#f5576c]',
    gemini: 'bg-gradient-to-br from-[#4285f4] to-[#34a853]',
  }

  return (
    <div className={`mb-[15px] flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative max-w-[80%] rounded-[9px] px-[18px] py-3 text-[0.95rem] leading-[1.4] ${
        message.type === 'user'
          ? 'rounded-br-[5px] bg-gradient-to-br from-[#1a237e] to-[#3949ab] font-semibold text-[#ffd700]'
          : 'rounded-bl-[5px] bg-[#f1f3f5] text-[#333]'
      } max-[480px]:max-w-[90%] max-[480px]:text-[0.9rem]`}>
        {message.content}
        {message.type === 'assistant' && message.provider && (
          <>
            <div className={`absolute -top-2 -right-2 rounded-md px-1.5 py-0.5 text-[0.7rem] font-semibold uppercase text-[#ffd700] ${providerColors[message.provider]}`}>
              {providerLabels[message.provider]}
            </div>
            {message.responseTime !== undefined && (
              <div className="absolute -bottom-2 -right-2 rounded bg-black/60 px-1 py-px text-[0.6rem] font-medium text-white">{message.responseTime}ms</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}