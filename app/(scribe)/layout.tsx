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
    const headersList = await headers();
    const pathname = headersList.get('x-next-url') || '';
    const hideLayout = pathname.startsWith('/app');
    return (
        <>
            {hideLayout ? (
                children
            ) : (
                <SidebarProvider
                    style={{ "--sidebar-width": "14rem" } as React.CSSProperties}
                >
                    <AppSidebar />
                    {children}
                </SidebarProvider>
            )}
        </>
    )
}