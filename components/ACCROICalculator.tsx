'use client'

import { useMemo, useState, type ChangeEvent } from 'react'
import { calculateACCROI } from '@/lib/calculators/acc-roi'

const currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

const defaultValues = {
  participants: 25,
  hourlyRate: 38,
  adminHours: 12,
  missedShifts: 6,
  incidents: 2,
}

function parseNumber(value: string, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function formatSummary(data: typeof defaultValues, results: ReturnType<typeof calculateACCROI>) {
  return [
    'ACC ROI Calculator summary',
    `Participants: ${data.participants}`,
    `Hourly rate: ${currencyFormatter.format(data.hourlyRate)}`,
    `Admin hours per week: ${data.adminHours}`,
    `Missed shifts per month: ${data.missedShifts}`,
    `Incidents per month: ${data.incidents}`,
    `Estimated total savings: ${currencyFormatter.format(results.totalSavings)}`,
    `Estimated ACC cost: ${currencyFormatter.format(results.accCost)}`,
    `Estimated net gain: ${currencyFormatter.format(results.netGain)}`,
  ].join('\n')
}

export function ACCROICalculator() {
  const [inputs, setInputs] = useState(defaultValues)
  const [copied, setCopied] = useState(false)

  const results = useMemo(() => {
    return calculateACCROI(inputs)
  }, [inputs])

  const savingsVsCost = results.totalSavings - results.accCost
  const isPositive = savingsVsCost >= 0
  const summary = formatSummary(inputs, results)
  const contactHref = `/contact?service=ndis-roi-calculator&message=${encodeURIComponent(summary)}`
  const mailtoHref = `mailto:hello@ray.dev?subject=${encodeURIComponent(
    'ACC ROI Calculator summary'
  )}&body=${encodeURIComponent(summary)}`

  const handleChange = (key: keyof typeof defaultValues) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputs(prev => ({
      ...prev,
      [key]: parseNumber(event.target.value, prev[key]),
    }))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy ROI summary:', error)
    }
  }

  return (
    <div id="ndis-roi-calculator" className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 bg-slate-950 px-6 py-5 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          NDIS ROI Calculator
        </p>
        <h3 className="mt-2 text-2xl font-bold">
          Estimate the value of reducing admin, missed shifts, and incident risk.
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Use this quick model to test whether an ACC-style operational change is likely to pay back for your provider.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <form className="space-y-5 p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Participants</span>
              <input
                type="number"
                min="0"
                step="1"
                value={inputs.participants}
                onChange={handleChange('participants')}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Hourly rate</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={inputs.hourlyRate}
                onChange={handleChange('hourlyRate')}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Admin hours per week</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={inputs.adminHours}
                onChange={handleChange('adminHours')}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Missed shifts per month</span>
              <input
                type="number"
                min="0"
                step="1"
                value={inputs.missedShifts}
                onChange={handleChange('missedShifts')}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Incidents per month</span>
            <input
              type="number"
              min="0"
              step="1"
              value={inputs.incidents}
              onChange={handleChange('incidents')}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-gray-600">
            <p className="font-medium text-gray-800">How the model works</p>
            <p className="mt-2">
              It estimates savings from admin time, missed shifts, incident reduction, and compliance risk reduction, then subtracts the ACC cost.
            </p>
          </div>
        </form>

        <div className="border-t border-gray-200 bg-slate-50 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Estimated results
          </p>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Total savings</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {currencyFormatter.format(results.totalSavings)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">ACC cost</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {currencyFormatter.format(results.accCost)}
              </p>
            </div>

            <div className={`rounded-2xl p-4 shadow-sm ring-1 ${isPositive ? 'bg-emerald-50 ring-emerald-100' : 'bg-rose-50 ring-rose-100'}`}>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Net gain</p>
              <p className={`mt-2 text-3xl font-bold ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                {currencyFormatter.format(Math.abs(savingsVsCost))}
                <span className="ml-2 text-sm font-medium uppercase tracking-wide">
                  {isPositive ? 'positive' : 'negative'}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-slate-950">What this is useful for</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Testing an operations improvement before you commission it</li>
              <li>• Putting rough numbers in front of directors or managers</li>
              <li>• Comparing a manual process with a more automated workflow</li>
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-slate-950 p-5 text-white">
            <h4 className="text-sm font-semibold text-white">Share this estimate</h4>
            <p className="mt-2 text-sm text-slate-300">
              Copy the summary or send it straight to Ray with the current values prefilled in the contact form.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-6 text-slate-200 whitespace-pre-wrap">
{summary}
            </pre>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition-colors hover:bg-slate-100"
              >
                {copied ? 'Copied' : 'Copy summary'}
              </button>
              <a
                href={contactHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-3 font-medium text-white transition-colors hover:bg-slate-900"
              >
                Send to contact form
              </a>
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-3 font-medium text-white transition-colors hover:bg-slate-900"
              >
                Email summary
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={contactHref}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Discuss this calculator
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary"
            >
              Contact Ray
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
