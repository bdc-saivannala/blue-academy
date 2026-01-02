import React from "react";
import { PersonStanding, BookOpen, Layers, Award } from "lucide-react";

const Instructors = ({ list }) => {
  // 1. Define the Static Role Definitions
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
    <div>
      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
        <PersonStanding size={24} className="text-blue-600" /> Meet Your Mentors
      </h2>

      {/* 2. COMBINED GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {list.map((inst, idx) => {
          // 3. Automatically assign a role based on the index (0, 1, 2...)
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
                  {/* Optional: Show their actual job title from DB */}
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
    </div>
  );
};

export default Instructors;
