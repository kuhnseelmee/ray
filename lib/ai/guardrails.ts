export interface GuardrailResult {
  passed: boolean;
  reason?: string;
  sanitized?: string;
}

const MAX_MESSAGE_LENGTH = 2000
const MIN_MESSAGE_LENGTH = 1

const INJECTION_PATTERNS = [
  /system\s*:/i,
  /ignore\s+(all\s+)?previous\s+(instructions)?/i,
  /you\s+are\s+now/i,
  /forget\s+(everything|all\s+previous)/i,
  /<script/i,
  /<\/script>/i,
  /\[INST\]/i,
  /\[SYS\]/i,
]

const BLOCKED_REQUESTS = [
  'how to hack',
  'how to break',
  'how to bypass',
  'reveal your system prompt',
  'repeat your instructions',
  'show me the prompt',
]

export function validateInput(message: string): GuardrailResult {
  if (!message || message.trim().length < MIN_MESSAGE_LENGTH) {
    return {
      passed: false,
      reason: 'Message is empty or too short',
    }
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      passed: false,
      reason: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`,
    }
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(message)) {
      return {
        passed: false,
        reason: 'Invalid input detected',
      }
    }
  }

  const lowerMessage = message.toLowerCase()
  for (const blocked of BLOCKED_REQUESTS) {
    if (lowerMessage.includes(blocked)) {
      return {
        passed: false,
        reason: 'Request outside of assistant scope',
      }
    }
  }

  const sanitized = message
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()

  return {
    passed: true,
    sanitized,
  }
}

export function truncateResponse(response: string, maxLength: number = 800): string {
  if (response.length <= maxLength) {
    return response
  }

  const truncated = response.substring(0, maxLength)
  const lastPeriod = truncated.lastIndexOf('.')

  if (lastPeriod > maxLength * 0.5) {
    return truncated.substring(0, lastPeriod + 1)
  }

  return truncated + '...'
}

export function sanitizeOutput(output: string): string {
  return output
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
}

export function isRateLimited(ip: string): boolean {
  return false
}

export function getRateLimitKey(ip: string, endpoint: string): string {
  return `ratelimit:${endpoint}:${ip}`
}