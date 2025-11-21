import { ProductCard } from "@/components/marketplace/product-card"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  unit: string | null
  image_url: string | null
  category: string | null
  farms: {
    name: string | null
    location: string | null
    rating: number | null
  } | null
}

export function ProductGrid({ products }: { products: any[] }) {
  if (products.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
