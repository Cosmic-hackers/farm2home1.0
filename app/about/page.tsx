import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/marketplace">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">About Farm2Home</h1>
                </div>
                <div className="max-w-3xl space-y-6">
                    <p className="text-lg text-muted-foreground">
                        Farm2Home is dedicated to connecting local farmers directly with consumers, cutting out the middleman to ensure fresher produce and better prices for everyone.
                    </p>
                    <div className="grid gap-8 mt-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                            <p>
                                To empower local agriculture by providing a seamless platform for farmers to sell their harvest directly to their community, fostering a sustainable and healthy food system.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Direct from the source freshness</li>
                                <li>Support local economy and farmers</li>
                                <li>Transparent pricing and sourcing</li>
                                <li>Community building through food</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
