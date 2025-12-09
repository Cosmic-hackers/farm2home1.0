"use client"

import { Leaf } from "lucide-react"

export function HeaderLogo() {
    return (
        <div className="flex items-center gap-2 cursor-default">
            <Leaf className="h-6 w-6" />
            <span>Farm2Home</span>
        </div>
    )
}
