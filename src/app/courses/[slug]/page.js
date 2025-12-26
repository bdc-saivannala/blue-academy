// import React from "react";
// import Link from "next/link";
// import {
//   Star,
//   Globe,
//   Clock,
//   BarChart,
//   CheckCircle,
//   Play,
//   MonitorPlay,
//   FileText,
//   Award,
//   Smartphone,
//   ChevronDown,
//   AlertCircle,
//   HelpCircle,
//   Code,
//   Terminal,
//   Layers,
//   Cpu,
//   Target,
// } from "lucide-react";

// // Components
// import ApplicationForm from "@/components/ApplicationForm";
// import Instructors from "@/components/Instructors";

// // --- 1. FETCH DATA ---
// async function getCourse(slug) {
//   try {
//     const cleanSlug = decodeURIComponent(slug);
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/courses/${cleanSlug}`,
//       { cache: "no-store" }
//     );
//     if (!res.ok) return null;
//     return res.json();
//   } catch (error) {
//     return null;
//   }
// }

// // --- 2. ENHANCED CURRICULUM COMPONENT ---
// const RichCurriculum = ({ modules }) => {
//   return (
//     <div className="overflow-hidden bg-white border divide-y rounded-lg border-slate-200 divide-slate-200">
//       {modules.map((module, i) => (
//         <details key={i} className="transition-colors group open:bg-slate-50">
//           <summary className="flex items-center justify-between p-5 font-semibold list-none cursor-pointer text-slate-800 hover:bg-slate-50">
//             <div className="flex items-center gap-3">
//               <span className="text-lg">{module.title}</span>
//             </div>
//             <span className="flex items-center gap-3 text-xs font-medium tracking-wide uppercase text-slate-500">
//               {module.sections ? (
//                 `${module.sections.length} Sections`
//               ) : (
//                 <span className={`transition-transform group-open:rotate-180`}>
//                   <ChevronDown size={20} className="text-slate-400" />
//                 </span>
//               )}
//             </span>
//           </summary>

//           <div className="p-5 pt-0 text-sm bg-white border-t border-slate-100 text-slate-600 group-open:animate-in slide-in-from-top-2">
//             {module.details && (
//               <div
//                 className="pl-8 prose-sm prose prose-slate max-w-none"
//                 dangerouslySetInnerHTML={{ __html: module.details }}
//               />
//             )}
//           </div>
//         </details>
//       ))}
//     </div>
//   );
// };

// export default async function CourseDetailPage({ params }) {
//   const { slug } = await params;
//   const course = await getCourse(slug);

//   if (!course)
//     return (
//       <div className="py-20 text-xl font-bold text-center">
//         Course Not Found
//       </div>
//     );

//   // Fallback for Prerequisites if rich text is empty
//   const fallbackPrerequisites = `
//     <h4 class="font-bold text-slate-900 mb-1">Basic Python Programming (Essential Concepts Required)</h4>
//     <p class="mb-3">Core python concepts including python data types, Functions & arguments, Loops and conditionals, File handling (read/write JSON, text, CSV), Error Handling & OOPs.</p>

//     <h4 class="font-bold text-slate-900 mb-1">Python Packages & Modules</h4>
//     <p class="mb-3">Fair understanding/experience with pandas, json, requests, numpy, matplotlib, seaborn, os, logging, and other common python packages.</p>

//     <h4 class="font-bold text-slate-900 mb-1">Understanding of APIs and JSON</h4>
//     <p class="mb-3">Understanding of core IT and Software engineering concepts including but not limited to APIs, HTTP, JSON, Parsing JSON, Postman, CICD, Cloud Platforms.</p>

//     <h4 class="font-bold text-slate-900 mb-1">No Prior AI/ML Knowledge Required</h4>
//     <p>Program covers very foundations of the topic, no prior experience to AI ML concepts needed.</p>
//   `;

//   // Fallback for Capstones if dynamic data is empty (From Word Doc)
//   const defaultCapstones = [
//     {
//       title: "Retrieval-Augmented Generation (RAG) Application",
//       details:
//         "<p>Build a real-time RAG-powered question-answering system that retrieves relevant context and generates grounded, accurate responses. Implement secure file upload, document ingestion, and preprocessing workflows.</p><p><strong>Tools:</strong> Python, Streamlit, LangChain, FAISS/Chroma, Langfuse.</p>",
//     },
//     {
//       title: "AI Agent System with Interactive Interface",
//       details:
//         "<p>Design and build intelligent agent-based systems capable of autonomous reasoning, planning, and decision-making. Integrate external tools like search services and custom APIs.</p><p><strong>Tools:</strong> LangChain, Streamlit, Gemini/GPT/LLaMA.</p>",
//     },
//   ];

//   const capstoneList =
//     course.capstones && course.capstones.length > 0
//       ? course.capstones
//       : defaultCapstones;

//   return (
//     <div className="min-h-screen font-sans bg-white text-slate-900">
//       {/* =========================================
//           HERO HEADER
//       ========================================= */}
//       <div className="bg-[#1C1D1F] text-white pt-28 pb-12 relative z-10">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
//             {/* LEFT: Course Info */}
//             <div className="space-y-5 lg:col-span-2">
//               <div className="flex items-center gap-2 text-sm font-bold text-[#C0C4FC] uppercase tracking-wide">
//                 <Link href="/" className="transition-colors hover:text-white">
//                   Home
//                 </Link>
//                 <span className="text-slate-400">/</span>
//                 <Link
//                   href="/courses"
//                   className="transition-colors hover:text-white"
//                 >
//                   Courses
//                 </Link>
//                 <span className="text-slate-400">/</span>
//                 <span className="font-medium text-white truncate">
//                   {course.category || "Development"}
//                 </span>
//               </div>

//               <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
//                 {course.title}
//               </h1>

//               <div
//                 className="max-w-2xl text-lg leading-relaxed text-slate-200"
//                 dangerouslySetInnerHTML={{
//                   __html: course.subtitle?.slice(0, 180) + "...",
//                 }}
//               />

