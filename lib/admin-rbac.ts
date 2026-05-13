export type AdminRole = 'owner' | 'admin' | 'operator' | 'viewer'

const roleRank: Record<AdminRole, number> = {
  viewer: 1,
  operator: 2,
  admin: 3,
  owner: 4,
}

function normalizeRole(value: string | undefined | null): AdminRole {
  const role = (value || '').trim().toLowerCase()
  if (role === 'owner' || role === 'admin' || role === 'operator' || role === 'viewer') {
    return role
  }
  return 'owner'
}

export function getCurrentAdminRole(): AdminRole {
  return normalizeRole(process.env.ADMIN_ROLE)
}

export function hasRoleAtLeast(current: AdminRole, minimum: AdminRole) {
  return roleRank[current] >= roleRank[minimum]
}

export function canViewEnterprisePlatform(role: AdminRole) {
  return hasRoleAtLeast(role, 'viewer')
}

export function canEditEnterprisePlatform(role: AdminRole) {
  return hasRoleAtLeast(role, 'admin')
}

export function canPublishEnterprisePlatform(role: AdminRole) {
  return hasRoleAtLeast(role, 'owner')
}
