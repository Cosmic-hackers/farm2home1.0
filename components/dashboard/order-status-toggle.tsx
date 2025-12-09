"use client"

import { updateOrderStatus } from "@/app/actions/order"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"

export function OrderStatusToggle({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [isPending, startTransition] = useTransition()

    const isDelivered = currentStatus === "delivered"

    function toggleStatus() {
        startTransition(async () => {
            const newStatus = isDelivered ? "pending" : "delivered"
            await updateOrderStatus(orderId, newStatus)
        })
    }

    return (
        <Button
            variant={isDelivered ? "default" : "outline"}
            size="sm"
            onClick={toggleStatus}
            disabled={isPending}
            className={isDelivered ? "bg-green-600 hover:bg-green-700" : ""}
        >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (isDelivered ? "Delivered" : "Mark Delivered")}
        </Button>
    )
}
