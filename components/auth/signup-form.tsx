'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

export function SignupForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') === 'farmer' ? 'farmer' : 'buyer'
  const [role, setRole] = React.useState<string>(defaultRole)
  const supabase = createClient()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const target = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
      fullName: { value: string }
    }

    const email = target.email.value
    const password = target.password.value
    const fullName = target.fullName.value

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          window.location.origin,
        data: {
          full_name: fullName,
          role: role,
        },
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    if (data.user && !data.session) {
      setSuccess(true)
      setIsLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  if (success) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <AlertTitle className="text-green-800">Account created!</AlertTitle>
        <AlertDescription className="text-green-700">
          Please check your email to confirm your account before logging in.
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => router.push('/auth/login')}
              className="w-full"
            >
              Go to Login
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              type="text"
              autoCapitalize="words"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>I am a...</Label>
            <RadioGroup
              defaultValue={role}
              onValueChange={setRole}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buyer" id="buyer" />
                <Label htmlFor="buyer">Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="farmer" id="farmer" />
                <Label htmlFor="farmer">Farmer</Label>
              </div>
            </RadioGroup>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
