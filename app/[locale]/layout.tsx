'use server'
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/services/auth";
import "../globals.css"
import type { Metadata, ResolvingMetadata } from 'next'


type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: 'TaskApp', //product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg'], //...previousImages],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  const session = await auth()
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  console.log(session)
  return (


    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider session={session} >
        <QueryProvider>
          <ThemeProvider attribute="class">
            
              {children}
            
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </AuthProvider>
    </NextIntlClientProvider>

  );
}
