"use client";

import React from "react";
import {
  Target,
  Eye,
  Award,
  Globe,
  Linkedin,
  Twitter,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
// import Navbar from "@/components/Navbar"; // Uncomment if using Navbar

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      {/* 1. HERO HEADER */}
      <section className="relative bg-[#020617] pt-32 pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-70 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wide text-blue-300 uppercase border rounded-full bg-blue-900/30 border-blue-700/50">
            <Sparkles size={12} className="text-blue-400" />
            Empowering Future Tech Leaders Since 2025
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Building the workforce of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              tomorrow, today.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-400">
            We bridge the gap between academic learning and industry
            requirements through innovation, excellence, and rigorous practical
            training.
          </p>
        </div>
      </section>

      {/* 2. ABOUT SECTION (Split Layout) */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Image Grid Composition */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative overflow-hidden shadow-2xl rounded-3xl aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Blue Academy Team"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 p-6 bg-white border shadow-xl rounded-2xl border-slate-100 max-w-[200px] hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-full">
                  <Award size={20} />
                </div>
                <span className="text-3xl font-bold text-slate-900">#1</span>
              </div>
              <p className="text-sm font-medium text-slate-600">
                Rated Tech Bootcamp in the Region
              </p>
            </div>

            {/* Decorative Dot Pattern */}
            <div className="absolute -z-10 top-[-20px] left-[-20px]">
              <div className="grid grid-cols-6 gap-2">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-blue-200"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
              Who We Are
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                Blue Academy is a premier EdTech institution dedicated to
                bridging the gap between academic learning and industry
                requirements. Established with a passion for technology and
                teaching, we focus on hands-on, practical skill development.
              </p>
              <p>
                We partner with top-tier technology companies to design
                curriculums that are relevant today and future-proof for
                tomorrow. From Data Science to Full Stack Development, our
                programs are rigorous, result-oriented, and recognized globally.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-10 border-t border-slate-200">
              <div>
                <p className="text-3xl font-bold text-blue-600">15k+</p>
                <p className="mt-1 text-sm font-medium tracking-wide uppercase text-slate-500">
                  Learners
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">50+</p>
                <p className="mt-1 text-sm font-medium tracking-wide uppercase text-slate-500">
                  Instructors
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">4.9/5</p>
                <p className="mt-1 text-sm font-medium tracking-wide uppercase text-slate-500">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Dark Card Section) */}
      <section className="relative py-24 overflow-hidden bg-slate-900">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Driven by Purpose
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-slate-400">
              Our core values guide every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <div className="relative p-10 transition-all duration-300 border bg-slate-800 border-slate-700 rounded-3xl hover:border-blue-500/50 group">
              <div className="absolute top-0 right-0 p-8 transition-opacity opacity-10 group-hover:opacity-20">
                <Target size={120} className="text-blue-500" />
              </div>

              <div className="flex items-center justify-center w-16 h-16 mb-8 transition-transform duration-300 bg-blue-600 shadow-lg rounded-2xl shadow-blue-900/20 group-hover:scale-110">
                <Target className="w-8 h-8 text-white" />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-slate-400">
                To democratize high-quality tech education and provide
                accessible, industry-relevant training to learners worldwide,
                bridging the gap between academia and industry requirements.
              </p>
            </div>

            {/* Vision Card */}
            <div className="relative p-10 transition-all duration-300 border bg-slate-800 border-slate-700 rounded-3xl hover:border-purple-500/50 group">
              <div className="absolute top-0 right-0 p-8 transition-opacity opacity-10 group-hover:opacity-20">
                <Eye size={120} className="text-purple-500" />
              </div>

              <div className="flex items-center justify-center w-16 h-16 mb-8 transition-transform duration-300 bg-purple-600 shadow-lg rounded-2xl shadow-purple-900/20 group-hover:scale-110">
                <Eye className="w-8 h-8 text-white" />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">Our Vision</h3>
              <p className="text-lg leading-relaxed text-slate-400">
                To be the global leader in skill development, empowering 1
                million professionals by 2030 to create sustainable and
                innovative technology solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION (REDESIGNED) */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Meet the Minds Behind Blue
          </h2>
          <p className="text-lg text-slate-600">
            Guided by industry veterans and visionary leaders committed to
            transforming education.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              name: "Sageer Mohammad",
              role: "Head of Program Delivery & Execution",
              image: "/team/sageer.png",
            },
            {
              name: "Aashish Pandey",
              role: "Director – Curriculum & Content Strategy",
              image: "/team/aashish.jpg",
            },
            {
              name: "Ragini Sankhwar",
              role: "Lead – Instructional Talent Management",
              image: "/team/Ragini-s.jpg",
            },
            {
              name: "Janvi Bhandari",
              role: "Head of Digital Learning Systems",
              image: "/team/janvi.jpg",
            },
            {
              name: "Shalini Shalu",
              role: "Head of Customer Experience and Satisfaction",
              image:
                "https://img.freepik.com/premium-photo/photo-confident-indian-businesswoman-standing-with-her-arms-crossed-smiling_1025753-136300.jpg",
            },
            {
              name: "Abhishek Bhagat",
              role: "Director – Certifications & Academic Compliance",
              image: "/team/abhi.jpg",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="relative group h-[420px] rounded-3xl overflow-hidden shadow-lg"
            >
              {/* Full Background Image with object-top */}
              <img
                src={member.image}
                alt={member.name}
                className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 transition-opacity opacity-60 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent group-hover:opacity-80"></div>

              {/* Text Content (Bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <h3 className="mb-3 text-2xl font-bold leading-tight">
                  {member.name}
                </h3>
                <p className="mb-2 text-xs font-bold tracking-widest text-blue-100 uppercase">
                  {member.role}
                </p>
                {/* Description (Fades in on hover) */}
                {/* <div className="overflow-hidden transition-all duration-500 opacity-0 max-h-0 group-hover:max-h-32 group-hover:opacity-100">
                  <p className="text-sm leading-relaxed text-slate-300">
                    {member.desc}
                  </p>

                  <div className="flex gap-4 pt-4 mt-4 border-t border-white/10">
                    <a
                      href="#"
                      className="p-2 transition-colors rounded-full bg-white/10 hover:bg-blue-600"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href="#"
                      className="p-2 transition-colors rounded-full bg-white/10 hover:bg-blue-400"
                    >
                      <Twitter size={16} />
                    </a>
                    <a
                      href="#"
                      className="p-2 transition-colors rounded-full bg-white/10 hover:bg-white/30"
                    >
                      <Globe size={16} />
                    </a>
                  </div>
                </div> */}

                {/* Arrow hint (Disappears on hover) */}
                <div className="mt-4 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  <ArrowRight size={20} className="text-blue-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="px-6 py-20 text-center text-white bg-blue-600">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to start your journey?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100">
            Join thousands of learners who have transformed their careers with
            Blue Academy.
          </p>
          <Link
            href="/courses"
            className="px-8 py-4 text-lg font-bold text-blue-600 transition-colors bg-white shadow-lg rounded-xl hover:bg-blue-50 shadow-blue-900/20"
          >
            Explore Courses
          </Link>
        </div>
      </section>
    </div>
  );
}