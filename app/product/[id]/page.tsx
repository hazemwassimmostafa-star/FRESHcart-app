"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProductsByCategory,
  getSpecificProduct,
} from "../../../services/product.service";
import { addProductToCart } from "../../../services/cart.service";
import { addProductToWishlist } from "../../../services/wishlist.service";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getSpecificProduct(id),
    enabled: !!id,
  });

  const product = data?.data?.data;

  const { data: relatedData, isLoading: relatedLoading } = useQuery({
    queryKey: ["related-products", product?.category?._id],
    queryFn: () => getProductsByCategory(product.category._id),
    enabled: !!product?.category?._id,
  });

  const relatedProducts =
    relatedData?.data?.data?.filter((item: any) => item._id !== product?._id) ||
    [];

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
    return <h2 className="p-10 text-xl">Loading product...</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>

        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
          <p className="mb-4 text-gray-600">{product.description}</p>
          <p className="mb-2 text-lg font-semibold text-green-600">
            {product.price} EGP
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Category: {product.category?.name}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => addToCart(product._id)}
              disabled={cartLoading}
              className="w-full rounded bg-green-600 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              {cartLoading ? "Loading..." : "Add to Cart"}
            </button>

            <button
              onClick={() => addToWishlist(product._id)}
              disabled={wishlistLoading}
              className="w-full rounded bg-pink-600 py-3 text-white hover:bg-pink-700 disabled:bg-gray-400"
            >
              {wishlistLoading ? "Loading..." : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>

        {relatedLoading ? (
          <p>Loading related products...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.slice(0, 8).map((item: any) => (
              <div key={item._id} className="rounded-lg border p-4 shadow">
                <Link href={`/product/${item._id}`}>
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="mb-3 h-48 w-full object-cover"
                  />
                </Link>

                <Link href={`/product/${item._id}`}>
                  <h3 className="text-lg font-semibold hover:text-green-600">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                </Link>

                <p className="font-bold text-green-600">{item.price} EGP</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}