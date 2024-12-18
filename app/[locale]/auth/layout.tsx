import { auth } from '@/services/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    if (session) redirect('/dashboard')
    return children
}
export default AuthLayout
