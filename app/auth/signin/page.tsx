'use server'
import { redirect } from "next/navigation";
import { SignInForm } from "../_components/signInForm"
import { auth } from "@/services/auth";



const Page = async () => {
    const session = await auth();
    if (!session) {
        return (
            <div className="flex justify-center min-h-[500px]">
                <SignInForm />
            </div>
        )
    } else {
        return redirect('/dashboard')

    }

}
export default Page
