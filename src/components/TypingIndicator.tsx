interface TypingIndicatorProps {
  isVisible: boolean
}

export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className="flex items-center gap-2">
      <span>AI is typing</span>
      <div className="flex gap-1">
        <span className="animate-[typing_1.4s_infinite]"></span>
        <span className="animate-[typing_1.4s_0.2s_infinite]"></span>
        <span className="animate-[typing_1.4s_0.4s_infinite]"></span>
      </div>
    </div>
  )
}