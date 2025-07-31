import Session from "@/components/app/Session"
import Header from "@/components/header"
import {
    SidebarInset
} from "@/components/ui/sidebar"
const Page = () => {
    return (
        <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex w-full flex-col">
                    <div>
                        <div className="flex flex-1 flex-col gap-3 pt-0">
                            <Session />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarInset>
    );
};
export default Page;
