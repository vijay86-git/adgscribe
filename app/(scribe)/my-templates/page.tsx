import Header from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import labels from '@/lib/labels'
import { Plus } from "lucide-react";
import List from '@/components/templates/List'
import Link from "next/link";

export default function Page() {

    return (
        <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex justify-between items-center">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
                        {labels.template.my_template}
                    </h1>
                    <Link href={"/my-templates/create"}>
                        <Button className="px-4 py-2 text-white rounded">
                            <Plus className="w-4 h-4" /> Create template
                        </Button>
                    </Link>
                </div>
                <List />
            </div>
        </SidebarInset >
    )
}
