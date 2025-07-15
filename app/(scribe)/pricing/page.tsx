"use client"
import React, { useState } from "react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PricingCardProps = {
    isYearly?: boolean
    title: string
    monthlyPrice?: number
    yearlyPrice?: number
    description: string
    features: string[]
    actionLabel: string
    popular?: boolean
    exclusive?: boolean
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <section className="text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-xl pt-1">{subtitle}</p>
        <br />
    </section>
)

const PricingCard = ({ isYearly, title, monthlyPrice, yearlyPrice, description, features, actionLabel, popular, exclusive }: PricingCardProps) => (
    <Card
        className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} pb-5  mx-auto sm:mx-0`, {
            "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
                exclusive,
        })}>
        <div>
            <CardHeader className="pb-8 pt-4">
                {isYearly && yearlyPrice && monthlyPrice ? (
                    <div className="flex justify-between">
                        <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
                        <div
                            className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", {
                                "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
                            })}>
                            Save ${monthlyPrice * 12 - yearlyPrice}
                        </div>
                    </div>
                ) : (
                    <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
                )}
                <div className="flex gap-0.5">
                    <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice ? "$" + monthlyPrice : "Custom"}</h3>
                    <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span>
                </div>
                <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {features.map((feature: string) => (
                    <CheckItem key={feature} text={feature} />
                ))}
            </CardContent>
        </div>
        <CardFooter className="mt-2">
            <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
                {actionLabel}
            </Button>
        </CardFooter>
    </Card>
)

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex gap-2">
        <CheckCircle2 size={18} className="my-auto text-green-400" />
        <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
    </div>
)

export default function Page() {
    //const [isYearly, setIsYearly] = useState(false)
    //const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1)
    const plans = [
        {
            title: "Basic",
            monthlyPrice: 10,
            yearlyPrice: 100,
            description: "Essential features you need to get started",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
            actionLabel: "Get Started",
        },
        {
            title: "Pro",
            monthlyPrice: 25,
            yearlyPrice: 250,
            description: "Perfect for owners of small & medium businessess",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
            actionLabel: "Get Started",
            popular: true,
        },
        {
            title: "Enterprise",
            price: "Custom",
            description: "Dedicated support and infrastructure to fit your needs",
            features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3", "Super Exclusive Feature"],
            actionLabel: "Contact Sales",
            exclusive: true,
        },
    ]
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="py-8">
                    <PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" />
                    <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
                        {plans.map((plan) => {
                            return <PricingCard key={plan.title} {...plan} isYearly={false} />
                        })}
                    </section>
                </div>
            </div>
        </SidebarInset>
    )
}