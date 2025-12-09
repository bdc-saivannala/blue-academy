import React from "react";
import {
  CheckCircle,
  Award,
  Users,
  Briefcase,
  BookOpen,
  Star,
  ShieldCheck,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { courseData } from "@/data/courseData";

// Components
import Navbar from "@/components/Navbar";
import CourseNav from "@/components/CourseNav";
import ApplicationForm from "@/components/ApplicationForm";
import Curriculum from "@/components/Curriculum";
import Instructors from "@/components/Instructors";

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Navbar />

      {/* 1. HERO SECTION (Compelling Hero) */}
      <div className="bg-[#0f172a] text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full skew-x-12 bg-blue-900/20 blur-3xl"></div>
        <div className="relative z-10 grid items-center grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-12">
          {/* Hero Text */}
          <div className="space-y-6 lg:col-span-8">
            <div className="inline-block px-3 py-1 text-xs font-bold tracking-wide text-blue-300 uppercase border rounded-full bg-blue-600/20 border-blue-500/30">
              {courseData.badges[0]}
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {courseData.title}
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              {courseData.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 pt-4 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
                4.9/5 Rating
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" /> 15k+ Learners
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-400" /> Certified by Blue
                Academy
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <button className="px-8 py-3 font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 shadow-blue-600/40">
                Download Brochure
              </button>
              <button className="px-8 py-3 font-semibold text-white transition-all border rounded-lg border-white/20 hover:bg-white/10">
                View Syllabus
              </button>
            </div>
          </div>

          {/* Hero Image / Video Placeholder */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="relative flex items-center justify-center overflow-hidden border shadow-2xl cursor-pointer bg-slate-800 rounded-xl border-slate-700 aspect-video group">
              <div className="flex items-center justify-center w-16 h-16 transition-transform rounded-full bg-white/10 backdrop-blur-sm group-hover:scale-110">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
              <p className="absolute text-sm font-medium text-white bottom-4">
                Watch Program Overview
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAV (Jump to sections) */}
      <CourseNav />

      {/* 3. MAIN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 gap-12 px-6 py-12 mx-auto max-w-7xl lg:grid-cols-12">
        {/* LEFT COLUMN: Main Info (65%) */}
        <div className="space-y-16 lg:col-span-8">
          {/* ID: Overview (Key Features & Outcomes) */}
          <section id="overview" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Program Highlights
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {courseData.heroFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-white border shadow-sm rounded-xl border-slate-100"
                >
                  <CheckCircle className="text-blue-600 shrink-0" size={24} />
                  <p className="font-medium text-slate-700">{feat}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Who Can Join & Prerequisites */}
          <section className="p-8 border border-blue-100 bg-blue-50 rounded-2xl">
            <h3 className="mb-4 text-xl font-bold text-slate-900">
              Who is this course for?
            </h3>
            <ul className="mb-6 space-y-3">
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>Software
                Developers looking to upskill
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>Data
                Analysts transitioning to Data Science
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>Final
                year students with basic Python knowledge
              </li>
            </ul>
            <div className="pt-4 border-t border-blue-200">
              <p className="text-sm font-bold text-slate-900">Prerequisites:</p>
              <p className="text-sm text-slate-600">
                Basic understanding of programming logic and mathematics.
              </p>
            </div>
          </section>

          {/* ID: Curriculum */}
          <section id="curriculum">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Curriculum Breakdown
              </h2>
              <button className="text-sm font-bold text-blue-600 hover:underline">
                Download PDF
              </button>
            </div>
            <Curriculum modules={courseData.curriculum} />

            {/* Skills Gained */}
            <div className="mt-8">
              <h4 className="mb-3 font-bold text-slate-900">
                Skills you will gain:
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "TensorFlow",
                  "NLP",
                  "GenAI",
                  "Prompt Engineering",
                  "AWS SageMaker",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm font-medium border rounded-md bg-slate-100 text-slate-600 border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ID: Mentors */}
          <section id="mentors">
            <Instructors list={courseData.instructors} />
          </section>

          {/* ID: Certification */}
          <section
            id="certification"
            className="flex items-start gap-6 p-8 bg-white border shadow-sm rounded-2xl border-slate-200"
          >
            <div className="flex-shrink-0 hidden w-32 h-32 border rounded-lg md:block bg-slate-100 border-slate-200"></div>{" "}
            {/* Cert Image Placeholder */}
            <div>
              <h2 className="mb-2 text-2xl font-bold text-slate-900">
                Certification
              </h2>
              <p className="mb-4 text-slate-600">
                Upon successful completion of the program, you will receive a
                verified certificate from Blue Academy, recognized by top tech
                companies.
              </p>
              <div className="flex gap-4">
                <ShieldCheck className="text-green-600" />
                <span className="text-sm font-bold text-slate-700">
                  Shareable on LinkedIn
                </span>
              </div>
            </div>
          </section>

          {/* ID: Careers */}
          <section id="careers">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Career Opportunities
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
              {/* Job Roles */}
              {[
                "AI Engineer",
                "Data Scientist",
                "ML Ops",
                "Product Analyst",
              ].map((role) => (
                <div
                  key={role}
                  className="p-4 font-bold text-center border rounded-lg bg-slate-50 border-slate-100 text-slate-700"
                >
                  {role}
                </div>
              ))}
            </div>
            <p className="mb-4 text-sm font-bold tracking-wider uppercase text-slate-500">
              Our Hiring Partners
            </p>
            <div className="flex gap-8 opacity-50 grayscale">
              <span className="text-xl font-bold">Google</span>
              <span className="text-xl font-bold">Amazon</span>
              <span className="text-xl font-bold">Uber</span>
              <span className="text-xl font-bold">Microsoft</span>
            </div>
          </section>

          {/* ID: FAQs */}
          <section
            id="faqs"
            className="p-8 bg-white border rounded-2xl border-slate-200"
          >
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Do you offer placement support?",
                  a: "Yes, we have a dedicated placement cell with 500+ hiring partners.",
                },
                {
                  q: "What if I miss a live class?",
                  a: "All sessions are recorded and available in your LMS dashboard.",
                },
                {
                  q: "Is there any financial aid?",
                  a: "We offer 0% EMI options and merit-based scholarships.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="pb-4 border-b border-slate-100 last:border-0"
                >
                  <h4 className="flex items-center gap-2 mb-2 font-bold text-slate-800">
                    <HelpCircle size={16} className="text-blue-500" /> {faq.q}
                  </h4>
                  <p className="pl-6 text-sm text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Sidebar (35% - Sticky) */}
        <div className="relative lg:col-span-4">
          <div className="sticky space-y-6 top-40">
            {/* Application Form Component */}
            <ApplicationForm />

            {/* Program Details Card */}
            <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
              <h4 className="mb-4 font-bold text-slate-900">Program Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-bold text-slate-900">6 Months</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Format</span>
                  <span className="font-bold text-slate-900">
                    Online Live + Labs
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Total Fee</span>
                  <span className="font-bold text-slate-900">
                    ₹ 1,50,000 + GST
                  </span>
                </div>
              </div>
            </div>

            {/* Support Agent Widget */}
            <div className="flex items-center gap-4 p-4 border border-green-100 bg-green-50 rounded-xl">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 font-bold text-green-700 bg-green-200 rounded-full">
                  AS
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-bold text-green-800 uppercase">
                  Pre-sales Support
                </p>
                <p className="font-bold text-slate-900">Chat with Arun</p>
                <button className="flex items-center gap-1 mt-1 text-xs font-bold text-blue-600 hover:underline">
                  <MessageSquare size={12} /> Start WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
