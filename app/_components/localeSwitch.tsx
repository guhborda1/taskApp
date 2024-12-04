'use client'
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FlagIcon } from 'lucide-react';
import { usePathname } from '@/i18n/routing';

export default function LocaleSwitcher() {
    const path = usePathname()
    const locale = useLocale();
    const otherLocale = locale === 'en-US' ? 'pt' : 'en';

    return (
        <Link href={'/' + otherLocale + path} prefetch={false}>
            <FlagIcon />
        </Link>
    );
}