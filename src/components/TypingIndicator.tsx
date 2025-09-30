interface TypingIndicatorProps {
  isVisible: boolean
}

export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className="mb-[15px] flex items-center gap-2 pl-5 italic text-[#666]">
      <span>AI is typing</span>
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-[typing_1.4s_infinite] rounded-full bg-[#1a237e] opacity-30"></span>
        <span className="h-2 w-2 animate-[typing_1.4s_0.2s_infinite] rounded-full bg-[#1a237e] opacity-30"></span>
        <span className="h-2 w-2 animate-[typing_1.4s_0.4s_infinite] rounded-full bg-[#1a237e] opacity-30"></span>
      </div>
    </div>
  )
}