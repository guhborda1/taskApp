import { Organization, Team } from './api'

export const mockOrganizations: Organization[] = [
  { id: '1', name: 'Acme Corporation' },
  { id: '2', name: 'Globex Corporation' },
  { id: '3', name: 'Soylent Corp' },
]

export const mockTeams: { [organizationId: string]: Team[] } = {
  '1': [
    { id: '1', name: 'Sales Team', organizationId: '1' },
    { id: '2', name: 'Marketing Team', organizationId: '1' },
    { id: '3', name: 'Development Team', organizationId: '1' },
  ],
  '2': [
    { id: '4', name: 'Product Team', organizationId: '2' },
    { id: '5', name: 'Customer Support', organizationId: '2' },
  ],
  '3': [
    { id: '6', name: 'Research Team', organizationId: '3' },
    { id: '7', name: 'Operations Team', organizationId: '3' },
  ],
}

type Metrics = {
  totalCustomers: number
  activeDeals: number
  revenueThisMonth: number
  customerSatisfaction: number
}

type Activity = {
  id: string
  type: string
  description: string
  timestamp: string
}

export const mockMetrics: { [organizationId: string]: { [teamId: string]: Metrics } } = {
  '1': {
    '1': {
      totalCustomers: 1234,
      activeDeals: 56,
      revenueThisMonth: 789000,
      customerSatisfaction: 4.7,
    },
    '2': {
      totalCustomers: 987,
      activeDeals: 34,
      revenueThisMonth: 567000,
      customerSatisfaction: 4.5,
    },
    '3': {
      totalCustomers: 456,
      activeDeals: 12,
      revenueThisMonth: 234000,
      customerSatisfaction: 4.8,
    },
  },
  '2': {
    '4': {
      totalCustomers: 2345,
      activeDeals: 78,
      revenueThisMonth: 1234000,
      customerSatisfaction: 4.6,
    },
    '5': {
      totalCustomers: 3456,
      activeDeals: 23,
      revenueThisMonth: 345000,
      customerSatisfaction: 4.9,
    },
  },
  '3': {
    '6': {
      totalCustomers: 567,
      activeDeals: 45,
      revenueThisMonth: 678000,
      customerSatisfaction: 4.4,
    },
    '7': {
      totalCustomers: 890,
      activeDeals: 67,
      revenueThisMonth: 901000,
      customerSatisfaction: 4.3,
    },
  },
}

export const mockRecentActivity: { [organizationId: string]: { [teamId: string]: Activity[] } } = {
  '1': {
    '1': [
      { id: '1', type: 'New Deal', description: 'Closed deal with XYZ Corp worth $500,000', timestamp: '2023-06-10T14:30:00Z' },
      { id: '2', type: 'Customer Interaction', description: 'Follow-up call with ABC Inc', timestamp: '2023-06-10T13:15:00Z' },
      { id: '3', type: 'Task Completed', description: 'Prepared quarterly sales report', timestamp: '2023-06-10T11:45:00Z' },
    ],
    '2': [
      { id: '4', type: 'Campaign Launched', description: 'Summer promotion campaign kicked off', timestamp: '2023-06-10T10:00:00Z' },
      { id: '5', type: 'Social Media Update', description: 'New product teaser posted on Instagram', timestamp: '2023-06-09T16:20:00Z' },
    ],
    '3': [
      { id: '6', type: 'Bug Fixed', description: 'Resolved critical issue in payment gateway', timestamp: '2023-06-10T09:30:00Z' },
      { id: '7', type: 'Feature Deployed', description: 'New analytics dashboard live in production', timestamp: '2023-06-09T15:45:00Z' },
    ],
  },
  '2': {
    '4': [
      { id: '8', type: 'Product Update', description: 'Version 2.0 of flagship product released', timestamp: '2023-06-10T11:00:00Z' },
      { id: '9', type: 'Market Research', description: 'Completed user survey for new feature set', timestamp: '2023-06-09T14:30:00Z' },
    ],
    '5': [
      { id: '10', type: 'Customer Feedback', description: 'Positive review from major client', timestamp: '2023-06-10T10:15:00Z' },
      { id: '11', type: 'Support Ticket Resolved', description: 'Fixed critical issue for VIP customer', timestamp: '2023-06-09T16:45:00Z' },
    ],
  },
  '3': {
    '6': [
      { id: '12', type: 'Research Milestone', description: 'Breakthrough in sustainable materials research', timestamp: '2023-06-10T13:00:00Z' },
      { id: '13', type: 'Patent Filed', description: 'New eco-friendly packaging technology patent submitted', timestamp: '2023-06-09T11:30:00Z' },
    ],
    '7': [
      { id: '14', type: 'Process Improvement', description: 'Implemented new inventory management system', timestamp: '2023-06-10T09:45:00Z' },
      { id: '15', type: 'Safety Record', description: '365 days without workplace incidents', timestamp: '2023-06-09T17:00:00Z' },
    ],
  },
}

