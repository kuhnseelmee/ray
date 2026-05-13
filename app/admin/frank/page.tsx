import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FrankConfigForm } from '@/components/admin/FrankConfigForm'
import { Card, CardContent } from '@/components/ui/Card'
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from '@/lib/admin-auth'
import { getFrankAssistantConfig } from '@/lib/ai/frank-config'

export const metadata: Metadata = {
  title: 'Frank Config | Ray',
  description: 'Configure Frank’s prompt, persona, greeting, and response rules.',
}

export default async function FrankAdminPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value

  if (!verifyAdminSessionToken(session)) {
    redirect('/admin/login?next=/admin/frank')
  }

  const initialConfig = await getFrankAssistantConfig()

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
                Frank configuration
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                Tune the assistant’s name, greeting, persona, system prompt, and
                operating rules without redeploying the site.
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  Runtime control
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Changes here update the assistant responses on the next request.
                </p>
              </div>
              <Link
                href="/admin"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back to dashboard
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FrankConfigForm initialConfig={initialConfig} />
        </div>
      </section>
    </div>
  )
}
