import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blue Academy - Future of Tech Education",
  description: "Master Data Science, AI, and Full Stack Development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="min-h-screen pt-20">
          {" "}
          {/* pt-20 pushes content below fixed navbar */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
