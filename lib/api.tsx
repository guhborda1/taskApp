import { mockOrganizations, mockTeams, mockMetrics, mockRecentActivity } from './mock-data'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export type Organization = {
  id: string
  name: string
}

export type Team = {
  id: string
  name: string
  organizationId: string
}

export async function fetchDashboardData(organizationId: string, teamId: string) {
  await delay(500)
  return {
    metrics: mockMetrics[organizationId]?.[teamId] || {},
    recentActivity: mockRecentActivity[organizationId]?.[teamId] || []
  }
}

export async function fetchOrganizations(): Promise<Organization[]> {
  await delay(300)
  return mockOrganizations
}

export async function fetchTeams(organizationId: string): Promise<Team[]> {
  await delay(300)
  return mockTeams[organizationId] || []
}

export async function updateSelectedOrganization(organizationId: string): Promise<void> {
  await delay(300)
  console.log(`Updated selected organization to: ${organizationId}`)
}

export async function updateSelectedTeam(teamId: string): Promise<void> {
  await delay(300)
  console.log(`Updated selected team to: ${teamId}`)
}

