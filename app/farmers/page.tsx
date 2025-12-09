import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function FarmersPage() {
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
                    <h1 className="text-3xl font-bold">Our Farmers</h1>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-6 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Green Valley Organics</h2>
                        <p className="text-muted-foreground mb-4">Portland, OR</p>
                        <p>Family owned organic farm since 1985. Specializing in seasonal vegetables and fruits.</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Sunny Side Up Farms</h2>
                        <p className="text-muted-foreground mb-4">Salem, OR</p>
                        <p>Free range eggs and poultry raised with love and care.</p>
                    </div>
                    <div className="p-6 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-2">Rodriguez Family Orchard</h2>
                        <p className="text-muted-foreground mb-4">Hood River, OR</p>
                        <p>Best apples, pears, and cherries in the valley.</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
