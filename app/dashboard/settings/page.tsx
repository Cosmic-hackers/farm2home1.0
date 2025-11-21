import { createClient } from "@/lib/supabase/server"
import { SettingsForm } from "@/components/dashboard/settings-form"
import { Separator } from "@/components/ui/separator"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: farm } = await supabase.from("farms").select("*").eq("owner_id", user.id).single()

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your profile and farm settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <a
              href="#profile"
              className="justify-start rounded-md bg-muted p-2 px-3 text-sm font-medium hover:bg-muted"
            >
              Profile & Farm
            </a>
            <a
              href="#notifications"
              className="justify-start rounded-md p-2 px-3 text-sm font-medium hover:bg-muted hover:underline"
            >
              Notifications
            </a>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <SettingsForm profile={profile} farm={farm} />
        </div>
      </div>
    </div>
  )
}
