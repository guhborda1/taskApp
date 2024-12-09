'use client'
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { SignUpSchema } from "@/schema/signUpSchema"
import { useTranslations } from "next-intl"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CheckIcon, X } from "lucide-react"

type Inputs = {
    email: string
    password: string
    confirm_password: string
}
export function SignUpForm() {
    const t = useTranslations('AUTH')
    const m = useTranslations('MESSAGES')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {

        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        if (data.confirm_password != data.password) {
            setIsLoading(true)

            toast({
                action: (
                    <div className="w-full flex items-center">
                        <CheckIcon className="mr-2" />
                        <span className="first-letter:capitalize">
                            {t("SIGN_UP.DIFFERENT_PASSWORDS")}
                        </span>
                    </div>
                ),
                variant: "destructive",
            });
            return false
        }

        try {


            const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            const register = await registerResponse.json();
            console.log(register)
            if (register.error) {
                setIsLoading(false)

                toast({
                    action: (
                        <div className="w-full flex items-center">
                            <X className="mr-2" />
                            <span className="first-letter:capitalize">
                                {m(`ERRORS.${register.message}`)}
                            </span>
                        </div>
                    ),
                    variant: "destructive",
                });

            } else {
                setIsLoading(false)

                toast({
                    action: (
                        <div className="w-full flex items-center">
                            <CheckIcon className="mr-2" />
                            <span className="first-letter:capitalize">
                                {m("SUCCESS.SIGN_IN")}
                            </span>
                        </div>
                    ),
                    variant: "success",
                });

                // router.push("/onboarding");
                // router.refresh();
            }
        } catch (error: any) {
            throw new Error(error.message)
        }

    }


    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="mx-auto md:!min-w-[380px] md:!max-w-[380px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">{t("SIGN_UP.TITLE")}</CardTitle>
                        <CardDescription>
                            {t("SIGN_UP.DESC")}
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
                                            <Label htmlFor="password">{t("PASSWORD")}</Label>

                                        </div>
                                        <Input id="password" type="password" placeholder={`${t("PASSWORD")}`} {...register("password", { required: true })} />
                                        {errors.password && <span>{m("ERRORS.FIELD_REQUIRED")}</span>}
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">{t("SIGN_UP.CONFIRM_PASSWORD")}</Label>

                                        </div>
                                        <Input id="password" type="password" placeholder={`${t("SIGN_UP.CONFIRM_PASSWORD")}`} {...register("confirm_password", { required: true })} />
                                        {errors.confirm_password && <span>{m("ERRORS.FIELD_REQUIRED")}</span>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button type="submit" className="w-full">
                                            {isLoading ? m('PENDING.LOADING') : t('SIGN_UP.SUBMIT_BTN')}
                                        </Button>

                                    </div>
                                </div>
                            </form>
                            <Button variant="outline" className="w-full" onClick={() => signIn('google')
                            }>
                                {t("SIGN_UP.PROVIDERS.GOOGLE")}
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            {t("SIGN_UP.HAVE_ACCOUNT.FIRST")}
                            <Button asChild variant={'ghost'}>
                                <Link href="/auth/" className="underline">
                                    {t("SIGN_UP.HAVE_ACCOUNT.SECOND")}
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </>

    )
}
