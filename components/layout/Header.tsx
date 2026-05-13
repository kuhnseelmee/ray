'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

type HeaderProps = {
  brandText?: string
  logoUrl?: string
  theme?: 'light' | 'dark'
}

export function Header({ brandText = 'Ray', logoUrl = '', theme = 'light' }: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isDark = theme === 'dark'

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md ${
        isDark ? 'border-gray-800 bg-gray-950/95 text-white' : 'border-gray-100 bg-white/95'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className={`text-xl font-bold ${isDark ? 'text-white' : 'text-dark'}`}>
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={brandText} className="h-8 w-auto" />
            ) : (
              brandText
            )}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Get in Touch
            </Link>
          </div>

          <button
            className="p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className={`border-t py-4 md:hidden ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href
                    ? 'text-primary'
                    : isDark
                      ? 'text-gray-300'
                      : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
