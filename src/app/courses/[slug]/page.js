import React from "react";
import Link from "next/link";
import {
  Clock,
  MonitorPlay,
  Award,
  ChevronDown,
  HelpCircle,
  Terminal,
  Layers,
  Cpu,
  Target,
  Wrench,
  Headphones,
  FlaskConical,
  BookOpenText,
  GraduationCap,
  LibraryBig,
  StarHalf,
  MessageCircleQuestionMark,
  Search,
  PhoneCall,
  Video,
  FileCheck,
  FilePen,
  Map,
  ChevronsRight,
  Landmark,
  CreditCard,
  ArrowUpRight,
  Briefcase,
  Smartphone,
  Currency,
  FileText,
  Check,
  Calculator,
  Wallet,
  ArrowRight,
  Phone,
} from "lucide-react";

// Components
import ApplicationForm from "@/components/ApplicationForm";
import Instructors from "@/components/Instructors";
import CareerSection from "@/components/CareerSection";
import CurriculumSection from "@/components/CurriculumSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import PricingSection from "@/components/PricingSection";

// --- 1. FETCH DATA ---
async function getCourse(slug) {
  try {
    const cleanSlug = decodeURIComponent(slug);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${cleanSlug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

// --- 2. FIXED CURRICULUM COMPONENT ---
// const RichCurriculum = ({ modules }) => {
//   return (
//     <div className="flex flex-col gap-4">
//       {modules.map((module, i) => (
//         <details
//           key={i}
//           className="overflow-hidden transition-all bg-white border shadow-sm group/module border-slate-200 rounded-xl hover:shadow-md open:ring-1 open:ring-blue-100"
//         >
//           {/* MODULE HEADER */}
//           <summary className="flex items-center justify-between p-5 list-none transition-colors bg-white cursor-pointer hover:bg-slate-50">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-blue-600 rounded-full bg-blue-50 shrink-0">
//                 {i + 1}
//               </div>
//               <span className="text-lg font-bold text-slate-800">
//                 {module.title}
//               </span>
//             </div>
//             <span className="flex items-center gap-3">
//               <span className="hidden text-xs font-semibold tracking-wider uppercase text-slate-400 sm:block">
//                 {module.sections
//                   ? `${module.sections.length} Sections`
//                   : "View Content"}
//               </span>
//               <ChevronDown
//                 size={20}
//                 className="transition-transform duration-300 text-slate-400 group-open/module:rotate-180"
//               />
//             </span>
//           </summary>

//           {/* MODULE CONTENT AREA */}
//           <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/40">
//             {/* Module Description */}
//             {module.details && (
//               <div
//                 className="mb-6 text-sm leading-relaxed prose-sm prose max-w-none text-slate-600"
//                 dangerouslySetInnerHTML={{ __html: module.details }}
//               />
//             )}

//             {/* --- NESTED SECTIONS LIST (COLLAPSIBLE) --- */}
//             {module.sections && module.sections.length > 0 && (
//               <div className="flex flex-col gap-3">
//                 {module.sections.map((section, j) => (
//                   <details
//                     key={j}
//                     className="overflow-hidden transition-all bg-white border rounded-lg group/section border-slate-200 hover:border-blue-300 open:border-blue-400 open:shadow-sm"
//                   >
//                     {/* SECTION HEADER */}
//                     <summary className="flex items-center justify-between p-4 list-none transition-colors bg-white cursor-pointer hover:bg-slate-50">
//                       <div className="flex items-center gap-3">
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 group-open/section:bg-blue-600"></div>
//                         <h4 className="text-sm font-bold text-slate-800 group-hover/section:text-blue-700">
//                           {section.title}
//                         </h4>
//                       </div>
//                       <ChevronDown
//                         size={16}
//                         className="transition-transform duration-300 text-slate-400 group-open/section:rotate-180 group-open/section:text-blue-600"
//                       />
//                     </summary>

//                     {/* SECTION CONTENT (Concepts, Labs, Tools) */}
//                     <div className="p-5 space-y-6 border-t border-slate-100 bg-slate-50/50">
//                       {/* Core Concepts */}
//                       {section.concepts && (
//                         <div>
//                           <p className="mb-2 text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
//                             Core Concepts
//                           </p>
//                           <div
//                             className="text-sm text-slate-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-blue-500"
//                             dangerouslySetInnerHTML={{
//                               __html: section.concepts,
//                             }}
//                           />
//                         </div>
//                       )}

//                       {/* Hands-on Labs */}
//                       {section.labs && (
//                         <div>
//                           <p className="mb-2 text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
//                             Hands-on Labs
//                           </p>
//                           <div
//                             className="p-4 text-sm border rounded-lg bg-white border-slate-200 text-slate-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-green-500"
//                             dangerouslySetInnerHTML={{ __html: section.labs }}
//                           />
//                         </div>
//                       )}

//                       {/* Tools Used */}
//                       {section.tools && section.tools.length > 0 && (
//                         <div>
//                           <p className="mb-2 text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
//                             Tools & Stack
//                           </p>
//                           <div className="flex flex-wrap items-center gap-2">
//                             {section.tools.map((tool, k) => (
//                               <span
//                                 key={k}
//                                 className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded border border-blue-100 flex items-center gap-1"
//                               >
//                                 <Terminal size={12} /> {tool}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </details>
//                 ))}
//               </div>
//             )}
//           </div>
//         </details>
//       ))}
//     </div>
//   );
// };

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course)
    return (
      <div className="py-20 text-xl font-bold text-center">
        Course Not Found
      </div>
    );

  // Fallback Data
  const fallbackPrerequisites = `
    <h4 class="font-bold text-slate-900">Basic Python Programming</h4>
    <p>Core python concepts including data types, Functions, Loops, File handling & OOPs.</p>

    <h4 class="font-bold text-slate-900">Python Packages</h4>
    <p>Experience with pandas, json, requests, numpy, matplotlib.</p>

    <h4 class="font-bold text-slate-900">APIs & JSON</h4>
    <p>Understanding of HTTP, JSON Parsing, Postman, CICD.</p>
  `;

  const defaultCapstones = [
    {
      title: "RAG Application with Interactive UI",
      details:
        "<p>Build a real-time RAG-powered question-answering system using <strong>FAISS/Chroma</strong>.</p>",
      icon: Layers,
    },
    {
      title: "Autonomous AI Agent System",
      details:
        "<p>Design an intelligent agent using <strong>LangChain</strong> to solve complex tasks.</p>",
      icon: Cpu,
    },
  ];

  const capstoneList =
    course.capstones && course.capstones.length > 0
      ? course.capstones
      : defaultCapstones;

  const programDetails = course.programDetails || {
    type: "Technical Hands-On Training",
    mode: "Instructor-led, lab-heavy",
    smeCriteria: ["3+ years in GenAI", "LangChain & RAG Exp"],
    certCriteria: ["Complete all modules", "Submit Capstones"],
  };

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
      {/* =========================================
          1. HERO SECTION
      ========================================= */}
      <div
        className="bg-[#0f172a] text-white pt-32 pb-16 relative overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: `url(${course.bannerImage})`, // dynamic backend image
        }}
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* LEFT: Content */}
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-300 uppercase">
                <Link href="/courses" className="hover:text-white">
                  Courses
                </Link>
                <span>/</span>
                <span className="text-blue-100">{course.category}</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {course.title}
              </h1>

              {/* --- REPLACED HERO CONTENT: OPTION 1 (Tech Spec) --- */}
              <div className="max-w-3xl pt-8 mt-8 border-t border-white/10">
                {/* Top Row: Certification & Skills */}
                <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
                  <div>
                    <h4 className="flex items-center gap-2 mb-2 text-xs font-bold tracking-widest text-blue-400 uppercase">
                      <Award size={16} /> Certification Covered
                    </h4>
                    <p className="font-medium text-white">
                      Google Cloud Certified - {course.category}
                    </p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 mb-2 text-xs font-bold tracking-widest text-purple-400 uppercase">
                      <Wrench size={16} /> Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.skills && course.skills.length > 0 ? (
                        course.skills.slice(0, 3).map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs text-white border rounded bg-white/10 border-white/10"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-300">
                          Python, LangChain, RAG
                        </span>
                      )}
                      {course.skills && course.skills.length > 1 && (
                        <span className="px-1 py-1 text-xs font-medium text-slate-500">
                          +{course.skills.length - 1}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Key Points Grid */}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <h2 className="mb-4 text-lg font-bold text-white uppercase">
                    Program Includes:
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MonitorPlay size={16} className="text-blue-500" />
                        <span className="truncate">
                          {programDetails.mode || "Instructor-led"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <FlaskConical size={16} className="text-green-500" />
                        <span>Hands-on</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Headphones size={16} className="text-yellow-500" />
                        <span>24x7 Active</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Clock size={16} className="text-white animate-pulse" />
                        <span>{course.duration || "3 Months"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: IMAGE CARD */}
            {/* <div className="hidden lg:block lg:col-span-1">
              <div className="overflow-hidden border shadow-2xl rounded-xl border-white/10 shadow-black/50 md:mt-10">
                <div className="relative flex items-center justify-center h-64 cursor-pointer bg-slate-900 group">
                  <img
                    src={course.image}
                    className="absolute inset-0 object-cover w-full h-full transition-opacity opacity-60 group-hover:opacity-40"
                    alt="Course"
                  />
                  <PlayCircle
                    size={48}
                    className="relative z-10 text-white transition-transform opacity-90 group-hover:scale-110"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* =========================================
          2. CONTENT LAYOUT
      ========================================= */}
      <div className="relative px-6 pt-8 pb-20 mx-auto max-w-7xl">
        {/* --- GRID SECTION (Description -> Career) --- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="space-y-12 lg:col-span-2">
            <section>
              <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
                <BookOpenText size={24} className="text-blue-600" /> Description
              </h2>
              <div
                className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: course.subtitle }}
              />
            </section>

            {/* COURSE OUTCOMES */}
            {course.outcomes && (
              <section>
                <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
                  <Target size={24} className="text-blue-600" /> Course Outcomes
                </h2>
                <div
                  className="text-sm text-slate-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-blue-500"
                  dangerouslySetInnerHTML={{ __html: course.outcomes }}
                />
              </section>
            )}

            {/* PREREQUISITES (FIXED ALIGNMENT & FORMAT) */}
            <section>
              <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
                <Terminal size={24} className="text-blue-600" /> Prerequisites
              </h2>
              <div
                className="
      p-8 bg-white border rounded-2xl border-slate-200 
      grid grid-cols-1 items-start text-sm text-slate-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-blue-500
    "
                dangerouslySetInnerHTML={{
                  __html: course.prerequisites || fallbackPrerequisites,
                }}
              />
            </section>

            {/* COURSE CONTENT */}
            <section>
              <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
                <GraduationCap size={24} className="text-blue-600" /> Course
                Content
              </h2>
              {/* <RichCurriculum modules={course.curriculum || []} /> */}
              <CurriculumSection modules={course.curriculum || []} />
            </section>

            {/* CAPSTONE PROJECTS (Redesigned with Expand/Collapse) */}
            <section id="projects">
              <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
                <LibraryBig size={24} className="text-blue-600" /> Overview of
                Capstone Projects
              </h2>

              <div className="bg-[#1e293b] rounded-2xl overflow-hidden p-2">
                {capstoneList.map((project, idx) => (
                  <details
                    key={idx}
                    className="transition-all duration-300 border-b group border-white/10 last:border-0 open:bg-white/5 rounded-xl"
                  >
                    <summary className="flex items-center justify-between p-6 list-none cursor-pointer select-none">
                      <div className="flex items-center gap-5">
                        {/* Icon Box */}
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 shadow-lg transition-transform group-hover:scale-105 ${
                            idx === 0
                              ? "bg-blue-600 shadow-blue-900/50"
                              : "bg-purple-600 shadow-purple-900/50"
                          }`}
                        >
                          {idx === 0 ? (
                            <Layers size={24} className="text-white" />
                          ) : (
                            <Cpu size={24} className="text-white" />
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-200">
                          {project.title}
                        </h3>
                      </div>

                      {/* Arrow Icon */}
                      <span className="p-2 transition-colors rounded-full bg-white/5 group-hover:bg-white/10">
                        <ChevronDown
                          size={20}
                          className="transition-transform duration-300 text-slate-400 group-open:rotate-180"
                        />
                      </span>
                    </summary>

                    {/* Hidden Content */}
                    <div className="px-6 pb-8 pl-[5.5rem]">
                      {/* Description */}
                      <div
                        className="pl-4 text-sm leading-relaxed prose-sm prose border-l-2 text-slate-300 prose-invert max-w-none border-white/10 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-blue-500"
                        dangerouslySetInnerHTML={{ __html: project.details }}
                      />

                      {/* Tools Section (If available in data) */}
                      {project.tools && project.tools.length > 0 && (
                        <div className="mt-6">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Wrench size={12} /> Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1.5 text-xs font-semibold text-blue-200 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* CAREER OPPORTUNITIES (Client Component) */}
            <CareerSection jobRoles={course.jobRoles} />

            {/* --- SECTION: LEARNING ROADMAP --- */}
            <section>
              <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
                <Map size={24} className="text-blue-400" /> Learning Roadmap
              </h2>
              <div className="p-8 border rounded-2xl bg-slate-900 border-slate-800">
                <div className="relative -mt-8 space-y-8">
                  {/* Vertical Line */}
                  <div className="absolute top-4 bottom-4 left-[19px] w-0.5 bg-slate-700"></div>

                  {/* Modules from DB */}
                  {(course.curriculum || []).map((module, i) => (
                    <div
                      key={i}
                      className="relative flex items-start gap-6 group"
                    >
                      {/* Dot */}
                      <div className="relative z-10 flex items-center justify-center flex-shrink-0 w-10 h-10 transition-colors border-4 rounded-full border-slate-900 bg-slate-800 group-hover:bg-blue-600 group-hover:text-white text-slate-400">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1.5">
                        <h4 className="text-lg font-bold transition-colors text-slate-200 group-hover:text-blue-300">
                          {module.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                          {module.sections
                            ? `${module.sections.length} Sections`
                            : "Module details"}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Final Goal */}
                  <div className="relative flex items-center gap-6">
                    <div className="relative z-10 flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green-500 border-4 border-slate-900 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] text-white">
                      <Award size={18} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        Certified GenAI Engineer
                      </h4>
                      <p className="text-sm text-green-400">Goal Achieved</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR (Only visible for this top section) */}
          <div className="relative lg:col-span-1">
            <div className="sticky space-y-6 top-24">
              <div className="relative overflow-hidden bg-white border shadow-2xl rounded-2xl border-slate-100 shadow-blue-900/5">
                {/* Top Gradient Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-blue-900"></div>

                <div className="p-6 pt-8">
                  {/* Urgency Status Badge */}
                  <div className="flex items-center justify-center gap-2 p-3 mb-8 text-sm font-bold text-orange-800 border border-orange-100 rounded-lg bg-orange-50">
                    <Clock size={18} className="animate-pulse" />
                    <span>
                      Enrolling for {course.nextBatch || "Upcoming"} Batch
                    </span>
                  </div>

                  {/* Application Form */}
                  <div className="relative z-10">
                    <ApplicationForm
                      courseTitle={course.title}
                      courseSlug={course.slug}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FULL WIDTH SECTION (Enrollment -> FAQs) --- */}
        <div className="mt-12 space-y-12">
          {/* --- SECTION: Enrollment Process --- */}
          {/* <section>
            <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
              <FilePen size={24} className="text-blue-600" />
              How do I enroll in this course?
            </h2>
            <div className="py-6 bg-white border shadow-sm rounded-2xl border-slate-200">
              <div className="mb-12 ml-6 text-left">
                <p className="flex items-center gap-2 font-medium uppercase text-md text-slate-500">
                  <ChevronsRight className="text-blue-600" />
                  It's a simple process
                </p>
              </div>

              <div className="relative px-4 mx-auto max-w-7xl">
                <div className="hidden md:block absolute top-6 left-[12%] right-[12%] border-t-2 border-dashed border-slate-300 z-0"></div>

                <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4">
                  {[
                    {
                      title: "Explore",

                      desc: "Explore the course and certification",

                      icon: Search,

                      color: "text-blue-600",

                      bg: "bg-blue-50 border-blue-100",
                    },

                    {
                      title: "Consult",

                      desc: "Talk to our agents for guidance",

                      icon: PhoneCall,

                      color: "text-purple-600",

                      bg: "bg-purple-50 border-purple-100",
                    },

                    {
                      title: "Experience",

                      desc: "Join our live demo session",

                      icon: Video,

                      color: "text-orange-600",

                      bg: "bg-orange-50 border-orange-100",
                    },

                    {
                      title: "Enroll",

                      desc: "Complete your enrollment",

                      icon: FileCheck,

                      color: "text-green-600",

                      bg: "bg-green-50 border-green-100",
                    },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center group"
                    >
                      <div
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-4 shadow-sm transition-transform group-hover:scale-110 ${step.bg} ${step.color} border-white`}
                      >
                        <step.icon size={20} />
                      </div>

                      <h4 className="mb-1 text-lg font-bold text-slate-800">
                        {i + 1}. {step.title}
                      </h4>

                      <p className="text-sm leading-relaxed text-slate-500">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section> */}
          <EnrollmentSection />

          {/* INSTRUCTORS */}
          <Instructors
            list={course.instructors || []}
            leaders={course.leaders || []}
          />

          {/* --- SECTION: PRICING (Modern Card Design) --- */}
          {/* <section>
            <div className="mb-12">
              <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-90">
                <Currency size={24} className="text-blue-600" />
                Transparent Pricing
              </h2>
              <p className="mx-auto text-sm text-slate-600">
                Invest in your future with our flexible payment options and
                exclusive scholarship benefits
              </p>
            </div>
            <div className="bg-gradient-to-b from-slate-50 to-white">
              <div className="container px-4 mx-auto max-w-7xl">
                <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
                
                  <div className="relative p-8 transition-shadow bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg">
                    <div className="mb-4">
                      <FileText className="w-12 h-12 mb-4 text-blue-500" />
                      <h3 className="mb-2 text-xl font-semibold text-slate-900">
                        Application Fee
                      </h3>
                      <p className="text-sm text-slate-600">
                        One-time non-refundable fee
                      </p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900">
                        ₹2,000
                      </span>
                    </div>
                    <div className="mt-6">
                      <button className="w-full px-4 py-3 font-medium transition-colors rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">
                        Start Application
                      </button>
                    </div>
                  </div>

                  <div className="relative p-8 text-white transform shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl md:scale-105">
                    <div className="absolute top-0 right-0 px-4 py-1 text-sm font-bold text-blue-900 bg-yellow-400 rounded-bl-xl rounded-tr-xl">
                      SCHOLARSHIP APPLIED
                    </div>
                    <div className="mb-4">
                      <GraduationCap className="w-12 h-12 mb-4 text-white/90" />
                      <h3 className="mb-2 text-xl font-semibold">
                        Program Fee
                      </h3>
                      <p className="text-sm text-blue-100">
                        Complete program access
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg text-blue-200 line-through">
                          ₹
                          {(
                            parseInt(course.fee?.replace(/,/g, "") || "50000") *
                            1.3
                          ).toLocaleString()}
                        </span>
                        <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                          SAVE 30%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          ₹{parseInt(course.fee || "50000").toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-blue-200">
                        *18% GST extra as applicable
                      </p>
                    </div>

                    <div className="mb-6 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-blue-100">
                        <Check className="w-4 h-4" />
                        <span>Industry-recognized certification</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-100">
                        <Check className="w-4 h-4" />
                        <span>Lifetime access to materials</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-blue-100">
                        <Check className="w-4 h-4" />
                        <span>Placement assistance included</span>
                      </div>
                    </div>

                    <button className="w-full px-4 py-3 font-bold text-blue-700 transition-colors bg-white rounded-lg shadow-lg hover:bg-blue-50">
                      Enroll Now
                    </button>

                    <div className="mt-4 text-center">
                      <a
                        href="#"
                        className="text-xs text-blue-200 underline hover:text-white"
                      >
                        Corporate nominations available*
                      </a>
                    </div>
                  </div>

                  <div className="relative p-8 transition-shadow bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg">
                    <div className="mb-4">
                      <Calculator className="w-12 h-12 mb-4 text-green-500" />
                      <h3 className="mb-2 text-xl font-semibold text-slate-900">
                        Easy EMI
                      </h3>
                      <p className="text-sm text-slate-600">
                        Flexible payment plans
                      </p>
                    </div>

                    {(() => {
                      const baseFee = parseInt(
                        course.fee?.replace(/,/g, "") || "50000"
                      );
                      const gstAmount = baseFee * 0.18;
                      const totalAmount = baseFee + gstAmount;
                      const interestRate = 0.15; // 15% annual interest rate (typical for education loans)

                      // EMI calculation function
                      const calculateEMI = (principal, months) => {
                        const monthlyRate = interestRate / 12;
                        const emi =
                          (principal *
                            monthlyRate *
                            Math.pow(1 + monthlyRate, months)) /
                          (Math.pow(1 + monthlyRate, months) - 1);
                        return Math.round(emi);
                      };

                      const emi3 = calculateEMI(totalAmount, 3);
                      const emi6 = calculateEMI(totalAmount, 6);
                      const emi9 = calculateEMI(totalAmount, 9);
                      const emi12 = calculateEMI(totalAmount, 12);

                      return (
                        <>
                          <div className="mb-6">
                            <p className="mb-2 text-sm text-slate-600">
                              Starting from
                            </p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold text-slate-900">
                                ₹{emi12.toLocaleString()}
                              </span>
                              <span className="text-slate-600">/month</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                              Based on ₹{totalAmount.toLocaleString()} (incl.
                              GST)
                            </p>
                          </div>

                          <div className="mb-6 space-y-3">
                            <div className="p-3 rounded-lg bg-slate-50">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">
                                  3 months
                                </span>
                                <span className="text-sm font-bold text-slate-900">
                                  ₹{emi3.toLocaleString()}/mo
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                Total: ₹{(emi3 * 3).toLocaleString()}
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-slate-50">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">
                                  6 months
                                </span>
                                <span className="text-sm font-bold text-slate-900">
                                  ₹{emi6.toLocaleString()}/mo
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                Total: ₹{(emi6 * 6).toLocaleString()}
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-slate-50">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-slate-700">
                                  9 months
                                </span>
                                <span className="text-sm font-bold text-slate-900">
                                  ₹{emi9.toLocaleString()}/mo
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                Total: ₹{(emi9 * 9).toLocaleString()}
                              </p>
                            </div>

                            <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-slate-700">
                                    12 months
                                  </span>
                                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                    Popular
                                  </span>
                                </div>
                                <span className="text-sm font-bold text-green-700">
                                  ₹{emi12.toLocaleString()}/mo
                                </span>
                              </div>
                              <p className="text-xs text-green-600">
                                Total: ₹{(emi12 * 12).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="p-3 mb-4 text-xs rounded-lg text-slate-500 bg-blue-50">
                            <p className="mb-1 font-medium text-slate-700">
                              EMI Breakdown:
                            </p>
                            <p>• Course Fee: ₹{baseFee.toLocaleString()}</p>
                            <p>• GST (18%): ₹{gstAmount.toLocaleString()}</p>
                            <p>
                              • Interest Rate: {(interestRate * 100).toFixed(0)}
                              % p.a.
                            </p>
                          </div>
                        </>
                      );
                    })()}

                    <button className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200">
                      <Calculator className="w-4 h-4" />
                      Get Personalized EMI Plan
                    </button>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="mb-4 text-sm text-slate-600">
                    Accepted Payment Methods
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Landmark className="w-5 h-5" />
                      <span className="text-sm font-medium">Net Banking</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <CreditCard className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Credit/Debit Cards
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Smartphone className="w-5 h-5" />
                      <span className="text-sm font-medium">UPI Payments</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Wallet className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Digital Wallets
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8 mt-16 text-center bg-slate-100 rounded-2xl">
                  <h3 className="mb-4 text-xl font-bold text-slate-900">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="max-w-2xl mx-auto mb-6 text-slate-600">
                    Join thousands of successful graduates who transformed their
                    careers with our program
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button className="flex items-center gap-2 px-8 py-3 font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-8 py-3 font-bold transition-colors bg-white border-2 rounded-lg text-slate-700 hover:bg-slate-50 border-slate-200">
                      <Phone className="w-4 h-4" /> Talk to Counselor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {course && <PricingSection course={course} />}

          {/* Success Stories */}
          {/* <section>
            <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
              <StarHalf size={24} className="text-blue-600" /> Success Stories
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {(course.reviews || []).map((review, i) => (
                <div
                  key={i}
                  className="p-6 bg-white border shadow-sm rounded-xl"
                >
                  <p className="mb-4 text-sm italic text-slate-600">
                    "{review.text.replace(/<[^>]+>/g, "")}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 font-bold rounded-full bg-slate-200 text-slate-500">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{review.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section> */}

          {/* FAQs (Redesigned Interactive Accordion) */}
          <section>
            <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
              <MessageCircleQuestionMark size={24} className="text-blue-600" />
              Frequently Asked Questions
            </h2>

            <div className="overflow-hidden border rounded-2xl border-slate-200 bg-slate-50">
              {(course.faqs || []).map((faq, i) => (
                <details
                  key={i}
                  className="transition-colors border-b group border-slate-200 last:border-0 hover:bg-white open:bg-white"
                >
                  <summary className="flex items-center justify-between p-5 list-none cursor-pointer select-none">
                    <div className="flex items-center gap-3">
                      <HelpCircle
                        size={20}
                        className="transition-colors text-slate-400 shrink-0 group-open:text-blue-600"
                      />
                      <span className="text-sm font-bold transition-colors text-slate-800 md:text-lg group-hover:text-blue-700">
                        {faq.q}
                      </span>
                    </div>
                    <span className="p-1 transition-colors rounded-full group-hover:bg-slate-100">
                      <ChevronDown
                        size={20}
                        className="transition-transform duration-300 text-slate-400 group-open:rotate-180"
                      />
                    </span>
                  </summary>

                  <div className="px-5 pb-6 pl-[3.5rem]">
                    <div
                      className="text-sm text-slate-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-blue-500 md:text-base"
                      dangerouslySetInnerHTML={{ __html: faq.a }}
                    />
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
