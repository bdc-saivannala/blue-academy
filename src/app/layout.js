"use client"; // Needed for usePathname

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Check if we are in the Admin section
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="font-sans bg-slate-50 text-slate-900">
        {/* Only show Main Navbar if NOT on an Admin page */}
        {!isAdminPage && <Navbar />}

        {/* Main Content */}
        <main className={!isAdminPage ? "min-h-screen" : ""}>{children}</main>

        {/* Only show Footer if NOT on an Admin page */}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
