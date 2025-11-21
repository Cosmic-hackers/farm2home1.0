"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send } from "lucide-react"
import type { ChatUser, Message } from "@/lib/types/chat"
import type { User } from "@supabase/supabase-js"
import { format } from "date-fns"

interface ChatWindowProps {
  currentUser: User
  selectedUser: ChatUser
  onBack: () => void
}

export function ChatWindow({ currentUser, selectedUser, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchMessages()

    const channel = supabase
      .channel(`chat:${selectedUser.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=eq.${selectedUser.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message
          if (newMsg.receiver_id === currentUser.id) {
            setMessages((prev) => [...prev, newMsg])
            scrollToBottom()
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedUser.id, currentUser.id])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedUser.id}),and(sender_id.eq.${selectedUser.id},receiver_id.eq.${currentUser.id})`,
      )
      .order("created_at", { ascending: true })

    if (!error && data) {
      setMessages(data)
      scrollToBottom()
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      const { error } = await supabase.from("messages").insert({
        content: newMessage,
        sender_id: currentUser.id,
        receiver_id: selectedUser.id,
        read: false,
      })

      if (error) throw error

      // Optimistic update
      const optimisticMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender_id: currentUser.id,
        receiver_id: selectedUser.id,
        created_at: new Date().toISOString(),
        read: false,
      }

      setMessages((prev) => [...prev, optimisticMsg])
      setNewMessage("")
      scrollToBottom()
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b p-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={selectedUser.avatar_url || undefined} />
          <AvatarFallback>{selectedUser.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{selectedUser.full_name}</h3>
          <p className="text-xs text-muted-foreground capitalize">{selectedUser.role}</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => {
            const isMe = message.sender_id === currentUser.id
            const showDate =
              index === 0 ||
              new Date(message.created_at).toDateString() !== new Date(messages[index - 1].created_at).toDateString()

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="my-4 text-center text-xs text-muted-foreground">
                    {format(new Date(message.created_at), "MMMM d, yyyy")}
                  </div>
                )}
                <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      isMe ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`mt-1 text-[10px] ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {format(new Date(message.created_at), "h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={sending}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={sending || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
