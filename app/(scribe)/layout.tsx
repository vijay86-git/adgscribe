import type { Metadata } from "next";
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { headers } from 'next/headers';

export const metadata: Metadata = {
    title: "ADGScribe | AI Medical Transcription Tool for Healthcare",
    description: "ADGScribe is an AI-powered medical transcription platform that converts clinical speech to structured notes in real-time, improving accuracy and patient care",
};

export default async function ScribeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //const pathname = (await headers()).get('x-pathname') || '';
    //const hideLayout = pathname.startsWith('/app');
    const role = (await headers()).get('x-role') || '';
    return (
        <>
            <SidebarProvider
                style={{ "--sidebar-width": "14rem" } as React.CSSProperties}
            >
                <AppSidebar role={role} />
                {children}
            </SidebarProvider>
        </>
    )
}