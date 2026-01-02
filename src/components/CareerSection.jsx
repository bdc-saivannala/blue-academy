"use client"; // This makes it interactive
import React, { useState } from "react";
import {
  Send,
  SquareArrowOutUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CareerSection = ({ jobRoles }) => {
  const [showAll, setShowAll] = useState(false);

  if (!jobRoles || jobRoles.length === 0) return null;

  // Show only first 3 if not expanded
  const visibleJobs = showAll ? jobRoles : jobRoles.slice(0, 4);

  return (
    <section>
      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
        <Send size={24} className="text-blue-600" /> Career Opportunities
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visibleJobs.map((job, i) => (
          <a
            key={i}
            href={`https://www.naukri.com/${job.role
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-")}-jobs`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 transition-all border rounded-lg border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-blue-300 group"
          >
            <h3 className="flex items-center gap-2 font-bold transition-colors text-slate-900 group-hover:text-blue-600">
              {job.role}{" "}
              <SquareArrowOutUpRight
                size={12}
                className="transition-opacity opacity-0 group-hover:opacity-100"
              />
            </h3>
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
          </a>
        ))}
      </div>

      {/* Show More Button - Only appears if more than 3 jobs */}
      {jobRoles.length > 4 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full hover:bg-blue-100 transition-all"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                View {jobRoles.length - 4} More Roles <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default CareerSection;
