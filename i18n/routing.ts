import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
export const routing = defineRouting({
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    localePrefix: {
        mode: 'always',
        prefixes: {
            'en': '/en',
            'pt': '/pt'
        }
    },

});
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);