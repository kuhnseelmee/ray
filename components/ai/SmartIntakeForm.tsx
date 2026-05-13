'use client'

import { useEffect, useState, FormEvent } from 'react'
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
    service: '',
    message: '',
  })
  const [classified, setClassified] = useState<IntakeResponse | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const hasPrefilledContext = Boolean(formData.service || formData.message)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service')
    const message = params.get('message')

    if (service || message) {
      setFormData(prev => ({
        ...prev,
        service: service || prev.service,
        message: message || prev.message,
      }))
    }
  }, [])

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
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to send message')
      }

      setSubmitStatus('Message saved. I will review it and get back to you.')
      onSubmitSuccess?.()
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
      setClassified(null)
      setShowSummary(false)
    } catch (error) {
      setSubmitStatus(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setClassified(null)
    setShowSummary(false)
    setSubmitStatus(null)
    setFormData({ name: '', email: '', company: '', service: '', message: '' })
  }

  return (
    <Card>
      <CardContent>
        {!showSummary ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                {submitStatus}
              </div>
            )}
            {hasPrefilledContext && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Review before sending
                </p>
                <h3 className="mt-2 text-lg font-bold text-amber-950">
                  Your ROI summary has been prefilled
                </h3>
                <p className="mt-2 text-sm text-amber-900">
                  Check the service and message below. If anything looks off, edit it before sending.
                </p>
                <div className="mt-4 space-y-3 rounded-xl bg-white/80 p-4 text-sm text-gray-700">
                  {formData.service && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Service</p>
                      <p className="mt-1 font-medium text-gray-900">{formData.service}</p>
                    </div>
                  )}
                  {formData.message && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Prefilled summary</p>
                      <pre className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">{formData.message}</pre>
                    </div>
                  )}
                </div>
              </div>
            )}

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
            <Input
              label="Service interest (optional)"
              name="service"
              placeholder="What are you enquiring about?"
              value={formData.service}
              onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
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
                {isSubmitting ? 'Saving...' : 'Send Message'}
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
            {submitStatus && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                {submitStatus}
              </div>
            )}
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
                {isSubmitting ? 'Saving...' : 'Send This'}
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
