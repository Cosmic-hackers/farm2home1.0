"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { ChatList } from "@/components/chat/chat-list"
import { ChatWindow } from "@/components/chat/chat-window"
import type { ChatUser, Conversation, Message } from "@/lib/types/chat"
import type { User } from "@supabase/supabase-js"

interface ChatLayoutProps {
  currentUser: User
  initialUserId?: string
}

export function ChatLayout({ currentUser, initialUserId }: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    fetchConversations()

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const newMessage = payload.new as Message
        if (newMessage.sender_id === currentUser.id || newMessage.receiver_id === currentUser.id) {
          fetchConversations()
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentUser.id])

  useEffect(() => {
    if (initialUserId && conversations.length > 0 && !selectedUser) {
      const conversation = conversations.find((c) => c.user.id === initialUserId)
      if (conversation) {
        setSelectedUser(conversation.user)
      }
    }
  }, [initialUserId, conversations, selectedUser])

  const fetchConversations = async () => {
    try {
      // 1. Fetch all profiles except current user
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", currentUser.id)

      if (profilesError) throw profilesError

      // 2. Fetch recent messages involving current user
      const { data: messages, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`)
        .order("created_at", { ascending: false })

      if (messagesError) throw messagesError

      // 3. Process conversations
      const conversationMap = new Map<string, Conversation>()

      profiles?.forEach((profile) => {
        // Find messages with this user
        const userMessages = messages?.filter((m) => m.sender_id === profile.id || m.receiver_id === profile.id) || []

        const lastMessage = userMessages.length > 0 ? userMessages[0] : null
        const unreadCount = userMessages.filter((m) => m.sender_id === profile.id && !m.read).length

        // Only include if there are messages OR if it's a demo/seed user we want to show
        // For now, let's show all profiles so users can start chats
        conversationMap.set(profile.id, {
          user: profile,
          lastMessage,
          unreadCount,
        })
      })

      // Sort by last message date
      const sortedConversations = Array.from(conversationMap.values()).sort((a, b) => {
        const dateA = a.lastMessage ? new Date(a.lastMessage.created_at).getTime() : 0
        const dateB = b.lastMessage ? new Date(b.lastMessage.created_at).getTime() : 0
        return dateB - dateA
      })

      setConversations(sortedConversations)
    } catch (error) {
      console.error("Error fetching conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden rounded-lg border bg-background shadow-sm">
      <div
        className={`${isMobileView && selectedUser ? "hidden" : "flex"} w-full md:w-80 flex-col border-r bg-muted/10`}
      >
        <ChatList
          conversations={conversations}
          selectedUserId={selectedUser?.id}
          onSelectUser={setSelectedUser}
          loading={loading}
        />
      </div>
      <div className={`${isMobileView && !selectedUser ? "hidden" : "flex"} flex-1 flex-col bg-background`}>
        {selectedUser ? (
          <ChatWindow currentUser={currentUser} selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-sm">Choose a user from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
