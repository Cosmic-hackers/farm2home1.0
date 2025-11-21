import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ShoppingCart } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { UserNav } from "@/components/dashboard/user-nav"

export async function SiteHeader() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span>Farm2Home</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
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
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard/orders">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>
              <UserNav />
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
