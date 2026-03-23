"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../../services/brand.service";

export default function BrandsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

  if (isLoading) {
    return <h2 className="p-10 text-xl">Loading brands...</h2>;
  }

  const brands = data?.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">All Brands</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand: any) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="rounded-lg border p-4 shadow transition hover:shadow-lg"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="mb-3 h-40 w-full object-contain"
            />

            <h3 className="text-center text-lg font-semibold">{brand.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}