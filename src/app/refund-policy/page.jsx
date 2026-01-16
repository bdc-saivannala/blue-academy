import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-24 font-sans bg-slate-50">
      <div className="max-w-4xl p-8 mx-auto bg-white border shadow-sm md:p-12 rounded-2xl border-slate-100">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl text-slate-900">
          Cancellation & Refund Policy
        </h1>
        <p className="mb-8 text-sm italic text-slate-500">
          Last updated on Nov 17, 2025
        </p>

        <div className="space-y-6 leading-relaxed text-slate-600">
          <p>
            BLUE DATA CONSULTING AND IT SERVICES PRIVATE LIMITED believes in
            helping its customers as far as possible, and has therefore a
            liberal cancellation policy. Under this policy:
          </p>

          <ul className="pl-6 space-y-3 list-disc">
            <li>
              Cancellations will be considered only if the request is made
              within 7 days of placing the order. However, the cancellation
              request may not be entertained if the orders have been
              communicated to the vendors/merchants and they have initiated the
              process of shipping them.
            </li>
            <li>
              BLUE DATA CONSULTING AND IT SERVICES PRIVATE LIMITED does not
              accept cancellation requests for perishable items like flowers,
              eatables etc. However, refund/replacement can be made if the
              customer establishes that the quality of product delivered is not
              good.
            </li>
            <li>
              In case of receipt of damaged or defective items please report the
              same to our Customer Service team. The request will, however, be
              entertained once the merchant has checked and determined the same
              at his own end. This should be reported within 7 days of receipt
              of the products.
            </li>
            <li>
              In case you feel that the product received is not as shown on the
              site or as per your expectations, you must bring it to the notice
              of our customer service within 7 days of receiving the product.
              The Customer Service Team after looking into your complaint will
              take an appropriate decision.
            </li>
            <li>
              In case of complaints regarding products that come with a warranty
              from manufacturers, please refer the issue to them.
            </li>
            <li>
              In case of any Refunds approved by the BLUE DATA CONSULTING AND IT
              SERVICES PRIVATE LIMITED, it'll take 6-8 days for the refund to be
              processed to the end customer.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
