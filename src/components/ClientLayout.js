// src/components/ClientLayout.js
"use client"; // This is crucial!

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import InstantCall from "@/components/InstantCall";
import Script from "next/script";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  // Safe check for pathname existence
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      {/* Main content wrapper */}
      <main className={!isAdminPage ? "min-h-screen" : ""}>{children}</main>

      {/* --- FLOATING ACTIONS --- */}
      {!isAdminPage && (
        <>
          <InstantCall />
          <ScheduleCallButton />

          <Script
            src="https://dev.solutionspace.in/blueacademypresale/chat-widget/chat-widget.js"
            strategy="lazyOnload"
          />
        </>
      )}

      {!isAdminPage && <Footer />}
    </>
  );
}
