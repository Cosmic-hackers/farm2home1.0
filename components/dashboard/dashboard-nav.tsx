"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Package, ShoppingCart, Settings, Store, MessageSquare, Truck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function DashboardNav() {
  const pathname = usePathname()
  const [role, setRole] = React.useState<string | null>(null)
  const supabase = createClient()

  React.useEffect(() => {
    async function getRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
        setRole(profile?.role || "buyer")
      }
    }
    getRole()
  }, [supabase])

  const farmerItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Messages",
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const buyerItems = [
    {
      title: "Marketplace",
      href: "/marketplace",
      icon: Store,
    },
    {
      title: "My Orders",
      href: "/dashboard/orders",
      icon: Truck,
    },
    {
      title: "Messages",
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const items = role === "farmer" ? farmerItems : buyerItems

  if (!role) return null

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link key={index} href={item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
