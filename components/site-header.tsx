import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ShoppingBag } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { UserNav } from "@/components/dashboard/user-nav"
import { HeaderLogo } from "@/components/header-logo"

export async function SiteHeader() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-primary">
          <HeaderLogo />
        </div>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
          <Link href="/marketplace" className="hover:text-primary transition-colors">
            Marketplace
          </Link>
          <Link href="/farmers" className="hover:text-primary transition-colors">
            Farmers
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link href="/dashboard/orders">
                <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Orders</span>
                  <OrderCountBadge userId={user.id} />
                </Button>
              </Link>
              <UserNav />
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:inline-block">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="text-xs sm:text-sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

async function OrderCountBadge({ userId }: { userId: string }) {
  const supabase = await createClient()
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("buyer_id", userId)
    .neq("status", "delivered") // Count pending/shipped orders

  if (!count) return null

  return (
    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
      {count}
    </span>
  )
}
