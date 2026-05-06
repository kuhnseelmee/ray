'use client'

import { useState, FormEvent } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { IntakeResponse } from '@/lib/ai/types'

interface SmartIntakeFormProps {
  onSubmitSuccess?: () => void
}

export function SmartIntakeForm({ onSubmitSuccess }: SmartIntakeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [classified, setClassified] = useState<IntakeResponse | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const analyzeMessage = async () => {
    if (!formData.message.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/ai/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setClassified(data)
        setShowSummary(true)
      }
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    setIsSubmitting(false)
    onSubmitSuccess?.()
  }

  const resetForm = () => {
    setClassified(null)
    setShowSummary(false)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  return (
    <Card>
      <CardContent>
        {!showSummary ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your name"
              name="name"
              placeholder="What should I call you?"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="Where can I reply?"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              label="Company (optional)"
              name="company"
              placeholder="Your business name"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            />
            <Textarea
              label="How can I help?"
              name="message"
              placeholder="Describe what you need - the more detail the better..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={5}
              required
            />
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={analyzeMessage}
                disabled={!formData.message.trim() || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'AI Assist'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">AI Analysis Complete</h3>
              <div className="space-y-2 text-sm text-green-700">
                <p><strong>Summary:</strong> {classified?.summary}</p>
                <p><strong>Category:</strong> {classified?.category}</p>
                <p><strong>Urgency:</strong> {classified?.urgency}</p>
                <p><strong>Suggested next step:</strong> {classified?.recommendedNextStep}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Your message:</h4>
              <p className="text-sm text-gray-600">{formData.message}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Sending...' : 'Send This'}
              </Button>
              <Button variant="outline" onClick={() => setShowSummary(false)}>
                Edit Message
              </Button>
              <Button variant="ghost" onClick={resetForm}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}