"use client";
import React from "react";
import { Headset } from "lucide-react";

const ScheduleCallButton = () => {
  return (
    <a
      href="https://outlook.office.com/bookwithme/user/74bcd3456aa44cdd96054ef88ae4c4f7@bluedataconsulting.in?anonymous&ismsaljsauthenabled&ep=plink"
      target="_blank"
      rel="noopener noreferrer"
      // Change: Added overflow-hidden and adjusted padding/width logic
      className="fixed z-50 flex items-center justify-center p-4 font-bold text-white transition-all duration-500 ease-in-out transform rounded-full shadow-2xl bottom-24 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 group hover:pr-6 hover:w-auto w-14 hover:gap-3"
    >
      {/* Icon Box */}
      <div className="relative z-10 p-0 rounded-full group-hover:animate-pulse shrink-0">
        <Headset size={24} />
      </div>

      {/* Text: Hidden by default (w-0), expands on hover */}
      <span className="w-0 overflow-hidden transition-all duration-300 opacity-0 text-md whitespace-nowrap group-hover:w-auto group-hover:opacity-100">
        Schedule a call with a specialist
      </span>
    </a>
  );
};

export default ScheduleCallButton;
