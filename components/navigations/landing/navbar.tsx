"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useAuthStore } from "@/servers/stores/useAuthStore";
import { ChevronDown, LayoutGrid, LogIn } from "lucide-react";

export const Navbar = () => {
  const uuid = useAuthStore((state) => state.uuid);
  const isLoggedIn = Boolean(uuid);

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-100">
      <div className="mx-auto flex w-[90%] max-w-400 items-center justify-between px-6 xl:px-8 py-4">
        <Logo />

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#beranda"
            className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1 -mb-0.75"
          >
            Beranda
          </Link>
          <Link
            href="#tentang-kami"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Tentang Kami
          </Link>
          <Link
            href="#fitur"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Fitur
          </Link>
          <Link
            href="#cara-kerja"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cara kerja
          </Link>
          <Link
            href="#harga"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Harga
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors bg-white shadow-xs">
            <span className="text-base leading-none">🇮🇩</span>
            <span className="text-sm font-medium text-slate-700">ID</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* CTA Button */}
          <Link href={isLoggedIn ? "/dashboard" : "/login"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 rounded-md">
              {isLoggedIn ? (
                <>
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
