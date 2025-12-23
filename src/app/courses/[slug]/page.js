import React from "react";
import Link from "next/link";
import {
  Star,
  Globe,
  Clock,
  BarChart,
  CheckCircle,
  PlayCircle,
  MonitorPlay,
  FileText,
  Award,
  Smartphone,
  ChevronDown,
  Users,
  Lock,
} from "lucide-react";

// Components
import ApplicationForm from "@/components/ApplicationForm";

// --- 1. FETCH DATA ---
async function getCourse(slug) {
  try {
    const cleanSlug = decodeURIComponent(slug);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${cleanSlug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) return <div className="py-20 text-center">Course Not Found</div>;

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900">
      {/* =========================================
          1. HERO HEADER (Dark/Light Hybrid)
      ========================================= */}
      <div className="bg-[#1C1D1F] text-white pt-24 pb-12">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* LEFT: Course Info (Span 2 cols) */}
            <div className="space-y-4 lg:col-span-2">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 mb-4 text-sm font-bold tracking-wide text-blue-300 uppercase">
                <Link href="/" className="hover:underline">
                  Home
                </Link>{" "}
                /
                <Link href="/courses" className="hover:underline">
                  Courses
                </Link>{" "}
                /<span className="text-white truncate">{course.title}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
                {course.title}
              </h1>

              {/* Subtitle */}
              <div
                className="text-lg leading-relaxed text-slate-300 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: course.subtitle?.replace(/<[^>]+>/g, ""),
                }}
              />

              {/* Ratings & Meta */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">
                <div className="flex items-center gap-1 font-bold text-yellow-400">
                  <span className="text-base">{course.rating}</span>
                  <div className="flex">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <span className="ml-1 text-blue-300 underline cursor-pointer">
                    ({course.reviews?.length || 0} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <Users size={16} /> 15,000+ students
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-white">
                <div className="flex items-center gap-2">
                  <Globe size={16} /> English
                </div>
                <div className="flex items-center gap-2">
                  <BarChart size={16} /> {course.level || "Beginner to Pro"}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> Last updated{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              {/* Badges */}
              {course.badges && course.badges.length > 0 && (
                <div className="flex gap-2 pt-2">
                  {course.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-bold bg-yellow-400 rounded text-slate-900"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Empty Col (Placeholder for Floating Card) */}
            <div className="hidden lg:block lg:col-span-1"></div>
          </div>
        </div>
      </div>

      {/* =========================================
          2. MAIN CONTENT LAYOUT
      ========================================= */}
      <div className="relative px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* --- LEFT COLUMN (Course Details) --- */}
          <div className="py-10 space-y-12 lg:col-span-2">
            {/* WHAT YOU'LL LEARN */}
            <section className="p-6 border rounded-lg border-slate-200 bg-slate-50/50">
              <h2 className="mb-6 text-xl font-bold text-slate-900">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Hero Features */}
                {course.heroFeatures &&
                  course.heroFeatures.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-slate-600 mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                {/* Skills */}
                {course.skills &&
                  course.skills.map((skill, i) => (
                    <div key={`skill-${i}`} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-slate-600 mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-slate-700">
                        Master {skill}
                      </span>
                    </div>
                  ))}
              </div>
            </section>

            {/* TARGET AUDIENCE */}
            {course.targetAudience && course.targetAudience.length > 0 && (
              <section>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Who this course is for
                </h2>
                <ul className="space-y-2">
                  {course.targetAudience.map((audience, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-slate-600 mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-slate-700">{audience}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* COURSE CONTENT (Curriculum) */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Course Content
              </h2>
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                <span>• {course.curriculum?.length || 0} sections</span>
                <span>• {course.duration} total length</span>
              </div>

              <div className="overflow-hidden border divide-y rounded-lg border-slate-200 divide-slate-200">
                {course.curriculum &&
                  course.curriculum.map((module, i) => (
                    <div key={module._id || i} className="group">
                      <div className="flex items-center justify-between p-4 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100">
                        <div className="flex items-center gap-3 font-bold text-slate-800">
                          <ChevronDown
                            size={18}
                            className="transition-transform text-slate-500 group-hover:rotate-180"
                          />
                          {module.title}
                        </div>
                        <span className="text-xs text-slate-500">
                          3 lectures • 45m
                        </span>
                      </div>
                      {module.details && (
                        <div className="p-4 space-y-3 bg-white">
                          <div className="flex items-center justify-between text-sm text-slate-600">
                            <div className="flex items-center gap-3">
                              <MonitorPlay
                                size={16}
                                className="text-slate-400"
                              />
                              {module.details}
                            </div>
                            <span className="text-slate-400">10:00</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </section>

            {/* REQUIREMENTS */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Requirements
              </h2>
              <div
                className="text-sm prose prose-slate max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: course.prerequisites }}
              />
            </section>

            {/* JOB ROLES */}
            {course.jobRoles && course.jobRoles.length > 0 && (
              <section>
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  Career Opportunities
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {course.jobRoles.map((job, i) => (
                    <div
                      key={job._id || i}
                      className="p-4 border rounded-lg border-slate-200 bg-slate-50/50"
                    >
                      <h3 className="font-bold text-slate-900">{job.role}</h3>
                      <p className="text-sm text-slate-600">
                        Average Salary: {job.salary}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Market Demand: {job.demand}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* INSTRUCTOR */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Instructor
              </h2>
              {course.instructors &&
                course.instructors.map((inst, i) => (
                  <div key={inst._id || i} className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={inst.image}
                        alt={inst.name}
                        className="object-cover w-16 h-16 border-2 rounded-full border-slate-100"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-blue-600 underline cursor-pointer">
                          {inst.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {inst.role} at {inst.company}
                        </p>
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-slate-600">
                      {inst.name} is a top-rated instructor with extensive
                      experience in the industry. He has taught thousands of
                      students and helped them land jobs at top tech companies.
                    </p>
                  </div>
                ))}
            </section>

            {/* REVIEWS / SUCCESS STORIES */}
            <section>
              <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-slate-900">
                <Star size={24} className="text-yellow-400 fill-yellow-400" />
                {course.rating} course rating
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {course.reviews &&
                  course.reviews.map((review, i) => (
                    <div
                      key={review._id || i}
                      className="p-6 border-t border-slate-200"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={review.image}
                          className="w-10 h-10 rounded-full bg-slate-200"
                          alt={review.name}
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {review.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {review.role}
                          </p>
                          <div className="flex text-yellow-400">
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-sm leading-relaxed text-slate-600"
                        dangerouslySetInnerHTML={{ __html: review.text }}
                      />
                    </div>
                  ))}
              </div>
            </section>

            {/* FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <section>
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {course.faqs.map((faq, i) => (
                    <div
                      key={faq._id || i}
                      className="p-4 border rounded-lg border-slate-200"
                    >
                      <h3 className="mb-2 font-bold text-slate-900">{faq.q}</h3>
                      <div
                        className="text-sm text-slate-600"
                        dangerouslySetInnerHTML={{ __html: faq.a }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* --- RIGHT COLUMN (FLOATING SIDEBAR) --- */}
          <div className="relative lg:col-span-1">
            <div className="sticky z-20 mb-5 top-24 -mt-80">
              {/* Negative margin pulls it up into Hero area */}
              {/* 1. VIDEO PREVIEW CARD */}
              <div className="mb-6 overflow-hidden bg-white border rounded-lg shadow-xl border-slate-200">
                <div className="relative h-48 cursor-pointer bg-slate-900 group">
                  <img
                    src={course.image}
                    alt="Preview"
                    className="object-cover w-full h-full transition-opacity opacity-60 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-16 h-16 transition-transform bg-white rounded-full shadow-lg group-hover:scale-110">
                      <PlayCircle
                        size={32}
                        className="text-slate-900 fill-slate-900"
                      />
                    </div>
                  </div>
                  <p className="absolute w-full text-sm font-bold text-center text-white bottom-4">
                    Preview this course
                  </p>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-extrabold text-slate-900">
                      ₹{course.fee}
                    </span>
                    <span className="text-lg line-through text-slate-400">
                      ₹{Math.floor(course.fee * 5)}
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      80% OFF
                    </span>
                  </div>

                  <p className="flex items-center gap-1 mb-4 text-sm font-bold text-red-600">
                    <Clock size={16} /> 1 day left at this price!
                  </p>

                  {course.nextBatch && (
                    <p className="mb-4 text-sm text-slate-600">
                      <span className="font-bold">Next Batch:</span>{" "}
                      {course.nextBatch}
                    </p>
                  )}

                  <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-800 text-white font-bold text-lg rounded mb-3 transition-colors">
                    Add to cart
                  </button>
                  <button className="w-full py-3.5 bg-white border-2 border-slate-900 text-slate-900 font-bold text-lg rounded hover:bg-slate-50 hover:text-blue-600 hover:border-blue-800 transition-colors">
                    Buy now
                  </button>

                  <p className="mt-3 text-xs text-center text-slate-500">
                    30-Day Money-Back Guarantee
                  </p>

                  <div className="mt-6 space-y-3 text-sm text-slate-600">
                    <p className="font-bold text-slate-900">
                      This course includes:
                    </p>
                    <div className="flex items-center gap-2">
                      <MonitorPlay size={16} /> {course.duration} on-demand
                      video
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText size={16} /> {course.curriculum?.length || 0}{" "}
                      sections
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} /> Access on mobile and TV
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} /> Certificate of completion
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 mt-6 text-sm font-bold underline border-t cursor-pointer border-slate-100 text-slate-900">
                    <span>Share</span>
                    <span>Gift this course</span>
                    <span>Apply Coupon</span>
                  </div>
                </div>
              </div>
              {/* 2. CORPORATE TRAINING BOX */}
              <div className="p-6 bg-white border rounded-lg shadow-sm border-slate-200">
                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  Training 5 or more people?
                </h3>
                <p className="mb-4 text-sm text-slate-600">
                  Get your team access to 25,000+ top courses anytime, anywhere.
                </p>
                <button className="w-full py-3 text-sm font-bold transition-colors border rounded border-slate-900 text-slate-900 hover:bg-slate-50">
                  Try Blue Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
