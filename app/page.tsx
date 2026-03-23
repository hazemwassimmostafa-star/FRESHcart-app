"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Hero from "../components/home/Hero";
import ProductCard from "../components/home/ProductCard";
import { getAllProducts } from "../services/product.service";
import { addProductToCart } from "../services/cart.service";
import { addProductToWishlist } from "../services/wishlist.service";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
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

  const products = data?.data?.data || [];

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading...</h2>;
  }

  if (isError) {
    return <h2 className="p-10 text-xl text-red-500">Failed to load products</h2>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Hero />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Recent Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-green-500 md:w-80"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center text-gray-500">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              cartLoading={cartLoading}
              wishlistLoading={wishlistLoading}
            />
          ))}
        </div>
      )}
    </main>
  );
}