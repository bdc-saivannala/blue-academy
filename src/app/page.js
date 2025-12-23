"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import Script from "next/script";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Award,
  Briefcase,
  Users,
  MonitorPlay,
  FileText,
  Clock,
  Shield,
} from "lucide-react";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  // --- FETCH REAL COURSES FROM BACKEND ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        if (res.ok) {
          const data = await res.json();
          window.__BDC_PAGE_PAYLOAD__ = {
            type: "course_list",
            status: "ready",
            data,
          };
          // Get the latest 3 courses for the "Top Rated" section
          setCourses(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- DYNAMIC CATEGORIES LOGIC ---
  // 1. Extract all categories from courses
  // 2. Use Set to remove duplicates
  // 3. Add "All" to the beginning
  const categories = useMemo(() => {
    // Get unique categories from loaded courses
    const uniqueCats = [
      ...new Set(courses.map((c) => c.category).filter(Boolean)),
    ];
    return ["All", ...uniqueCats];
  }, [courses]);

  // --- FILTER LOGIC ---
  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter(
          (course) => course.category && course.category.trim() === activeTab
        );

  // Logos to scroll
  const logos = [
    "Google",
    "Microsoft",
    "Spotify",
    "Amazon",
    "Airbnb",
    "Meta",
    "Netflix",
    "Adobe",
    "Tesla",
    "Uber",
  ];

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900">
      {/* =========================================
          1. HERO SECTION
      ========================================= */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        {/* Background Blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3"></div>

        <div className="grid items-center grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-2">
          {/* Left Text */}
          <div className="relative z-10 space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
              Never Stop Learning
            </span>
            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Master the Skills of <br />
              <span className="text-blue-600">Tomorrow, Today</span>
            </h1>
            <p className="max-w-lg text-lg text-slate-600">
              Industry-relevant courses designed by experts. Get certified,
              master modern tech, and accelerate your career growth with Blue
              Academy.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/courses"
                className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                Explore Courses <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-3.5 bg-white text-slate-700 font-bold border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2">
                <Play size={18} className="fill-slate-700" /> Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/men/${
                      i * 10
                    }.jpg`}
                    className="w-10 h-10 border-2 border-white rounded-full"
                    alt="User"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">4.8/5 Rating</p>
                <p className="text-slate-500">from 15k+ students</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10">
            <div className="relative overflow-hidden shadow-2xl rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Students learning"
                className="object-cover w-full h-full"
              />
              {/* Floating Badge */}
              <div className="absolute flex items-center gap-3 p-4 bg-white rounded-lg shadow-xl bottom-8 left-8 animate-bounce-slow">
                <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-full">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">
                    Success Rate
                  </p>
                  <p className="text-lg font-bold text-slate-900">98% Hired</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. LOGO STRIP
      ========================================= */}
      <div className="py-12 overflow-hidden bg-white border-y border-slate-100">
        <div className="px-6 mx-auto mb-8 text-center max-w-7xl">
          <p className="font-bold tracking-widest uppercase text-md text-slate-700">
            Trusted by Top Companies
          </p>
        </div>

        <div className="relative flex w-full overflow-x-hidden">
          {/* Fading Edges Mask */}
          <div className="absolute top-0 bottom-0 left-0 z-10 w-24 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 z-10 w-24 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

          {/* Scrolling Track - Using max-content to prevent wrapping */}
          <div
            className="flex animate-infinite-scroll hover:paused"
            style={{ width: "max-content" }}
          >
            {/* Original Set */}
            {logos.map((logo, index) => (
              <div
                key={index}
                className="mx-12 flex items-center justify-center min-w-[100px]"
              >
                <h3 className="text-2xl font-bold text-blue-400 transition-opacity cursor-default opacity-60 hover:opacity-100">
                  {logo}
                </h3>
              </div>
            ))}

            {/* Duplicate Set (Must be identical for seamless loop) */}
            {logos.map((logo, index) => (
              <div
                key={`dup-${index}`}
                className="mx-12 flex items-center justify-center min-w-[100px]"
              >
                <h3 className="text-2xl font-bold text-blue-400 transition-opacity cursor-default opacity-60 hover:opacity-100">
                  {logo}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* CSS for Seamless Animation */}
        <style jsx>{`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
          .hover\:paused:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      {/* =========================================
          3. EXPAND YOUR HORIZON (Exact Design Match)
      ========================================= */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        {/* HEADER - Split Layout */}
        <div className="flex flex-col items-start justify-between mb-12 lg:flex-row lg:items-end gap-y-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Expand Your Horizon
            </h2>
            <p className="mt-3 text-lg text-slate-500">
              Explore our highest-rated programs.
            </p>
          </div>

          {/* --- DYNAMIC FILTER BUTTONS --- */}
          <div className="flex flex-wrap gap-2">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all border ${
                  activeTab === tab
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                    : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* COURSE GRID - ALTERNATIVE DESIGN */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            Loading courses...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Link
                  href={`/courses/${course.slug}`} // Assuming we want it clickable
                  key={course._id}
                  className="group flex flex-col h-full bg-white border rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
                >
                  {/* 2. IMAGE ON TOP */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={
                        course.image ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={course.title}
                      className="object-cover w-full h-full p-2 transition-transform duration-500 rounded-2xl group-hover:scale-110"
                    />
                  </div>

                  {/* CONTENT BODY */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* 3. DURATION & ENROLLMENT ROW */}
                    <div className="flex items-center justify-between mb-3 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" />
                        <span>{course.duration || "3 Months"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-slate-400" />
                        <span>2.5k Enrolled</span>{" "}
                        {/* Static/Mocked as data might not exist */}
                      </div>
                    </div>

                    {/* 4. COURSE TITLE */}
                    <h3 className="mb-2 text-lg font-bold leading-snug transition-colors text-slate-900 line-clamp-2 group-hover:text-blue-600">
                      {course.title}
                    </h3>

                    {/* 5. COURSE DESCRIPTION */}
                    <div
                      className="mb-2 text-sm leading-relaxed text-slate-600 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          course.subtitle?.replace(/<[^>]+>/g, "") ||
                          "Master the skills needed to launch your tech career.",
                      }}
                    />

                    {/* 6. SKILLS & ARROW ROW */}
                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-100">
                      {/* Skills (Left) */}
                      <div className="flex flex-wrap gap-2">
                        {/* Display only the first skill to keep layout clean, or mapping slice */}
                        {course.skills && course.skills.length > 1 ? (
                          <span className="px-2 py-1 text-xs font-medium text-blue-700 rounded bg-blue-50">
                            {course.skills[0]}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-slate-500">
                            Certificate Program
                          </span>
                        )}
                        {course.skills && course.skills.length > 1 && (
                          <span className="px-1 py-1 text-xs font-medium text-slate-500">
                            +{course.skills.length - 1}
                          </span>
                        )}
                      </div>

                      {/* Right Arrow (Right) */}
                      <div className="flex items-center justify-center w-8 h-8 transition-all rounded-full bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center text-slate-400">
                No courses found matching your criteria.
              </div>
            )}
          </div>
        )}

        {/* "View All Courses" Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/courses"
            className="flex items-center gap-2 px-8 py-3.5 text-sm font-bold bg-white border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-800 hover:text-white transition-all shadow-sm"
          >
            View All Courses <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* =========================================
          4. CERTIFICATIONS SECTION (Light Blue)
      ========================================= */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            {/* LEFT: Sticky Text Content */}
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase border border-blue-100 rounded-lg bg-blue-50">
                <Star size={12} fill="currentColor" /> The Blue Standard
              </div>

              <h2 className="text-4xl font-extrabold leading-tight md:text-5xl text-slate-900">
                More Than Just <br />
                <span className="text-blue-600">
                  {" "}
                  {/* Added blue color for the typing part */}
                  <TypeAnimation
                    sequence={[
                      "A Certificate.", // Type this
                      1500, // Wait 1.5s
                      "A Job Offer.", // Delete & Type this
                      1500, // Wait 1.5s
                      "A Future.", // Delete & Type this
                      1500,
                      "A Career.", // Delete & Type this
                      5000, // Wait 5s before restarting
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={true}
                  />
                </span>
              </h2>

              <p className="max-w-md text-lg leading-relaxed text-slate-500">
                Our curriculum isn't just theory. It's a blueprint for your
                career, co-created with Principal Engineers from the world's top
                tech firms.
              </p>

              {/* Trust Stat */}
              <div className="flex items-center gap-6 pt-4">
                <div className="pr-6 border-r border-slate-200">
                  <p className="text-3xl font-bold text-slate-900">4.9/5</p>
                  <p className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                    Student Rating
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">92%</p>
                  <p className="text-xs font-bold tracking-wider text-blue-400 uppercase">
                    Transition Rate
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Stacked Cards */}
            <div className="relative z-10 space-y-6">
              {[
                {
                  icon: FileText,
                  title: "Project-Based Portfolio",
                  text: "Don't just watch videos. Build 10+ production-grade projects that prove your skills to recruiters.",
                  color: "bg-blue-600",
                  light: "bg-blue-50 text-blue-600",
                },
                {
                  icon: Award,
                  title: "Globally Recognized",
                  text: "Earn certifications valued by startups and Fortune 500s alike. ISO & STEM accredited.",
                  color: "bg-indigo-600",
                  light: "bg-indigo-50 text-indigo-600",
                },
                {
                  icon: Briefcase,
                  title: "Job-Ready ecosystem",
                  text: "From resume audits to mock interviews, we provide the toolkit you need to get hired.",
                  color: "bg-teal-600",
                  light: "bg-teal-50 text-teal-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 p-6 transition-all duration-300 bg-white border shadow-sm border-slate-100 rounded-2xl hover:shadow-xl hover:border-blue-100 group"
                >
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-xl shrink-0 transition-colors ${item.light} group-hover:bg-slate-900 group-hover:text-white`}
                  >
                    <item.icon size={26} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold transition-colors text-slate-900 group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          5. ADVANTAGES SECTION (Bento Grid Design)
      ========================================= */}
      <section className="relative py-24 border-t bg-blue-50 border-slate-100">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

        <div className="relative px-6 mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-1.5 text-sm font-bold tracking-wider text-blue-600 uppercase bg-white rounded-full">
              Why Choose Us
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900 md:text-4xl">
              The Blue Academy Advantage
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600">
              We provide an ecosystem for success, designed to bridge the gap
              between learning and hired.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 100% Online - Large Card */}
            <div className="relative p-10 overflow-hidden transition-all duration-300 bg-blue-600 border group md:col-span-2 rounded-3xl hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 translate-x-32 -translate-y-32 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 -translate-x-24 translate-y-24 bg-blue-700 rounded-full opacity-20"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white/10 backdrop-blur rounded-2xl">
                  <MonitorPlay
                    size={32}
                    className="text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  100% Online Learning
                </h3>
                <p className="text-lg leading-relaxed text-blue-100">
                  Learn from anywhere in the world at your own pace. Access
                  course materials 24/7, pause and resume anytime.
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute grid grid-cols-3 gap-2 opacity-10 bottom-8 right-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-white rounded-sm"></div>
                ))}
              </div>
            </div>

            {/* Secure Platform */}
            <div className="relative p-8 overflow-hidden transition-all duration-300 bg-white border-2 group border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-100">
              <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-50 to-transparent opacity-60"></div>

              <div className="inline-flex items-center justify-center text-blue-600 transition-colors w-14 h-14 bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white">
                <Shield size={28} strokeWidth={1.5} />
              </div>

              <h3 className="mt-6 mb-2 text-xl font-bold text-slate-900">
                Secure Platform
              </h3>
              <p className="leading-relaxed text-slate-600">
                Your data, progress, and certifications are always safe.
              </p>

              {/* Progress Bar Decoration */}
              <div className="flex gap-1 mt-6">
                <div className="h-1 bg-blue-200 rounded-full w-14"></div>
                <div className="w-20 h-1 bg-blue-400 rounded-full"></div>
                <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
              </div>
            </div>

            {/* Expert Mentors */}
            <div className="relative p-8 overflow-hidden transition-all duration-300 border-2 bg-gradient-to-br from-slate-50 to-white group border-slate-100 rounded-3xl hover:shadow-xl hover:border-blue-100">
              <div className="inline-flex items-center justify-center mb-6 text-indigo-600 transition-all w-14 h-14 bg-indigo-50 rounded-2xl group-hover:scale-110">
                <Users size={28} strokeWidth={1.5} />
              </div>

              <h3 className="mb-2 text-xl font-bold text-slate-900">
                Expert Mentors
              </h3>
              <p className="leading-relaxed text-slate-600">
                Learn directly from engineers at Google, Amazon, and Microsoft.
              </p>

              {/* Avatar Stack */}
              <div className="flex mt-6 -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/men/${
                      i * 15
                    }.jpg`}
                    className="w-10 h-10 border-2 border-white rounded-full"
                    alt="Mentor"
                  />
                ))}
                <div className="flex items-center justify-center w-10 h-10 text-xs font-bold text-white bg-indigo-600 border-2 border-white rounded-full">
                  +12
                </div>
              </div>
            </div>

            {/* Flexible Timing */}
            <div className="relative p-8 overflow-hidden transition-all duration-300 border-2 border-orange-100 bg-orange-50 group rounded-3xl hover:shadow-xl">
              <div className="absolute w-32 h-32 bg-orange-100 rounded-full opacity-50 -bottom-6 -right-6"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center mb-6 text-orange-600 transition-transform bg-white w-14 h-14 rounded-2xl group-hover:rotate-12">
                  <Clock size={28} strokeWidth={1.5} />
                </div>

                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  Flexible Timing
                </h3>
                <p className="leading-relaxed text-slate-600">
                  No strict schedules. Balance learning with your job or
                  college.
                </p>
              </div>
            </div>

            {/* Placement Support & Certificates - Combined Large Card */}
            <div className="relative col-span-1 p-10 overflow-hidden transition-all duration-300 bg-gradient-to-br from-slate-900 to-slate-800 group md:col-span-2 rounded-3xl hover:shadow-2xl">
              {/* Grid Pattern Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(to_right,white_1px,transparent_1px)] [background-size:20px_20px]"></div>
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Placement Support */}
                <div>
                  <div className="inline-flex items-center justify-center mb-6 text-white w-14 h-14 bg-white/10 backdrop-blur rounded-2xl">
                    <Briefcase size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    Placement Support
                  </h3>
                  <p className="text-slate-300">
                    Exclusive job board access and resume building workshops.
                  </p>
                </div>

                {/* Verified Certificates */}
                <div>
                  <div className="inline-flex items-center justify-center mb-6 text-white w-14 h-14 bg-white/10 backdrop-blur rounded-2xl">
                    <CheckCircle size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    Verified Certificates
                  </h3>
                  <p className="text-slate-300">
                    Add significant value to your LinkedIn profile and resume.
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-white">98%</p>
                  <p className="text-sm text-slate-400">Placement Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-slate-400">Partner Companies</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">15k+</p>
                  <p className="text-sm text-slate-400">Alumni Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          6. CORPORATE BANNER (Dark Blue)
      ========================================= */}
      <section className="px-6 py-20 mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-[#0B1120] rounded-3xl shadow-2xl">
          <div className="grid items-center grid-cols-1 gap-12 p-12 lg:grid-cols-2">
            <div className="relative z-10 space-y-6">
              <span className="px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase bg-white/10 rounded-full">
                For Business
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Upskill your workforce with <br />
                <span className="text-blue-400">Corporate L&D Solutions</span>
              </h2>
              <p className="text-slate-400">
                Customized training programs to help your engineering teams
                master Cloud, AI, and DevOps.
              </p>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-blue-500" /> Customize
                  learning paths
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-blue-500" /> Analytics
                  & Reporting
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-blue-500" /> Dedicated
                  Account Manager
                </li>
              </ul>

              <Link
                href="/contact"
                className="inline-block px-8 py-3 font-bold text-blue-900 bg-white rounded-lg hover:bg-blue-50"
              >
                Get a Quote
              </Link>
            </div>

            <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                alt="Corporate meeting"
                className="absolute inset-0 object-cover w-full h-full opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0B1120]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHAT WIDGET --- */}
      <Script
        src="https://lustrously-prorevision-lesley.ngrok-free.dev/chat-widget/chat-widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
