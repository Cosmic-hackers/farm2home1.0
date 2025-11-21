"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SettingsFormProps {
  profile: any
  farm: any
}

export function SettingsForm({ profile, farm }: SettingsFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const supabase = createClient()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const target = event.target as typeof event.target & {
      fullName: { value: string }
      bio: { value: string }
      farmName: { value: string }
      farmLocation: { value: string }
      farmDescription: { value: string }
    }

    try {
      // Update Profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: target.fullName.value,
          bio: target.bio.value,
        })
        .eq("id", profile.id)

      if (profileError) throw profileError

      // Update or Insert Farm
      if (farm) {
        const { error: farmError } = await supabase
          .from("farms")
          .update({
            name: target.farmName.value,
            location: target.farmLocation.value,
            description: target.farmDescription.value,
          })
          .eq("id", farm.id)

        if (farmError) throw farmError
      } else {
        const { error: farmError } = await supabase.from("farms").insert({
          owner_id: profile.id,
          name: target.farmName.value,
          location: target.farmLocation.value,
          description: target.farmDescription.value,
        })

        if (farmError) throw farmError
      }

      router.refresh()
    } catch (error) {
      console.error("Error updating settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how others will see you on the site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue={profile?.full_name || ""} disabled={isLoading} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue={profile?.bio || ""}
              placeholder="Tell us a little bit about yourself"
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Farm Details</CardTitle>
          <CardDescription>Manage your farm information and location.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="farmName">Farm Name</Label>
            <Input
              id="farmName"
              defaultValue={farm?.name || ""}
              placeholder="e.g. Green Valley Organics"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="farmLocation">Location</Label>
            <Input
              id="farmLocation"
              defaultValue={farm?.location || ""}
              placeholder="e.g. Portland, OR"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="farmDescription">About Your Farm</Label>
            <Textarea
              id="farmDescription"
              defaultValue={farm?.description || ""}
              placeholder="Describe your farming practices..."
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
