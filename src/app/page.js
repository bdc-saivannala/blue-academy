"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Award,
  Users,
  Briefcase,
  Star,
  CheckCircle,
  Code,
  Database,
  Cloud,
  Shield,
  Globe,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- CAROUSEL DATA ---
  const slides = [
    {
      id: 1,
      tag: "Admissions Open 2025",
      title: "Master Generative AI & Data Science",
      subtitle:
        "Join the elite program certified by Microsoft & AWS. Build LLMs and Neural Networks from scratch.",
      cta_primary: "View Curriculum",
      cta_secondary: "Talk to Advisor",
      theme: "from-blue-600 via-indigo-600 to-purple-600", // Gradient for text/buttons
      visual: "datascience", // Triggers specific 3D graphics
    },
    {
      id: 2,
      tag: "New Batch: Dec 15th",
      title: "Full Stack Web Development",
      subtitle:
        "Become a top 1% developer. Master React, Next.js, and System Design with 1:1 mentorship.",
      cta_primary: "Explore Course",
      cta_secondary: "Download Brochure",
      theme: "from-emerald-500 via-teal-500 to-cyan-500",
      visual: "coding",
    },
    {
      id: 3,
      tag: "Placement Assurance",
      title: "Cloud Computing & DevOps",
      subtitle:
        "Launch your career in Cloud Architecture. Hands-on labs with Docker, Kubernetes, and Terraform.",
      cta_primary: "Start Learning",
      cta_secondary: "Success Stories",
      theme: "from-orange-500 via-red-500 to-pink-500",
      visual: "cloud",
    },
  ];

  // Auto-rotate logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 Seconds per slide
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Navbar />

      {/* ---------------------------------------------------------------------------
         SECTION 1: PREMIUM HERO CAROUSEL
      --------------------------------------------------------------------------- */}
      <section className="relative h-[650px] md:h-[600px] overflow-hidden bg-[#0B1120] text-white pt-20">
        {/* BACKGROUND GLOW (Global) */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0"></div>

        {/* SLIDES WRAPPER */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out z-10 flex items-center ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <div className="grid items-center w-full grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-2">
              {/* LEFT CONTENT: Text */}
              <div className="pl-2 space-y-8 md:pl-4">
                {/* Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider text-blue-200 uppercase border rounded-full bg-white/5 border-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {slide.tag}
                </div>

                {/* Title with Gradient */}
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                  {slide.title.split(" ").slice(0, -2).join(" ")} <br />
                  <span
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.theme}`}
                  >
                    {slide.title.split(" ").slice(-2).join(" ")}
                  </span>
                </h1>

                <p className="max-w-xl pl-6 text-lg leading-relaxed border-l-4 text-slate-300 border-white/10">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/courses"
                    className={`px-8 py-4 bg-gradient-to-r ${slide.theme} text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2`}
                  >
                    {slide.cta_primary} <ArrowRight size={20} />
                  </Link>
                  <button className="px-8 py-4 font-bold text-white transition-all border bg-white/5 border-white/10 hover:bg-white/10 rounded-xl">
                    {slide.cta_secondary}
                  </button>
                </div>
              </div>

              {/* RIGHT CONTENT: Dynamic 3D Visuals */}
              <div className="hidden lg:block relative h-[450px] w-full">
                {/* Visual Type 1: CODING / DEV (Slide 2) */}
                {slide.visual === "coding" && (
                  <div className="absolute w-full max-w-md p-6 transition-transform duration-500 transform border shadow-2xl top-10 right-10 bg-slate-900 border-slate-700 rounded-xl rotate-3 hover:rotate-0">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="text-purple-400">
                        const <span className="text-blue-400">Student</span> =
                        &#123;
                      </div>
                      <div className="pl-4 text-white">
                        skills: [<span className="text-green-400">'React'</span>
                        , <span className="text-green-400">'Node.js'</span>],
                      </div>
                      <div className="pl-4 text-white">
                        hired: <span className="text-orange-400">true</span>,
                      </div>
                      <div className="pl-4 text-white">
                        salary: <span className="text-green-400">'24 LPA'</span>
                      </div>
                      <div className="text-purple-400">&#125;;</div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute flex items-center gap-3 p-4 bg-white rounded-lg shadow-xl -bottom-6 -left-6 text-slate-900 animate-bounce-slow">
                      <CheckCircle className="text-green-600" />
                      <div className="text-sm font-bold">
                        Job Ready
                        <br />
                        in 24 Weeks
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Type 2: DATA SCIENCE (Slide 1) */}
                {slide.visual === "datascience" && (
                  <div className="absolute w-full max-w-md p-8 transition-transform duration-500 transform border shadow-2xl top-10 right-10 bg-white/5 backdrop-blur-xl border-white/10 rounded-xl -rotate-2 hover:rotate-0">
                    <div className="flex items-end justify-between h-32 gap-2 mb-4">
                      {[40, 65, 45, 80, 55, 95].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="w-full transition-opacity rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80 hover:opacity-100"
                        ></div>
                      ))}
                    </div>
                    <p className="font-mono text-sm text-center text-blue-200">
                      Model Accuracy:{" "}
                      <span className="font-bold text-green-400">98.5%</span>
                    </p>

                    {/* Floating Badge */}
                    <div className="absolute flex items-center gap-3 p-4 text-white bg-blue-600 rounded-lg shadow-xl -top-6 -right-6 animate-pulse">
                      <Database size={20} />
                      <div className="text-sm font-bold">
                        AI Certified
                        <br />
                        Professional
                      </div>
                    </div>
                  </div>
                )}

                {/* Visual Type 3: CLOUD (Slide 3) */}
                {slide.visual === "cloud" && (
                  <div className="absolute w-full max-w-sm top-16 right-16">
                    <div className="relative z-10 p-6 text-center border shadow-2xl bg-slate-800 rounded-2xl border-slate-600">
                      <Cloud
                        size={64}
                        className="mx-auto mb-4 text-orange-500"
                      />
                      <h3 className="text-xl font-bold text-white">
                        AWS Architecture
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Deploy scalable apps on the cloud.
                      </p>
                    </div>
                    <div className="absolute w-full h-full top-4 left-4 bg-orange-500/20 rounded-2xl -z-0 blur-xl"></div>

                    {/* Floating Logos */}
                    <div className="absolute p-3 bg-white rounded-full shadow-lg -left-12 top-12">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div className="absolute p-3 bg-white rounded-full shadow-lg -right-8 bottom-12">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* CAROUSEL CONTROLS */}
        <div className="absolute z-30 flex items-center gap-6 -translate-x-1/2 bottom-10 left-1/2">
          <button
            onClick={prevSlide}
            className="p-2 text-white transition-all border rounded-full border-white/20 hover:bg-white/10"
          >
            <ChevronLeft />
          </button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-white transition-all border rounded-full border-white/20 hover:bg-white/10"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
         SECTION 2: TRUST STRIP (Clients & Certifications)
      --------------------------------------------------------------------------- */}
      {/* <div className="py-8 bg-white border-b border-slate-200">
        <div className="flex flex-col items-center justify-between gap-8 px-6 mx-auto max-w-7xl md:flex-row">
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-center uppercase text-slate-500 md:text-left">
              Certificate Associations
            </p>
            <div className="flex gap-6 transition-all opacity-80 grayscale hover:grayscale-0">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Shield className="text-blue-600" /> Microsoft
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Award className="text-yellow-600" /> AWS Partner
              </div>
            </div>
          </div>
          <div className="hidden w-px h-10 bg-slate-200 md:block"></div>
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-center uppercase text-slate-500 md:text-left">
              Our Alumni Work At
            </p>
            <div className="flex gap-8 transition-all opacity-60 grayscale hover:grayscale-0">
              <span className="text-xl font-bold text-slate-700">Google</span>
              <span className="text-xl font-bold text-slate-700">Amazon</span>
              <span className="text-xl font-bold text-slate-700">Deloitte</span>
              <span className="text-xl font-bold text-slate-700">Infosys</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="py-12 -mt-5 bg-slate-50">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
            <div className="grid md:grid-cols-2">
              {/* Certifications */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-600">
                    Trusted Partners
                  </h3>
                </div>
                <div className="flex gap-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Microsoft</p>
                      <p className="text-xs text-slate-500">Partner Network</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">AWS</p>
                      <p className="text-xs text-slate-500">Select Partner</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alumni */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-green-600 rounded-full"></div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-600">
                    Alumni Network
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="px-3 py-1 font-medium transition-colors rounded-lg bg-slate-100 hover:bg-slate-200">
                    Google
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="px-3 py-1 font-medium transition-colors rounded-lg bg-slate-100 hover:bg-slate-200">
                    Amazon
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="px-3 py-1 font-medium transition-colors rounded-lg bg-slate-100 hover:bg-slate-200">
                    Deloitte
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="px-3 py-1 font-medium transition-colors rounded-lg bg-slate-100 hover:bg-slate-200">
                    Infosys
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
         SECTION 3: PROGRAM EXPLORER (Courses)
      --------------------------------------------------------------------------- */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-slate-900">
            Explore Our Programs
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600">
            Industry-relevant courses designed to help you specialize and
            accelerate your career.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="overflow-hidden transition-all duration-300 bg-white border group rounded-2xl border-slate-200 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90"></div>
              <div className="absolute text-white bottom-4 left-4">
                <span className="px-2 py-1 bg-blue-600 text-[10px] font-bold uppercase rounded mb-2 inline-block">
                  Trending
                </span>
                <h3 className="text-xl font-bold">Applied Data Science</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between pb-4 mb-4 text-sm border-b text-slate-500 border-slate-100">
                <span>6 Months</span>
                <span>Online + Live</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> Python &
                  SQL Mastery
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> Machine
                  Learning Ops
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> IIT
                  Certification
                </li>
              </ul>
              <Link
                href="/courses/detail"
                className="block w-full py-3 font-bold text-center text-blue-600 transition-all border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                View Program
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden transition-all duration-300 bg-white border group rounded-2xl border-slate-200 hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden bg-indigo-900">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 to-transparent opacity-90"></div>
              <div className="absolute text-white bottom-4 left-4">
                <span className="px-2 py-1 bg-indigo-500 text-[10px] font-bold uppercase rounded mb-2 inline-block">
                  Bestseller
                </span>
                <h3 className="text-xl font-bold">Full Stack Development</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between pb-4 mb-4 text-sm border-b text-slate-500 border-slate-100">
                <span>5 Months</span>
                <span>Placement Assurance</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> MERN
                  Stack Deep Dive
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> System
                  Design
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> Capstone
                  Projects
                </li>
              </ul>
              <Link
                href="/courses/detail"
                className="block w-full py-3 font-bold text-center text-indigo-600 transition-all border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white"
              >
                View Program
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden transition-all duration-300 bg-white border group rounded-2xl border-slate-200 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden bg-purple-900">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950 to-transparent opacity-90"></div>
              <div className="absolute text-white bottom-4 left-4">
                <span className="px-2 py-1 bg-purple-500 text-[10px] font-bold uppercase rounded mb-2 inline-block">
                  New
                </span>
                <h3 className="text-xl font-bold">Cloud Computing & DevOps</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between pb-4 mb-4 text-sm border-b text-slate-500 border-slate-100">
                <span>4 Months</span>
                <span>AWS Certified</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> Docker &
                  Kubernetes
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> CI/CD
                  Pipelines
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-500" /> Azure &
                  AWS
                </li>
              </ul>
              <Link
                href="/courses/detail"
                className="block w-full py-3 font-bold text-center text-purple-600 transition-all border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white"
              >
                View Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
        SECTION 4: THE BLUE ACADEMY ADVANTAGE (REDESIGNED)
      --------------------------------------------------------------------------- */}
      <section className="py-32 bg-[#0B1120] relative overflow-hidden">
        {/* Background Decor (Subtle Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <span className="block mb-3 text-xs font-bold tracking-widest text-blue-500 uppercase">
              Why Choose Us
            </span>
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              We Don't Just Teach Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                We Architect Careers.
              </span>
            </h2>
            <p className="text-lg leading-relaxed text-slate-400">
              Experience a curriculum that bridges the gap between academic
              theory and the harsh demands of the tech industry.
            </p>
          </div>

          {/* Feature Cards (Bento Grid Style) */}
          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
            {/* Card 1: DeepTech */}
            <div className="relative p-8 transition-all duration-300 border group bg-slate-800/50 backdrop-blur-sm border-white/10 rounded-3xl hover:bg-slate-800 hover:-translate-y-1">
              <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-blue-600/20 to-transparent group-hover:opacity-100 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6 transition-transform border shadow-xl w-14 h-14 bg-slate-900 border-slate-700 rounded-2xl group-hover:scale-110">
                  <Users className="text-blue-400 w-7 h-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  DeepTech Expertise
                </h3>
                <p className="leading-relaxed text-slate-400">
                  Curriculum designed by Principal Engineers from Google,
                  Microsoft, and IIT Madras. We teach what the industry actually
                  uses.
                </p>
              </div>
            </div>

            {/* Card 2: Career (Highlighted) */}
            <div className="relative p-8 transition-all duration-300 border shadow-2xl group bg-blue-900/20 backdrop-blur-sm border-blue-500/30 rounded-3xl hover:bg-blue-900/30 hover:-translate-y-1 shadow-blue-900/20">
              <div className="absolute inset-0 opacity-100 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6 transition-transform bg-blue-600 shadow-xl w-14 h-14 rounded-2xl group-hover:scale-110">
                  <Briefcase className="text-white w-7 h-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  Career Accelerated
                </h3>
                <p className="leading-relaxed text-blue-100/80">
                  Dedicated placement cell with a network of 500+ hiring
                  partners. Resume building, mock interviews, and salary
                  negotiation support.
                </p>
              </div>
            </div>

            {/* Card 3: Certification */}
            <div className="relative p-8 transition-all duration-300 border group bg-slate-800/50 backdrop-blur-sm border-white/10 rounded-3xl hover:bg-slate-800 hover:-translate-y-1">
              <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-br from-purple-600/20 to-transparent group-hover:opacity-100 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6 transition-transform border shadow-xl w-14 h-14 bg-slate-900 border-slate-700 rounded-2xl group-hover:scale-110">
                  <Award className="text-purple-400 w-7 h-7" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  Global Validation
                </h3>
                <p className="leading-relaxed text-slate-400">
                  Don't just get a certificate. Earn credentials recognized
                  directly by Microsoft, Google Cloud, and AWS.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar (Dashboard Style) */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                val: "15k+",
                label: "Learners Impacted",
                color: "text-blue-400",
              },
              { val: "94%", label: "Completion Rate", color: "text-green-400" },
              {
                val: "450+",
                label: "Hiring Partners",
                color: "text-purple-400",
              },
              {
                val: "50%",
                label: "Avg Salary Hike",
                color: "text-yellow-400",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 text-center transition-colors border bg-slate-900/50 border-white/5 rounded-2xl hover:bg-slate-800"
              >
                <div className={`text-4xl font-extrabold mb-2 ${stat.color}`}>
                  {stat.val}
                </div>
                <div className="text-xs font-bold tracking-wider uppercase text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
         SECTION 5: CORPORATE L&D SOLUTIONS
      --------------------------------------------------------------------------- */}
      <section className="py-20 bg-blue-50">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <span className="block mb-2 text-xs font-bold tracking-widest text-blue-600 uppercase">
            For Enterprises
          </span>
          <h2 className="mb-8 text-3xl font-bold text-slate-900">
            Transform Your Workforce
          </h2>

          <div className="flex flex-col items-center justify-between gap-8 p-8 bg-white border border-blue-100 shadow-xl rounded-2xl md:p-12 md:flex-row">
            <div className="max-w-2xl text-left">
              <h3 className="mb-2 text-2xl font-bold text-slate-900">
                Corporate Training Solutions
              </h3>
              <p className="mb-6 text-slate-600">
                Customized learning paths in AI, Data Science, and Cloud for
                high-performance engineering teams.
              </p>
              <ul className="flex flex-wrap gap-4 mb-6">
                <li className="px-3 py-1 text-sm font-medium rounded bg-slate-100 text-slate-700">
                  Custom Batch
                </li>
                <li className="px-3 py-1 text-sm font-medium rounded bg-slate-100 text-slate-700">
                  Progress Dashboard
                </li>
                <li className="px-3 py-1 text-sm font-medium rounded bg-slate-100 text-slate-700">
                  Capstone Projects
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 font-bold text-white transition-all rounded-lg bg-slate-900 hover:bg-slate-800 whitespace-nowrap"
            >
              Request Corporate Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
