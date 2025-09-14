import Header from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import labels from '@/lib/labels'
import { Plus } from "lucide-react";
import List from '@/components/templates/List'
import Link from "next/link";
import Edit from '@/components/template-crud/edit'

export default function Page() {

    return (
        <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <h1 className="tracking-wide  scroll-m-20 text-left text-2xl mb-4 font-extrabold tracking-tight text-balance">
                    {labels.template.update_template}
                </h1>
                <Edit />
            </div>
        </SidebarInset>
    )
}
