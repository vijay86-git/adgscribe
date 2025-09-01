"use client"
import * as React from "react"
import {
    Home,
    Users,
    Settings,
    List,
    Logs,
    DollarSign,
    FileText,
    ClipboardList,
    LogOut,
    AppWindow,
    Upload,
    FileAudio,

} from "lucide-react";

import { VersionSwitcher } from "@/components/sidebar/version-switcher"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import Link from 'next/link'

const iconMapping = {
    AppWindow: (className: string) => <AppWindow className={className} />,
    Home: (className: string) => <Home className={className} />,
    Users: (className: string) => <Users className={className} />,
    FileText: (className: string) => <FileText className={className} />,
    Logs: (className: string) => <Logs className={className} />,
    DollarSign: (className: string) => <DollarSign className={className} />,
    Settings: (className: string) => <Settings className={className} />,
    LogOut: (className: string) => <LogOut className={className} />,
    List: (className: string) => <List className={className} />,
    ClipboardList: (className: string) => <ClipboardList className={className} />,
};

type IconName = keyof typeof iconMapping;

// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                // {
                //     title: "New Session",
                //     url: "/app",
                //     icon: "AppWindow",
                //     className: "size-4",
                //     isActive: false
                // },
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: "Home",
                    className: "size-4",
                    isActive: false
                },

                {
                    title: "Doctors",
                    url: "/doctors",
                    icon: "Users",
                    className: "size-4",
                    isActive: false
                },

                {
                    title: "Patients",
                    url: "/patients",
                    icon: "Users",
                    className: "size-4",
                    isActive: false
                },

                {
                    title: "View History",
                    url: "/history",
                    icon: "List",
                    className: "size-4",
                    isActive: false
                },

                {
                    title: "Logs",
                    url: "/logs",
                    icon: "ClipboardList",
                    className: "size-4",
                    isActive: false
                },

                // {
                //     title: "Pricing",
                //     url: "/pricing",
                //     icon: "DollarSign",
                //     className: "size-4",
                //     isActive: false
                // },

                {
                    title: "Account Settings",
                    url: "/user/profile",
                    icon: "Settings",
                    className: "size-4",
                    isActive: false
                },

                {
                    title: "Update Clinic Details",
                    url: "/clinic/profile",
                    icon: "Settings",
                    className: "size-4",
                    isActive: false
                },

                {
                    title: "Template Library",
                    url: "/my-templates",
                    icon: "FileText",
                    className: "size-4",
                    isActive: false
                },

                {
                    title: "Logout",
                    url: "/logout",
                    icon: "LogOut",
                    className: "size-4",
                    isActive: false
                },
            ],
        }
    ],
}

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const pathname = usePathname();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <VersionSwitcher
                />
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>

                                <div className="w-48 p-2">
                                    <Link href={'/app'}>
                                        <button className="w-full flex items-center gap-2 bg-[#0f172a] text-white font-medium rounded px-3 py-1 hover:bg-[#1e293b]">
                                            <span className="text-lg">+</span> New Session
                                        </button>
                                    </Link>

                                    <div className="mt-2 ml-2 pl-3 border-l-[3px] border-gray-500">
                                        <button className="font-bold w-full flex items-center gap-2 bg-blue-50 text-black rounded px-3 py-2">
                                            <Upload size={16} />
                                            Upload / Record
                                        </button>

                                        <button className="w-full flex items-center gap-2 text-gray-400 rounded px-3 py-2 mt-1 cursor-not-allowed">
                                            <FileAudio size={16} />
                                            Transcribe
                                        </button>

                                        <button className="w-full flex items-center gap-2 text-gray-400 rounded px-3 py-2 mt-1 cursor-not-allowed">
                                            <FileText size={16} />
                                            Generate Notes
                                        </button>
                                    </div>
                                </div>

                                {item.items.map((item, i) => {
                                    const isActive = pathname === item.url;
                                    return (<SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <div className={cn(
                                                "m-1 p-3",
                                                isActive && "lactive"
                                            )}>
                                                <span className="mr-1">
                                                    {iconMapping[item.icon as IconName](item.className || "size-4")} {/* Pass className dynamically */}
                                                </span>
                                                <Link href={item.url} target={i === 0 ? "_blank" : undefined}>{item.title}</Link></div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>)
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar >
    )
}