import React from "react";
import { Download, ArrowRight } from "lucide-react";

const FloatingCard = ({ data }) => {
  return (
    <div className="sticky top-28 z-30">
      {/* Changed from Transparent Glass to Solid White for better visibility */}
      <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 overflow-hidden">
        <div className="space-y-6">
          {/* Video Placeholder Area */}
          <div className="rounded-xl overflow-hidden h-48 bg-slate-900 relative flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
            </div>
            <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              Preview Course
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
            <p className="text-slate-500 text-sm mt-1">
              Next Batch:{" "}
              <span className="text-blue-700 font-bold">
                {data.pricing.nextBatch}
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Brochure
            </button>
            <button className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-blue-700 text-blue-700 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              Enroll Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-center text-xs text-red-500 font-semibold mt-2">
            Application Closes Soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloatingCard;