//               <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
//                 <span className="bg-[#ECEB98] text-slate-900 px-2 py-0.5 font-bold text-xs uppercase rounded-sm">
//                   Bestseller
//                 </span>
//                 <div className="flex items-center gap-1 text-[#E59819] font-bold">
//                   <span className="mr-1 text-base text-white">
//                     {course.rating || "4.8"}
//                   </span>
//                   <div className="flex">
//                     <Star size={14} fill="currentColor" />
//                     <Star size={14} fill="currentColor" />
//                     <Star size={14} fill="currentColor" />
//                     <Star size={14} fill="currentColor" />
//                     <Star size={14} fill="currentColor" />
//                   </div>
//                 </div>
//                 <span className="text-[#C0C4FC] underline cursor-pointer">
//                   (2,450 ratings)
//                 </span>
//                 <span className="text-white">15,000+ students</span>
//               </div>

//               <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-medium text-white">
//                 <div className="flex items-center gap-2">
//                   <AlertCircle size={16} /> Last updated{" "}
//                   {new Date().toLocaleDateString("en-US", {
//                     month: "2-digit",
//                     year: "numeric",
//                   })}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Globe size={16} /> English
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <BarChart size={16} />{" "}
//                   {course.level || "Intermediate to Advanced"}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: Empty Col */}
//             <div className="hidden lg:block lg:col-span-1"></div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           MAIN CONTENT LAYOUT
//       ========================================= */}
//       <div className="relative px-6 mx-auto max-w-7xl">
//         <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
//           {/* --- LEFT COLUMN (Content) --- */}
//           <div className="py-10 space-y-12 lg:col-span-2">
//             {/* 1. HERO FEATURES */}
//             <section className="p-6 bg-white border rounded-lg border-slate-300">
//               <h2 className="mb-6 text-xl font-bold text-slate-900">
//                 What we'll provide
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
//                 {(course.heroFeatures || []).map((item, i) => (
//                   <div
//                     key={i}
//                     className="flex items-start gap-3 text-sm text-slate-700"
//                   >
//                     <CheckCircle
//                       size={16}
//                       className="text-slate-900 mt-0.5 shrink-0"
//                     />
//                     <span>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* 2. SKILLS */}
//             {course.skills && course.skills.length > 0 && (
//               <section>
//                 <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
//                   <Cpu size={24} className="text-blue-600" /> Skills You Will
//                   Master
//                 </h2>
//                 <div className="flex flex-wrap gap-2">
//                   {course.skills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className="px-4 py-2 text-sm font-medium text-blue-800 border border-blue-100 rounded-full bg-blue-50"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* 3. COURSE OUTCOMES */}
//             {course.outcomes && (
//               <section>
//                 <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
//                   <Target size={24} className="text-blue-600" /> Course Outcomes
//                 </h2>
//                 <div
//                   className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700"
//                   dangerouslySetInnerHTML={{ __html: course.outcomes }}
//                 />
//               </section>
//             )}

//             {/* 4. REQUIREMENTS & PREREQUISITES */}
//             <section>
//               <h2 className="mb-6 text-2xl font-bold text-slate-900">
//                 Requirements & Eligibility
//               </h2>

//               <div className="flex flex-col gap-10">
//                 {/* Prerequisites */}
//                 <div>
//                   <h4 className="flex items-center gap-2 pb-2 mb-4 text-lg font-bold border-b text-slate-800">
//                     <Terminal size={20} className="text-slate-600" />{" "}
//                     Prerequisites
//                   </h4>
//                   <div
//                     className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700 marker:text-slate-900"
//                     dangerouslySetInnerHTML={{
//                       __html: course.prerequisites || fallbackPrerequisites,
//                     }}
//                   />
//                 </div>

//                 {/* Target Audience */}
//                 <div>
//                   <h4 className="flex items-center gap-2 pb-2 mb-4 text-lg font-bold border-b text-slate-800">
//                     <CheckCircle size={20} className="text-slate-600" /> Who
//                     this course is for
//                   </h4>
//                   {course.targetAudience && course.targetAudience.length > 0 ? (
//                     <ul className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2 text-slate-700">
//                       {course.targetAudience.map((aud, i) => (
//                         <li key={i} className="flex items-center gap-2">
//                           <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
//                           {aud}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <ul className="pl-5 space-y-1 text-sm list-disc text-slate-700">
//                       <li>Students</li>
//                       <li>Professionals seeking career switch</li>
//                       <li>Data Analysts</li>
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             </section>

//             {/* 5. DESCRIPTION */}
//             <section>
//               <h2 className="mb-4 text-2xl font-bold text-slate-900">
//                 Description
//               </h2>
//               <div
//                 className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700"
//                 dangerouslySetInnerHTML={{ __html: course.subtitle }}
//               />
//             </section>

//             {/* 6. COURSE CONTENT */}
//             <section>
//               <h2 className="mb-4 text-2xl font-bold text-slate-900">
//                 Course Content
//               </h2>
//               <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
//                 <span>{course.curriculum?.length || 0} Modules</span> •{" "}
//                 <span>{course.duration || "40h"} total length</span>
//               </div>
//               <RichCurriculum modules={course.curriculum || []} />
//             </section>

//             {/* 7. CAPSTONE PROJECTS (FIXED: NOW SHOWS DEFAULT IF EMPTY) */}
//             <section className="p-6 border rounded-lg bg-slate-50 border-slate-200">
//               <h2 className="mb-4 text-2xl font-bold text-slate-900">
//                 Capstone Projects
//               </h2>
//               <p className="mb-6 text-slate-600">
//                 Apply your skills in real-world scenarios with these
//                 comprehensive projects.
//               </p>

