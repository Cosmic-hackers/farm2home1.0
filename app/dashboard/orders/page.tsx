import { createClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusToggle } from "@/components/dashboard/order-status-toggle"

export default async function OrdersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  const isBuyer = profile?.role === "buyer"

  let query = supabase.from("orders").select(`
      *,
      profiles:buyer_id(full_name),
      farms(name),
      order_items(
        quantity,
        products(name, unit)
      )
    `)

  if (isBuyer) {
    query = query.eq("buyer_id", user.id)
  } else {
    // For farmers, we need to find orders for their farm
    // This is a bit complex with the current schema if we don't have the farm_id handy
    // But RLS should handle it if we just query orders.
    // However, let's be explicit if possible.
    // RLS: "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = buyer_id OR EXISTS (SELECT 1 FROM farms WHERE id = farm_id AND owner_id = auth.uid()));
    // So a simple select should work and return only relevant orders.
  }

  const { data: orders } = await query.order("created_at", { ascending: false })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{isBuyer ? "My Orders" : "Customer Orders"}</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>{isBuyer ? "Farm" : "Customer"}</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                  <TableCell>{isBuyer ? order.farms?.name : order.profiles?.full_name}</TableCell>
                  <TableCell>
                    {order.order_items?.map((item: any) => (
                      <div key={item.products.name}>
                        {item.quantity} {item.products.unit} {item.products.name}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>₹{order.total_amount?.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "shipped"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          order.status === "delivered"
                            ? "bg-green-500 hover:bg-green-600"
                            : order.status === "shipped"
                              ? "bg-blue-500 hover:bg-blue-600 text-white"
                              : ""
                        }
                      >
                        {order.status || "Pending"}
                      </Badge>
                      {!isBuyer && (
                        <OrderStatusToggle orderId={order.id} currentStatus={order.status || "pending"} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!orders || orders.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
