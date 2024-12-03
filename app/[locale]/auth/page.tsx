'use server'
import { redirect } from "next/navigation";

import { auth } from "@/services/auth";
import { SignInForm } from "./_components/signInForm";



const Page = async () => {
    const session = await auth();
    if (!session?.user) {
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
