import Header from "@/components/header"
import {
    SidebarInset
} from "@/components/ui/sidebar"

import Create from '@/components/template-crud/create'
import labels from '@/lib/labels'

export default async function Page() {

    return (
        <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <h1 className="tracking-wide  scroll-m-20 text-left text-2xl mb-4 font-extrabold tracking-tight text-balance">
                    {labels.template.create_template}
                </h1>
                <Create />
            </div>
        </SidebarInset>
    )
}
