import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import Image from "next/image";
import {
    FileText,
    Upload,
    Play
} from "lucide-react";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="m-[10px] grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="mr-2 border-1 rounded-md rounded-sm md:block m-10px">
                <div className="flex h-full max-h-screen flex-col gap-2 shadow-xl">
                    <div className="flex h-14 items-center justify-center px-4 lg:h-[60px] lg:px-6">
                        <Link className="flex items-center justify-center font-semibold" href="/">
                            <Image src={'/images/logo.png'} className="object-contain" alt="" width={120} height={30} />
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href={'/app'}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-800 transition-all hover:text-primary"
                            >
                                <Upload className="size-4" />
                                Upload/ Record</Link>
                            <Separator />
                            <Link
                                href={'/app'}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-800 transition-all hover:text-primary"
                            >
                                <Play className="size-4" />
                                Transcribe</Link>
                            <Separator />
                            <Link
                                href={'/app'}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-800 transition-all hover:text-primary"
                            >
                                <FileText className="size-4" />
                                Generate Notes</Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="border-1 rounded-md flex flex-col shadow-2xl">
                <main className="flex flex-1 flex-col p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}