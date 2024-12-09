import { useOrgApp } from "@/providers/OrgProvider"
import { useTranslations } from "next-intl"


const DashboardPage = () => {
    const t = useTranslations()
    const { currentOrganization, currentTeam } = useOrgApp()

    return (
        <div>
            {t('Index.welcome')}
            {currentOrganization && (
                <p>Current Organization: {currentOrganization.name}</p>
            )}
            {currentTeam && (
                <p>Current Team: {currentTeam.name}</p>
            )}
        </div>
    )


}
export default DashboardPage
