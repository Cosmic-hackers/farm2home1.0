"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createOrder(productId: string, quantity: number, address: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get product details
  const { data: product } = await supabase.from("products").select("*, farms(owner_id)").eq("id", productId).single()

  if (!product) {
    throw new Error("Product not found")
  }

  // Create Order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      buyer_id: user.id,
      farm_id: product.farm_id,
      status: "pending",
      total_amount: product.price * quantity,
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Create Order Item
  const { error: itemError } = await supabase.from("order_items").insert({
    order_id: order.id,
    product_id: productId,
    quantity: quantity,
    price_at_time: product.price,
  })

  if (itemError) throw itemError

  // Send Message to Farmer
  const messageContent = `New Order #${order.id.slice(0, 8)}!
  
Product: ${product.name}
Quantity: ${quantity} ${product.unit}
Total: $${(product.price * quantity).toFixed(2)}

Delivery Address:
${address}

Please confirm when shipped.`

  const { error: msgError } = await supabase.from("messages").insert({
    sender_id: user.id,
    receiver_id: product.farms.owner_id,
    content: messageContent,
  })

  if (msgError) throw msgError

  revalidatePath("/dashboard/orders")
  return order.id
}
