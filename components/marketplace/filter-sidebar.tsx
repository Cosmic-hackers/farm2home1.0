"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Eggs", "Honey", "Grains", "Herbs"]

export function FilterSidebar({ currentCategory }: { currentCategory?: string }) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Categories</h3>
        <div className="flex flex-col space-y-2">
          <Link href="/marketplace">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start font-normal",
                !currentCategory && "bg-accent text-accent-foreground font-medium",
              )}
            >
              All Products
            </Button>
          </Link>
          {categories.map((category) => (
            <Link key={category} href={`/marketplace?category=${category}`}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal",
                  currentCategory === category && "bg-accent text-accent-foreground font-medium",
                )}
              >
                {category}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 100]} max={100} step={1} />
          <div className="flex items-center justify-between text-sm">
            <span>$0</span>
            <span>$100+</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Dietary</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="organic" />
            <Label htmlFor="organic">Organic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="gluten-free" />
            <Label htmlFor="gluten-free">Gluten Free</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vegan" />
            <Label htmlFor="vegan">Vegan</Label>
          </div>
        </div>
      </div>
    </div>
  )
}
