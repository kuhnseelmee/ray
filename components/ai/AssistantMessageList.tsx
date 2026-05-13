'use client'

import { ChatMessage } from '@/lib/ai/types'

interface AssistantMessageListProps {
  messages: ChatMessage[]
  isLoading: boolean
  assistantName: string
}

export function AssistantMessageList({ messages, isLoading, assistantName }: AssistantMessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
              message.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-gray-500">{assistantName} is typing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
