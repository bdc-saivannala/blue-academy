import React from "react";
import {
  PersonStanding,
  BookOpen,
  Layers,
  Award,
  Briefcase,
  CalendarCheck,
  Users,
} from "lucide-react";

const Instructors = ({ list, leaders }) => {
  // --- 1. CONFIG: Leader Roles (Static Text from your request) ---
  const leaderDefinitions = [
    {
      role: "Program Director",
      desc: "Set the direction of the program and ensure it meets industry and academic excellence standards.",
      icon: Briefcase, // Icon for Director
      colorClass: "bg-slate-900 text-white", // Dark theme for Director
      iconBg: "bg-white/10 text-blue-300",
    },
    {
      role: "Program Manager",
      desc: "Manages schedules, coordination, assessments, and ensures smooth course delivery.",
      icon: CalendarCheck, // Icon for Manager
      colorClass: "bg-blue-600 text-white", // Blue theme for Manager
      iconBg: "bg-white/10 text-blue-100",
    },
  ];

  // Fallback if no specific leaders are passed (for design visualization)
  const leadersList = leaders || [
    {
      name: "Dr. A. Sharma",
      company: "Ex-Google DeepMind",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Jenkins",
      company: "EdTech Lead",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  // --- 2. CONFIG: Mentor Roles (Your existing logic) ---
  const roleDefinitions = [
    {
      title: "SME",
      desc: "Covers theory, hands-on labs, assessments, and daily assignments.",
      icon: BookOpen,
      colorClass: "bg-blue-50 border-blue-100 text-blue-700",
      iconClass: "text-blue-600",
    },
    {
      title: "Master SME",
      desc: "Specialized guidance for Capstone Projects and advanced implementation.",
      icon: Layers,
      colorClass: "bg-purple-50 border-purple-100 text-purple-700",
      iconClass: "text-purple-600",
    },
    {
      title: "Mentor",
      desc: "Dedicated support to help all learners pass the certification exam.",
      icon: Award,
      colorClass: "bg-green-50 border-green-100 text-green-700",
      iconClass: "text-green-600",
    },
  ];

  return (
    <div className="space-y-16">
      {/* =========================================
          SECTION 1: Meet Our Leaders
      ========================================= */}
      <section>
        <h2 className="flex items-center gap-2 mb-8 text-2xl font-bold text-slate-900">
          <Users size={24} className="text-blue-600" /> Meet Our Leaders
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {leaderDefinitions.map((def, idx) => {
            // Get the person for this role (limit to first 2)
            const person = leadersList[idx] || {
              name: "Hiring...",
              company: "-",
              image: "",
            };
            const Icon = def.icon;

            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl shadow-lg transition-transform hover:-translate-y-1 ${def.colorClass}`}
              >
                <div className="p-8">
                  {/* Role Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl ${def.iconBg}`}>
                      <Icon size={24} />
                    </div>
                    <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-white/10 backdrop-blur-sm">
                      Leadership
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="mb-2 text-xl font-bold">{def.role}</h3>
                  <p className="max-w-sm mb-8 text-sm leading-relaxed opacity-80">
                    {def.desc}
                  </p>

                  {/* Person Profile */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="object-cover w-12 h-12 bg-white border-2 rounded-full border-white/20"
                    />
                    <div>
                      <p className="text-lg font-bold leading-none">
                        {person.name}
                      </p>
                      <p className="mt-1 text-sm opacity-70">
                        {person.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Blob */}
                <div className="absolute w-32 h-32 rounded-full -bottom-10 -right-10 bg-white/5 blur-2xl"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================
          SECTION 2: Industry Expert/Trainers
      ========================================= */}
      <section>
        <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
          <PersonStanding size={24} className="text-blue-600" /> Industry
          Expert/Trainers
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(list || []).map((inst, idx) => {
            // Cycle through roles: 0, 1, 2, 0, 1, 2...
            const role = roleDefinitions[idx % roleDefinitions.length];
            const Icon = role.icon;

            return (
              <div
                key={idx}
                className="flex flex-col h-full overflow-hidden transition-all bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md"
              >
                {/* TOP: Instructor Profile */}
                <div className="flex items-center gap-4 p-5 border-b border-slate-100">
                  <img
                    src={inst.image}
                    alt={inst.name}
                    className="flex-shrink-0 object-cover border-2 border-white rounded-full shadow-sm w-14 h-14 bg-slate-100"
                  />
                  <div>
                    <h4 className="text-lg font-bold leading-tight text-slate-900">
                      {inst.name}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {inst.company}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {inst.role}
                    </p>
                  </div>
                </div>

                {/* BOTTOM: Assigned Role Details */}
                <div className={`p-5 flex-1 ${role.colorClass} bg-opacity-30`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm">
                      <Icon size={16} className={role.iconClass} />
                    </div>
                    <h4 className={`font-bold text-sm ${role.textClass}`}>
                      {role.title}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 opacity-90">
                    {role.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Instructors;
