'use server'
import { redirect } from "next/navigation";
import { auth } from "@/services/auth";
import { SignUpForm } from "../_components/signUpForm";


const Page = async () => {
    const session = await auth();
    if (!session?.user) {
        return (
            <div className="flex justify-center min-h-[500px]">
                <SignUpForm />
            </div>
        )
    } else {

        return redirect('/dashboard')

    }

}
export default Page
