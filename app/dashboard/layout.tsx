import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MobileDashboardNav } from "@/components/dashboard/mobile-dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { Leaf } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <MobileDashboardNav />
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-primary">
              <Leaf className="h-5 w-5 md:h-6 md:w-6" />
              <span>Farm2Home</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <DashboardNav />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
