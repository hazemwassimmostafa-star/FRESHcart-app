"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../services/order.service";
import { getUserDataFromToken } from "../../lib/token";

export default function OrdersPage() {
  const userData = getUserDataFromToken();

  const { data, isLoading } = useQuery({
    queryKey: ["orders", userData?.id],
    queryFn: () => getUserOrders(userData!.id),
    enabled: !!userData?.id,
  });

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading orders...</h2>;
  }

  const orders = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

      <div className="space-y-8">
        {orders.length > 0 ? (
          orders.map((order: any) => (
            <div key={order._id} className="rounded-lg border p-6 shadow">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Order #{order._id}</h2>
                <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                  Total: {order.totalOrderPrice} EGP
                </span>
              </div>

              <p className="mb-2 text-gray-600">
                Payment Method: {order.paymentMethodType}
              </p>

              <p className="mb-4 text-gray-600">
                Paid: {order.isPaid ? "Yes" : "No"}
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {order.cartItems?.map((item: any) => (
                  <div key={item._id} className="rounded border p-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="mb-3 h-40 w-full object-cover"
                    />
                    <h3 className="font-semibold">{item.product.title}</h3>
                    <p className="text-green-600">
                      {item.price} EGP × {item.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found yet.</p>
        )}
      </div>
    </div>
  );
}