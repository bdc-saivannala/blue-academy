import React from "react";

const ApplicationForm = () => {
  return (
    <div className="p-6 bg-white border border-blue-100 shadow-xl rounded-xl">
      <h3 className="mb-4 text-xl font-bold text-slate-900">
        Start Your Application
      </h3>
      <p className="mb-4 text-xs text-slate-500">
        Upcoming Batch:{" "}
        <span className="font-bold text-blue-600">Dec 15, 2025</span>
      </p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-xs font-bold uppercase text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-3 text-sm border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-600"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 text-xs font-bold uppercase text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 text-sm border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-600"
              placeholder="john@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-bold uppercase text-slate-700">
              Phone
            </label>
            <input
              type="tel"
              className="w-full p-3 text-sm border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-600"
              placeholder="+91 987..."
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-xs font-bold uppercase text-slate-700">
            Work Experience
          </label>
          <select className="w-full p-3 text-sm bg-white border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-600">
            <option>Student / Fresher</option>
            <option>1-3 Years</option>
            <option>3-8 Years</option>
            <option>8+ Years</option>
          </select>
        </div>

        <button className="w-full py-4 font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 shadow-blue-600/30">
          Submit Application
        </button>

        <p className="text-[10px] text-center text-slate-400">
          By clicking submit, you agree to our Terms & Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default ApplicationForm;
