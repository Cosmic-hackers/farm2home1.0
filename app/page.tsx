import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, ShoppingBasket, Truck, Users, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary animate-in fade-in slide-in-from-top-4 duration-700">
            <Leaf className="h-6 w-6" />
            <span>Farm2Home</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
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
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-balance">
              Fresh from the Farm, <span className="text-primary">Direct to Your Door</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-balance">
              Connect directly with local farmers. Buy fresh, organic produce without the middleman. Support your local
              community while eating better.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2 transition-transform hover:scale-105">
                  Start Shopping <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/signup?role=farmer">
                <Button variant="outline" size="lg" className="transition-transform hover:scale-105 bg-transparent">
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

        <section id="features" className="container py-12 md:py-24 lg:py-32 bg-muted/50 rounded-3xl my-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 view-animate">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">How Farm2Home Works</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              We've simplified the supply chain to bring you fresher food at better prices.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-backwards">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Users className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Connect Directly</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with farmers, ask questions, and build relationships with the people who grow your food.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <ShoppingBasket className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Fresh Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse seasonal produce, dairy, eggs, and more. Harvested just for you.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-backwards">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Truck className="h-12 w-12 text-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Local Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your order delivered to your doorstep or pick it up at a local community hub.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="flex flex-col items-center gap-4 text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Seasonal Favorites</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Check out what's fresh and in season right now.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Strawberries", price: "$4.99/lb", image: "/ripe-strawberries.png" },
              { name: "Asparagus", price: "$3.99/lb", image: "/bunch-of-asparagus.png" },
              { name: "Radishes", price: "$2.49/bunch", image: "/radishes.jpg" },
              { name: "Spring Onions", price: "$1.99/bunch", image: "/pile-of-onions.png" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border bg-background hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-primary font-medium">{item.price}</p>
                  <Button className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Added Featured Farms section for more content */}
        <section className="bg-muted/30 py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col items-center gap-4 text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Featured Farms</h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Meet the local growers bringing fresh food to your table.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Green Valley Organics",
                  location: "Portland, OR",
                  desc: "Family owned organic farm since 1985.",
                  image: "/idyllic-farm.png",
                },
                {
                  name: "Sunny Side Up Farms",
                  location: "Salem, OR",
                  desc: "Free range eggs and poultry raised with love.",
                  image: "/idyllic-farm.png",
                },
                {
                  name: "Rodriguez Family Orchard",
                  location: "Hood River, OR",
                  desc: "Best apples, pears, and cherries in the valley.",
                  image: "/lush-orchard.png",
                },
              ].map((farm, i) => (
                <div
                  key={i}
                  className="group overflow-hidden rounded-xl bg-background border shadow-sm hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={farm.image || "/placeholder.svg"}
                      alt={farm.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{farm.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Leaf className="h-4 w-4" />
                      <span>{farm.location}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{farm.desc}</p>
                    <Link href={`/marketplace?farm=${farm.name}`}>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                      >
                        View Products
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-xl overflow-hidden animate-in fade-in slide-in-from-left-8 duration-1000">
              <Image
                src="/lush-greenhouse.png"
                alt="Farmer in field"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-1000">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Empowering Local Farmers</h2>
              <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Farm2Home gives farmers a platform to sell their produce directly to consumers at fair prices. By
                cutting out the middleman, farmers earn more and you pay less.
              </p>
              <ul className="grid gap-4">
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Set your own prices and manage inventory</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Direct payments to your bank account</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Build a loyal customer base</span>
                </li>
              </ul>
              <Link href="/auth/signup?role=farmer">
                <Button size="lg" className="w-fit hover:scale-105 transition-transform">
                  Join as a Farmer
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-12 md:py-24">
          <div className="container">
            <div className="flex flex-col items-center gap-4 text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">What Our Community Says</h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Hear from the farmers and buyers who are changing the way we eat.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Farm2Home has completely transformed my business. I can focus on farming while the platform handles the sales.",
                  author: "Sarah Jenkins",
                  role: "Farmer",
                  image: "/diverse-farmers-harvest.png",
                },
                {
                  quote:
                    "I love knowing exactly where my food comes from. The quality is unmatched and I'm supporting my neighbors.",
                  author: "Mike Ross",
                  role: "Buyer",
                  image: "/man.jpg",
                },
                {
                  quote:
                    "The direct connection with customers is amazing. I get feedback instantly and can grow what people actually want.",
                  author: "David Miller",
                  role: "Farmer",
                  image: "/diverse-farmers-harvest.png",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-background p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-8 duration-1000"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 text-center">
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 animate-in fade-in zoom-in-95 duration-1000">
            <h2 className="text-3xl font-bold mb-4 md:text-5xl">Ready to Eat Better?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of others who are supporting local agriculture and enjoying the freshest food possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto font-semibold text-primary hover:scale-105 transition-transform"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/marketplace">
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
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Leaf className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built for the community. © 2025 Farm2Home.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
