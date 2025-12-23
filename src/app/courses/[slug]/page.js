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

// // --- 2. ENHANCED CURRICULUM COMPONENT ---
// const RichCurriculum = ({ modules }) => {
//   return (
//     <div className="overflow-hidden bg-white border divide-y rounded-lg border-slate-200 divide-slate-200">
//       {modules.map((module, i) => (
//         <details key={i} className="transition-colors group open:bg-slate-50">
//           <summary className="flex items-center justify-between p-5 font-semibold list-none cursor-pointer text-slate-800 hover:bg-slate-50">
//             <div className="flex items-center gap-3">
//               <span className={`transition-transform group-open:rotate-180`}>
//                 <ChevronDown size={20} className="text-slate-400" />
//               </span>
//               <span className="text-lg">{module.title}</span>
//             </div>
//             <span className="text-xs font-medium tracking-wide uppercase text-slate-500">
//               {module.sections
//                 ? `${module.sections.length} Sections`
//                 : "View Content"}
//             </span>
//           </summary>

//           <div className="p-5 pt-0 text-sm bg-white border-t border-slate-100 text-slate-600 group-open:animate-in slide-in-from-top-2">
//             {/* Rich Text Details (from CustomEditor) */}
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

//   // Fallback for Prerequisites if rich text is empty (matching your image content)
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
//             {/* 1. HERO FEATURES (What you'll learn) */}
//             <section className="p-6 bg-white border rounded-lg border-slate-300">
//               <h2 className="mb-6 text-xl font-bold text-slate-900">
//                 What you'll learn
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

//             {/* 2. SKILLS LEARNED (NEW SECTION) */}
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

//             {/* 3. COURSE OUTCOMES (NEW SECTION - Rich Text) */}
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

//             {/* 4. COURSE CONTENT (Curriculum) */}
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

//             {/* 5. CAPSTONE PROJECTS (Rich Text Support) */}
//             {course.capstones && course.capstones.length > 0 && (
//               <section className="p-6 border rounded-lg bg-slate-50 border-slate-200">
//                 <h2 className="mb-4 text-2xl font-bold text-slate-900">
//                   Capstone Projects
//                 </h2>
//                 <p className="mb-6 text-slate-600">
//                   Apply your skills in real-world scenarios with these
//                   comprehensive projects.
//                 </p>

//                 <div className="space-y-8">
//                   {course.capstones.map((project, idx) => (
//                     <div key={idx} className="flex gap-4">
//                       <div className="flex items-center justify-center w-12 h-12 font-bold text-blue-600 bg-blue-100 rounded-full shrink-0">
//                         {idx + 1}
//                       </div>
//                       <div className="w-full">
//                         <h3 className="text-lg font-bold text-slate-900">
//                           {project.title}
//                         </h3>
//                         {/* Render Rich Text for Project Details */}
//                         <div
//                           className="mt-2 text-sm prose-sm prose text-slate-600 max-w-none"
//                           dangerouslySetInnerHTML={{ __html: project.details }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* 6. REQUIREMENTS & PREREQUISITES (UPDATED - STACKED LAYOUT) */}
//             <section>
//               <h2 className="mb-6 text-2xl font-bold text-slate-900">
//                 Requirements & Eligibility
//               </h2>

//               {/* Stacked Vertical Layout */}
//               <div className="flex flex-col gap-10">
//                 {/* Prerequisites (Full Width) */}
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

//                 {/* Target Audience (Full Width - Below Prerequisites) */}
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

//             {/* 7. DESCRIPTION */}
//             <section>
//               <h2 className="mb-4 text-2xl font-bold text-slate-900">
//                 Description
//               </h2>
//               <div
//                 className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700"
//                 dangerouslySetInnerHTML={{ __html: course.subtitle }}
//               />
//             </section>

//             {/* 8. CAREER OPPORTUNITIES (Job Roles) */}
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
//                     {/* Review Text Rendered as Rich Text */}
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
//                       {course.capstones?.length || 2} Capstone Projects
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

