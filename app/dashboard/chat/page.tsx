import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ChatLayout } from "@/components/chat/chat-layout"
import { redirect } from "next/navigation"

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string }>
}) {
  const { userId } = await searchParams
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <ChatLayout currentUser={user} initialUserId={userId} />
    </div>
  )
}
