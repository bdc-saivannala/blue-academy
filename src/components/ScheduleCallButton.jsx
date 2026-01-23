"use client";
import React from "react";
import { Headset } from "lucide-react";

const ScheduleCallButton = () => {
  return (
    <a
      href="https://outlook.office.com/book/BlueAcademy@bluedataconsulting.in/?ismsaljsauthenabled"
      target="_blank"
      rel="noopener noreferrer"
      // Change: Added overflow-hidden and adjusted padding/width logic
      className="fixed z-50 flex items-center justify-center p-4 font-bold text-white transition-all duration-300 transform bg-blue-600 rounded-full shadow-2xl bottom-24 right-6 group hover:bg-blue-700 hover:scale-110"
    >
      {/* Icon Box */}
      <div className="relative rounded-full group-hover:animate-pulse">
        <Headset size={24} />
      </div>

      {/* Text: Hidden by default (w-0), expands on hover */}
      {/* <span className="w-0 overflow-hidden transition-all duration-300 opacity-0 text-md whitespace-nowrap group-hover:w-auto group-hover:opacity-100">
        Schedule a call with a specialist
      </span> */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Book the Schedule with a specialist
      </span>
    </a>
  );
};

export default ScheduleCallButton;
