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
    const au = useTranslations("AUTH");

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

            console.log(account)

            if (account?.error) {
                toast({
                    title: account.error,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: m("SUCCESS.SIGN_IN"),
                });


            }
        } catch (err) {
            let errMsg = m("ERRORS.DEFAULT");
            if (typeof err === "string") {
                errMsg = err;
            } else if (err instanceof Error) {
                errMsg = err.message;
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
                <Card className="mx-auto md:!min-w-[380px] md:!max-w-[380px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">{au('SIGN_IN.TITLE')}</CardTitle>
                        <CardDescription>
                            {au('SIGN_IN.DESC')}
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
                                            <Label htmlFor="password">{au("PASSWORD")}</Label>
                                            <Link
                                                href="/auth/forgot-password"
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                {au('SIGN_IN.FORGOT_PASSWORD')}
                                            </Link>
                                        </div>
                                        <Input id="password" type="password" placeholder={`${au("PASSWORD")}`} {...register("password", { required: true })} />
                                        {errors.password && <span>{m("ERRORS.WRONG_DATA")}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button type="submit" className="w-full">
                                            {isLoading ? m("PENDING.LOADING") : au('SIGN_IN.TITLE')}
                                        </Button>

                                    </div>
                                </div>
                            </form>
                            <Button className="w-full outline bg-transparent text-black hover:bg-primary-foreground dark:border-white dark:text-white border-solid border-sm" onClick={() => signIn('google')
                            }>
                                {au('SIGN_IN.PROVIDERS.GOOGLE')}
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            {au("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")}
                            <Button variant={'ghost'} asChild>
                                <Link href={'/auth/signup'} className="underline" >
                                    {au("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")}
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </>

    )

}
