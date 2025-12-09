"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"

const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Eggs", "Honey", "Grains", "Herbs"]

const units = ["lb", "oz", "kg", "g", "bunch", "unit", "dozen"]

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  unit: string
  category: string
  image_url: string | null
}

export function ProductForm({ product }: { product?: Product }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string | null>(product?.image_url || null)
  const router = useRouter()
  const supabase = createClient()

  React.useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      console.log("[v0] User check:", { user: user?.id, error })
      if (!user) {
        console.log("[v0] No user found, redirecting to login")
        router.push("/auth/login")
      }
    }
    checkUser()
  }, [supabase, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const target = event.target as typeof event.target & {
      name: { value: string }
      description: { value: string }
      price: { value: string }
      stock: { value: string }
      unit: { value: string }
      category: { value: string }
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      console.log("[v0] Submit - User check:", { user: user?.id, userError })

      if (userError) {
        console.error("[v0] Error getting user:", userError)
        throw new Error("Authentication error. Please log in again.")
      }

      if (!user) {
        console.error("[v0] No user found during submit")
        throw new Error("No user found. Please log in again.")
      }

      // Get farm ID
      let { data: farm } = await supabase.from("farms").select("id").eq("owner_id", user.id).single()

      console.log("[v0] Farm check:", { farm })

      if (!farm) {
        console.log("[v0] Creating new farm for user")
        const { data: newFarm, error: createFarmError } = await supabase
          .from("farms")
          .insert({
            owner_id: user.id,
            name: `${user.user_metadata.full_name || "My"}'s Farm`,
            description: "Fresh produce from my farm.",
            location: "Unknown Location",
          })
          .select("id")
          .single()

        if (createFarmError) {
          console.error("[v0] Error creating farm:", createFarmError)
          throw createFarmError
        }
        farm = newFarm
      }

      if (!farm) throw new Error("Failed to create farm for this user")

      if (!farm) throw new Error("Failed to create farm for this user")

      let imageUrl = product?.image_url || null

      // Upload image if exists
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${farm.id}/${fileName}`

        console.log("[v0] Uploading image:", { filePath })

        const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, imageFile)

        if (uploadError) {
          console.error("[v0] Error uploading image:", uploadError)
          if (uploadError.message.includes("Bucket not found")) {
            alert("Error: The 'product-images' storage bucket is missing. Please create a public bucket named 'product-images' in your Supabase dashboard.")
          }
          throw uploadError
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath)

        imageUrl = publicUrl
      }

      console.log("[v0] Creating product with data:", {
        name: target.name.value,
        farm_id: farm.id,
        imageUrl,
      })

      const productData = {
        name: target.name.value,
        description: target.description.value,
        price: Number.parseFloat(target.price.value),
        stock: Number.parseInt(target.stock.value),
        unit: target.unit.value,
        category: target.category.value,
        farm_id: farm.id,
        image_url: imageUrl,
      }

      if (product) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id)

        if (error) throw error
        console.log("[v0] Product updated successfully")
      } else {
        const { error } = await supabase.from("products").insert(productData)

        if (error) throw error
        console.log("[v0] Product created successfully")
      }



      console.log("[v0] Product created successfully")
      router.push("/dashboard/products")
      router.refresh()
    } catch (error) {
      console.error("Error creating product:", error)
      alert(`Error creating product: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" defaultValue={product?.name} placeholder="e.g. Organic Carrots" required disabled={isLoading} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            defaultValue={product?.description}
            placeholder="Describe your product..."
            className="min-h-[100px]"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={product?.category} required disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="unit">Unit</Label>
            <Select name="unit" defaultValue={product?.unit} required disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" defaultValue={product?.price} type="number" step="0.01" min="0" placeholder="0.00" required disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" defaultValue={product?.stock} type="number" min="0" placeholder="0" required disabled={isLoading} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Product Image</Label>
          <div className="flex items-center gap-4">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-lg border border-dashed hover:bg-accent/50 transition-colors">
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex cursor-pointer flex-col items-center gap-1 text-xs text-muted-foreground"
                >
                  <Upload className="h-6 w-6" />
                  <span>Upload</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                    disabled={isLoading}
                  />
                </label>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Upload a clear image of your product.</p>
              <p>JPG, PNG or WEBP up to 5MB.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Update Product" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
