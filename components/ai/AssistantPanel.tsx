'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { AssistantMessageList } from './AssistantMessageList'
import { AssistantInput } from './AssistantInput'
import { Button } from '@/components/ui/Button'
import { ChatMessage, ChatResponse } from '@/lib/ai/types'
import { services } from '@/data/services'
import type { ServiceId } from '@/types/content'
import {
  DEFAULT_FRANK_ASSISTANT_NAME,
} from '@/lib/ai/frank-defaults'

interface AssistantPanelProps {
  isOpen: boolean
  onClose: () => void
  assistantName: string
  greeting: string
  pageContext?: string
  serviceSlug?: string
  portfolioSlug?: string
}

function createInitialMessage(assistantName: string, greeting: string): ChatMessage {
  return {
    role: 'assistant',
    content:
      greeting ||
      `Hi, I'm ${assistantName || DEFAULT_FRANK_ASSISTANT_NAME}. I'm here to help you understand what Ray can do for you. Ask me about his services, your technical problems, or how to get started.`,
  }
}

export function AssistantPanel({
  isOpen,
  onClose,
  assistantName,
  greeting,
  pageContext,
  serviceSlug,
  portfolioSlug,
}: AssistantPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    [createInitialMessage(assistantName, greeting)]
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const serviceById = new Map<ServiceId, typeof services[number]>(
    services.map(service => [service.id, service])
  )

  useEffect(() => {
    setMessages([createInitialMessage(assistantName, greeting)])
    setError(null)
    setLastResponse(null)
  }, [assistantName, greeting])

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = { role: 'user', content: message }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)
    setLastResponse(null)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          pageContext,
          serviceSlug,
          portfolioSlug,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data: ChatResponse = await response.json()

      const assistantMessage: ChatMessage = { role: 'assistant', content: data.reply }
      setMessages(prev => [...prev, assistantMessage])
      setLastResponse(data)
    } catch (err) {
      setError("I'm having trouble responding right now. Please try again or contact Ray directly.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-20 right-6 z-50 w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-dark text-white">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-medium">{assistantName || DEFAULT_FRANK_ASSISTANT_NAME}</span>
          <span className="text-xs text-gray-400">AI Assistant</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded"
          aria-label="Close assistant"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        <AssistantMessageList
          messages={messages}
          isLoading={isLoading}
          assistantName={assistantName || DEFAULT_FRANK_ASSISTANT_NAME}
        />
        {error && (
          <div className="mt-2 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        {lastResponse && (
          <div className="mb-4 space-y-3">
            {process.env.NODE_ENV !== 'production' && lastResponse.debug?.path && (
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Path: {lastResponse.debug.path}
              </div>
            )}
            {lastResponse.suggestions && lastResponse.suggestions.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Suggested replies
                </p>
                <div className="flex flex-wrap gap-2">
                  {lastResponse.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSendMessage(suggestion)}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {lastResponse.recommendedServiceSlugs && lastResponse.recommendedServiceSlugs.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Recommended services
                </p>
                <div className="flex flex-wrap gap-2">
                  {lastResponse.recommendedServiceSlugs.map((serviceId) => {
                    const service = serviceById.get(serviceId as ServiceId)
                    return (
                      <Link
                        key={serviceId}
                        href={`/services#${serviceId}`}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        {service?.title || serviceId}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {lastResponse.shouldShowContactCta && (
              <Link
                href={
                  lastResponse.recommendedServiceSlugs?.[0]
                    ? `/contact?service=${encodeURIComponent(lastResponse.recommendedServiceSlugs[0])}`
                    : '/contact'
                }
                className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Contact Ray
              </Link>
            )}
          </div>
        )}
        <AssistantInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
