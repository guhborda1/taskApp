'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { fetchOrganizations, fetchTeams, updateSelectedOrganization, updateSelectedTeam, Organization, Team } from '@/lib/api'

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
    fetchOrganizations().then(orgs => {
      setOrganizations(orgs)
      if (orgs.length > 0 && !currentOrganization) {
        setCurrentOrganization(orgs[0])
      }
    })
  }, [])

  useEffect(() => {
    if (currentOrganization) {
      fetchTeams(currentOrganization.id).then(fetchedTeams => {
        setTeams(fetchedTeams)
        if (fetchedTeams.length > 0 && !currentTeam) {
          setCurrentTeam(fetchedTeams[0])
        }
      })
      updateSelectedOrganization(currentOrganization.id)
    } else {
      setTeams([])
      setCurrentTeam(null)
    }
  }, [currentOrganization])

  useEffect(() => {
    if (currentTeam) {
      updateSelectedTeam(currentTeam.id)
    }
  }, [currentTeam])

  const setCurrentOrganizationAndUpdate = (org: Organization | null) => {
    setCurrentOrganization(org)
    setCurrentTeam(null)
  }

  const setCurrentTeamAndUpdate = (team: Team | null) => {
    setCurrentTeam(team)
  }

  return (
    <AppContext.Provider value={{
      organizations,
      teams,
      currentOrganization,
      setCurrentOrganization: setCurrentOrganizationAndUpdate,
      currentTeam,
      setCurrentTeam: setCurrentTeamAndUpdate
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

