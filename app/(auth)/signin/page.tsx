import Image from 'next/image'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Signin } from '@/components/auth/Signin';

export default function Page() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                    <Image width={180} height={43} src={`/images/logo.png`} priority alt="ADGScribe" />
                </Link>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Log In as Clinic</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Signin />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}