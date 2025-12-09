"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { DashboardNav } from "./dashboard-nav"

export function MobileDashboardNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="py-6 px-4">
                    <DashboardNav />
                </div>
            </SheetContent>
        </Sheet>
    )
}
