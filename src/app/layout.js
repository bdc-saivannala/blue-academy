"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleCallButton from "@/components/ScheduleCallButton"; // Bottom-24
import FloatingLeadForm from "@/components/FloatingLeadForm"; // Bottom-48 (Updated in Step 1)
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname && pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${jakarta.className} font-sans bg-slate-50 text-slate-900`}
      >
        {!isAdminPage && <Navbar />}

        <main className={!isAdminPage ? "min-h-screen" : ""}>{children}</main>

        {/* --- FLOATING ACTIONS --- */}
        {!isAdminPage && (
          <>
            {/* 1. Lead Form (Highest: bottom-48) */}
            <FloatingLeadForm />

            {/* 2. Schedule Call (Middle: bottom-24) */}
            <ScheduleCallButton />

            {/* 3. Chat Widget (Lowest: bottom-0/4) */}
            <Script
              src="https://lustrously-prorevision-lesley.ngrok-free.dev/chat-widget/chat-widget.js"
              strategy="lazyOnload"
            />
          </>
        )}

        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
