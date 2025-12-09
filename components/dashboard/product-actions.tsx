"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"
import { deleteProduct } from "@/app/dashboard/products/actions"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

interface ProductActionsProps {
    productId: string
}

export function ProductActions({ productId }: ProductActionsProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this product?")) {
            startTransition(async () => {
                try {
                    await deleteProduct(productId)
                    router.refresh()
                } catch (error) {
                    console.error("Failed to delete product:", error)
                    alert(`Failed to delete product: ${error instanceof Error ? error.message : "Unknown error"}`)
                }
            })
        }
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Link href={`/dashboard/products/${productId}`}>
                <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </Link>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isPending}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
            </Button>
        </div>
    )
}
