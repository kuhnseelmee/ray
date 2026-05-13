import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from '@/lib/admin-auth'
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm'
import { getSiteSettings } from '@/lib/site-settings'

export const metadata: Metadata = {
  title: 'Admin Site Settings | Ray',
  description: 'Manage global site details, links, and display settings.',
}

export default async function AdminSiteSettingsPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value

  if (!verifyAdminSessionToken(session)) {
    redirect('/admin/login?next=/admin/settings')
  }

  const config = await getSiteSettings()

  return (
    <div className="bg-light">
      <section className="border-b border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Admin
              </p>
              <h1 className="mt-3 text-4xl font-bold text-dark">Site settings</h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                Manage global website variables such as contact details, social links,
                theme preference, and header branding.
              </p>
            </div>
            <Link
              href="/admin"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SiteSettingsForm initialConfig={config} />
        </div>
      </section>
    </div>
  )
}
