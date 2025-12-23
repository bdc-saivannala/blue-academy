"use client"; // Required for form interactivity

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  // State for Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
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
        }); // Reset form
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO HEADER (Dark Theme) */}
      <div className="bg-[#0B1120] text-white pt-32 pb-48 px-6 relative overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 mx-auto text-center max-w-7xl">
          <span className="block mb-3 text-xs font-bold tracking-widest text-blue-400 uppercase">
            We'd love to hear from you
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Let's Start a Conversation
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-400">
            Whether you are a student looking for course details or an
            enterprise looking for corporate training, our team is ready to
            help.
          </p>
        </div>
      </div>

      {/* 2. FLOATING CONTACT SECTION */}
      <div className="relative z-20 px-6 pb-20 mx-auto -mt-32 max-w-7xl">
        <div className="grid grid-cols-1 overflow-hidden bg-white border shadow-2xl rounded-3xl lg:grid-cols-12 border-slate-200">
          {/* LEFT: Contact Information (Blue Gradient) */}
          <div className="relative flex flex-col justify-between p-10 overflow-hidden text-white lg:col-span-5 bg-gradient-to-br from-blue-900 to-slate-900">
            {/* Decor Circle */}
            <div className="absolute w-40 h-40 rounded-full -bottom-10 -left-10 bg-blue-500/20 blur-2xl"></div>

            <div>
              <h3 className="mb-2 text-2xl font-bold">Contact Information</h3>
              <p className="mb-10 text-sm text-blue-200">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 transition-colors bg-white/10 rounded-xl shrink-0 group-hover:bg-blue-500">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wide text-blue-300 uppercase">
                      Phone
                    </p>
                    <p className="text-lg font-semibold">+91 98765 43210</p>
                    <p className="text-sm text-blue-200">+91 40 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 transition-colors bg-white/10 rounded-xl shrink-0 group-hover:bg-blue-500">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wide text-blue-300 uppercase">
                      Email
                    </p>
                    <p className="text-lg font-semibold">admissions@blue.com</p>
                    <p className="text-sm text-blue-200">support@blue.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 transition-colors bg-white/10 rounded-xl shrink-0 group-hover:bg-blue-500">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wide text-blue-300 uppercase">
                      Office
                    </p>
                    <p className="text-lg font-semibold">Blue Academy HQ</p>
                    <p className="text-sm leading-relaxed text-blue-200">
                      Financial District, Gachibowli,
                      <br />
                      Hyderabad, Telangana 500032
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-8 mt-12 text-sm text-blue-200 border-t border-white/10">
              <Clock size={16} />
              <span>Mon - Sat, 9:00 AM - 6:00 PM IST</span>
            </div>
          </div>

          {/* RIGHT: Contact Form (Connected to Backend) */}
          <div className="p-10 bg-white lg:col-span-7 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="group">
                  <label className="block mb-2 text-sm font-bold transition-colors text-slate-700 group-focus-within:text-blue-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    placeholder="John"
                  />
                </div>
                <div className="group">
                  <label className="block mb-2 text-sm font-bold transition-colors text-slate-700 group-focus-within:text-blue-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="group">
                  <label className="block mb-2 text-sm font-bold transition-colors text-slate-700 group-focus-within:text-blue-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="group">
                  <label className="block mb-2 text-sm font-bold transition-colors text-slate-700 group-focus-within:text-blue-600">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                    placeholder="+91 987..."
                  />
                </div>
              </div>

              <div className="group">
                <label className="block mb-2 text-sm font-bold transition-colors text-slate-700 group-focus-within:text-blue-600">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  disabled={status === "Sending..."}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "Sending..." ? "Sending..." : "Send Message"}{" "}
                  <Send size={20} />
                </button>
                {status && (
                  <p
                    className={`text-center mt-4 text-sm font-bold ${
                      status.includes("Success")
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. FAQ SECTION */}
      <div className="max-w-3xl px-6 pb-24 mx-auto mt-24">
        <h2 className="mb-10 text-3xl font-bold text-center text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Where is Blue Academy located?",
              a: "Our headquarters are in Hyderabad, Financial District. However, all our courses are available online globally.",
            },
            {
              q: "Can I get a refund if I cancel?",
              a: "Yes, we offer a 7-day no-questions-asked refund policy for all our self-paced courses.",
            },
            {
              q: "Do you provide corporate training?",
              a: "Absolutely. We have trained teams at 50+ Fortune 500 companies. Contact us for a custom quote.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-6 transition-shadow bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md"
            >
              <h4 className="flex items-center gap-3 mb-2 font-bold text-slate-900">
                <MessageSquare className="w-5 h-5 text-blue-500" /> {faq.q}
              </h4>
              <p className="pl-8 text-sm leading-relaxed text-slate-600">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
