"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const [courses, setCourses] = useState([]);

  // Fetch Courses for the Footer
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        if (res.ok) {
          const data = await res.json();
          setCourses(data.slice(0, 5)); // Show top 5 courses
        }
      } catch (error) {
        console.error("Footer load error", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <footer className="pt-16 pb-8 font-sans bg-[#020617] border-t border-slate-800 text-slate-400">
      <div className="px-6 mx-auto max-w-7xl">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-12">
          {/* 1. BRAND COLUMN (Left) */}
          <div className="space-y-6 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 group">
              {/* Note: If your logo is black text, you might need a white version for dark mode */}
              <Image
                src="/Standard logo-BAW.png"
                alt="Blue Academy"
                width={100}
                height={100}
                className="object-contain"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Empowering learners worldwide with cutting-edge skills for the
              digital age. Start your journey today.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-colors text-slate-400 hover:text-white"
                >
                  <Icon size={20} fill="currentColor" className="stroke-none" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. LINKS COLUMNS (Right - 4 Columns) */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 md:grid-cols-4">
            {/* Column 1: Company */}
            <div>
              <h4 className="mb-6 text-xs font-bold tracking-wider text-white uppercase">
                Company
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="transition-colors hover:text-blue-400"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Programs (Dynamic) */}
            <div>
              <h4 className="mb-6 text-xs font-bold tracking-wider text-white uppercase">
                Programs
              </h4>
              <ul className="space-y-4 text-sm">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <li key={course._id}>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="block truncate transition-colors hover:text-blue-400"
                      >
                        {course.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="text-slate-600">Loading...</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="mb-6 text-xs font-bold tracking-wider text-white uppercase">
                Resources
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Teaching
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Affiliate
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Certificates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="mb-6 text-xs font-bold tracking-wider text-white uppercase">
                Legal
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-blue-400"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm border-t border-slate-800 md:flex-row text-slate-500">
          <p>© 2024 Blue Academy, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="transition-colors hover:text-white">
              English (IN)
            </button>
            <button className="transition-colors hover:text-white">
              INDIA
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
