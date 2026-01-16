import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-24 font-sans bg-slate-50">
      <div className="max-w-4xl p-8 mx-auto bg-white border shadow-sm md:p-12 rounded-2xl border-slate-100">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl text-slate-900">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm italic text-slate-500">
          Last updated on Nov 17, 2025
        </p>

        <div className="space-y-8 leading-relaxed text-slate-600">
          {/* Intro */}
          <section>
            <p className="mb-4">
              This privacy policy sets out how BLUE DATA CONSULTING AND IT
              SERVICES PRIVATE LIMITED uses and protects any information that
              you give BLUE DATA CONSULTING AND IT SERVICES PRIVATE LIMITED when
              you visit their website and/or agree to purchase from them.
            </p>
            <p className="mb-4">
              BLUE DATA CONSULTING AND IT SERVICES PRIVATE LIMITED is committed
              to ensuring that your privacy is protected. Should we ask you to
              provide certain information by which you can be identified when
              using this website, and then you can be assured that it will only
              be used in accordance with this privacy statement.
            </p>
            <p>
              BLUE DATA CONSULTING AND IT SERVICES PRIVATE LIMITED may change
              this policy from time to time by updating this page. You should
              check this page from time to time to ensure that you adhere to
              these changes.
            </p>
          </section>

          {/* Collection */}
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-800">
              We may collect the following information:
            </h2>
            <ul className="pl-6 space-y-1 list-disc">
              <li>Name</li>
              <li>Contact information including email address</li>
              <li>
                Demographic information such as postcode, preferences and
                interests, if required
              </li>
              <li>
                Other information relevant to customer surveys and/or offers
              </li>
            </ul>
          </section>

          {/* Usage */}
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-800">
              What we do with the information we gather
            </h2>
            <p className="mb-2">
              We require this information to understand your needs and provide
              you with a better service, and in particular for the following
              reasons:
            </p>
            <ul className="pl-6 space-y-2 list-disc">
              <li>Internal record keeping.</li>
              <li>
                We may use the information to improve our products and services.
              </li>
              <li>
                We may periodically send promotional emails about new products,
                special offers or other information which we think you may find
                interesting using the email address which you have provided.
              </li>
              <li>
                From time to time, we may also use your information to contact
                you for market research purposes. We may contact you by email,
                phone, fax or mail. We may use the information to customise the
                website according to your interests.
              </li>
              <li>
                We are committed to ensuring that your information is secure. In
                order to prevent unauthorised access or disclosure we have put
                in suitable measures.
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-800">
              How we use cookies
            </h2>
            <p className="mb-4">
              A cookie is a small file which asks permission to be placed on
              your computer's hard drive. Once you agree, the file is added and
              the cookie helps analyze web traffic or lets you know when you
              visit a particular site. Cookies allow web applications to respond
              to you as an individual. The web application can tailor its
              operations to your needs, likes and dislikes by gathering and
              remembering information about your preferences.
            </p>
            <p className="mb-4">
              We use traffic log cookies to identify which pages are being used.
              This helps us analyze data about webpage traffic and improve our
              website in order to tailor it to customer needs. We only use this
              information for statistical analysis purposes and then the data is
              removed from the system.
            </p>
            <p className="mb-4">
              Overall, cookies help us provide you with a better website, by
              enabling us to monitor which pages you find useful and which you
              do not. A cookie in no way gives us access to your computer or any
              information about you, other than the data you choose to share
              with us.
            </p>
            <p>
              You can choose to accept or decline cookies. Most web browsers
              automatically accept cookies, but you can usually modify your
              browser setting to decline cookies if you prefer. This may prevent
              you from taking full advantage of the website.
            </p>
          </section>

          {/* Control */}
          <section>
            <h2 className="mb-3 text-xl font-bold text-slate-800">
              Controlling your personal information
            </h2>
            <p className="mb-3">
              You may choose to restrict the collection or use of your personal
              information in the following ways:
            </p>
            <ul className="pl-6 mb-4 space-y-2 list-disc">
              <li>
                Whenever you are asked to fill in a form on the website, look
                for the box that you can click to indicate that you do not want
                the information to be used by anybody for direct marketing
                purposes
              </li>
              <li>
                If you have previously agreed to us using your personal
                information for direct marketing purposes, you may change your
                mind at any time by writing to or emailing us at{" "}
                <a
                  href="mailto:contact@blueacademy.ai"
                  className="text-blue-600 hover:underline"
                >
                  contact@blueacademy.ai
                </a>
              </li>
            </ul>
            <p className="mb-4">
              We will not sell, distribute or lease your personal information to
              third parties unless we have your permission or are required by
              law to do so. We may use your personal information to send you
              promotional information about third parties which we think you may
              find interesting if you tell us that you wish this to happen.
            </p>
            <p>
              If you believe that any information we are holding on you is
              incorrect or incomplete, please write to{" "}
              <strong>
                706, INTERNATIONAL FINANCE CENTER, VIP ROAD, VESU, SURAT GUJARAT
                395007.
              </strong>{" "}
              or contact us at{" "}
              <span className="font-semibold">+91-9104445059</span> or{" "}
              <a
                href="mailto:contact@blueacademy.ai"
                className="text-blue-600 hover:underline"
              >
                contact@blueacademy.ai
              </a>{" "}
              as soon as possible. We will promptly correct any information
              found to be incorrect.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
