"use client";
import React from "react";
import {
  Search,
  PhoneCall,
  Video,
  FileCheck,
  ChevronRight,
  FilePen,
} from "lucide-react";

const EnrollmentSection = () => {
  const steps = [
    {
      title: "Explore",
      desc: "Explore the course and certification",
      icon: Search,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      title: "Consult",
      desc: "Talk to our agents for guidance",
      icon: PhoneCall,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      title: "Experience",
      desc: "Join our live demo session",
      icon: Video,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      title: "Enroll",
      desc: "Complete your enrollment",
      icon: FileCheck,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
  ];

  return (
    // <section>
    //   <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
    //     <FilePen size={24} className="text-blue-600" />
    //     How do I enroll in this course?
    //   </h2>
    //   <div className="px-4 mx-auto max-w-7xl">
    //     <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
    //       {steps.map((step, i) => (
    //         <div key={i} className="relative group">
    //           {/* Arrow Connector */}
    //           {i < steps.length - 1 && (
    //             <div className="absolute right-0 z-20 hidden translate-x-1/2 -translate-y-1/2 md:block top-1/2">
    //               <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
    //                 <ChevronRight size={20} className="text-slate-400" />
    //               </div>
    //             </div>
    //           )}

    //           {/* Card */}
    //           <div
    //             className={`relative overflow-hidden rounded-3xl p-8 ${step.bg} border ${step.border} hover:shadow-xl transition-all hover:-translate-y-2`}
    //           >
    //             {/* Large Step Number */}
    //             <div className="absolute font-black text-white/10 -right-4 -top-4 text-8xl">
    //               {i + 1}
    //             </div>

    //             <div className="flex items-center justify-center mb-6 bg-white shadow-sm w-14 h-14 rounded-2xl">
    //               <step.icon size={28} className={step.color} />
    //             </div>

    //             <h3 className="mb-2 text-xl font-bold text-slate-900">
    //               {step.title}
    //             </h3>
    //             <p className="text-sm text-slate-600">{step.desc}</p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <section className="py-6 overflow-hidden">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-14 text-slate-900">
        <FilePen size={24} className="text-blue-600" />
        How do I enroll in this course? {" "}
      </h2>
      <div className="max-w-6xl px-4 mx-auto">
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ top: "-50px" }}
          >
            <path
              d="M 100 150 Q 300 50 500 150 Q 700 250 900 150"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10 5"
              className="hidden md:block"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="33%" stopColor="#8B5CF6" />
                <stop offset="66%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              {
                title: "Explore",
                desc: "Explore the course and certification",
                icon: Search,
                gradient: "from-blue-500 to-blue-600",
              },
              {
                title: "Consult",
                desc: "Talk to our agents for guidance",
                icon: PhoneCall,
                gradient: "from-purple-500 to-purple-600",
              },
              {
                title: "Experience",
                desc: "Join our live demo session",
                icon: Video,
                gradient: "from-orange-500 to-orange-600",
              },
              {
                title: "Enroll",
                desc: "Complete your enrollment",
                icon: FileCheck,
                gradient: "from-green-500 to-green-600",
              },
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.gradient} p-1`}
                >
                  <div className="flex items-center justify-center w-full h-full bg-white rounded-full">
                    <step.icon size={36} className="text-slate-900" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentSection;
