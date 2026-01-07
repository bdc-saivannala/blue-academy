"use client"; // Needed for usePathname

import "./globals.css";
import { usePathname } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google"; // 1. Import Font
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import Script from "next/script";

// 2. Configure the Font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Check if we are in the Admin section
  const isAdminPage = pathname && pathname.startsWith("/admin");

  return (
    <html lang="en">
      {/* 3. Apply the font class to the Body */}
      <body
        className={`${jakarta.className} font-sans bg-slate-50 text-slate-900`}
      >
        {/* Only show Main Navbar if NOT on an Admin page */}
        {!isAdminPage && <Navbar />}

        {/* Main Content */}
        <main className={!isAdminPage ? "min-h-screen" : ""}>{children}</main>

        {/* Floating Call Button (Visible on every page) */}
        {!isAdminPage && <ScheduleCallButton />}

        {/* --- CHAT WIDGET --- */}
        {!isAdminPage && <Script
          src="https://lustrously-prorevision-lesley.ngrok-free.dev/chat-widget/chat-widget.js"
          strategy="lazyOnload"
        />}

        {/* Only show Footer if NOT on an Admin page */}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
