// src/app/layout.js
import "./globals.css";
import Providers from "./Providers";
import { Plus_Jakarta_Sans } from "next/font/google";
import ClientLayout from "@/components/ClientLayout"; // Import the new component

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

// This now works perfectly because this file is a Server Component
export const metadata = {
  title: "Blue Academy",
  description: "Created by BDC",
  icons: {
    icon: "/favicon-logo-BA.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.className} font-sans bg-slate-50 text-slate-900`}
      >
        <Providers>
          {/* Pass children to the client wrapper */}
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
