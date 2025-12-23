"use client";
import React, { useState } from "react";

const ApplicationForm = ({ courseTitle, courseSlug }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "Student / Fresher",
  });

  const [status, setStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });

    // 1. Prepare Data
    const payload = {
      ...formData,
      courseTitle: courseTitle || "General Inquiry",
      courseSlug: courseSlug || "general",
    };

    console.log("Submitting Payload:", payload); // Check Console for this

    try {
      // 2. Send Request
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // 3. Get Specific Error Message
      const data = await res.json();

      if (res.ok) {
        setStatus({
          loading: false,
          message: "Success! Application Saved.",
          error: false,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          experience: "Student / Fresher",
        });
      } else {
        // Show the actual error from Backend (e.g., "Path not found" or "Validation Error")
        console.error("Backend Error:", data);
        setStatus({
          loading: false,
          message: `Error: ${data.message || res.statusText}`,
          error: true,
        });
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus({
        loading: false,
        message: `Network Error: Is Backend Running?`,
        error: true,
      });
    }
  };

  return (
    <div className="p-6 bg-white border border-blue-100 shadow-xl rounded-xl">
      <h3 className="mb-4 text-xl font-bold text-slate-900">
        {courseTitle ? `Apply for ${courseTitle}` : "Start Your Application"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-xs font-bold uppercase text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 text-sm border rounded-lg border-slate-300"
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 text-sm border rounded-lg border-slate-300"
              placeholder="john@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs font-bold uppercase text-slate-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 text-sm border rounded-lg border-slate-300"
              placeholder="+91..."
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-xs font-bold uppercase text-slate-700">
            Work Experience
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 text-sm bg-white border rounded-lg border-slate-300"
          >
            <option>Student / Fresher</option>
            <option>1-3 Years</option>
            <option>3-8 Years</option>
            <option>8+ Years</option>
          </select>
        </div>

        <button
          disabled={status.loading}
          className={`w-full py-4 text-white font-bold rounded-lg shadow-lg ${
            status.loading ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status.loading ? "Sending..." : "Submit Application"}
        </button>

        {/* ERROR MESSAGE DISPLAY */}
        {status.message && (
          <div
            className={`text-center text-xs font-bold mt-4 p-3 rounded ${
              status.error
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ApplicationForm;
