"use client"

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { FilterSidebar } from "./filter-sidebar"

export function MobileFilterSidebar({ currentCategory }: { currentCategory?: string }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                    <FilterSidebar currentCategory={currentCategory} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
