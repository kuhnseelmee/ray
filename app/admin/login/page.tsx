import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'
import {
  ADMIN_SESSION_COOKIE,
  getSafeAdminRedirectPath,
  verifyAdminSessionToken,
} from '@/lib/admin-auth'

export const metadata: Metadata = {
  title: 'Admin Login | Ray',
  description: 'Sign in to access the contact submissions inbox.',
}

type LoginPageProps = {
  searchParams?: {
    next?: string
  }
}

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value
  const nextPath = getSafeAdminRedirectPath(searchParams?.next)

  if (verifyAdminSessionToken(session)) {
    redirect(nextPath)
  }

  return (
    <div className="bg-light">
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-bold text-dark">Sign in</h1>
          <p className="mt-4 text-lg text-gray-600">
            Enter the admin password to access the contact submissions inbox.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminLoginForm nextPath={nextPath} />
        </div>
      </section>
    </div>
  )
}
