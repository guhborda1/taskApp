import { mockMetrics, mockRecentActivity } from './mock-data'

// Simula um atraso de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchDashboardData(organizationId: string, teamId: string) {
  await delay(500) // Simula um atraso de rede de 500ms
  
  // Aqui você poderia adicionar lógica para retornar dados diferentes com base na organização e equipe
  return {
    metrics: mockMetrics,
    recentActivity: mockRecentActivity
  }
}

export async function fetchOrganizations() {
  await delay(300)
  return [
    { id: '1', name: 'Acme Corporation' },
    { id: '2', name: 'Globex Corporation' },
    { id: '3', name: 'Soylent Corp' },
  ]
}

export async function fetchTeams(organizationId: string) {
  await delay(300)
  return [
    { id: '1', name: 'Sales Team' },
    { id: '2', name: 'Marketing Team' },
    { id: '3', name: 'Development Team' },
  ]
}

