"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { ChatUser, Conversation } from "@/lib/types/chat"
import { formatDistanceToNow } from "date-fns"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ChatListProps {
  conversations: Conversation[]
  selectedUserId?: string
  onSelectUser: (user: ChatUser) => void
  loading: boolean
}

export function ChatList({ conversations, selectedUserId, onSelectUser, loading }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((c) =>
    c.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Messages</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {loading ? (
            <div className="text-center text-sm text-muted-foreground py-4">Loading chats...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-4">No users found</div>
          ) : (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.user.id}
                onClick={() => onSelectUser(conversation.user)}
                className={cn(
                  "flex items-start gap-3 rounded-lg p-3 text-left transition-all hover:bg-accent",
                  selectedUserId === conversation.user.id && "bg-accent",
                )}
              >
                <Avatar>
                  <AvatarImage src={conversation.user.avatar_url || undefined} />
                  <AvatarFallback>{conversation.user.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{conversation.user.full_name}</span>
                    {conversation.lastMessage && (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.lastMessage.created_at), {
                          addSuffix: false,
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-muted-foreground">
                      {conversation.lastMessage ? conversation.lastMessage.content : "Start a conversation"}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
