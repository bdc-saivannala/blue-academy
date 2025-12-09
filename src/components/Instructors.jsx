import React from "react";

const Instructors = ({ list }) => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Meet Your Mentors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((inst, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200"
          >
            {/* FIXED: Added fixed width/height and object-cover to prevent giant images */}
            <img
              src={inst.image}
              alt={inst.name}
              className="w-16 h-16 rounded-full bg-slate-100 object-cover flex-shrink-0"
            />
            <div>
              <h4 className="font-bold text-slate-900">{inst.name}</h4>
              <p className="text-sm text-blue-700 font-bold">{inst.role}</p>
              <p className="text-xs text-slate-500 mt-1">{inst.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
