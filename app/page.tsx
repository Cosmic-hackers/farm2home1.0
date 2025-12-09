import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, ShoppingBasket, Truck, Users, Star, TrendingUp, Shield, Clock, Package } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-primary animate-in fade-in slide-in-from-top-4 duration-700">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>Farm2Home</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
            <Link href="#features" className="hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="#farmers" className="hover:text-primary transition-colors">
              For Farmers
            </Link>
            <Link href="#buyers" className="hover:text-primary transition-colors">
              For Buyers
            </Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
            <Link href="/auth/login" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="text-xs sm:text-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-6 px-4 sm:px-6 lg:px-8 pb-8 pt-6 md:py-10 lg:grid-cols-2 lg:py-20 xl:py-24">
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-balance">
              Fresh from the Farm, <span className="text-primary">Direct to Your Door</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground text-base sm:text-lg lg:text-xl sm:leading-8 text-balance">
              Connect directly with local farmers. Buy fresh, organic produce without the middleman. Support your local
              community while eating better.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 transition-transform hover:scale-105">
                  Start Shopping <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signup?role=farmer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full transition-transform hover:scale-105 bg-transparent">
                  Sell Your Produce
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-video rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
            <Image
              src="/idyllic-farm.png"
              alt="Fresh farm produce"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </section>

        <section id="features" className="container py-12 md:py-20 lg:py-24 bg-muted/50 rounded-3xl my-8 md:my-12 mx-4 sm:mx-6 lg:mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 view-animate">
            <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">How Farm2Home Works</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground text-sm sm:text-base lg:text-lg sm:leading-7">
              We've simplified the supply chain to bring you fresher food at better prices.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3 lg:gap-6 xl:gap-8 mt-8 md:mt-12 px-4">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-backwards">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-4 sm:p-6">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold text-base sm:text-lg">Connect Directly</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Chat with farmers, ask questions, and build relationships with the people who grow your food.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-4 sm:p-6">
                <ShoppingBasket className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold text-base sm:text-lg">Fresh Selection</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Browse seasonal produce, dairy, eggs, and more. Harvested just for you.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-backwards sm:col-span-2 lg:col-span-1">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-4 sm:p-6">
                <Truck className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold text-base sm:text-lg">Local Delivery</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Get your order delivered to your doorstep or pick it up at a local community hub.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Farmers Section */}
        <section id="farmers" className="container py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-square rounded-xl overflow-hidden order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
              <Image
                src="/lush-greenhouse.png"
                alt="Farmer in field"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-6 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
              <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl">For Farmers: Grow Your Business</h2>
              <p className="leading-normal text-muted-foreground text-sm sm:text-base lg:text-lg sm:leading-7">
                Farm2Home gives farmers a platform to sell their produce directly to consumers at fair prices. By
                cutting out the middleman, farmers earn more and you pay less.
              </p>
              <div className="grid gap-3 md:gap-4">
                <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-1">Set Your Own Prices</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Control your pricing and manage inventory with ease</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-1">Direct Payments</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Secure payments directly to your bank account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm md:text-base mb-1">Build Your Community</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Connect with loyal customers who value quality</p>
                  </div>
                </div>
              </div>
              <Link href="/auth/signup?role=farmer" className="w-full sm:w-fit">
                <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
                  Join as a Farmer
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Buyers Section */}
        <section id="buyers" className="bg-muted/30 py-12 md:py-20 lg:py-24">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col gap-4 md:gap-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl">For Buyers: Fresh, Local, Better</h2>
                <p className="leading-normal text-muted-foreground text-sm sm:text-base lg:text-lg sm:leading-7">
                  Discover the freshest produce from local farms. Know exactly where your food comes from and support
                  your community with every purchase.
                </p>
                <div className="grid gap-3 md:gap-4">
                  <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-background hover:shadow-md transition-shadow">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base mb-1">Farm-Fresh Quality</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Produce harvested at peak freshness, delivered quickly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-background hover:shadow-md transition-shadow">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base mb-1">Transparent Sourcing</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Know your farmer, know your food's journey</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-background hover:shadow-md transition-shadow">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base mb-1">Support Local Economy</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Every purchase helps local farmers thrive</p>
                    </div>
                  </div>
                </div>
                <Link href="/auth/signup" className="w-full sm:w-fit">
                  <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
                    Start Shopping Now
                  </Button>
                </Link>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-1000">
                <Image
                  src="/idyllic-farm.png"
                  alt="Fresh produce"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary text-primary-foreground rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 animate-in fade-in zoom-in-95 duration-1000">
            <h2 className="text-2xl font-bold mb-3 sm:text-3xl md:text-4xl lg:text-5xl md:mb-4">Ready to Eat Better?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6 md:mb-8 text-sm sm:text-base lg:text-lg">
              Join thousands of others who are supporting local agriculture and enjoying the freshest food possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto font-semibold text-primary hover:scale-105 transition-transform"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/marketplace" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-transform"
                >
                  Browse Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
            <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <p className="text-center text-xs sm:text-sm leading-loose text-muted-foreground md:text-left">
              Built for the community. © 2025 Farm2Home.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
