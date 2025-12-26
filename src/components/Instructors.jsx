import React from "react";

const Instructors = ({ list }) => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Meet Your Mentors
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {list.map((inst, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 bg-white border shadow-sm rounded-xl border-slate-200"
          >
            {/* FIXED: Added fixed width/height and object-cover to prevent giant images */}
            <img
              src={inst.image}
              alt={inst.name}
              className="flex-shrink-0 object-cover w-16 h-16 rounded-full bg-slate-100"
            />
            <div>
              <h4 className="font-bold text-slate-900">{inst.name}</h4>
              <p className="text-sm font-bold text-blue-700">{inst.role}</p>
              <p className="mt-1 text-xs text-slate-500">{inst.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
