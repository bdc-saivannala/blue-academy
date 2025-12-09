"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* WRAPPER: Centers the navbar and adds padding from top */}
      <div className="fixed top-0 left-0 z-50 flex justify-center w-full pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-500 ease-out border border-white/10 ${
            isScrolled
              ? "w-[90%] md:w-[80%] py-3 px-6 shadow-2xl"
              : "w-[95%] md:w-[85%] py-4 px-8 shadow-xl"
          } bg-slate-900 text-white rounded-full backdrop-blur-xl`}
          // ^^^ FIXED: Added 'bg-slate-900' and 'text-white' permanently
        >
          <div className="flex items-center justify-between">
            {/* 1. LOGO */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white transition-transform bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 group-hover:rotate-12">
                B
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Blue Academy
              </span>
            </Link>

            {/* 2. CENTER NAVIGATION (Desktop) */}
            <div className="items-center hidden gap-1 px-2 py-1 border rounded-full md:flex bg-white/5 border-white/5">
              {/* <Link
                href="/"
                className="px-5 py-2 text-sm font-medium transition-all rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                Home
              </Link> */}

              {/* Courses Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setIsCourseMenuOpen(true)}
                onMouseLeave={() => setIsCourseMenuOpen(false)}
              >
                <button className="flex items-center gap-1 px-5 py-2 text-sm font-medium transition-all rounded-full text-slate-300 hover:text-white hover:bg-white/10 group-hover:text-white">
                  Courses{" "}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      isCourseMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Content */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300 ${
                    isCourseMenuOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="w-[340px] bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-2 overflow-hidden ring-1 ring-white/10">
                    {/* Header Strip */}
                    <div className="px-4 py-2 mb-2 border-b bg-slate-800/50 border-slate-700/50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Popular Programs
                      </span>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-1">
                      <Link
                        href="/courses/detail"
                        className="flex items-start gap-3 p-3 transition-all hover:bg-white/5 rounded-xl group/item"
                      >
                        <div className="flex items-center justify-center w-8 h-8 text-blue-400 transition-colors rounded-lg bg-blue-500/10 group-hover/item:bg-blue-600 group-hover/item:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 2v20M2 12h20" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white transition-colors group-hover/item:text-blue-400">
                            Data Science & AI
                          </div>
                          <div className="text-xs text-slate-400">
                            Trending • 6 Months
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/courses/detail"
                        className="flex items-start gap-3 p-3 transition-all hover:bg-white/5 rounded-xl group/item"
                      >
                        <div className="flex items-center justify-center w-8 h-8 text-green-400 transition-colors rounded-lg bg-green-500/10 group-hover/item:bg-green-600 group-hover/item:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 16 4-4-4-4" />
                            <path d="m6 8-4 4 4 4" />
                            <path d="m14.5 4-5 16" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white transition-colors group-hover/item:text-green-400">
                            Full Stack Dev
                          </div>
                          <div className="text-xs text-slate-400">
                            Placement Guarantee
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/courses/detail"
                        className="flex items-start gap-3 p-3 transition-all hover:bg-white/5 rounded-xl group/item"
                      >
                        <div className="flex items-center justify-center w-8 h-8 text-purple-400 transition-colors rounded-lg bg-purple-500/10 group-hover/item:bg-purple-600 group-hover/item:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.5 19c0-1.7-1.3-3-3-3h-11" />
                            <path d="M17.5 19c1.7 0 3-1.3 3-3v-8c0-1.7-1.3-3-3-3H4.5" />
                            <path d="M17.5 5H4.5c-1.7 0-3 1.3-3 3v8c0 1.7 1.3 3 3 3" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white transition-colors group-hover/item:text-purple-400">
                            Cloud Computing
                          </div>
                          <div className="text-xs text-slate-400">
                            AWS Certified
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Footer Action */}
                    <Link
                      href="/courses"
                      className="block p-3 mt-2 text-xs font-bold tracking-wider text-center text-white uppercase transition-colors bg-blue-600 hover:bg-blue-500 rounded-xl"
                    >
                      View All Programs
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="px-5 py-2 text-sm font-medium transition-all rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="px-5 py-2 text-sm font-medium transition-all rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                Contact
              </Link>
            </div>

            {/* 3. RIGHT ACTIONS */}
            <div className="items-center hidden gap-3 md:flex">
              {/* Search Bar */}
              <div
                className={`flex items-center bg-white/10 border border-white/5 rounded-full transition-all duration-300 ${
                  isSearchOpen
                    ? "w-56 px-4 py-2"
                    : "w-10 h-10 justify-center hover:bg-white/20 cursor-pointer"
                }`}
              >
                <Search
                  size={18}
                  className="text-white shrink-0"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className={`bg-transparent border-none outline-none text-sm text-white ml-2 w-full placeholder:text-slate-400 ${
                    isSearchOpen ? "block" : "hidden"
                  }`}
                />
              </div>

              {/* Get-Started Button */}
              <Link
                href="/courses"
                className="group relative px-6 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-full overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white transition-colors rounded-full md:hidden bg-white/10 hover:bg-white/20"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <Link
          href="/courses"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl font-bold text-white"
        >
          Courses
        </Link>
        <Link
          href="/about"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl font-bold text-white"
        >
          About
        </Link>
        <Link
          href="/contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl font-bold text-white"
        >
          Contact
        </Link>

        <Link
          href="/courses"
          className="px-10 py-4 mt-4 font-bold text-white bg-blue-600 shadow-xl rounded-2xl shadow-blue-600/20"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Start Learning
        </Link>
      </div>
    </>
  );
};

export default Navbar;
