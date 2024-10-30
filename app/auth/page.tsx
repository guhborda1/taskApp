'use server'
import { redirect } from "next/navigation";
import AuthForm from "./_components/auth-form"
import { auth } from "@/services/auth";


const Page = async () => {
    const session = await auth();
    if (!session) {
        return (
            <div className="flex justify-center min-h-[500px]">
                <AuthForm />
            </div>
        )
    } else {

        return redirect('/dashboard')

    }

}
export default Page
