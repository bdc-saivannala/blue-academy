"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// 1. Added Youtube and Instagram to imports
import { Linkedin, Youtube, Instagram } from "lucide-react";

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

  // 2. Created a configuration for your links
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/blue-academy-ai/",
    },
    { icon: Instagram, href: "https://www.instagram.com/blueacademy.ai/" },
    { icon: Youtube, href: "https://www.youtube.com/@blueacademy_ai" },
  ];

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

            {/* 3. Updated Social Media Section */}
            <div className="flex gap-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-slate-400 hover:text-white"
                >
                  <item.icon size={20} />
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
          <p>© 2025 Blue Academy, Inc. All rights reserved.</p>
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