import React from "react";
import Link from "next/link";
import {
  Star,
  Globe,
  Clock,
  BarChart,
  CheckCircle,
  Play,
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

// --- 2. ENHANCED CURRICULUM COMPONENT ---
const RichCurriculum = ({ modules }) => {
  return (
    <div className="overflow-hidden bg-white border divide-y rounded-lg border-slate-200 divide-slate-200">
      {modules.map((module, i) => (
        <details key={i} className="transition-colors group open:bg-slate-50">
          <summary className="flex items-center justify-between p-5 font-semibold list-none cursor-pointer text-slate-800 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <span className={`transition-transform group-open:rotate-180`}>
                <ChevronDown size={20} className="text-slate-400" />
              </span>
              <span className="text-lg">{module.title}</span>
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-slate-500">
              {module.sections
                ? `${module.sections.length} Sections`
                : "View Content"}
            </span>
          </summary>

          <div className="p-5 pt-0 text-sm bg-white border-t border-slate-100 text-slate-600 group-open:animate-in slide-in-from-top-2">
            {module.details && (
              <div
                className="pl-8 prose-sm prose prose-slate max-w-none"
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

  // Fallback for Prerequisites if rich text is empty
  const fallbackPrerequisites = `
    <h4 class="font-bold text-slate-900 mb-1">Basic Python Programming (Essential Concepts Required)</h4>
    <p class="mb-3">Core python concepts including python data types, Functions & arguments, Loops and conditionals, File handling (read/write JSON, text, CSV), Error Handling & OOPs.</p>
    
    <h4 class="font-bold text-slate-900 mb-1">Python Packages & Modules</h4>
    <p class="mb-3">Fair understanding/experience with pandas, json, requests, numpy, matplotlib, seaborn, os, logging, and other common python packages.</p>
    
    <h4 class="font-bold text-slate-900 mb-1">Understanding of APIs and JSON</h4>
    <p class="mb-3">Understanding of core IT and Software engineering concepts including but not limited to APIs, HTTP, JSON, Parsing JSON, Postman, CICD, Cloud Platforms.</p>

    <h4 class="font-bold text-slate-900 mb-1">No Prior AI/ML Knowledge Required</h4>
    <p>Program covers very foundations of the topic, no prior experience to AI ML concepts needed.</p>
  `;

  // Fallback for Capstones if dynamic data is empty (From Word Doc)
  const defaultCapstones = [
    {
      title: "Retrieval-Augmented Generation (RAG) Application",
      details:
        "<p>Build a real-time RAG-powered question-answering system that retrieves relevant context and generates grounded, accurate responses. Implement secure file upload, document ingestion, and preprocessing workflows.</p><p><strong>Tools:</strong> Python, Streamlit, LangChain, FAISS/Chroma, Langfuse.</p>",
    },
    {
      title: "AI Agent System with Interactive Interface",
      details:
        "<p>Design and build intelligent agent-based systems capable of autonomous reasoning, planning, and decision-making. Integrate external tools like search services and custom APIs.</p><p><strong>Tools:</strong> LangChain, Streamlit, Gemini/GPT/LLaMA.</p>",
    },
  ];

  const capstoneList =
    course.capstones && course.capstones.length > 0
      ? course.capstones
      : defaultCapstones;

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900">
      {/* =========================================
          HERO HEADER
      ========================================= */}
      <div className="bg-[#1C1D1F] text-white pt-28 pb-12 relative z-10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* LEFT: Course Info */}
            <div className="space-y-5 lg:col-span-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#C0C4FC] uppercase tracking-wide">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span className="text-slate-400">/</span>
                <Link
                  href="/courses"
                  className="transition-colors hover:text-white"
                >
                  Courses
                </Link>
                <span className="text-slate-400">/</span>
                <span className="font-medium text-white truncate">
                  {course.category || "Development"}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
                {course.title}
              </h1>

              <div
                className="max-w-2xl text-lg leading-relaxed text-slate-200"
                dangerouslySetInnerHTML={{
                  __html: course.subtitle?.slice(0, 180) + "...",
                }}
              />

              <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                <span className="bg-[#ECEB98] text-slate-900 px-2 py-0.5 font-bold text-xs uppercase rounded-sm">
                  Bestseller
                </span>
                <div className="flex items-center gap-1 text-[#E59819] font-bold">
                  <span className="mr-1 text-base text-white">
                    {course.rating || "4.8"}
                  </span>
                  <div className="flex">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <span className="text-[#C0C4FC] underline cursor-pointer">
                  (2,450 ratings)
                </span>
                <span className="text-white">15,000+ students</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-medium text-white">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} /> Last updated{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} /> English
                </div>
                <div className="flex items-center gap-2">
                  <BarChart size={16} />{" "}
                  {course.level || "Intermediate to Advanced"}
                </div>
              </div>
            </div>

            {/* RIGHT: Empty Col */}
            <div className="hidden lg:block lg:col-span-1"></div>
          </div>
        </div>
      </div>

      {/* =========================================
          MAIN CONTENT LAYOUT
      ========================================= */}
      <div className="relative px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* --- LEFT COLUMN (Content) --- */}
          <div className="py-10 space-y-12 lg:col-span-2">
            {/* 1. HERO FEATURES */}
            <section className="p-6 bg-white border rounded-lg border-slate-300">
              <h2 className="mb-6 text-xl font-bold text-slate-900">
                What we'll provide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                {(course.heroFeatures || []).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle
                      size={16}
                      className="text-slate-900 mt-0.5 shrink-0"
                    />
                    <span>{item}</span>
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

            {/* 3. COURSE OUTCOMES */}
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

            {/* 4. REQUIREMENTS & PREREQUISITES */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Requirements & Eligibility
              </h2>

              <div className="flex flex-col gap-10">
                {/* Prerequisites */}
                <div>
                  <h4 className="flex items-center gap-2 pb-2 mb-4 text-lg font-bold border-b text-slate-800">
                    <Terminal size={20} className="text-slate-600" />{" "}
                    Prerequisites
                  </h4>
                  <div
                    className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700 marker:text-slate-900"
                    dangerouslySetInnerHTML={{
                      __html: course.prerequisites || fallbackPrerequisites,
                    }}
                  />
                </div>

                {/* Target Audience */}
                <div>
                  <h4 className="flex items-center gap-2 pb-2 mb-4 text-lg font-bold border-b text-slate-800">
                    <CheckCircle size={20} className="text-slate-600" /> Who
                    this course is for
                  </h4>
                  {course.targetAudience && course.targetAudience.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2 text-slate-700">
                      {course.targetAudience.map((aud, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                          {aud}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="pl-5 space-y-1 text-sm list-disc text-slate-700">
                      <li>Students</li>
                      <li>Professionals seeking career switch</li>
                      <li>Data Analysts</li>
                    </ul>
                  )}
                </div>
              </div>
            </section>

            {/* 5. DESCRIPTION */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Description
              </h2>
              <div
                className="text-sm leading-relaxed prose prose-slate max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: course.subtitle }}
              />
            </section>

            {/* 6. COURSE CONTENT */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Course Content
              </h2>
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                <span>{course.curriculum?.length || 0} Modules</span> •{" "}
                <span>{course.duration || "40h"} total length</span>
              </div>
              <RichCurriculum modules={course.curriculum || []} />
            </section>

            {/* 7. CAPSTONE PROJECTS (FIXED: NOW SHOWS DEFAULT IF EMPTY) */}
            <section className="p-6 border rounded-lg bg-slate-50 border-slate-200">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Capstone Projects
              </h2>
              <p className="mb-6 text-slate-600">
                Apply your skills in real-world scenarios with these
                comprehensive projects[cite: 236].
              </p>

              <div className="space-y-8">
                {capstoneList.map((project, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex items-center justify-center w-12 h-12 font-bold text-blue-600 bg-blue-100 rounded-full shrink-0">
                      {idx + 1}
                    </div>
                    <div className="w-full">
                      <h3 className="text-lg font-bold text-slate-900">
                        {project.title}
                      </h3>
                      <div
                        className="mt-2 text-sm prose-sm prose text-slate-600 max-w-none"
                        dangerouslySetInnerHTML={{ __html: project.details }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. CAREER OPPORTUNITIES */}
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

            {/* 9. INSTRUCTOR */}
            <section>
              <Instructors list={course.instructors || []} />
            </section>

            {/* 10. REVIEWS */}
            <section>
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

            {/* 11. FAQs */}
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
            <div className="sticky top-24 -mt-[320px] z-20 space-y-6">
              {/* 1. PREVIEW + APPLICATION FORM CARD */}
              <div className="overflow-hidden bg-white border rounded-lg shadow-xl border-slate-200">
                {/* Video/Image Preview */}
                <div className="relative h-48 border-b cursor-pointer bg-slate-900 group border-slate-200">
                  <img
                    src={
                      course.image ||
                      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
                    }
                    alt="Preview"
                    className="object-cover w-full h-full transition-opacity opacity-90 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-16 h-16 transition-transform bg-white rounded-full shadow-lg group-hover:scale-110">
                      <Play
                        size={32}
                        className="text-slate-900 fill-slate-900"
                      />
                    </div>
                  </div>
                  <p className="absolute w-full text-sm font-bold text-center text-white bottom-4 drop-shadow-md">
                    Preview this course
                  </p>
                </div>

                {/* Content & Form */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {course.fee
                        ? `₹ ${parseInt(course.fee).toLocaleString()}`
                        : "₹ 49,999"}
                    </span>
                    <span className="text-lg line-through text-slate-400">
                      ₹ 80,000
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      38% OFF
                    </span>
                  </div>

                  <p className="text-[#B32D0F] flex items-center gap-1 text-sm font-bold mb-6">
                    <Clock size={16} /> Enrolling for{" "}
                    {course.nextBatch || "Upcoming"} Batch
                  </p>

                  <div className="mb-6">
                    <ApplicationForm
                      courseTitle={course.title}
                      courseSlug={course.slug}
                    />
                  </div>

                  <div className="pt-6 mt-6 space-y-3 text-sm border-t text-slate-600 border-slate-100">
                    <p className="font-bold text-slate-900">
                      This course includes:
                    </p>
                    <div className="flex items-center gap-3">
                      <MonitorPlay size={16} className="text-slate-400" />{" "}
                      {course.duration || "40 hours"} Instructor-led training
                    </div>
                    <div className="flex items-center gap-3">
                      <Code size={16} className="text-slate-400" />{" "}
                      {capstoneList.length} Capstone Projects
                    </div>
                    <div className="flex items-center gap-3">
                      <Smartphone size={16} className="text-slate-400" /> Access
                      on mobile and TV
                    </div>
                    <div className="flex items-center gap-3">
                      <Award size={16} className="text-slate-400" />{" "}
                      Certification of completion
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. CORPORATE BOX */}
              <div className="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  Training 5 or more people?
                </h3>
                <p className="mb-4 text-sm text-slate-600">
                  Get your team access to top GenAI & LLM courses anytime,
                  anywhere.
                </p>
                <button className="w-full py-3 text-sm font-bold transition-colors border rounded border-slate-900 text-slate-900 hover:bg-slate-50">
                  Try Blue Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}