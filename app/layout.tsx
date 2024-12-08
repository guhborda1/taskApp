'use server'
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css'
export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string }
}>) {
    const locale = await getLocale()

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()
    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
