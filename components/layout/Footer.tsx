import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
]

type FooterProps = {
  siteName?: string
  tagline?: string
  contactEmail?: string
  contactPhone?: string
  locationLabel?: string
  githubUrl?: string
  linkedinUrl?: string
  theme?: 'light' | 'dark'
}

export function Footer({
  siteName = 'Ray',
  tagline = '',
  contactEmail = 'hello@ray.dev',
  contactPhone = '',
  locationLabel = '',
  githubUrl = '',
  linkedinUrl = '',
  theme = 'light',
}: FooterProps) {
  const socialLinks = [
    { href: githubUrl, label: 'GitHub' },
    { href: linkedinUrl, label: 'LinkedIn' },
  ].filter((link) => Boolean(link.href))

  const isDark = theme === 'dark'

  return (
    <footer className={isDark ? 'bg-black text-white' : 'bg-dark text-white'}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="mb-4 text-lg font-bold">{siteName}</h3>
            <p className="mb-4 max-w-md text-sm text-gray-400">{tagline}</p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Contact</h4>
            <p className="text-sm text-gray-400">
              Available for consultations
              <br />
              and project inquiries
            </p>
            {locationLabel ? (
              <p className="mt-2 text-sm text-gray-400">{locationLabel}</p>
            ) : null}
            <a
              href={`mailto:${contactEmail}`}
              className="mt-4 inline-block text-sm text-primary hover:underline"
            >
              {contactEmail}
            </a>
            {contactPhone ? (
              <>
                <br />
                <a href={`tel:${contactPhone}`} className="mt-2 inline-block text-sm text-primary hover:underline">
                  {contactPhone}
                </a>
              </>
            ) : null}
            <br />
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
