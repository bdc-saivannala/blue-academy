"use client";
import React, { useState, useMemo } from "react";
import {
  Phone,
  X,
  Loader2,
  Send,
  ChevronDown,
  Check,
  Search,
} from "lucide-react";
// 1. FIXED IMPORT: The library exports 'countries', not 'allCountries'
import { countries } from "country-codes-flags-phone-codes";

export default function InstantCall() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- DROPDOWN STATES ---
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    country_code: "+91", // Default Code
    phone_number: "",
    interest: "",
  });

  // 2. Format the imported data
  // We map the library's 'dialCode' to our 'code' property
  const countryList = useMemo(() => {
    // The library might return undefined for some entries, so we filter them if needed
    if (!countries) return [];

    return countries.map((country) => ({
      name: country.name,
      flag: country.flag,
      code: country.dialCode,
    }));
  }, []);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    return countryList.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.includes(searchQuery),
    );
  }, [searchQuery, countryList]);

  // Get current selected country details
  const selectedCountry = useMemo(() => {
    return (
      countryList.find((c) => c.code === formData.country_code) ||
      countryList.find((c) => c.code === "+91") || { flag: "🌍", code: "+91" }
    );
  }, [formData.country_code, countryList]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountrySelect = (code) => {
    setFormData({ ...formData, country_code: code });
    setShowCountryDropdown(false);
    setSearchQuery(""); // Reset search after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhoneNumber = `${formData.country_code}${formData.phone_number}`;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        const vapiPayload = {
          assistantId: "ae81a47b-cd38-40c9-b1c6-ed429bdb029f",
          assistantOverrides: {
            variableValues: {
              full_name: formData.full_name,
              email: formData.email,
              contact_number: fullPhoneNumber,
            },
          },
          customer: {
            number: fullPhoneNumber,
          },
          phoneNumberId: "ac6f5747-cad0-41da-abb8-a828282a534e",
        };

        await fetch("https://api.vapi.ai/call/phone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 9e769cc3-ecfc-47b1-82c3-803c7585f048",
          },
          body: JSON.stringify(vapiPayload),
        });

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setIsOpen(false);
          setFormData({
            full_name: "",
            email: "",
            country_code: "+91",
            phone_number: "",
            interest: "",
          });
        }, 3000);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form or triggering call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- FLOATING BUTTON --- */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 bottom-44 right-6 flex items-center justify-center p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${
          isOpen ? "bg-red-500 rotate-45" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Phone className="w-6 h-6 text-white group-hover:animate-pulse" />
            <span className="absolute right-full mr-8 top-1/2 -translate-y-1/2 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Instant Call
            </span>
          </div>
        )}
      </button>

      {/* --- MODAL FORM --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center sm:p-0">
          <div
            className="fixed inset-0 transition-opacity bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative z-50 w-full max-w-md overflow-hidden duration-300 bg-white shadow-2xl rounded-2xl sm:mb-20 sm:mr-6 animate-in slide-in-from-bottom-10 fade-in">
            {/* Header */}
            <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-blue-800">
              <h3 className="text-xl font-bold">Talk to a Specialist</h3>
              <p className="mt-1 text-sm text-blue-100">
                Fill the details below and we'll call you instantly.
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              {success ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-green-600 animate-in zoom-in">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
                    <Send size={32} />
                  </div>
                  <h4 className="text-xl font-bold">Request Sent!</h4>
                  <p className="mt-2 text-sm text-slate-500">
                    Our AI agent will call you 1-2 Minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-xs font-bold uppercase text-slate-500">
                      Full Name
                    </label>
                    <input
                      required
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 transition-all border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-bold uppercase text-slate-500">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 transition-all border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-bold uppercase text-slate-500">
                      Phone Number
                    </label>
                    <div className="flex gap-3">
                      {/* --- CUSTOM DROPDOWN COMPONENT --- */}
                      <div className="relative">
                        {/* 1. Trigger Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setShowCountryDropdown(!showCountryDropdown)
                          }
                          className="flex items-center justify-between min-w-[110px] h-full px-3 py-3 font-medium border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <span className="flex items-center gap-2">
                            {/* Display flag and code safely */}
                            <span className="text-xl leading-none">
                              {selectedCountry?.flag || "🌍"}
                            </span>
                            <span className="text-sm text-slate-700">
                              {formData.country_code}
                            </span>
                          </span>
                          <ChevronDown
                            size={14}
                            className={`ml-2 text-slate-400 transition-transform ${showCountryDropdown ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* 2. Dropdown Menu */}
                        {showCountryDropdown && (
                          <>
                            {/* Backdrop to close on click outside */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setShowCountryDropdown(false)}
                            />

                            <div className="absolute left-0 z-20 flex flex-col mt-2 overflow-hidden duration-200 bg-white border shadow-xl top-full w-72 border-slate-200 rounded-xl max-h-72 animate-in fade-in zoom-in-95">
                              {/* Search Bar */}
                              <div className="sticky top-0 p-2 border-b border-slate-100 bg-slate-50">
                                <div className="relative">
                                  <Search
                                    className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400"
                                    size={14}
                                  />
                                  <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search country..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                    className="w-full py-2 pr-3 text-sm bg-white border rounded-lg pl-9 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                              </div>

                              {/* List of Countries */}
                              <div className="flex-1 overflow-y-auto">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((country, index) => (
                                    <button
                                      key={`${country.code}-${index}`}
                                      type="button"
                                      onClick={() =>
                                        handleCountrySelect(country.code)
                                      }
                                      className="flex items-center w-full px-4 py-3 text-left transition-colors border-b hover:bg-slate-50 border-slate-50 last:border-0 group"
                                    >
                                      <span className="mr-3 text-xl">
                                        {country.flag}
                                      </span>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                                          {country.name}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                          {country.code}
                                        </span>
                                      </div>

                                      {formData.country_code ===
                                        country.code && (
                                        <Check
                                          size={16}
                                          className="ml-auto text-blue-600"
                                        />
                                      )}
                                    </button>
                                  ))
                                ) : (
                                  <div className="p-4 text-sm text-center text-slate-400">
                                    No country found
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/* --- END CUSTOM DROPDOWN --- */}

                      <input
                        required
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        className="flex-1 px-4 py-3 transition-all border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-bold uppercase text-slate-500">
                      Interest / Skill
                    </label>
                    <input
                      required
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      placeholder="Your Interest or Skill"
                      className="w-full px-4 py-3 transition-all border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center w-full gap-2 py-4 mt-2 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 active:scale-95 shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} /> Saving...
                      </>
                    ) : (
                      "Schedule Call Now"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
