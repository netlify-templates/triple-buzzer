import { useState } from 'react'
import { EXAMPLE_QUESTIONS } from '../data/exampleQuestions'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('This country borders Germany, Belgium, and the North Sea')

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * EXAMPLE_QUESTIONS.length)
    setInput(EXAMPLE_QUESTIONS[randomIndex])
  }

  return (
    <div className="flex gap-2.5">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        maxLength={500}
        disabled={disabled}
        className="flex-1 rounded-[10px] border-2 border-[#e9ecef] px-[18px] py-3 text-base outline-none transition-colors focus:border-[#1a237e]"
      />
      <button
        onClick={handleRandom}
        disabled={disabled}
        title="Get random example"
        className="min-w-[50px] rounded-lg border-none bg-gradient-to-br from-[#1a237e] to-[#3949ab] px-[18px] py-3 text-[1.2rem] font-semibold text-[#ffd700] transition-all hover:shadow-[0_10px_20px_rgba(26,35,126,0.4)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        🎲
      </button>
      <button
        onClick={handleSend}
        disabled={disabled}
        className="rounded-lg border-none bg-gradient-to-br from-[#1a237e] to-[#3949ab] px-6 py-3 text-base font-semibold text-[#ffd700] transition-all hover:shadow-[0_10px_20px_rgba(26,35,126,0.4)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </div>
  )
}