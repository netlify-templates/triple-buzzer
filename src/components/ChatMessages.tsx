import { useEffect, useRef, type ReactNode } from 'react'
import type { Message as MessageType } from '../types'
import { Message } from './Message'

interface ChatMessagesProps {
  messages: MessageType[];
  children?: ReactNode;
}

export function ChatMessages({ messages, children }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex grow h-full max-h-full
 flex-col gap-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className='flex flex-col grow justify-center items-center gap-4'>
          <div className="text-center flex flex-col gap-2">
            <span className="text-xl lg:text-2xl font-semibold">Welcome to Triple Buzzer!</span>
            <span className="text-lg lg:text-xl">Give me an answer and I'll respond with the correct question.</span>
          </div>
        </div>
      ) : (
        messages.map((message, index) => <Message key={index} message={message} />)
      )}
      <div ref={messagesEndRef} />
      {children}
    </div>
  )
}