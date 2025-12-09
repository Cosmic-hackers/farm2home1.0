import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    name: string
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
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/marketplace/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          {product.image_url ? (
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No Image</div>
          )}
          {product.category && (
            <Badge className="absolute right-2 top-2 bg-background/80 text-foreground backdrop-blur-sm hover:bg-background/90">
              {product.category}
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/marketplace/${product.id}`} className="hover:underline">
            <h3 className="font-semibold truncate">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span>{product.farms?.rating || "New"}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{product.farms?.location || "Local Farm"}</span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground truncate">{product.farms?.name}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold">
          ₹{product.price.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground">/{product.unit || "unit"}</span>
        </div>
        <Button size="sm" variant="secondary">
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}
