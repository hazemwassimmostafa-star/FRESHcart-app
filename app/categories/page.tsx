"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/category.service";
import Link from "next/link";

export default function CategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading categories...</h2>;
  }

  const categories = data?.data?.data;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">All Categories</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat: any) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="rounded-lg border p-4 shadow hover:shadow-lg"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="mb-3 h-40 w-full object-cover"
            />

            <h3 className="text-lg font-semibold text-center">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}