//               <div className="space-y-8">
//                 {capstoneList.map((project, idx) => (
//                   <div key={idx} className="flex gap-4">
//                     <div className="flex items-center justify-center w-12 h-12 font-bold text-blue-600 bg-blue-100 rounded-full shrink-0">
//                       {idx + 1}
//                     </div>
//                     <div className="w-full">
//                       <h3 className="text-lg font-bold text-slate-900">
//                         {project.title}
//                       </h3>
//                       <div
//                         className="mt-2 text-sm prose-sm prose text-slate-600 max-w-none"
//                         dangerouslySetInnerHTML={{ __html: project.details }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* 8. CAREER OPPORTUNITIES */}
//             {course.jobRoles && course.jobRoles.length > 0 && (
//               <section>
//                 <h2 className="mb-6 text-2xl font-bold text-slate-900">
//                   Career Opportunities
//                 </h2>
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   {course.jobRoles.map((job, i) => (
//                     <div
//                       key={job._id || i}
//                       className="p-4 border rounded-lg border-slate-200 bg-slate-50/50"
//                     >
//                       <h3 className="font-bold text-slate-900">{job.role}</h3>
//                       <p className="text-sm text-slate-600">
//                         Average Salary: {job.salary}
//                       </p>
//                       <div className="flex items-center gap-2 mt-2">
//                         <span className="text-xs font-bold uppercase text-slate-500">
//                           Demand:
//                         </span>
//                         <span
//                           className={`text-xs px-2 py-0.5 rounded ${
//                             job.demand === "High" || job.demand === "Very High"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {job.demand}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* 9. INSTRUCTOR */}
//             <section>
//               <Instructors list={course.instructors || []} />
//             </section>

//             {/* 10. REVIEWS */}
//             <section>
//               <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
//                 <Star size={24} className="fill-[#E59819] text-[#E59819]" />{" "}
//                 {course.rating || "4.8"} course rating
//               </h2>
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 {(course.reviews || []).slice(0, 4).map((review, i) => (
//                   <div key={i} className="p-6 border-t border-slate-200">
//                     <div className="flex items-center gap-3 mb-4">
//                       <img
//                         src={review.image || "https://via.placeholder.com/40"}
//                         className="object-cover w-10 h-10 rounded-full bg-slate-200"
//                         alt="User"
//                       />
//                       <div>
//                         <p className="text-sm font-bold text-slate-900">
//                           {review.name}
//                         </p>
//                         <p className="text-xs text-slate-500">{review.role}</p>
//                       </div>
//                     </div>
//                     <div
//                       className="text-sm leading-relaxed prose-sm prose text-slate-700 max-w-none"
//                       dangerouslySetInnerHTML={{ __html: review.text }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* 11. FAQs */}
//             <section className="p-6 border rounded-lg bg-slate-50 border-slate-200">
//               <h2 className="mb-4 text-xl font-bold text-slate-900">
//                 Frequently Asked Questions
//               </h2>
//               <div className="space-y-4">
//                 {(course.faqs || []).map((faq, i) => (
//                   <div
//                     key={i}
//                     className="pb-4 border-b border-slate-200 last:border-0"
//                   >
//                     <h4 className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-800">
//                       <HelpCircle size={16} className="text-slate-500" />{" "}
//                       {faq.q}
//                     </h4>
//                     <div
//                       className="pl-6 text-sm prose-sm prose text-slate-600 max-w-none"
//                       dangerouslySetInnerHTML={{ __html: faq.a }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* --- RIGHT COLUMN (STICKY SIDEBAR) --- */}
//           <div className="relative lg:col-span-1">
//             <div className="sticky top-24 -mt-[320px] z-20 space-y-6">
//               {/* 1. PREVIEW + APPLICATION FORM CARD */}
//               <div className="overflow-hidden bg-white border rounded-lg shadow-xl border-slate-200">
//                 {/* Video/Image Preview */}
//                 <div className="relative h-48 border-b cursor-pointer bg-slate-900 group border-slate-200">
//                   <img
//                     src={
//                       course.image ||
//                       "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
//                     }
//                     alt="Preview"
//                     className="object-cover w-full h-full transition-opacity opacity-90 group-hover:opacity-75"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="flex items-center justify-center w-16 h-16 transition-transform bg-white rounded-full shadow-lg group-hover:scale-110">
//                       <Play
//                         size={32}
//                         className="text-slate-900 fill-slate-900"
//                       />
//                     </div>
//                   </div>
//                   <p className="absolute w-full text-sm font-bold text-center text-white bottom-4 drop-shadow-md">
//                     Preview this course
//                   </p>
//                 </div>

//                 {/* Content & Form */}
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-6">
//                     <span className="text-3xl font-extrabold text-slate-900">
//                       {course.fee
//                         ? `₹ ${parseInt(course.fee).toLocaleString()}`
//                         : "₹ 49,999"}
//                     </span>
//                     <span className="text-lg line-through text-slate-400">
//                       ₹ 80,000
//                     </span>
//                     <span className="text-xs font-bold text-red-600">
//                       38% OFF
//                     </span>
//                   </div>

//                   <p className="text-[#B32D0F] flex items-center gap-1 text-sm font-bold mb-6">
//                     <Clock size={16} /> Enrolling for{" "}
//                     {course.nextBatch || "Upcoming"} Batch
//                   </p>

//                   <div className="mb-6">
//                     <ApplicationForm
//                       courseTitle={course.title}
//                       courseSlug={course.slug}
//                     />
//                   </div>

//                   <div className="pt-6 mt-6 space-y-3 text-sm border-t text-slate-600 border-slate-100">
//                     <p className="font-bold text-slate-900">
//                       This course includes:
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <MonitorPlay size={16} className="text-slate-400" />{" "}
//                       {course.duration || "40 hours"} Instructor-led training
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Code size={16} className="text-slate-400" />{" "}
//                       {capstoneList.length} Capstone Projects
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Smartphone size={16} className="text-slate-400" /> Access
//                       on mobile and TV
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Award size={16} className="text-slate-400" />{" "}
//                       Certification of completion
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* 2. CORPORATE BOX */}
//               <div className="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
//                 <h3 className="mb-2 text-lg font-bold text-slate-900">
//                   Training 5 or more people?
//                 </h3>
//                 <p className="mb-4 text-sm text-slate-600">
//                   Get your team access to top GenAI & LLM courses anytime,
//                   anywhere.
//                 </p>
//                 <button className="w-full py-3 text-sm font-bold transition-colors border rounded border-slate-900 text-slate-900 hover:bg-slate-50">
//                   Try Blue Business
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import Link from "next/link";
// import {
//   Star,
//   Globe,
//   Clock,
//   BarChart,
//   CheckCircle,
//   PlayCircle,
//   MonitorPlay,
//   FileText,
//   Award,
//   Smartphone,
//   ChevronDown,
//   AlertCircle,
//   HelpCircle,
//   Code,
//   Terminal,
//   Layers,
//   Cpu,
//   Target,
//   Users,
// } from "lucide-react";

// // Components
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ApplicationForm from "@/components/ApplicationForm";
// import Instructors from "@/components/Instructors";

// // --- 1. FETCH DATA ---
// async function getCourse(slug) {
//   try {
//     const cleanSlug = decodeURIComponent(slug);
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/courses/${cleanSlug}`,
//       { cache: "no-store" }
//     );
//     if (!res.ok) return null;
//     return res.json();
//   } catch (error) {
//     return null;
//   }
// }

// // --- 2. MODERNIZED CURRICULUM COMPONENT ---
// const RichCurriculum = ({ modules }) => {
//   return (
//     <div className="flex flex-col gap-4">
//       {modules.map((module, i) => (
//         <details
//           key={i}
//           className="overflow-hidden transition-all bg-white border shadow-sm group border-slate-200 rounded-xl hover:shadow-md open:ring-1 open:ring-blue-100"
//         >
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
//                 {module.sections ? `${module.sections.length} Sections` : ""}
//               </span>
//               <ChevronDown
//                 size={20}
//                 className="transition-transform duration-300 text-slate-400 group-open:rotate-180"
//               />
//             </span>
//           </summary>

//           <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/40">
//             {module.details && (
//               <div
//                 className="
//         /* Base Typography */
//         prose prose-sm max-w-none text-slate-600 leading-relaxed
        
//         /* HEADINGS (e.g., 'Core Concepts', 'Lab Topics') */
//         /* Design: Dark, Bold, with a small Blue accent line on the left */
//         [&>h3]:text-base [&>h3]:font-extrabold [&>h3]:text-slate-900 [&>h3]:mt-6 [&>h3]:mb-3
//         [&>h4]:text-sm [&>h4]:font-bold [&>h4]:text-slate-800 [&>h4]:mt-6 [&>h4]:mb-2 
//         [&>h4]:border-l-4 [&>h4]:border-blue-500 [&>h4]:pl-3
        
//         /* PARAGRAPHS */
//         [&>p]:mb-4 [&>p]:text-slate-600
        
//         /* LISTS (Bullets) */
//         [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul]:mb-4
//         [&_li::marker]:text-blue-500  /* Blue bullets */
        
//         /* BOLD TEXT (Highlights) */
//         [&_strong]:text-slate-900 [&_strong]:font-bold
        
//         /* TOOLS SECTION (Optional styling if 'Tools' is a separate p or div) */
//         [&_em]:not-italic [&_em]:text-blue-600 [&_em]:font-medium
//       "
//                 dangerouslySetInnerHTML={{ __html: module.details }}
//               />
//             )}
//           </div>
//         </details>
//       ))}
//     </div>
//   );
// };

// export default async function CourseDetailPage({ params }) {
//   const { slug } = await params;
//   const course = await getCourse(slug);

//   if (!course)
//     return (
//       <div className="py-20 text-xl font-bold text-center">
//         Course Not Found
//       </div>
//     );

//   // Fallback Data
//   const defaultCapstones = [
//     {
//       title: "RAG Application with Interactive UI",
//       details:
//         "<p>Build a real-time RAG-powered question-answering system using <strong>FAISS/Chroma</strong> and Streamlit.</p>",
//       icon: Layers,
//     },
//     {
//       title: "Autonomous AI Agent System",
//       details:
//         "<p>Design an intelligent agent capable of reasoning and planning using <strong>LangChain</strong> to solve complex tasks.</p>",
//       icon: Cpu,
//     },
//   ];

//   const capstoneList =
//     course.capstones && course.capstones.length > 0
//       ? course.capstones
//       : defaultCapstones;

//   return (
//     <div className="min-h-screen font-sans bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
//       {/* =========================================
//           1. MODERN HERO SECTION
//       ========================================= */}
//       <div className="bg-[#0f172a] text-white pt-32 pb-16 relative overflow-hidden">
//         {/* Abstract Background Shapes */}
//         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

//         <div className="relative z-10 px-6 mx-auto max-w-7xl">
//           <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
//             {/* LEFT: Content */}
//             <div className="space-y-6 lg:col-span-2">
//               {/* Breadcrumbs */}
//               <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-300 uppercase">
//                 <Link
//                   href="/courses"
//                   className="transition-colors hover:text-white"
//                 >
//                   Courses
//                 </Link>
//                 <span className="text-slate-600">/</span>
//                 <span className="text-blue-100">
//                   {course.category || "Generative AI"}
//                 </span>
//               </div>

//               {/* Title */}
//               <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
//                 {course.title}
//               </h1>

//               {/* Subtitle */}
//               <div
//                 className="max-w-2xl text-lg font-light leading-relaxed text-slate-300"
//                 dangerouslySetInnerHTML={{
//                   __html:
//                     course.subtitle?.replace(/<[^>]+>/g, "").slice(0, 200) +
//                     "...",
//                 }}
//               />

//               {/* Meta Data Badges */}
//               <div className="flex flex-wrap gap-4 pt-2">
//                 {course.badges &&
//                   course.badges.map((badge, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 text-xs font-bold tracking-wide text-yellow-200 uppercase border rounded-full bg-yellow-500/20 border-yellow-500/30"
//                     >
//                       {badge}
//                     </span>
//                   ))}
//                 <div className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white border rounded-full bg-white/10 border-white/10">
//                   <Star size={14} className="text-yellow-400 fill-yellow-400" />
//                   <span>{course.rating || "4.8"} Rating</span>
//                 </div>
//                 <div className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white border rounded-full bg-white/10 border-white/10">
//                   <Globe size={14} className="text-blue-300" />
//                   <span>English</span>
//                 </div>
//               </div>

//               {/* Author (Mini) */}
//               <div className="flex items-center gap-3 pt-4 border-t border-white/10">
//                 <span className="text-sm text-slate-400">
//                   Created by{" "}
//                   <span className="font-semibold text-white">
//                     Blue Academy Experts
//                   </span>
//                 </span>
//                 <span className="text-slate-600">•</span>
//                 <span className="flex items-center gap-1 text-sm text-slate-400">
//                   <AlertCircle size={14} /> Last updated{" "}
//                   {new Date().toLocaleDateString("en-US", {
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </span>
//               </div>
//             </div>

//             {/* RIGHT: IMAGE CARD (Moved from Sidebar) */}
//             <div className="hidden lg:block lg:col-span-1">
//               <div className="overflow-hidden border shadow-2xl rounded-xl border-white/10 shadow-black/50 md:mt-20">
//                 <div className="relative h-64 cursor-pointer bg-slate-900 group">
//                   <img
//                     src={
//                       course.image ||
//                       "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
//                     }
//                     alt="Preview"
//                     className="object-cover w-full h-full transition-opacity opacity-90 group-hover:opacity-75"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           2. STICKY NAV BAR
//       ========================================= */}
//       <div className="sticky z-30 hidden bg-white border-b shadow-sm top-16 border-slate-200 md:block">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center gap-8 overflow-x-auto text-sm font-bold text-slate-600">
//             <a
//               href="#overview"
//               className="py-4 transition-all border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
//             >
//               Overview
//             </a>
//             <a
//               href="#curriculum"
//               className="py-4 transition-all border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
//             >
//               Curriculum
//             </a>
//             <a
//               href="#projects"
//               className="py-4 transition-all border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
//             >
//               Projects
//             </a>
//             <a
//               href="#instructor"
//               className="py-4 transition-all border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
//             >
//               Instructors
//             </a>
//             <a
//               href="#reviews"
//               className="py-4 transition-all border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
//             >
//               Reviews
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           3. MAIN CONTENT
//       ========================================= */}
//       <div className="relative px-6 pt-8 pb-20 mx-auto max-w-7xl">
//         <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
//           {/* --- LEFT COLUMN --- */}
//           <div className="space-y-12 lg:col-span-2">
//             {/* WHAT YOU'LL LEARN */}
//             <section
//               id="overview"
//               className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200"
//             >
//               <h2 className="mb-6 text-2xl font-bold text-slate-900">
//                 What you'll learn
//               </h2>
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 {(
//                   course.heroFeatures || [
//                     "Master Core Concepts",
//                     "Build Real Projects",
//                   ]
//                 ).map((item, i) => (
//                   <div key={i} className="flex items-start gap-3">
//                     <CheckCircle
//                       size={20}
//                       className="text-green-500 mt-0.5 shrink-0"
//                     />
//                     <span className="text-sm font-medium leading-relaxed text-slate-700">
//                       {item}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* PREREQUISITES & AUDIENCE */}
//             <section className="grid gap-6 md:grid-cols-1">
//               <div className="p-6 bg-white border rounded-2xl border-slate-200">
//                 <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-900">
//                   <Terminal size={20} className="text-blue-600" /> Prerequisites
//                 </h3>
//                 <div className="space-y-8">
//                   {/* NEW GRID LAYOUT FOR PREREQUISITES */}
//                   <div
//                     className="
//                       grid grid-cols-1 gap-y-6 gap-x-12 md:grid-cols-[250px_1fr]
//                       [&>h4]:text-sm [&>h4]:font-bold [&>h4]:text-slate-900 [&>h4]:leading-snug
//                       [&>p]:text-sm [&>p]:text-blue-600 [&>p]:leading-relaxed
//                       [&>ul]:col-span-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:text-sm [&>ul]:text-slate-600
//                     "
//                     dangerouslySetInnerHTML={{
//                       __html: course.prerequisites || fallbackPrerequisites,
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="p-6 mt-6 bg-white border rounded-2xl border-slate-200">
//                 <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-900">
//                   <Target size={20} className="text-red-500" /> Target Audience
//                 </h3>
//                 <ul className="grid space-y-2 text-sm md:grid-cols-2 md:space-y-2 text-slate-600">
//                   {(
//                     course.targetAudience || ["Developers", "Data Scientists"]
//                   ).map((aud, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-sm text-slate-600"
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>{" "}
//                       {aud}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </section>

//             {/* COURSE CONTENT */}
//             <section id="curriculum">
//               <div className="flex items-end justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-slate-900">
//                   Course Content
//                 </h2>
//                 <div className="px-3 py-1 text-sm font-medium rounded-full text-slate-500 bg-slate-100">
//                   {course.curriculum?.length || 0} Modules •{" "}
//                   {course.duration || "40h"} Content
//                 </div>
//               </div>
//               <RichCurriculum modules={course.curriculum || []} />
//             </section>

//             {/* CAPSTONE PROJECTS */}
//             <section id="projects">
//               <h2 className="mb-6 text-2xl font-bold text-slate-900">
//                 Capstone Projects
//               </h2>
//               <div className="bg-[#1e293b] rounded-2xl p-8 text-white relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>

//                 <div className="relative z-10 space-y-8">
//                   <div className="flex items-start gap-4">
//                     <div className="flex items-center justify-center w-12 h-12 bg-blue-600 shadow-lg rounded-xl shrink-0 shadow-blue-900/50">
//                       <Layers size={24} />
//                     </div>
//                     <div>
//                       <h3 className="mb-2 text-lg font-bold text-white">
//                         {capstoneList[0].title}
//                       </h3>
//                       <div
//                         className="text-sm leading-relaxed prose-sm text-slate-300 prose-invert"
//                         dangerouslySetInnerHTML={{
//                           __html: capstoneList[0].details,
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {capstoneList[1] && (
//                     <>
//                       <div className="w-full h-px bg-white/10"></div>
//                       <div className="flex items-start gap-4">
//                         <div className="flex items-center justify-center w-12 h-12 bg-purple-600 shadow-lg rounded-xl shrink-0 shadow-purple-900/50">
//                           <Cpu size={24} />
//                         </div>
//                         <div>
//                           <h3 className="mb-2 text-lg font-bold text-white">
//                             {capstoneList[1].title}
//                           </h3>
//                           <div
//                             className="text-sm leading-relaxed prose-sm text-slate-300 prose-invert"
//                             dangerouslySetInnerHTML={{
//                               __html: capstoneList[1].details,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </section>

//             {/* INSTRUCTORS */}
//             <section id="instructor">
//               <Instructors list={course.instructors || []} />
//             </section>

//             {/* REVIEWS */}
//             <section id="reviews">
//               <h2 className="mb-6 text-2xl font-bold text-slate-900">
//                 Student Success Stories
//               </h2>
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 {(course.reviews || []).slice(0, 2).map((review, i) => (
//                   <div
//                     key={i}
//                     className="p-6 bg-white border shadow-sm border-slate-200 rounded-xl"
//                   >
//                     <div className="flex items-center gap-1 mb-3 text-yellow-400">
//                       <Star size={14} fill="currentColor" />
//                       <Star size={14} fill="currentColor" />
//                       <Star size={14} fill="currentColor" />
//                       <Star size={14} fill="currentColor" />
//                       <Star size={14} fill="currentColor" />
//                     </div>
//                     <p className="mb-4 text-sm italic text-slate-700">
//                       "{review.text.replace(/<[^>]+>/g, "")}"
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-slate-200 text-slate-500">
//                         {review.name[0]}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-slate-900">
//                           {review.name}
//                         </p>
//                         <p className="text-[10px] text-slate-500">
//                           {review.role}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* --- RIGHT COLUMN (STICKY SIDEBAR) --- */}
//           <div className="relative lg:col-span-1">
//             <div className="sticky space-y-6 top-32">
//               {/* APPLICATION FORM CARD */}
//               <div className="bg-white border shadow-xl border-slate-200 rounded-2xl shadow-slate-200/50">
//                 <div className="p-6">
//                   <div className="mb-6">
//                     <h3 className="mb-2 text-xl font-extrabold text-slate-900">
//                       Interested in joining?
//                     </h3>
//                     <p className="text-sm text-slate-500">
//                       Fill out the form below to apply for the next batch.
//                     </p>
//                   </div>

//                   {/* Application Form */}
//                   <ApplicationForm
//                     courseTitle={course.title}
//                     courseSlug={course.slug}
//                   />

//                   <div className="pt-6 mt-6 space-y-3 text-sm border-t text-slate-600 border-slate-100">
//                     <p className="text-sm font-bold text-slate-900">
//                       Program includes:
//                     </p>
//                     <ul className="space-y-2">
//                       <li className="flex items-center gap-2">
//                         <MonitorPlay size={16} className="text-blue-500" />{" "}
//                         {course.duration || "40 hours"} Live sessions
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Code size={16} className="text-blue-500" />{" "}
//                         {capstoneList.length} Capstone Projects
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Smartphone size={16} className="text-blue-500" />{" "}
//                         Lifetime Access
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Award size={16} className="text-blue-500" /> Industry
//                         Certification
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* TEAM TRAINING BOX */}
//               <div className="p-6 text-center bg-white border shadow-sm border-slate-200 rounded-xl">
//                 <h3 className="mb-2 font-bold text-slate-900">
//                   Training your team?
//                 </h3>
//                 <p className="mb-4 text-sm text-slate-500">
//                   Upskill 5+ members with our enterprise dashboard.
//                 </p>
//                 <button className="w-full py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors">
//                   Request Enterprise Demo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Link from "next/link";
import {
  Star,
  Globe,
  Clock,
  BarChart,
  CheckCircle,
  PlayCircle,
  MonitorPlay,
  FileText,
  Award,
  Smartphone,
  ChevronDown,
  AlertCircle,
  HelpCircle,
  Code,
  Terminal,
  Layers,
  Cpu,
  Target,
  Users,
  Briefcase, // Added for Mode
  ShieldCheck, // Added for Certification
} from "lucide-react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";
import Instructors from "@/components/Instructors";

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

// --- 2. MODERNIZED CURRICULUM COMPONENT ---
const RichCurriculum = ({ modules }) => {
  return (
    <div className="flex flex-col gap-4">
      {modules.map((module, i) => (
        <details
          key={i}
          className="overflow-hidden transition-all bg-white border shadow-sm group border-slate-200 rounded-xl hover:shadow-md open:ring-1 open:ring-blue-100"
        >
          <summary className="flex items-center justify-between p-5 list-none transition-colors bg-white cursor-pointer hover:bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-blue-600 rounded-full bg-blue-50 shrink-0">
                {i + 1}
              </div>
              <span className="text-lg font-bold text-slate-800">
                {module.title}
              </span>
            </div>
            <span className="flex items-center gap-3">
              <span className="hidden text-xs font-semibold tracking-wider uppercase text-slate-400 sm:block">
                {module.sections ? `${module.sections.length} Sections` : ""}
              </span>
              <ChevronDown
                size={20}
                className="transition-transform duration-300 text-slate-400 group-open:rotate-180"
              />
            </span>
          </summary>

          <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/40">
            {module.details && (
              <div
                className="
        /* Base Typography */
        prose prose-sm max-w-none text-slate-600 leading-relaxed
        
        /* HEADINGS */
        [&>h3]:text-base [&>h3]:font-extrabold [&>h3]:text-slate-900 [&>h3]:mt-6 [&>h3]:mb-3
        [&>h4]:text-sm [&>h4]:font-bold [&>h4]:text-slate-800 [&>h4]:mt-6 [&>h4]:mb-2 
        [&>h4]:border-l-4 [&>h4]:border-blue-500 [&>h4]:pl-3
        
        /* PARAGRAPHS */
        [&>p]:mb-4 [&>p]:text-slate-600
        
        /* LISTS */
        [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul]:mb-4
        [&_li::marker]:text-blue-500
        
        /* BOLD TEXT */
        [&_strong]:text-slate-900 [&_strong]:font-bold
        
        /* TOOLS */
        [&_em]:not-italic [&_em]:text-blue-600 [&_em]:font-medium
      "
                dangerouslySetInnerHTML={{ __html: module.details }}
              />
            )}
          </div>
        </details>
      ))}
    </div>
  );
};

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
  const defaultCapstones = [
    {
      title: "RAG Application with Interactive UI",
      details:
        "<p>Build a real-time RAG-powered question-answering system using <strong>FAISS/Chroma</strong> and Streamlit.</p>",
      icon: Layers,
    },
    {
      title: "Autonomous AI Agent System",
      details:
        "<p>Design an intelligent agent capable of reasoning and planning using <strong>LangChain</strong> to solve complex tasks.</p>",
      icon: Cpu,
    },
  ];

  const capstoneList =
    course.capstones && course.capstones.length > 0
      ? course.capstones
      : defaultCapstones;

  // Fallback for Program Details if not present in DB yet
  const programDetails = course.programDetails || {
    type: "Technical Hands-On Training",
    mode: "Instructor-led, lab-heavy",
    smeCriteria: [
      "3–5+ years experience in GenAI/LLMs",
      "Strong experience with LangChain, RAG, and Agents",
    ],
    certCriteria: [
      "Participation in all modules",
      "Completion of both Capstone Projects",
    ],
  };

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
      {/* =========================================
          1. MODERN HERO SECTION
      ========================================= */}
      <div className="bg-[#0f172a] text-white pt-32 pb-16 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* LEFT: Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-300 uppercase">
                <Link
                  href="/courses"
                  className="transition-colors hover:text-white"
                >
                  Courses
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-blue-100">
                  {course.category || "Generative AI"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                {course.title}
              </h1>

              {/* Certification & Mode Info */}
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="px-3 py-1 text-sm font-medium text-white border rounded-full bg-white/10 border-white/10">
                  {programDetails.type}
                </span>
                <span className="px-3 py-1 text-sm font-medium text-white border rounded-full bg-white/10 border-white/10">
                  {programDetails.mode}
                </span>
              </div>

              {/* Meta Data Badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                {course.badges &&
                  course.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-bold tracking-wide text-yellow-200 uppercase border rounded-full bg-yellow-500/20 border-yellow-500/30"
                    >
                      {badge}
                    </span>
                  ))}
                <div className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white border rounded-full bg-white/10 border-white/10">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>{course.rating || "4.8"} Rating</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white border rounded-full bg-white/10 border-white/10">
                  <Globe size={14} className="text-blue-300" />
                  <span>English</span>
                </div>
              </div>

              {/* Author (Mini) */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <span className="text-sm text-slate-400">
                  Created by{" "}
                  <span className="font-semibold text-white">
                    Blue Academy Experts
                  </span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-sm text-slate-400">
                  <AlertCircle size={14} /> Last updated{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* RIGHT: IMAGE CARD */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="overflow-hidden border shadow-2xl rounded-xl border-white/10 shadow-black/50 md:mt-20">
                <div className="relative h-64 cursor-pointer bg-slate-900 group">
                  <img
                    src={
                      course.image ||
                      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
                    }
                    alt="Preview"
                    className="object-cover w-full h-full transition-opacity opacity-90 group-hover:opacity-75"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          2. STICKY NAV BAR
      ========================================= */}
      <div className="sticky z-30 hidden bg-white border-b shadow-sm top-16 border-slate-200 md:block">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-center gap-8 overflow-x-auto text-sm font-bold text-slate-600">
            <a
              href="#overview"
              className="py-4 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
            >
              Overview
            </a>
            <a
              href="#curriculum"
              className="py-4 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
            >
              Curriculum
            </a>
            <a
              href="#projects"
              className="py-4 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
            >
              Projects
            </a>
            <a
              href="#instructor"
              className="py-4 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
            >
              Instructors
            </a>
            <a
              href="#reviews"
              className="py-4 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
            >
              Reviews
            </a>
          </div>
        </div>
      </div>

      {/* =========================================
          3. MAIN CONTENT
      ========================================= */}
      <div className="relative px-6 pt-8 pb-20 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* --- LEFT COLUMN --- */}
          <div className="space-y-12 lg:col-span-2">
            {/* 1. WHAT YOU'LL LEARN */}
            <section
              id="overview"
              className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200"
            >
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {(
                  course.heroFeatures || [
                    "Master Core Concepts",
                    "Build Real Projects",
                  ]
                ).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mt-0.5 shrink-0"
                    />
                    <span className="text-sm font-medium leading-relaxed text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. SKILLS */}
            {course.skills && course.skills.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
                  <Cpu size={24} className="text-blue-600" /> Skills You Will
                  Master
                </h2>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm font-medium text-blue-800 border border-blue-100 rounded-full bg-blue-50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* 3. COURSE OUTCOMES (ADDED) */}
            {course.outcomes && (
              <section>
                <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
                  <Target size={24} className="text-blue-600" /> Course Outcomes
                </h2>
                <div
                  className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700"
                  dangerouslySetInnerHTML={{ __html: course.outcomes }}
                />
              </section>
            )}

            {/* 4. PREREQUISITES & AUDIENCE */}
            <section className="grid gap-6 md:grid-cols-1">
              <div className="p-6 bg-white border rounded-2xl border-slate-200">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-900">
                  <Terminal size={20} className="text-blue-600" /> Prerequisites
                </h3>
                <div className="space-y-8">
                  <div
                    className="
                      grid grid-cols-1 gap-y-6 gap-x-12 md:grid-cols-[250px_1fr]
                      [&>h4]:text-sm [&>h4]:font-bold [&>h4]:text-slate-900 [&>h4]:leading-snug
                      [&>p]:text-sm [&>p]:text-blue-600 [&>p]:leading-relaxed
                      [&>ul]:col-span-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:text-sm [&>ul]:text-slate-600
                    "
                    dangerouslySetInnerHTML={{
                      __html:
                        course.prerequisites ||
                        "<p>Basic Python Programming</p>",
                    }}
                  />
                </div>
              </div>
              <div className="p-6 mt-6 bg-white border rounded-2xl border-slate-200">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-900">
                  <Users size={20} className="text-red-500" /> Target Audience
                </h3>
                <ul className="grid space-y-2 text-sm md:grid-cols-2 md:space-y-2 text-slate-600">
                  {(
                    course.targetAudience || ["Developers", "Data Scientists"]
                  ).map((aud, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>{" "}
                      {aud}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 5. PROGRAM DETAILS & CERTIFICATION (ADDED) */}
            <section className="p-6 border rounded-lg bg-slate-50 border-slate-200">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Program Details & Certification
              </h2>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Certification Criteria */}
                <div>
                  <h4 className="flex items-center gap-2 mb-3 font-bold text-slate-800">
                    <ShieldCheck size={20} className="text-blue-600" />{" "}
                    Certification Eligibility
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {(programDetails.certCriteria || []).map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trainer Profile */}
                <div>
                  <h4 className="flex items-center gap-2 mb-3 font-bold text-slate-800">
                    <Users size={20} className="text-blue-600" /> Trainer
                    Eligibility
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {(programDetails.smeCriteria || []).map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Type & Mode Footer */}
              <div className="pt-6 mt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="block mb-1 text-xs font-bold tracking-wider uppercase text-slate-400">
                      Type
                    </span>
                    <div className="flex items-center gap-2 px-3 py-1 text-sm font-bold text-purple-700 border border-purple-100 rounded bg-purple-50">
                      <MonitorPlay size={16} />
                      <span>{programDetails.type || "Technical Training"}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block mb-1 text-xs font-bold tracking-wider uppercase text-slate-400">
                      Mode
                    </span>
                    <div className="flex items-center gap-2 px-3 py-1 text-sm font-bold text-blue-700 border border-blue-100 rounded bg-blue-50">
                      <Briefcase size={16} />
                      <span>{programDetails.mode || "Instructor-led"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. DESCRIPTION */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Description
              </h2>
              <div
                className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: course.subtitle }}
              />
            </section>

            {/* 7. COURSE CONTENT */}
            <section id="curriculum">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Course Content
                </h2>
                <div className="px-3 py-1 text-sm font-medium rounded-full text-slate-500 bg-slate-100">
                  {course.curriculum?.length || 0} Modules •{" "}
                  {course.duration || "40h"} Content
                </div>
              </div>
              <RichCurriculum modules={course.curriculum || []} />
            </section>

            {/* 8. CAPSTONE PROJECTS */}
            <section id="projects">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Capstone Projects
              </h2>
              <div className="bg-[#1e293b] rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
                <div className="relative z-10 space-y-8">
                  {capstoneList.map((project, idx) => (
                    <div key={idx}>
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 shadow-lg ${
                            idx === 0
                              ? "bg-blue-600 shadow-blue-900/50"
                              : "bg-purple-600 shadow-purple-900/50"
                          }`}
                        >
                          {idx === 0 ? <Layers size={24} /> : <Cpu size={24} />}
                        </div>
                        <div>
                          <h3 className="mb-2 text-lg font-bold text-white">
                            {project.title}
                          </h3>
                          <div
                            className="text-sm leading-relaxed prose-sm text-slate-300 prose-invert"
                            dangerouslySetInnerHTML={{
                              __html: project.details,
                            }}
                          />
                        </div>
                      </div>
                      {idx < capstoneList.length - 1 && (
                        <div className="w-full h-px my-6 bg-white/10"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. CAREER OPPORTUNITIES */}
            {course.jobRoles && course.jobRoles.length > 0 && (
              <section>
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  Career Opportunities
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {course.jobRoles.map((job, i) => (
                    <div
                      key={job._id || i}
                      className="p-4 border rounded-lg border-slate-200 bg-slate-50/50"
                    >
                      <h3 className="font-bold text-slate-900">{job.role}</h3>
                      <p className="text-sm text-slate-600">
                        Average Salary: {job.salary}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold uppercase text-slate-500">
                          Demand:
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            job.demand === "High" || job.demand === "Very High"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {job.demand}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 10. INSTRUCTOR */}
            <section id="instructor">
              <Instructors list={course.instructors || []} />
            </section>

            {/* 11. REVIEWS */}
            <section id="reviews">
              <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
                <Star size={24} className="fill-[#E59819] text-[#E59819]" />{" "}
                {course.rating || "4.8"} course rating
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(course.reviews || []).slice(0, 4).map((review, i) => (
                  <div key={i} className="p-6 border-t border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={review.image || "https://via.placeholder.com/40"}
                        className="object-cover w-10 h-10 rounded-full bg-slate-200"
                        alt="User"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {review.name}
                        </p>
                        <p className="text-xs text-slate-500">{review.role}</p>
                      </div>
                    </div>
                    <div
                      className="text-sm leading-relaxed prose-sm prose text-slate-700 max-w-none"
                      dangerouslySetInnerHTML={{ __html: review.text }}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 12. FAQs */}
            <section className="p-6 border rounded-lg bg-slate-50 border-slate-200">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {(course.faqs || []).map((faq, i) => (
                  <div
                    key={i}
                    className="pb-4 border-b border-slate-200 last:border-0"
                  >
                    <h4 className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-800">
                      <HelpCircle size={16} className="text-slate-500" />{" "}
                      {faq.q}
                    </h4>
                    <div
                      className="pl-6 text-sm prose-sm prose text-slate-600 max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.a }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* --- RIGHT COLUMN (STICKY SIDEBAR) --- */}
          <div className="relative lg:col-span-1">
            <div className="sticky space-y-6 top-32">
              {/* APPLICATION FORM CARD */}
              <div className="bg-white border shadow-xl border-slate-200 rounded-2xl shadow-slate-200/50">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="mb-2 text-xl font-extrabold text-slate-900">
                      Interested in joining?
                    </h3>
                    <p className="text-sm text-slate-500">
                      Fill out the form below to apply for the next batch.
                    </p>
                  </div>

                  <ApplicationForm
                    courseTitle={course.title}
                    courseSlug={course.slug}
                  />

                  <div className="pt-6 mt-6 space-y-3 text-sm border-t text-slate-600 border-slate-100">
                    <p className="text-sm font-bold text-slate-900">
                      Program includes:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <MonitorPlay size={16} className="text-blue-500" />{" "}
                        {course.duration || "40 hours"} Live sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <Code size={16} className="text-blue-500" />{" "}
                        {capstoneList.length} Capstone Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <Smartphone size={16} className="text-blue-500" />{" "}
                        Lifetime Access
                      </li>
                      <li className="flex items-center gap-2">
                        <Award size={16} className="text-blue-500" /> Industry
                        Certification
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TEAM TRAINING BOX */}
              <div className="p-6 text-center bg-white border shadow-sm border-slate-200 rounded-xl">
                <h3 className="mb-2 font-bold text-slate-900">
                  Training your team?
                </h3>
                <p className="mb-4 text-sm text-slate-500">
                  Upskill 5+ members with our enterprise dashboard.
                </p>
                <button className="w-full py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors">
                  Request Enterprise Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}