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
  title: 'Contact Submissions | Ray',
  description: 'Review and manage incoming contact submissions.',
}

type AdminPageProps = {
  searchParams?: {
    limit?: string
    offset?: string
  }
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value ?? '')
  if (!Number.isFinite(parsed)) {
    return fallback
  }
  return Math.max(0, Math.floor(parsed))
}

export default async function ContactSubmissionsAdminPage({
  searchParams,
}: AdminPageProps) {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value

  if (!verifyAdminSessionToken(session)) {
    redirect(
      `/admin/login?next=${encodeURIComponent('/admin/contact-submissions')}`
    )
  }

  const limit = Math.min(parsePositiveInteger(searchParams?.limit, 20) || 20, 100)
  const offset = parsePositiveInteger(searchParams?.offset, 0)

  const [items, total] = await Promise.all([
    listContactSubmissions(limit, offset),
    countContactSubmissions(),
  ])

  const nextOffset = offset + items.length
  const previousOffset = Math.max(offset - limit, 0)
  const hasPrevious = offset > 0
  const hasNext = nextOffset < total
  const pageStart = items.length ? offset + 1 : 0
  const pageEnd = items.length ? Math.min(offset + items.length, total) : 0

  return (
    <div className="bg-light">
      <section className="border-b border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Admin
              </p>
              <h1 className="mt-3 text-4xl font-bold text-dark">
                Contact submissions
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                Review inquiries captured from the contact form.
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

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                Showing {pageStart}-{pageEnd} of {total}
              </p>
              <p className="text-sm text-gray-600">
                Page size: {limit}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {items.length ? (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold text-dark">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-600">{item.email}</p>
                      </div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Company
                        </p>
                        <p className="mt-1 text-sm text-gray-800">
                          {item.company || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Service
                        </p>
                        <p className="mt-1 text-sm text-gray-800">
                          {item.service || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Message
                      </p>
                      <p className="mt-2 whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-800">
                        {item.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-sm text-gray-600">
                No submissions found.
              </CardContent>
            </Card>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-3">
              <Link
                aria-disabled={!hasPrevious}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  hasPrevious
                    ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    : 'pointer-events-none border-gray-100 text-gray-300'
                }`}
                href={
                  hasPrevious
                    ? `/admin/contact-submissions?limit=${limit}&offset=${previousOffset}`
                    : '#'
                }
              >
                Previous
              </Link>
              <Link
                aria-disabled={!hasNext}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  hasNext
                    ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    : 'pointer-events-none border-gray-100 text-gray-300'
                }`}
                href={
                  hasNext
                    ? `/admin/contact-submissions?limit=${limit}&offset=${nextOffset}`
                    : '#'
                }
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
