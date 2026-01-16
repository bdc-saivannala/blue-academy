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
} from "lucide-react";

export default function PricingSection({ course }) {
  const [loading, setLoading] = useState(false);

  // 🔴 CRITICAL FIX: If course is missing, show a loading state instead of crashing
  if (!course || !course.fee) {
    return (
      <section className="py-12 text-center bg-slate-50">
        <p className="text-slate-500 animate-pulse">
          Loading pricing options...
        </p>
      </section>
    );
  }

  // Helper to safely get the fee number
  const getFee = () => {
    // Converts "4,999" or "4999" to integer 4999
    const val = course.fee ? course.fee.toString().replace(/,/g, "") : "0";
    return parseInt(val) || 0;
  };

  const currentFee = getFee();

  // Helper: Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handler: Trigger Payment
  const handlePayment = async (amount, description) => {
    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_j4ZAeykcjIt2c9", // ⚠️ REPLACE WITH YOUR ACTUAL KEY
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Blue Academy",
      description: description,
      image: "/Standard logo-BAW.png",
      handler: function (response) {
        alert(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "Student Name",
        email: "student@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#2563EB",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <section>
      <div className="mb-12">
        <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-900">
          <Currency size={24} className="text-blue-600" />
          Transparent Pricing
        </h2>
        <p className="mx-auto text-sm text-slate-600">
          Invest in your future with our flexible payment options and exclusive
          scholarship benefits
        </p>
      </div>
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
            {/* --- CARD 1: Application Fee --- */}
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
                  onClick={() => handlePayment(2000, "Application Fee")}
                  disabled={loading}
                  className="w-full px-4 py-3 font-medium transition-colors rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Start Application"}
                </button>
              </div>
            </div>

            {/* --- CARD 2: Program Fee (Featured) --- */}
            <div className="relative p-8 text-white transform shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl md:scale-105">
              <div className="absolute top-0 right-0 px-4 py-1 text-sm font-bold text-blue-900 bg-yellow-400 rounded-bl-xl rounded-tr-xl">
                SCHOLARSHIP APPLIED
              </div>
              <div className="mb-4">
                <GraduationCap className="w-12 h-12 mb-4 text-white/90" />
                <h3 className="mb-2 text-xl font-semibold">Program Fee</h3>
                <p className="text-sm text-blue-100">Complete program access</p>
              </div>

              {/* Price Calculation Logic */}
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
                onClick={() => handlePayment(currentFee, "Full Program Fee")}
                disabled={loading}
                className="w-full px-4 py-3 font-bold text-blue-700 transition-colors bg-white rounded-lg shadow-lg hover:bg-blue-50 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Enroll Now"}
              </button>
            </div>

            {/* --- CARD 3: EMI Options --- */}
            <div className="relative p-8 transition-shadow bg-white border-2 border-slate-200 rounded-2xl hover:shadow-lg">
              <div className="mb-4">
                <Calculator className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Easy EMI
                </h3>
                <p className="text-sm text-slate-600">Flexible payment plans</p>
              </div>

              {/* EMI Logic Block */}
              {(() => {
                const gstAmount = currentFee * 0.18;
                const totalAmount = currentFee + gstAmount;
                const interestRate = 0.15;

                const calculateEMI = (principal, months) => {
                  if (principal <= 0) return 0;
                  const monthlyRate = interestRate / 12;
                  const emi =
                    (principal *
                      monthlyRate *
                      Math.pow(1 + monthlyRate, months)) /
                    (Math.pow(1 + monthlyRate, months) - 1);
                  return Math.round(emi);
                };

                const emi3 = calculateEMI(totalAmount, 3);
                const emi12 = calculateEMI(totalAmount, 12);

                return (
                  <>
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

                    <div className="mb-6 space-y-3">
                      <div className="p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">
                            3 months
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            ₹{emi3.toLocaleString()}/mo
                          </span>
                        </div>
                      </div>

                      <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">
                              12 months
                            </span>
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          </div>
                          <span className="text-sm font-bold text-green-700">
                            ₹{emi12.toLocaleString()}/mo
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

              <button
                onClick={() => alert("Contacting our loan partner...")}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-green-700 transition-colors bg-green-100 rounded-lg hover:bg-green-200"
              >
                <Calculator className="w-4 h-4" />
                Get Personalized EMI Plan
              </button>
            </div>
          </div>

          {/* Payment Icons Section... */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-slate-600">
              Accepted Payment Methods
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-2 text-slate-700">
                <Landmark className="w-5 h-5" />
                <span className="text-sm font-medium">Net Banking</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium">Credit/Debit Cards</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">UPI Payments</span>
              </div>
            </div>
          </div>
          <div className="p-8 mt-16 text-center bg-slate-100 rounded-2xl">
            <h3 className="mb-4 text-xl font-bold text-slate-900">
              Ready to Start Your Journey?
            </h3>
            <p className="max-w-2xl mx-auto mb-6 text-slate-600">
              Join thousands of successful graduates who transformed their
              careers with our program
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="flex items-center gap-2 px-8 py-3 font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-8 py-3 font-bold transition-colors bg-white border-2 rounded-lg text-slate-700 hover:bg-slate-50 border-slate-200">
                <Phone className="w-4 h-4" /> Talk to Counselor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
