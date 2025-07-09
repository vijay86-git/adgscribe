"use client"
import * as React from "react"
import Image from 'next/image'
import Link from 'next/link'

import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function VersionSwitcher({
    versions,
    defaultVersion,
}: {
    versions: string[]
    defaultVersion: string
}) {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex flex-col gap-0.5 leading-none">
                    <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <span className=""><Image width={180} height={43} src={`/images/logo.png`} priority alt="ADGScribe" /></span>
                        </Link>
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
