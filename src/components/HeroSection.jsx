import React from "react";
import { CheckCircle, Award, Cloud, Shield } from "lucide-react";

const HeroSection = ({ title, subtitle, badges, features }) => {
  return (
    <div className="text-white space-y-8 mb-16 pt-8 animate-fade-in-up">
      {/* 1. URGENCY BADGE */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-md text-sm font-semibold text-blue-500 shadow-lg shadow-blue-500/10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
        </span>
        {badges[0] || "Admissions Closing Soon"}
      </div>

      {/* 2. HEADLINES */}
      <div className="space-y-6">
        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900 drop-shadow-sm">
          {title}
        </h1>

        <p className="text-lg lg:text-xl text-slate-700 max-w-2xl leading-relaxed border-l-4 border-blue-500 pl-6">
          {subtitle}
        </p>
      </div>

      {/* 3. FEATURE GRID (Improved Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="group flex items-start gap-3 p-3 -ml-3 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-default"
          >
            <div className="mt-1 p-1 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            </div>
            <span className="text-slate-400 font-medium leading-snug group-hover:text-blue-500 transition-colors">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* 4. TRUST BAR (Based on PPT Requirement) */}
      <div className="pt-8 border-t border-white/10 mt-8">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-4 opacity-80">
          Curriculum Aligned With
        </p>
        <div className="flex flex-wrap items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Mock Logos (Replace with actual SVGs later) */}
          <div className="flex items-center gap-2 font-bold text-lg text-black">
            <Award className="w-5 h-5 text-blue-400" /> Microsoft
          </div>

          <div className="w-px h-5 bg-white/20 hidden sm:block"></div>

          <div className="flex items-center gap-2 font-bold text-lg text-black">
            <Cloud className="w-5 h-5 text-yellow-400" /> AWS
          </div>

          <div className="w-px h-5 bg-white/20 hidden sm:block"></div>

          <div className="flex items-center gap-2 font-bold text-lg text-black">
            <Shield className="w-5 h-5 text-green-400" /> Google Cloud
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
