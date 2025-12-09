"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";

const Curriculum = ({ modules }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Course Curriculum
      </h2>
      <div className="space-y-4">
        {modules.map((mod, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <BookOpen size={16} />
                </div>
                <span className="font-semibold text-slate-800">
                  {mod.title}
                </span>
              </div>
              {openIndex === idx ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {openIndex === idx && (
              <div className="p-4 text-slate-600 bg-white border-t border-slate-100 text-sm leading-relaxed">
                {mod.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
