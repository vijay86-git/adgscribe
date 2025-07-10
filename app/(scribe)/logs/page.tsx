import Header from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import List from '@/components/logs/List'
import labels from '@/lib/labels'

export default function Page() {

    return (
        <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <h1 className="tracking-wide scroll-m-20 text-left text-2xl font-extrabold tracking-tight text-balance">
                    {labels.logs.list}
                </h1>
                <List />
            </div>
        </SidebarInset>
    )
}
