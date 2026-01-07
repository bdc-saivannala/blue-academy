"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  FlaskConical,
  Wrench,
  Terminal,
} from "lucide-react";

const SectionContent = ({ section }) => {
  const [activeTab, setActiveTab] = useState(null);

  const getBtnClass = (tabName) =>
    `flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
      activeTab === tabName
        ? "bg-blue-600 text-white border-blue-600 shadow-md"
        : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:bg-slate-50"
    }`;

  return (
    <div className="p-5 border-t border-slate-100 bg-slate-50/50">
      {/* INLINE BUTTONS ROW */}
      <div className="flex flex-wrap gap-3 mb-4">
        {section.concepts && (
          <button
            onClick={() =>
              setActiveTab(activeTab === "concepts" ? null : "concepts")
            }
            className={getBtnClass("concepts")}
          >
            <BookOpen size={14} /> Core Concepts
          </button>
        )}
        {section.labs && (
          <button
            onClick={() => setActiveTab(activeTab === "labs" ? null : "labs")}
            className={getBtnClass("labs")}
          >
            <FlaskConical size={14} /> Hands-on Labs
          </button>
        )}
        {section.tools && section.tools.length > 0 && (
          <button
            onClick={() => setActiveTab(activeTab === "tools" ? null : "tools")}
            className={getBtnClass("tools")}
          >
            <Wrench size={14} /> Tools
          </button>
        )}
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="min-h-[10px]">
        {activeTab === "concepts" && (
          <div className="pt-2 duration-300 animate-in fade-in slide-in-from-top-2">
            <div
              className="text-sm text-slate-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-blue-500"
              dangerouslySetInnerHTML={{ __html: section.concepts }}
            />
          </div>
        )}

        {activeTab === "labs" && (
          <div className="pt-2 duration-300 animate-in fade-in slide-in-from-top-2">
            <div
              className="p-4 text-sm border rounded-xl bg-white border-slate-200 text-slate-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_li::marker]:text-green-500 shadow-sm"
              dangerouslySetInnerHTML={{ __html: section.labs }}
            />
          </div>
        )}

        {activeTab === "tools" && (
          <div className="pt-2 duration-300 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-wrap items-center gap-2">
              {section.tools.map((tool, k) => (
                <span
                  key={k}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md border border-blue-100 flex items-center gap-1.5"
                >
                  <Terminal size={12} /> {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CurriculumSection = ({ modules }) => {
  return (
    <div className="flex flex-col gap-4">
      {modules.map((module, i) => (
        <details
          key={i}
          className="overflow-hidden transition-all bg-white border shadow-sm group/module border-slate-200 rounded-xl hover:shadow-md open:ring-1 open:ring-blue-100"
        >
          {/* MODULE HEADER */}
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
                {module.sections
                  ? `${module.sections.length} Sections`
                  : "View Content"}
              </span>
              <ChevronDown
                size={20}
                className="transition-transform duration-300 text-slate-400 group-open/module:rotate-180"
              />
            </span>
          </summary>

          {/* MODULE CONTENT AREA */}
          <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/40">
            {/* Module Description */}
            {module.details && (
              <div
                className="mb-6 text-sm leading-relaxed prose-sm prose max-w-none text-slate-600"
                dangerouslySetInnerHTML={{ __html: module.details }}
              />
            )}

            {/* --- NESTED SECTIONS LIST (COLLAPSIBLE) --- */}
            {module.sections && module.sections.length > 0 && (
              <div className="flex flex-col gap-3">
                {module.sections.map((section, j) => (
                  <details
                    key={j}
                    className="overflow-hidden transition-all bg-white border rounded-lg group/section border-slate-200 hover:border-blue-300 open:border-blue-400 open:shadow-sm"
                  >
                    {/* SECTION HEADER */}
                    <summary className="flex items-center justify-between p-4 list-none transition-colors bg-white cursor-pointer hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 group-open/section:bg-blue-600"></div>
                        <h4 className="text-sm font-bold text-slate-800 group-hover/section:text-blue-700">
                          {section.title}
                        </h4>
                      </div>
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-300 text-slate-400 group-open/section:rotate-180 group-open/section:text-blue-600"
                      />
                    </summary>

                    {/* NEW: SECTION CONTENT WITH INLINE BUTTONS */}
                    <SectionContent section={section} />
                  </details>
                ))}
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
};

export default CurriculumSection;
