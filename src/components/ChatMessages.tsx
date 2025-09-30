import { useEffect, useRef } from 'react'
import type { Message as MessageType } from '../types'
import { Message } from './Message'

interface ChatMessagesProps {
  messages: MessageType[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex grow max-h-full
 flex-col gap-4 overflow-y-auto rounded border-base-300 border p-4">
      {messages.length === 0 ? (
        <div className='flex flex-col grow justify-center items-center gap-4'>
          <div className="text-lg text-center">
            Welcome to Triple Buzzer, a Netlify AI game! Give me an answer and I'll respond with
            the correct question.
          </div>
          <div className="text-md text-center">
            Remember when IBM Watson went on Jeopardy!? Well, this is nothing like that because we
            hold neither of those copyrights.
          </div>
        </div>
      ) : (
        messages.map((message, index) => <Message key={index} message={message} />)
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}