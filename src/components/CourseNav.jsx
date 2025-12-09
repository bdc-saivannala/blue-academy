"use client";
import React from "react";

const CourseNav = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky z-40 hidden bg-white border-b shadow-sm top-20 border-slate-200 md:block">
      <div className="flex gap-8 px-8 py-2 mx-auto overflow-x-auto max-w-7xl">
        {[
          "Overview",
          "Curriculum",
          "Mentors",
          "Certification",
          "Careers",
          "FAQs",
        ].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="py-4 text-sm font-bold transition-all text-slate-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseNav;
