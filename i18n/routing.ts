import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
export const routing = defineRouting({
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'en-US',
    localePrefix: {
        mode: 'always',
        prefixes: {
            'en-US': '/en',
            'pt-BR': '/pt'
        }
    },

});
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);