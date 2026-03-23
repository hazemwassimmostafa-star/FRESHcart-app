"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductsByBrand } from "../../../services/brand.service";
import { addProductToCart } from "../../../services/cart.service";
import { addProductToWishlist } from "../../../services/wishlist.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function BrandProductsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["brand-products", id],
    queryFn: () => getProductsByBrand(id),
    enabled: !!id,
  });

  const { mutate: addToCart, isPending: cartLoading } = useMutation({
    mutationFn: addProductToCart,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Added to cart");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate: addToWishlist, isPending: wishlistLoading } = useMutation({
    mutationFn: addProductToWishlist,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Added to wishlist");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading brand products...</h2>;
  }

  const products = data?.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Brand Products</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="rounded-lg border p-4 shadow transition hover:shadow-lg"
          >
            <Link href={`/product/${product._id}`}>
              <img
                src={product.imageCover}
                alt={product.title}
                className="mb-3 h-48 w-full object-cover"
              />
            </Link>

            <Link href={`/product/${product._id}`}>
              <h3 className="text-lg font-semibold hover:text-green-600">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
            </Link>

            <p className="mt-2 font-bold text-green-600">{product.price} EGP</p>

            <div className="mt-3 space-y-2">
              <button
                onClick={() => addToCart(product._id)}
                disabled={cartLoading}
                className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
              >
                {cartLoading ? "Loading..." : "Add to Cart"}
              </button>

              <button
                onClick={() => addToWishlist(product._id)}
                disabled={wishlistLoading}
                className="w-full rounded bg-pink-600 py-2 text-white hover:bg-pink-700 disabled:bg-gray-400"
              >
                {wishlistLoading ? "Loading..." : "Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}