"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubCategories } from "../../../services/category.service";

export default function SubCategoriesPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["subcategories", id],
    queryFn: () => getSubCategories(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading subcategories...</h2>;
  }

  const subcategories = data?.data?.data || [];

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">
        Sub Categories
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {subcategories.map((sub: any) => (
          <Link
            key={sub._id}
            href={`/categories/subcategory/${sub._id}`}
            className="rounded-xl border bg-white p-5 text-center text-lg font-semibold shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:text-green-600 hover:shadow-lg"
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </div>
  );
}