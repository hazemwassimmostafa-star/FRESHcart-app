"use client";

import Link from "next/link";
import {
  clearUserCart,
  createCheckoutSession,
  getLoggedUserCart,
  removeCartItem,
  updateCartItemCount,
} from "../../services/cart.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function CartPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  const { mutate: updateCount } = useMutation({
    mutationFn: ({ productId, count }: { productId: string; count: number }) =>
      updateCartItemCount(productId, count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });

  const { mutate: clearCart } = useMutation({
    mutationFn: clearUserCart,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to clear cart");
    },
  });

  const { mutate: checkout, isPending: checkoutLoading } = useMutation({
    mutationFn: ({
      cartId,
      shippingAddress,
    }: {
      cartId: string;
      shippingAddress: {
        details: string;
        phone: string;
        city: string;
      };
    }) => createCheckoutSession(cartId, shippingAddress),
    onSuccess: (response) => {
      window.location.href = response.data.session.url;
    },
    onError: () => {
      toast.error("Checkout failed");
    },
  });

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading cart...</h2>;
  }

  const cart = data?.data?.data;
  const items = cart?.products || [];

  function handleCheckout() {
    checkout({
      cartId: cart._id,
      shippingAddress: {
        details: "Cairo",
        phone: "01012345678",
        city: "Cairo",
      },
    });
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Cart</h1>

        <div className="flex gap-3">
          <button
            onClick={() => clearCart()}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Clear Cart
          </button>

          <Link
            href="/orders"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            My Orders
          </Link>
        </div>
      </div>

      <h2 className="mb-6 text-xl font-semibold text-green-600">
        Total Price: {cart?.totalCartPrice} EGP
      </h2>

      <div className="mb-8">
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading || !items.length}
          className="rounded bg-green-700 px-6 py-3 text-white disabled:bg-gray-400"
        >
          {checkoutLoading ? "Redirecting..." : "Pay Now"}
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item: any) => (
          <div
            key={item._id}
            className="flex items-center gap-4 rounded-lg border p-4 shadow"
          >
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="h-24 w-24 rounded object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-bold">{item.product.title}</h3>
              <p className="text-green-600">{item.price} EGP</p>

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (item.count > 1) {
                      updateCount({
                        productId: item.product._id,
                        count: item.count - 1,
                      });
                    }
                  }}
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  -
                </button>

                <span>{item.count}</span>

                <button
                  onClick={() =>
                    updateCount({
                      productId: item.product._id,
                      count: item.count + 1,
                    })
                  }
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => deleteItem(item.product._id)}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}