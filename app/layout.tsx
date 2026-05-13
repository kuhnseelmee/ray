import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AIAssistantWrapper } from '@/components/ai/AIAssistantWrapper'
import { getSiteSettings } from '@/lib/site-settings'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ray | Practical Technology Solutions',
  description: 'Practical technology help for real-world business problems. I help businesses and individuals solve technical problems, improve systems, and build practical digital solutions.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()

  return (
    <html lang="en" data-theme={siteSettings.theme}>
      <body className={`${inter.className} ${siteSettings.theme === 'dark' ? 'theme-dark' : ''}`}>
        <Header
          brandText={siteSettings.headerBrandText}
          logoUrl={siteSettings.headerLogoUrl}
          theme={siteSettings.theme}
        />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer
          siteName={siteSettings.siteName}
          tagline={siteSettings.footerTagline}
          contactEmail={siteSettings.contactEmail}
          contactPhone={siteSettings.contactPhone}
          locationLabel={siteSettings.locationLabel}
          githubUrl={siteSettings.githubUrl}
          linkedinUrl={siteSettings.linkedinUrl}
          theme={siteSettings.theme}
        />
        <AIAssistantWrapper />
      </body>
    </html>
  )
}
