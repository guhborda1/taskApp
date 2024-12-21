"use client";


import { useLocale, useTranslations } from "next-intl";
//@ts-ignore


import { useChangeLocale } from "@/hooks/useChangeLocale";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { string } from "zod";
import { LanguagesIcon } from "lucide-react";

interface Props {
    variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
    size?: "default" | "sm" | "lg" | "icon" | null;
    alignHover?: "center" | "start" | "end";
    alignDropdown?: "center" | "start" | "end";
    textSize?: "text-lg" | "text-base";
}

export const LocaleSwitcher = ({
    size = "default",
    variant = "default",
    alignHover = "center",
    alignDropdown = "center",
    textSize = "text-base",
}: Props) => {
    const locale = useLocale();

    const t = useTranslations("COMMON");
    const s = useTranslations("SIDEBAR");


    const { isLoading, isPending, onSelectChange } = useChangeLocale();

    const lang = {
        pt: [{ sigla: 'pt', name: 'Português' }, { sigla: 'en', name: 'Inglês' }],
        en: [{ sigla: 'pt', name: 'Portuguese' }, { sigla: 'en', name: 'English' }]
    }
    return (
        <HoverCard openDelay={250} closeDelay={250}>
            <DropdownMenu>

                <DropdownMenuTrigger className="flex items-center" asChild>
                    <DropdownMenuItem>
                        <LanguagesIcon />
                        {isLoading ? (
                            <LoadingState className="mr-0" />
                        ) : (
                            (locale === 'pt' ? s('LANG.PT') : s("LANG.EN"))
                        )}
                        <span className="sr-only">{t("LANG_HOVER")}</span>
                    </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={alignDropdown}>
                    <DropdownMenuItem
                        onClick={() => {
                            onSelectChange("pt");
                        }}
                        className="cursor-pointer"
                    >
                        {
                            (locale === 'pt' ? s('LANG.PT') : s("LANG.PT"))
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            onSelectChange("en");
                        }}
                        className="cursor-pointer"
                    >
                        {
                            (locale === 'en' ? s('LANG.EN') : s("LANG.EN"))
                        }
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <HoverCardContent align={alignHover}>
                <span>{t("LANG_HOVER")} seilas</span>
            </HoverCardContent>
        </HoverCard>
    );
};