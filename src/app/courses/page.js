import React from "react";
import Link from "next/link";
import { Clock, BookOpen, Star, Filter, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const courses = [
  {
    title: "Applied Data Science & AI",
    category: "Data Science",
    duration: "6 Months",
    rating: "4.9",
    reviews: "1.2k",
    nextBatch: "Dec 15th",
    features: ["Generative AI", "Python & SQL"],
    slug: "applied-data-science",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Full Stack Web Development",
    category: "Development",
    duration: "5 Months",
    rating: "4.8",
    reviews: "950+",
    nextBatch: "Jan 4th",
    features: ["MERN Stack", "System Design"],
    slug: "full-stack-dev",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Cloud Computing with AWS",
    category: "Cloud",
    duration: "4 Months",
    rating: "4.7",
    reviews: "600+",
    nextBatch: "Dec 20th",
    features: ["Docker & K8s", "DevOps CI/CD"],
    slug: "cloud-computing",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen font-sans bg-slate-50">
      {/* 1. HERO HEADER (Clean Title Only) */}
      <div className="bg-[#0B1120] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>

        <div className="relative z-10 mx-auto text-center max-w-7xl">
          <span className="block mb-3 text-xs font-bold tracking-widest text-blue-400 uppercase animate-fade-in">
            World-Class Curriculum
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl">
            Explore Our Programs
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Accelerate your career with industry-aligned courses designed by
            experts from Google, Microsoft, and IITs.
          </p>
        </div>
      </div>

      {/* 2. FILTER TABS */}
      <div className="sticky z-30 bg-white border-b shadow-sm border-slate-200 top-24">
        <div className="px-6 mx-auto overflow-x-auto max-w-7xl">
          <div className="flex gap-8 min-w-max">
            {[
              "All Programs",
              "Data Science & AI",
              "Web Development",
              "Cloud & DevOps",
              "Cyber Security",
            ].map((tab, i) => (
              <button
                key={i}
                className={`py-4 text-sm font-bold border-b-2 transition-all ${
                  i === 0
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-500 border-transparent hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. COURSE GRID */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="overflow-hidden transition-all duration-300 bg-white border group rounded-2xl border-slate-200 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-blue-800 uppercase tracking-wide">
                  {course.category}
                </div>

                {/* Rating Badge */}
                <div className="absolute flex items-center gap-1 text-sm font-bold text-white bottom-4 left-4">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  {course.rating}{" "}
                  <span className="text-xs font-normal text-slate-300">
                    ({course.reviews})
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold leading-tight transition-colors text-slate-900 group-hover:text-blue-600">
                    {course.title}
                  </h3>
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] font-bold bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between py-3 mb-6 text-xs border-t border-b text-slate-500 border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-blue-500" />{" "}
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-blue-500" /> Online +
                    Live
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Next Batch:</span>
                    <span className="px-2 py-1 font-bold text-green-600 rounded bg-green-50">
                      {course.nextBatch}
                    </span>
                  </div>

                  <Link
                    href={`/courses/detail`}
                    className="flex items-center justify-center w-full gap-2 py-3 font-bold text-white transition-all rounded-lg shadow-lg bg-slate-900 hover:bg-blue-600 shadow-slate-200"
                  >
                    View Program <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. CTA SECTION */}
        <div className="relative p-12 mt-20 overflow-hidden text-center text-white bg-blue-600 rounded-3xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold">
              Confused about which path to take?
            </h2>
            <p className="max-w-xl mx-auto mb-8 text-blue-100">
              Talk to our career counselors for a free profile evaluation and
              find the course that fits your goals.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 font-bold text-blue-900 transition-all bg-white rounded-xl hover:bg-blue-50"
            >
              Book Free Counseling
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
