"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, GraduationCap } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- SEARCH STATE ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // 1. Handle Scroll & Fetch Data
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        if (res.ok) {
          const data = await res.json();
          setAllCourses(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Search Logic
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setSearchResults(
        allCourses
          .filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      );
    } else {
      setSearchResults([]);
    }
  };

  // 3. Navigation Links Config
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Contacts", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-slate-200 py-3"
            : "bg-white border-transparent py-4"
        }`}
      >
        <div className="flex items-center justify-between px-6 mx-auto max-w-7xl">
          {/* --- LEFT SIDE CONTAINER (Logo + Nav Links) --- */}
          <div className="flex items-center gap-12">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <Image
                src="/Standard logo -BA.png"
                alt="Sample Photo"
                width={70}
                height={70}
              />
            </Link>

            {/* NAVIGATION LINKS (Moved to Left) */}
            <div className="items-center hidden gap-8 md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? "text-blue-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {link.name}
                    {/* Blue Underline for Active Link */}
                    <span
                      className={`absolute -bottom-[22px] left-0 w-full h-[3px] bg-blue-600 rounded-t-full transition-all duration-300 ${
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* --- RIGHT SIDE CONTAINER (Search + Button + Mobile Toggle) --- */}
          <div className="flex items-center gap-6">
            <div className="items-center hidden gap-6 md:flex">
              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <div
                  className={`flex items-center transition-all duration-300 ${
                    isSearchOpen
                      ? "w-60 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200"
                      : "w-auto"
                  }`}
                >
                  {isSearchOpen ? (
                    <>
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search..."
                        className="w-full text-sm bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <X
                        size={16}
                        className="cursor-pointer text-slate-400 hover:text-red-500"
                        onClick={() => setIsSearchOpen(false)}
                      />
                    </>
                  ) : (
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="transition-colors text-slate-600 hover:text-blue-600"
                    >
                      <Search size={22} />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute right-0 py-2 mt-3 overflow-hidden bg-white border shadow-xl top-full w-72 border-slate-100 rounded-xl">
                    {searchResults.map((c) => (
                      <Link
                        key={c._id}
                        href={`/courses/${c.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="block px-4 py-2 text-sm truncate text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href="/courses"
                className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
              >
                Get Started
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 px-6 pt-24 duration-200 bg-white md:hidden animate-in slide-in-from-top-10 fade-in">
          <div className="flex flex-col gap-6 text-lg font-bold text-slate-900">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="pb-4 border-b border-slate-100"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 mt-4 text-center text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
