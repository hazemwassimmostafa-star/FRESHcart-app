"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  function handleLogout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");
  }

  const linkClass =
    "text-sm font-medium text-gray-700 transition hover:text-green-600";

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-2xl font-bold text-green-600">
          FreshCart
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className={linkClass}>Home</Link>
          <Link href="/categories" className={linkClass}>Categories</Link>
          <Link href="/brands" className={linkClass}>Brands</Link>
          <Link href="/cart" className={linkClass}>Cart</Link>
          <Link href="/wishlist" className={linkClass}>Wishlist</Link>

          {isLoggedIn ? (
            <>
              <Link href="/profile" className={linkClass}>Profile</Link>
              <Link href="/orders" className={linkClass}>Orders</Link>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>Login</Link>
              <Link href="/register" className={linkClass}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}