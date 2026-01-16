import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-24 font-sans bg-slate-50">
      <div className="max-w-4xl p-8 mx-auto bg-white border shadow-sm md:p-12 rounded-2xl border-slate-100">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl text-slate-900">
          Shipping & Delivery Policy
        </h1>
        <p className="mb-8 text-sm italic text-slate-500">
          Last updated on Nov 17, 2025
        </p>

        <div className="space-y-6 leading-relaxed text-slate-600">
          <p>
            For International buyers, orders are shipped and delivered through
            registered international courier companies and/or International
            speed post only. For domestic buyers, orders are shipped through
            registered domestic courier companies and /or speed post only.
          </p>

          <p>
            Orders are shipped within <strong>0-7 days</strong> or as per the
            delivery date agreed at the time of order confirmation and
            delivering of the shipment subject to Courier Company / post office
            norms.
          </p>

          <p>
            BLUE DATA CONSULTING AND IT SERVICES PRIVATE LIMITED is not liable
            for any delay in delivery by the courier company / postal
            authorities and only guarantees to hand over the consignment to the
            courier company or postal authorities within 0-7 days from the date
            of the order and payment or as per the delivery date agreed at the
            time of order confirmation.
          </p>

          <p>
            Delivery of all orders will be to the address provided by the buyer.
            Delivery of our services will be confirmed on your mail ID as
            specified during registration.
          </p>

          <div className="p-6 mt-8 border border-blue-100 bg-blue-50 rounded-xl">
            <h3 className="mb-2 font-bold text-blue-900">Need Help?</h3>
            <p className="text-blue-800">
              For any issues in utilizing our services you may contact our
              helpdesk on <br />
              <span className="font-semibold">+91-9104445059</span> or{" "}
              <a
                href="mailto:contact@blueacademy.ai"
                className="underline hover:text-blue-600"
              >
                contact@blueacademy.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
