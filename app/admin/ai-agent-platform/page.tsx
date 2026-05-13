import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { PlatformStageCard } from '@/components/admin/PlatformStageCard'
import { PlatformCapabilityCard } from '@/components/admin/PlatformCapabilityCard'
import { FoundationGovernanceRoadmap } from '@/components/admin/FoundationGovernanceRoadmap'
import { EnterpriseAgentPlatformForm } from '@/components/admin/EnterpriseAgentPlatformForm'
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from '@/lib/admin-auth'
import {
  canEditEnterprisePlatform,
  canPublishEnterprisePlatform,
  canViewEnterprisePlatform,
  getCurrentAdminRole,
} from '@/lib/admin-rbac'
import { getEnterpriseAgentPlatformConfig } from '@/lib/enterprise-ai-agent-platform'

export const metadata: Metadata = {
  title: 'Enterprise AI-Agent Platform | Admin',
  description:
    'Admin commencement plan for an enterprise AI-agent platform with staged delivery and governance controls.',
}

export default async function EnterpriseAgentPlatformAdminPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value

  if (!verifyAdminSessionToken(session)) {
    redirect(
      `/admin/login?next=${encodeURIComponent('/admin/ai-agent-platform')}`
    )
  }

  const role = getCurrentAdminRole()
  if (!canViewEnterprisePlatform(role)) {
    redirect('/admin')
  }

  const canEdit = canEditEnterprisePlatform(role)
  const canPublish = canPublishEnterprisePlatform(role)
  const platformConfig = await getEnterpriseAgentPlatformConfig()

  const inProgressCount = platformConfig.stages.filter(
    (stage) => stage.status === 'in-progress'
  ).length

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
                Enterprise AI-Agent Platform
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-gray-600">
                Commencement workspace for staged rollout, governance controls,
                and execution priorities across the first platform release cycle.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back to dashboard
              </Link>
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
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <Card>
            <CardContent>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Platform stages
              </p>
              <p className="mt-3 text-4xl font-bold text-dark">
                {platformConfig.stages.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                In progress
              </p>
              <p className="mt-3 text-4xl font-bold text-dark">{inProgressCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Capability tracks
              </p>
              <p className="mt-3 text-4xl font-bold text-dark">
                {platformConfig.capabilities.length}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-dark">Delivery roadmap</h2>
            <p className="mt-2 text-sm text-gray-600">
              Start with governance and control points, then expand runtime and
              pilot workflows.
            </p>
          </div>
          <div className="grid gap-4">
            {platformConfig.stages.map((stage) => (
              <PlatformStageCard key={stage.id} stage={stage} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-dark">
              Foundation & governance execution plan
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Detailed phase-level plan for control gates and readiness criteria
              before runtime and pilot expansion.
            </p>
          </div>
          <FoundationGovernanceRoadmap />
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-dark">
              Capability commencement matrix
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Each capability includes a current state and explicit immediate
              next action.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {platformConfig.capabilities.map((capability) => (
              <PlatformCapabilityCard
                key={capability.id}
                capability={capability}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold text-dark">Operating notes</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {platformConfig.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-semibold text-dark">Config editor</h2>
          <EnterpriseAgentPlatformForm
            initialConfig={platformConfig}
            role={role}
            canEdit={canEdit}
            canPublish={canPublish}
          />
        </div>
      </section>
    </div>
  )
}
