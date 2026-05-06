'use client'

import { useState } from 'react'
import { AssistantLauncher } from './AssistantLauncher'
import { AssistantPanel } from './AssistantPanel'

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AssistantLauncher onOpen={() => setIsOpen(true)} />
      <AssistantPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}