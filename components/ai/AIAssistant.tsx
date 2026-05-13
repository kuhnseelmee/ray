'use client'

import { useState } from 'react'
import { AssistantLauncher } from './AssistantLauncher'
import { AssistantPanel } from './AssistantPanel'

interface AIAssistantProps {
  assistantName: string
  greeting: string
}

export function AIAssistant({ assistantName, greeting }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AssistantLauncher onOpen={() => setIsOpen(true)} />
      <AssistantPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        assistantName={assistantName}
        greeting={greeting}
      />
    </>
  )
}
