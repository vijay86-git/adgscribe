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
    AppWindow

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
                {
                    title: "Launch App",
                    url: "/app",
                    icon: "AppWindow",
                    className: "size-4",
                    isActive: false
                },
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

                {
                    title: "Pricing",
                    url: "/pricing",
                    icon: "DollarSign",
                    className: "size-4",
                    isActive: false
                },

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                                {item.items.map((item, i) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <div className="m-1">
                                                <span className="mr-2">
                                                    {iconMapping[item.icon as IconName](item.className || "size-4")} {/* Pass className dynamically */}
                                                </span>
                                                <Link href={item.url} target={i === 0 ? "_blank" : undefined}>{item.title}</Link></div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar >
    )
}