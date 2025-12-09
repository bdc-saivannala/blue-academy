import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-slate-800 font-sans">
      {/* 1. NEWSLETTER SECTION */}
      <div className="border-b border-slate-800 bg-slate-900/30">
        <div className="flex flex-col items-center justify-between gap-8 px-6 py-12 mx-auto max-w-7xl md:flex-row">
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Join our Newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Get the latest tech news, hiring trends, and course updates.
            </p>
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-white transition-all border rounded-lg outline-none bg-slate-900 border-slate-700 focus:border-blue-500 md:w-80 placeholder:text-slate-600"
            />
            <button className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 shrink-0 shadow-blue-900/20">
              Subscribe <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="grid grid-cols-1 gap-12 px-6 py-16 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white transition-transform shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-blue-900/20 group-hover:scale-105">
              B
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Blue Academy
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">
            Blue Academy is the trusted platform for landing high-paying tech
            jobs. We teach the skills that matter.
          </p>
          <div className="flex gap-4 pt-2">
            {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full bg-slate-800 border-slate-700 hover:bg-blue-600 hover:border-blue-500 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-wider text-white uppercase">
            Company
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/" className="transition-colors hover:text-blue-400">
                Home
              </Link>
            </li>
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
                href="/courses"
                className="transition-colors hover:text-blue-400"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-blue-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-blue-400">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-wider text-white uppercase">
            Programs
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/courses/detail"
                className="transition-colors hover:text-blue-400"
              >
                Data Science & AI
              </Link>
            </li>
            <li>
              <Link
                href="/courses/detail"
                className="transition-colors hover:text-blue-400"
              >
                Full Stack Development
              </Link>
            </li>
            <li>
              <Link
                href="/courses/detail"
                className="transition-colors hover:text-blue-400"
              >
                Cloud Computing
              </Link>
            </li>
            <li>
              <Link
                href="/courses/detail"
                className="transition-colors hover:text-blue-400"
              >
                DevOps Engineering
              </Link>
            </li>
            <li>
              <Link
                href="/courses/detail"
                className="transition-colors hover:text-blue-400"
              >
                Cyber Security
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-wider text-white uppercase">
            Contact
          </h4>
          <ul className="space-y-6 text-sm">
            <li className="flex items-start gap-3 cursor-pointer group">
              <MapPin
                className="text-blue-500 transition-colors shrink-0 group-hover:text-white"
                size={20}
              />
              <span className="leading-relaxed transition-colors group-hover:text-white">
                706, International Finance Center, Vesu
                <br />
                Surat, Gujarat - 395001
              </span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer group">
              <Phone
                className="text-blue-500 transition-colors shrink-0 group-hover:text-white"
                size={20}
              />
              <span className="transition-colors group-hover:text-white">
                +91 98765 43210
              </span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer group">
              <Mail
                className="text-blue-500 transition-colors shrink-0 group-hover:text-white"
                size={20}
              />
              <span className="transition-colors group-hover:text-white">
                admissions@blueacademy.com
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. BOTTOM BAR */}
      <div className="border-t border-slate-800 bg-[#020617]">
        <div className="flex flex-col items-center justify-between gap-4 px-6 py-8 mx-auto text-sm max-w-7xl md:flex-row">
          <p>© 2025 Blue Academy. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
