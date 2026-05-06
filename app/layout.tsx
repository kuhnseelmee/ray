import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AIAssistantWrapper } from '@/components/ai/AIAssistantWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ray | Practical Technology Solutions',
  description: 'Practical technology help for real-world business problems. I help businesses and individuals solve technical problems, improve systems, and build practical digital solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <AIAssistantWrapper />
      </body>
    </html>
  )
}