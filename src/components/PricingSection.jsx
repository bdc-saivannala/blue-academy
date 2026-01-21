"use client";
import React, { useState } from "react";
import {
  Currency,
  FileText,
  GraduationCap,
  Check,
  Calculator,
  Landmark,
  CreditCard,
  Smartphone,
  Wallet,
  ArrowRight,
  Phone,
  X, // Added X for closing modal
  Loader2, // Added for loading spinner
} from "lucide-react";

export default function PricingSection({ course }) {
  const [loading, setLoading] = useState(false);

  // --- NEW STATE: Modal & Form ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null); // Stores amount/desc while form is filled
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // 🔴 CRITICAL FIX: If course is missing, show a loading state
  if (!course || !course.fee) {
    return (
      <section className="py-12 text-center bg-slate-50">
        <p className="text-slate-500 animate-pulse">
          Loading pricing options...
        </p>
      </section>
    );
  }

  const getFee = () => {
    const val = course.fee ? course.fee.toString().replace(/,/g, "") : "0";
    return parseInt(val) || 0;
  };
  const currentFee = getFee();

  // --- STEP 1: User Clicks "Enroll" -> Open Modal ---
  const handleInitiate = (amount, description) => {
    setPendingOrder({ amount, description });
    setIsModalOpen(true);
  };

  // --- STEP 2: User Submits Form -> Save to Backend -> Trigger Razorpay ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. SAVE TO BACKEND (Create "Initiated" Record)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            course_id: course._id || course.slug,
            course_title: course.title,
            amount: pendingOrder.amount,
            status: "Initiated",
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        // 2. GET THE ENROLLMENT ID (Important!)
        const enrollmentId = data.data._id;

        // 3. TRIGGER PAYMENT with this ID
        await handlePayment(
          pendingOrder.amount,
          pendingOrder.description,
          enrollmentId
        );
        setIsModalOpen(false);
      } else {
        alert("Could not save details. Please try again.");
      }
    } catch (error) {
      console.error("Enrollment Error:", error);
      alert("Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 3: Razorpay Payment Logic ---
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- STEP 3: Razorpay Payment Logic (UPDATED) ---
  const handlePayment = async (amount, description, enrollmentId) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_j4ZAeykcjIt2c9", // Your Key
      amount: amount * 100,
      currency: "INR",
      name: "Blue Academy",
      description: description,
      image: "/Standard logo -BA.png",
      prefill: {
        name: candidate.name,
        email: candidate.email,
        contact: candidate.phone,
      },
      // ✅ NEW: Handle Success Response
      handler: async function (response) {
        try {
          // 4. CALL BACKEND TO CONFIRM PAYMENT
          const verifyRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/enrollments/confirm`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                enrollmentId: enrollmentId, // The ID we got earlier
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            alert(
              `Success! Enrollment Confirmed. Payment ID: ${response.razorpay_payment_id}`
            );
            // Optional: Redirect to a "Thank You" page here
            // window.location.href = "/thank-you";
          } else {
            alert(
              "Payment successful, but verification failed. Please contact support."
            );
          }
        } catch (err) {
          console.error("Verification Error", err);
          alert("Network error verifying payment.");
        }
      },
      theme: {
        color: "#2563EB",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {/* --- PRICING SECTION --- */}
      <section>
        <div className="mb-12">
          <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
            <Currency size={24} className="text-blue-600" />
            Transparent Pricing
          </h2>
          <p className="mx-auto text-sm text-slate-600">
            Invest in your future with our flexible payment options and
            exclusive scholarship benefits
          </p>
        </div>

        <div className="bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
              {/* Card 1: Application Fee */}
              <div className="relative p-8 transition-shadow bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg">
                <div className="mb-4">
                  <FileText className="w-12 h-12 mb-4 text-blue-500" />
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    Application Fee
                  </h3>
                  <p className="text-sm text-slate-600">
                    One-time non-refundable fee
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    ₹2,000
                  </span>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleInitiate(2000, "Application Fee")}
                    className="w-full px-4 py-3 font-medium transition-colors rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Start Application
                  </button>
                </div>
              </div>

              {/* Card 2: Program Fee (Featured) */}
              <div className="relative p-8 text-white transform shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl md:scale-105">
                <div className="mb-4">
                  <GraduationCap className="w-12 h-12 mb-4 text-white/90" />
                  <h3 className="mb-2 text-xl font-semibold">Program Fee</h3>
                  <p className="text-sm text-blue-100">
                    Complete program access
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-blue-200 line-through">
                      ₹{(currentFee * 1.3).toLocaleString()}
                    </span>
                    <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                      SAVE 30%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ₹{currentFee.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-blue-200">
                    *18% GST extra as applicable
                  </p>
                </div>
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <Check className="w-4 h-4" />
                    <span>Industry-recognized certification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <Check className="w-4 h-4" />
                    <span>Lifetime access to materials</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <Check className="w-4 h-4" />
                    <span>Placement assistance included</span>
                  </div>
                </div>
                <button
                  onClick={() => handleInitiate(currentFee, "Full Program Fee")}
                  className="w-full px-4 py-3 font-bold text-blue-700 transition-colors bg-white rounded-lg shadow-lg hover:bg-blue-50"
                >
                  Enroll Now
                </button>
              </div>

              {/* Card 3: EMI Options */}
              <div className="relative p-8 transition-shadow bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg">
                <div className="mb-4">
                  <Calculator className="w-12 h-12 mb-4 text-green-500" />
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">
                    Easy EMI
                  </h3>
                  <p className="text-sm text-slate-600">
                    Flexible payment plans
                  </p>
                </div>
                {(() => {
                  const gstAmount = currentFee * 0.18;
                  const totalAmount = currentFee + gstAmount;
                  const emi12 =
                    Math.round(
                      (totalAmount *
                        (0.15 / 12) *
                        Math.pow(1 + 0.15 / 12, 12)) /
                        (Math.pow(1 + 0.15 / 12, 12) - 1)
                    ) || 0;
                  return (
                    <div className="mb-6">
                      <p className="mb-2 text-sm text-slate-600">
                        Starting from
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-slate-900">
                          ₹{emi12.toLocaleString()}
                        </span>
                        <span className="text-slate-600">/month</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Based on ₹{totalAmount.toLocaleString()} (incl. GST)
                      </p>
                    </div>
                  );
                })()}
                <button
                  onClick={() => handleInitiate(500, "EMI Down Payment")} // Example: Initiate EMI discussion
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
                >
                  <Calculator className="w-4 h-4" /> Get Personalized EMI Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CANDIDATE INFO MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                Candidate Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="p-4 mb-4 text-sm text-blue-700 border border-blue-100 rounded-lg bg-blue-50">
                You are about to pay{" "}
                <strong>₹{pendingOrder?.amount?.toLocaleString()}</strong> for{" "}
                <strong>{course.title}</strong>.
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase text-slate-500">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={candidate.name}
                  onChange={(e) =>
                    setCandidate({ ...candidate, name: e.target.value })
                  }
                  className="w-full px-4 py-3 font-medium border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase text-slate-500">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={candidate.email}
                  onChange={(e) =>
                    setCandidate({ ...candidate, email: e.target.value })
                  }
                  className="w-full px-4 py-3 font-medium border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase text-slate-500">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={candidate.phone}
                  onChange={(e) =>
                    setCandidate({ ...candidate, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 font-medium border rounded-lg bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 py-4 mt-4 font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <span className="flex items-center gap-2">
                    Proceed to Payment <ArrowRight size={18} />
                  </span>
                )}
              </button>

              <p className="text-xs text-center text-slate-400">
                Your details are secure. We'll redirect you to Payment.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}