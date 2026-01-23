"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight,
  Send,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          experience: "General Inquiry",
        }),
      });

      if (res.ok) {
        setStatus("Message Sent Successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      {/* 1. HERO SECTION */}
      <div className="relative bg-[#020617] pt-32 pb-64 overflow-hidden">
        {/* Tech Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-50"></div>

        <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wide text-blue-300 uppercase border rounded-full bg-blue-900/30 border-blue-700/50">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-blue-500 rounded-full"></span>
            </span>
            We are here to help
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Get in touch with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Blue Academy
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-400">
            Have questions about our courses, corporate training, or consulting?
            Our team is ready to provide the answers you need.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT (Overlap Layout) */}
      <div className="relative z-20 px-4 pb-20 mx-auto -mt-40 max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border border-slate-100">
          {/* LEFT COLUMN: Contact Info */}
          <div className="relative p-10 lg:col-span-5 bg-gradient-to-br from-blue-900 via-[#0f172a] to-slate-900 text-white flex flex-col justify-between overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative">
              <h3 className="text-2xl font-bold tracking-tight">
                Contact Information
              </h3>
              <p className="mt-2 text-sm text-blue-200">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <div className="mt-10 space-y-8">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-blue-400 border rounded-lg bg-blue-500/10 border-blue-500/20 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wider text-blue-100 uppercase">
                      Call Us
                    </h4>
                    <p className="mt-1 text-lg font-medium">+91 91044 45059</p>
                    <p className="text-sm text-slate-400">
                      Mon-Fri, 9:30am - 5:30pm
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-blue-400 border rounded-lg bg-blue-500/10 border-blue-500/20 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wider text-blue-100 uppercase">
                      Email Us
                    </h4>
                    <p className="mt-1 text-lg font-medium">
                      info@blueacademy.ai
                    </p>
                    <p className="text-sm text-slate-400">
                      We reply within 24hrs
                    </p>
                  </div>
                </div>

                {/* Office */}
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 text-blue-400 border rounded-lg bg-blue-500/10 border-blue-500/20 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wider text-blue-100 uppercase">
                      Visit Us
                    </h4>
                    <p className="mt-1 text-base leading-relaxed text-slate-300">
                      706, International Finance Center,
                      <br />
                      VIP Road, Vesu,
                      <br />
                      Surat, Gujarat 395007
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social / Decoration */}
            <div className="relative mt-12 lg:mt-0">
              <div className="flex items-center gap-2 text-sm text-blue-300/80">
                <CheckCircle size={16} />{" "}
                <span>Priority Support for Professionals & Learners</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="p-10 bg-white lg:p-16 lg:col-span-7">
            <h2 className="text-2xl font-bold text-slate-900">
              Send us a message
            </h2>
            <p className="mt-2 mb-8 text-slate-500">
              We would love to hear from you. Please fill out this form.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all border rounded-lg outline-none border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all border rounded-lg outline-none border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all border rounded-lg outline-none border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border rounded-lg outline-none border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-all border rounded-lg outline-none resize-none border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-slate-50 focus:bg-white"
                  placeholder="Tell us more about your requirements..."
                ></textarea>
              </div>

              <button
                disabled={status === "Sending..."}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {status === "Sending..."
                  ? "Sending Message..."
                  : "Send Message"}
                {!status && (
                  <Send
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

              {status && (
                <div
                  className={`p-4 rounded-lg text-sm font-medium text-center ${
                    status.includes("Success")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* 3. MAP SECTION (NEWLY ADDED) */}
      <div className="w-full h-[450px] bg-slate-100 border-y border-slate-200">
        <iframe
          width="100%"
          height="100%"
          title="Blue Academy Location"
          src="https://maps.google.com/maps?q=International%20Finance%20Center%20Vesu%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
        ></iframe>
      </div>

      {/* 4. FAQ SECTION */}
      <div className="px-6 pb-24 mx-auto mt-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500">
            Quick answers to questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              q: "Corporate Training?",
              a: "We offer customized corporate training programs tailored to your company's tech stack and goals.",
            },
            {
              q: "Refund Policy?",
              a: "Application fee is not refundable. we shall refund the Program fee within 7 days after starting the course.",
            },
            {
              q: "Certification Support?",
              a: "Yes, We shall help all learners to get certification as per their course.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-8 transition-shadow bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-md"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-blue-50">
                <HelpCircle className="text-blue-600" size={20} />
              </div>
              <h4 className="mb-2 text-lg font-bold text-slate-900">{faq.q}</h4>
              <p className="text-sm leading-relaxed text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
