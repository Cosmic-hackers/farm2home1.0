import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import { BuyButton } from "@/components/marketplace/buy-button"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      farms (
        id,
        owner_id,
        name,
        location,
        description,
        rating,
        image_url
      )
    `)
    .eq("id", id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="container py-8">
      <Link
        href="/marketplace"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          {product.image_url ? (
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No Image Available</div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="text-2xl font-bold">
                ${product.price.toFixed(2)}
                <span className="text-sm font-normal text-muted-foreground">/{product.unit}</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{product.farms?.rating || "New"}</span>
                <span className="text-muted-foreground">(12 reviews)</span>
              </div>
            </div>
          </div>

          <div className="prose prose-sm text-muted-foreground">
            <p>{product.description}</p>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                {product.farms?.image_url && (
                  <Image
                    src={product.farms.image_url || "/placeholder.svg"}
                    alt={product.farms.name || "Farm"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{product.farms?.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{product.farms?.location}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                View Farm
              </Button>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Delivery available</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span>Certified Organic</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <BuyButton productId={product.id} price={product.price} unit={product.unit} />
            <Link href={`/dashboard/chat?userId=${product.farms?.owner_id}`} className="flex-1">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Message Farmer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
