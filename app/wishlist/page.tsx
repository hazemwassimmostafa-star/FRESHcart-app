"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLoggedUserWishlist,
  removeWishlistItem,
} from "../../services/wishlist.service";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getLoggedUserWishlist,
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      toast.success("Item removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading wishlist...</h2>;
  }

  const items = data?.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>

      <div className="space-y-6">
        {items.map((product: any) => (
          <div
            key={product._id}
            className="flex items-center gap-4 rounded-lg border p-4 shadow"
          >
            <img
              src={product.imageCover}
              alt={product.title}
              className="h-24 w-24 rounded object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-green-600">{product.price} EGP</p>
            </div>

            <button
              onClick={() => removeItem(product._id)}
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