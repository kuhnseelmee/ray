'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { PortfolioResponse } from '@/lib/ai/types'

interface PortfolioAskCardProps {
  portfolioSlug: string
  projectTitle: string
}

const SUGGESTED_QUESTIONS = [
  'What tools or technologies were used?',
  'How long did this project take?',
  'Can you do something similar for my business?',
]

export function PortfolioAskCard({ portfolioSlug, projectTitle }: PortfolioAskCardProps) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showInput, setShowInput] = useState(true)

  const askQuestion = async (q: string) => {
    setQuestion(q)
    setIsLoading(true)
    setAnswer(null)

    try {
      const response = await fetch('/api/ai/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioSlug, question: q }),
      })

      if (response.ok) {
        const data: PortfolioResponse = await response.json()
        setAnswer(data.answer)
        setShowInput(false)
      }
    } catch (error) {
      setAnswer("I'm having trouble answering that right now. Feel free to contact Ray directly.")
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setAnswer(null)
    setQuestion('')
    setShowInput(true)
  }

  return (
    <Card className="mt-6">
      <CardContent>
        <h3 className="font-medium text-dark mb-4">Ask about this project</h3>

        {showInput && !answer && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => askQuestion(q)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your own question..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && question.trim()) {
                    askQuestion(question.trim())
                  }
                }}
              />
              <button
                onClick={() => question.trim() && askQuestion(question.trim())}
                disabled={!question.trim() || isLoading}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                Ask
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        {answer && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-500 mb-2">You asked:</p>
              <p className="text-gray-700">{question}</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
            </div>
            <button
              onClick={reset}
              className="text-sm text-primary hover:underline"
            >
              Ask another question
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}