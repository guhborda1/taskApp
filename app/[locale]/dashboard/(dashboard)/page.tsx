'use client'

import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchDashboardData } from '@/lib/api'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Activity, DollarSign, Users, Briefcase } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useOrgApp } from '@/providers/OrgProvider'

export default function DashboardPage() {
    const {
        organizations,
        teams,
        currentOrganization,
        setCurrentOrganization,
        currentTeam,
        setCurrentTeam
    } = useOrgApp()

    const [dashboardData, setDashboardData] = useState<any>(null)

    useEffect(() => {
        if (currentOrganization && currentTeam) {
            fetchDashboardData(currentOrganization.id, currentTeam.id).then(setDashboardData)
        }
    }, [currentOrganization, currentTeam])

    if (!dashboardData || !currentOrganization || !currentTeam) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="flex space-x-4">
                <Select
                    value={currentOrganization.id}
                    onValueChange={(value) => {
                        const org = organizations.find(org => org.id === value)
                        if (org) setCurrentOrganization(org)
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                        {organizations.map((org) => (
                            <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={currentTeam.id}
                    onValueChange={(value) => {
                        const team = teams.find(team => team.id === value)
                        if (team) setCurrentTeam(team)
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                        {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="bg-muted p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{currentOrganization.name}</h2>
                <p className="text-muted-foreground">Team: {currentTeam.name}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatNumber(dashboardData.metrics.totalCustomers)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.metrics.activeDeals}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(dashboardData.metrics.revenueThisMonth)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboardData.metrics.customerSatisfaction.toFixed(1)}/5.0</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {dashboardData.recentActivity.map((activity: any) => (
                            <li key={activity.id} className="flex items-start space-x-4">
                                <div className="bg-primary/10 text-primary p-2 rounded-full">
                                    <Activity className="h-4 w-4" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.type}</p>
                                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(activity.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {dashboardData.recentActivity.map((activity: any) => (
                            <li key={activity.id} className="flex items-start space-x-4">
                                <div className="bg-primary/10 text-primary p-2 rounded-full">
                                    <Activity className="h-4 w-4" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.type}</p>
                                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(activity.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

