import Header from "@/components/header"
import {
    SidebarInset
} from "@/components/ui/sidebar"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import Basic from '@/components/clinic/Basic'
import Optional from '@/components/clinic/Optional'
import { getClinicDetails, metaData } from "@/app/actions";

import { MetaCol, Specialization, ClinicProps, MetaDataType } from "@/components/clinic/Types";

export default async function Page() {

    let countries: MetaCol[] = [];
    let designations: MetaCol[] = [];
    let specializations: Specialization[] = [];
    let clinicDetail: ClinicProps | null = null;

    // const api_base_url: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    // const metadataUrl = await apiRoutes.metadata;
    // const clinicDetails = await apiRoutes.clinicDetails;

    try {
        const response: MetaDataType = await metaData();
        if (response) {
            ({ countries, designations, specializations } = response);
        }
        clinicDetail = await getClinicDetails();
    } catch {
        //console.error("Failed to fetch metadata:", error);
    }

    return (
        <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex w-full flex-col">
                    <h1 className="scroll-m-20 text-left text-2xl mb-4 font-extrabold tracking-tight text-balance">Clinic Details</h1>
                    {clinicDetail && (
                        <Tabs defaultValue="mandatory">
                            <TabsList>
                                <TabsTrigger value="mandatory">Mandatory</TabsTrigger>
                                <TabsTrigger value="business">Business</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mandatory">
                                <Basic countries={countries} clinic_detail={clinicDetail} />
                            </TabsContent>
                            <TabsContent value="business">
                                <Optional designations={designations} clinic_detail={clinicDetail} specializations={specializations} />
                            </TabsContent>
                        </Tabs>)
                    }
                </div>
            </div>
        </SidebarInset>
    )
}
