"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductsBySubCategory } from "../../../../services/category.service";
import { addProductToCart } from "../../../../services/cart.service";
import { addProductToWishlist } from "../../../../services/wishlist.service";

export default function SubCategoryProductsPage() {
  const params = useParams();
  const subId = params.subId as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["subcategory-products", subId],
    queryFn: () => getProductsBySubCategory(subId),
    enabled: !!subId,
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
    return <h2 className="p-10 text-xl">Loading products...</h2>;
  }

  if (isError) {
    return <h2 className="p-10 text-xl text-red-500">Failed to load products</h2>;
  }

  const products = data?.data?.data || [];

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Subcategory Products
      </h1>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center text-gray-500">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={`/product/${product._id}`}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              <Link href={`/product/${product._id}`}>
                <h3 className="mt-3 line-clamp-1 text-base font-semibold transition hover:text-green-600">
                  {product.title}
                </h3>
              </Link>

              <p className="mt-1 text-sm text-gray-500">
                {product.category?.name}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-green-600">
                  {product.price} EGP
                </span>
                <span className="text-sm text-yellow-500">
                  ⭐ {product.ratingsAverage || 4.5}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => addToCart(product._id)}
                  disabled={cartLoading}
                  className="w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700 disabled:bg-gray-400"
                >
                  {cartLoading ? "Loading..." : "Add to Cart"}
                </button>

                <button
                  onClick={() => addToWishlist(product._id)}
                  disabled={wishlistLoading}
                  className="w-full rounded-lg bg-pink-600 py-2 text-white transition hover:bg-pink-700 disabled:bg-gray-400"
                >
                  {wishlistLoading ? "Loading..." : "Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}