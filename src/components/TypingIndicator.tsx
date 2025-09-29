interface TypingIndicatorProps {
  isVisible: boolean
}

export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className="typing-indicator">
      <span>AI is typing</span>
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}