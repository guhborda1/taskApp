'use client'
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { SignInSchema, signInSchema } from "@/schema/signInSchema"
import { useTranslations } from "next-intl"
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
type Inputs = {
    email: string
    password: string
}

export function SignInForm() {
    const t = useTranslations("AUTH");
    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const m = useTranslations("MESSAGES");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data: SignInSchema) => {
        setIsLoading(true);

        try {
            const account = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (!account) throw new Error("Something went wrong");

            if (account.error) {
                toast({
                    title: m(account.error),
                    variant: "destructive",
                });
            } else {
                toast({
                    title: m("SUCCESS.SIGN_IN"),
                });
                router.push("/onboarding");
                router.refresh();
            }
        } catch (err) {
            let errMsg = m("ERRORS.DEFAULT");
            if (typeof err === "string") {
                errMsg = err;
            } else if (err instanceof Error) {
                errMsg = m(err.message);
            }
            toast({
                title: errMsg,
                variant: "destructive",
            });
        }
        setIsLoading(false);
    }
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            {...register("email", { required: true })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link
                                                href="#"
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input id="password" type="password" {...register("password", { required: true })} />
                                        {errors.password && <span>{m("ERRORS.WRONG_DATA")}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button type="submit" className="w-full">
                                            Login
                                        </Button>

                                    </div>
                                </div>
                            </form>
                            <Button className="w-full outline bg-transparent text-black hover:bg-primary-foreground dark:border-white dark:text-white border-solid border-sm" onClick={() => signIn('google')
                            }>
                                Login with Google
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="#" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </>

    )

}
