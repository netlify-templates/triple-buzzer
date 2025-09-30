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
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
      {messages.length === 0 ? (
        <>
          <div className="py-10 px-5 text-center italic text-gray-600">
            Welcome to Triple Buzzer, a Netlify AI game! Give me an answer and I'll respond with
            the correct question.
          </div>
          <div className="px-5 pb-5 text-center text-sm text-gray-500">
            Remember when IBM Watson went on Jeopardy!? Well, this is nothing like that because we
            hold neither of those copyrights.
          </div>
        </>
      ) : (
        messages.map((message, index) => <Message key={index} message={message} />)
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}