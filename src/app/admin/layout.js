"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  BookOpen,
  Mail,
  LogOut,
} from "lucide-react";

// --- 1. EXTRACTED SIDEBAR COMPONENT ---
// We move all logic using `useSearchParams` into this separate component
function AdminSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      router.push("/admin/login");
    }
  };

  const navItems = [
    {
      name: "Overview",
      href: "/admin",
      tab: "overview",
      icon: LayoutDashboard,
    },
    {
      name: "Purchases",
      href: "/admin?tab=purchases",
      tab: "purchases",
      icon: ShoppingCart,
    },
    {
      name: "Manage Courses",
      href: "/admin?tab=courses",
      tab: "courses",
      icon: BookOpen,
    },
    {
      name: "Inquiries",
      href: "/admin?tab=inquiries",
      tab: "inquiries",
      icon: Mail,
    },
  ];

  return (
    <aside className="w-64 bg-[#0B1120] text-white flex flex-col fixed h-full z-50 shadow-2xl">
      {/* Header */}
      <div className="flex items-center h-20 px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg">
            <Image
              src="/favicon-logo-BA.png"
              alt="Blue Academy"
              width={25}
              height={25}
            />
          </div>
          <span className="text-lg font-bold tracking-wide">Blue Academy</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          // Check active state safely
          const isActive =
            item.tab === currentTab ||
            (item.tab === "overview" && !searchParams.get("tab"));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-white"
                }
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 mt-auto border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-bold text-red-400 transition-all border rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-300 border-white/5 hover:border-red-500/20"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}

// --- 2. MAIN LAYOUT COMPONENT ---
export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (!authorized)
    return (
      <div className="flex items-center justify-center h-screen">
        Verifying...
      </div>
    );

  return (
    <div className="flex min-h-screen font-sans bg-slate-50">
      {/* ✅ FIX: Wrap the Sidebar in Suspense.
         This tells Next.js: "It's okay if this part waits for search params, 
         but render the rest of the page immediately."
      */}
      <Suspense fallback={<div className="w-64 bg-[#0B1120] h-screen fixed" />}>
        <AdminSidebar />
      </Suspense>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-h-screen p-8 ml-64">{children}</main>
    </div>
  );
}
