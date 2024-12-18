import { useTranslations } from 'next-intl'
import React from 'react'

const page = () => {
    const m = useTranslations('ROUTES')
    return (
        <div>Contatos</div>
    )
}
export default page