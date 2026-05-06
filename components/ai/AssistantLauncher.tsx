'use client'

import { useState } from 'react'

interface AssistantLauncherProps {
  onOpen: () => void
}

export function AssistantLauncher({ onOpen }: AssistantLauncherProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-200 group"
      aria-label="Open AI Assistant"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span className={`text-sm font-medium transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'} group-hover:opacity-100`}>
        Ask Frank
      </span>
    </button>
  )
}