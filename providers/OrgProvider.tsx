'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { fetchOrganizations, fetchTeams } from '@/lib/api'

type Organization = {
  id: string
  name: string
}

type Team = {
  id: string
  name: string
}

type AppContextType = {
  organizations: Organization[]
  teams: Team[]
  currentOrganization: Organization | null
  setCurrentOrganization: (org: Organization | null) => void
  currentTeam: Team | null
  setCurrentTeam: (team: Team | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function OrgProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null)
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null)

  useEffect(() => {
    fetchOrganizations().then(setOrganizations)
  }, [])

  useEffect(() => {
    if (currentOrganization) {
      fetchTeams(currentOrganization.id).then(setTeams)
    } else {
      setTeams([])
    }
  }, [currentOrganization])

  return (
    <AppContext.Provider value={{
      organizations,
      teams,
      currentOrganization,
      setCurrentOrganization,
      currentTeam,
      setCurrentTeam
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useOrgApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

