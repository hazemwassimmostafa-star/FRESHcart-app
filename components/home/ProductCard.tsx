"use client";

import Link from "next/link";

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  cartLoading,
  wishlistLoading,
}: any) {
  return (
    <div className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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

      <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-green-600">{product.price} EGP</span>
        <span className="text-sm text-yellow-500">
          ⭐ {product.ratingsAverage || 4.5}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => onAddToCart(product._id)}
          disabled={cartLoading}
          className="w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700 disabled:bg-gray-400"
        >
          {cartLoading ? "Loading..." : "Add to Cart"}
        </button>

        <button
          onClick={() => onAddToWishlist(product._id)}
          disabled={wishlistLoading}
          className="w-full rounded-lg bg-pink-600 py-2 text-white transition hover:bg-pink-700 disabled:bg-gray-400"
        >
          {wishlistLoading ? "Loading..." : "Wishlist"}
        </button>
      </div>
    </div>
  );
}