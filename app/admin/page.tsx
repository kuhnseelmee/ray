import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from '@/lib/admin-auth'
import { countContactSubmissions, listContactSubmissions } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Ray',
  description: 'Backend dashboard for reviewing contact submissions.',
}

export default async function AdminDashboardPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value

  if (!verifyAdminSessionToken(session)) {
    redirect('/admin/login?next=/admin')
  }

  const [latestSubmissions, totalSubmissions] = await Promise.all([
    listContactSubmissions(5, 0),
    countContactSubmissions(),
  ])

  const latestSubmission = latestSubmissions[0]
  const latestSubmissionAt = latestSubmission
    ? new Date(latestSubmission.created_at).toLocaleString()
    : 'No submissions yet'

  return (
    <div className="bg-light">
      <section className="border-b border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Admin
              </p>
              <h1 className="mt-3 text-4xl font-bold text-dark">
                Backend dashboard
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                Monitor contact activity, review recent submissions, and jump
                straight into the inbox.
              </p>
            </div>

            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <Card>
            <CardContent>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Total submissions
              </p>
              <p className="mt-3 text-4xl font-bold text-dark">{totalSubmissions}</p>
              <p className="mt-2 text-sm text-gray-600">All messages stored in PostgreSQL.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Recent items loaded
              </p>
              <p className="mt-3 text-4xl font-bold text-dark">
                {latestSubmissions.length}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Latest: {latestSubmissionAt}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Inbox
              </p>
              <p className="mt-3 text-4xl font-bold text-dark">Open</p>
              <p className="mt-2 text-sm text-gray-600">
                Review recent leads and route them to the right service.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-dark">
                    Recent submissions
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    The latest five messages from the contact form.
                  </p>
                </div>
                <Link
                  href="/admin/contact-submissions"
                  className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  Open inbox
                </Link>
              </div>

              <div className="space-y-3">
                {latestSubmissions.length ? (
                  latestSubmissions.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-dark">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.email}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {item.service || 'General enquiry'}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 p-6 text-sm text-gray-500">
                    No submissions yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-xl font-semibold text-dark">Quick actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/admin/settings"
                    className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Edit site settings
                  </Link>
                  <Link
                    href="/admin/frank"
                    className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Configure Frank
                  </Link>
                  <Link
                    href="/admin/ai-agent-platform"
                    className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Enterprise AI-Agent Platform
                  </Link>
                  <Link
                    href="/admin/contact-submissions"
                    className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Review all submissions
                  </Link>
                  <Link
                    href="/contact"
                    className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Open public contact form
                  </Link>
                  <Link
                    href="/services"
                    className="block rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Check service pages
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3">
                <h2 className="text-xl font-semibold text-dark">Security</h2>
                <p className="text-sm text-gray-600">
                  Access is protected by a signed httpOnly session cookie. The
                  panel redirects to login if the session is missing or invalid.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
