import { createClient } from "@/lib/supabase/server"
import { ProductGrid } from "@/components/marketplace/product-grid"
import { FilterSidebar } from "@/components/marketplace/filter-sidebar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient()
  const params = await searchParams
  const category = typeof params.category === "string" ? params.category : undefined
  const search = typeof params.search === "string" ? params.search : undefined

  let query = supabase.from("products").select(`
      *,
      farms (
        name,
        location,
        rating
      )
    `)

  if (category) {
    query = query.eq("category", category)
  }

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  const { data: products, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="text-muted-foreground">Fresh produce directly from local farmers.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-8" defaultValue={search} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <aside className="hidden md:block">
            <FilterSidebar currentCategory={category} />
          </aside>
          <ProductGrid products={products || []} />
        </div>
      </div>
    </div>
  )
}
