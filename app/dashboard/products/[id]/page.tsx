import { createClient } from "@/lib/supabase/server"
import { ProductForm } from "@/components/dashboard/product-form"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single()

    if (!product) {
        notFound()
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
            </div>
            <div className="max-w-2xl">
                <ProductForm product={product} />
            </div>
        </div>
    )
}
