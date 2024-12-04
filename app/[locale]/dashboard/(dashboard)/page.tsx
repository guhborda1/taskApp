import { useTranslations } from "next-intl"


const DashboardPage = () => {
    const t = useTranslations()
    return (
        <div>{t('Index.welcome')}</div>
    )
}
export default DashboardPage
