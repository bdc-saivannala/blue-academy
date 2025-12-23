"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/ImageUpload"; // <--- 1. IMPORT IMAGE UPLOAD

// Dynamic import for CKEditor
const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-32 border rounded-lg bg-slate-50 animate-pulse border-slate-200">
      Loading Editor...
    </div>
  ),
});

export default function EditCourse({ params }) {
  const router = useRouter();
  // Unwrap params for Next.js 15
  const { slug } = React.use(params);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [courseId, setCourseId] = useState(null); // We need the ID for the PUT request

  // --- STATE ---
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    slug: "",
    category: "",
    image: "",
    rating: "",
    duration: "",
    fee: "",
    nextBatch: "",
    badges: "",
    heroFeatures: "",
    skills: "",
    targetAudience: "",
    subtitle: "",
    prerequisites: "",
  });

  const [curriculum, setCurriculum] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // --- 1. FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`
        );
        if (!res.ok) throw new Error("Course not found");

        const data = await res.json();

        // Populate State
        setCourseId(data._id); // Save ID for update
        setBasicInfo({
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "",
          image: data.image || "",
          rating: data.rating || "",
          duration: data.duration || "",
          fee: data.fee || "",
          nextBatch: data.nextBatch || "",
          badges: data.badges ? data.badges.join(", ") : "",
          heroFeatures: data.heroFeatures ? data.heroFeatures.join(", ") : "",
          skills: data.skills ? data.skills.join(", ") : "",
          targetAudience: data.targetAudience
            ? data.targetAudience.join(", ")
            : "",
          subtitle: data.subtitle || "",
          prerequisites: data.prerequisites || "",
        });

        setCurriculum(data.curriculum || []);
        setInstructors(data.instructors || []);
        setJobRoles(data.jobRoles || []);
        setReviews(data.reviews || []);
        setFaqs(data.faqs || []);

        setLoading(false);
      } catch (err) {
        alert("Failed to load course data");
        router.push("/admin");
      }
    };

    fetchCourse();
  }, [slug, router]);

  // --- HANDLERS ---
  const handleBasicChange = (e) =>
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

  const handleEditorChange = (field, data) =>
    setBasicInfo((prev) => ({ ...prev, [field]: data }));

  // --- NEW: Handle Hero Image Upload ---
  const handleHeroImageChange = (url) =>
    setBasicInfo((prev) => ({ ...prev, image: url }));

  const updateItem = (setFunc, index, field, value) => {
    setFunc((prev) => {
      const newData = [...prev];
      newData[index][field] = value;
      return newData;
    });
  };
  const addItem = (setFunc, template) => setFunc((prev) => [...prev, template]);
  const removeItem = (setFunc, index) =>
    setFunc((prev) => prev.filter((_, i) => i !== index));

  // --- SUBMIT UPDATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Updating...");

    try {
      const payload = {
        ...basicInfo,
        badges: basicInfo.badges
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        heroFeatures: basicInfo.heroFeatures
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        skills: basicInfo.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        targetAudience: basicInfo.targetAudience
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        curriculum,
        instructors,
        jobRoles,
        reviews,
        faqs,
      };

      // USE 'PUT' REQUEST TO UPDATE
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("Course Updated Successfully!");
        router.push("/admin");
      } else {
        const data = await res.json();
        alert(`Error: ${data.message}`);
        setStatus("Error");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server Error");
    }
  };

  if (loading)
    return (
      <div className="p-10 font-bold text-center text-slate-500">
        Loading Course Data...
      </div>
    );

  return (
    <div className="relative max-w-5xl px-6 pb-32 mx-auto">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-6 mb-8 -mx-6 transition-all border-b shadow-sm bg-slate-50/95 backdrop-blur-md border-slate-200">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 font-bold transition-colors text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={20} /> Cancel
        </button>
        <h1 className="text-3xl font-bold text-slate-900">Edit Course</h1>
        <div className="w-24"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* --- 1. ESSENTIALS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="pb-4 mb-6 text-lg font-bold tracking-wide text-blue-600 uppercase border-b">
            1. Course Essentials
          </h2>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Course Title
              </label>
              <input
                name="title"
                value={basicInfo.title}
                onChange={handleBasicChange}
                required
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Slug (URL)
              </label>
              <input
                name="slug"
                value={basicInfo.slug}
                onChange={handleBasicChange}
                required
                className="input-field"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label className="text-xs font-bold uppercase text-slate-500">
              Short Description
            </label>
            <div className="overflow-hidden border rounded-lg border-slate-200">
              <CustomEditor
                data={basicInfo.subtitle}
                onChange={(d) => handleEditorChange("subtitle", d)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Category
              </label>
              <input
                name="category"
                value={basicInfo.category}
                onChange={handleBasicChange}
                required
                className="input-field"
              />
            </div>

            {/* REPLACED: HERO IMAGE UPLOAD */}
            <div className="flex flex-col gap-1">
              <ImageUpload
                label="Hero Image"
                value={basicInfo.image}
                onChange={handleHeroImageChange}
              />
            </div>
          </div>
        </div>

        {/* --- 2. PRICING & STATS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="pb-4 mb-6 text-lg font-bold tracking-wide text-blue-600 uppercase border-b">
            2. Pricing & Stats
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Duration
              </label>
              <input
                name="duration"
                value={basicInfo.duration}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Fee
              </label>
              <input
                name="fee"
                value={basicInfo.fee}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Rating
              </label>
              <input
                name="rating"
                value={basicInfo.rating}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Next Batch
              </label>
              <input
                name="nextBatch"
                value={basicInfo.nextBatch}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* --- 3. HIGHLIGHTS & AUDIENCE --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="pb-4 mb-6 text-lg font-bold tracking-wide text-blue-600 uppercase border-b">
            3. Highlights & Audience
          </h2>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Badges
              </label>
              <input
                name="badges"
                value={basicInfo.badges}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Hero Features
              </label>
              <input
                name="heroFeatures"
                value={basicInfo.heroFeatures}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Skills
              </label>
              <input
                name="skills"
                value={basicInfo.skills}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-slate-500">
                Target Audience
              </label>
              <input
                name="targetAudience"
                value={basicInfo.targetAudience}
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-slate-500">
              Prerequisites
            </label>
            <div className="overflow-hidden border rounded-lg border-slate-200">
              <CustomEditor
                data={basicInfo.prerequisites}
                onChange={(d) => handleEditorChange("prerequisites", d)}
              />
            </div>
          </div>
        </div>

        {/* --- 4. CURRICULUM --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 text-lg font-bold tracking-wide text-blue-600 uppercase">
              4. Curriculum
            </h2>
            <button
              type="button"
              onClick={() => addItem(setCurriculum, { title: "", details: "" })}
              className="btn-add"
            >
              <Plus size={16} /> Add Module
            </button>
          </div>
          <div className="space-y-4">
            {curriculum.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 border bg-slate-50 rounded-xl border-slate-100"
              >
                <div className="flex-1 space-y-3">
                  <input
                    placeholder="Module Title"
                    className="font-bold input-field"
                    value={item.title}
                    onChange={(e) =>
                      updateItem(setCurriculum, idx, "title", e.target.value)
                    }
                  />
                  <textarea
                    placeholder="Topics Covered"
                    className="input-field"
                    rows="2"
                    value={item.details}
                    onChange={(e) =>
                      updateItem(setCurriculum, idx, "details", e.target.value)
                    }
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(setCurriculum, idx)}
                  className="mt-2 btn-delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. INSTRUCTORS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 text-lg font-bold tracking-wide text-blue-600 uppercase">
              5. Instructors
            </h2>
            <button
              type="button"
              onClick={() =>
                addItem(setInstructors, {
                  name: "",
                  role: "",
                  company: "",
                  image: "",
                })
              }
              className="btn-add"
            >
              <Plus size={16} /> Add Instructor
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {instructors.map((item, idx) => (
              <div key={idx} className="relative pt-8 repeater-card">
                <span className="absolute top-2 left-4 text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  Instructor #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(setInstructors, idx)}
                  className="absolute top-2 right-2 btn-delete-small"
                >
                  <Trash2 size={14} />
                </button>
                <div className="w-full space-y-3">
                  <input
                    placeholder="Name"
                    className="input-field"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(setInstructors, idx, "name", e.target.value)
                    }
                  />
                  <input
                    placeholder="Role"
                    className="input-field"
                    value={item.role}
                    onChange={(e) =>
                      updateItem(setInstructors, idx, "role", e.target.value)
                    }
                  />
                  <input
                    placeholder="Company"
                    className="input-field"
                    value={item.company}
                    onChange={(e) =>
                      updateItem(setInstructors, idx, "company", e.target.value)
                    }
                  />

                  {/* REPLACED: INSTRUCTOR IMAGE UPLOAD */}
                  <ImageUpload
                    label="Photo"
                    value={item.image}
                    onChange={(url) =>
                      updateItem(setInstructors, idx, "image", url)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 6. JOB ROLES --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 text-lg font-bold tracking-wide text-blue-600 uppercase">
              6. Job Opportunities
            </h2>
            <button
              type="button"
              onClick={() =>
                addItem(setJobRoles, { role: "", salary: "", demand: "High" })
              }
              className="btn-add"
            >
              <Plus size={16} /> Add Job
            </button>
          </div>
          <div className="space-y-4">
            {jobRoles.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 border bg-slate-50 rounded-xl border-slate-100"
              >
                <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                  <input
                    placeholder="Role"
                    className="input-field"
                    value={item.role}
                    onChange={(e) =>
                      updateItem(setJobRoles, idx, "role", e.target.value)
                    }
                  />
                  <input
                    placeholder="Salary"
                    className="input-field"
                    value={item.salary}
                    onChange={(e) =>
                      updateItem(setJobRoles, idx, "salary", e.target.value)
                    }
                  />
                  <select
                    className="bg-white input-field"
                    value={item.demand}
                    onChange={(e) =>
                      updateItem(setJobRoles, idx, "demand", e.target.value)
                    }
                  >
                    <option>High</option>
                    <option>Very High</option>
                    <option>Moderate</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(setJobRoles, idx)}
                  className="btn-delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- 7. REVIEWS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 text-lg font-bold tracking-wide text-blue-600 uppercase">
              7. Student Reviews
            </h2>
            <button
              type="button"
              onClick={() =>
                addItem(setReviews, { name: "", role: "", text: "", image: "" })
              }
              className="btn-add"
            >
              <Plus size={16} /> Add Review
            </button>
          </div>
          <div className="space-y-6">
            {reviews.map((item, idx) => (
              <div key={idx} className="relative pt-10 repeater-card">
                <div className="absolute top-0 left-0 flex items-center justify-between w-full px-4 py-2 border-b rounded-t-lg border-slate-100 bg-slate-50">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    Review #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(setReviews, idx)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                    <input
                      placeholder="Student Name"
                      className="input-field"
                      value={item.name}
                      onChange={(e) =>
                        updateItem(setReviews, idx, "name", e.target.value)
                      }
                    />
                    <input
                      placeholder="Designation"
                      className="input-field"
                      value={item.role}
                      onChange={(e) =>
                        updateItem(setReviews, idx, "role", e.target.value)
                      }
                    />

                    {/* REPLACED: REVIEW IMAGE UPLOAD */}
                    <div className="md:col-span-1">
                      <ImageUpload
                        label="Student Photo"
                        value={item.image}
                        onChange={(url) =>
                          updateItem(setReviews, idx, "image", url)
                        }
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden border rounded-lg border-slate-200">
                    <CustomEditor
                      data={item.text}
                      onChange={(d) => updateItem(setReviews, idx, "text", d)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 8. FAQS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 text-lg font-bold tracking-wide text-blue-600 uppercase">
              8. FAQs
            </h2>
            <button
              type="button"
              onClick={() => addItem(setFaqs, { q: "", a: "" })}
              className="btn-add"
            >
              <Plus size={16} /> Add FAQ
            </button>
          </div>
          <div className="space-y-6">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="relative p-6 border bg-slate-50 rounded-xl border-slate-100"
              >
                <input
                  placeholder="Question?"
                  className="w-full mb-4 font-bold input-field"
                  value={item.q}
                  onChange={(e) =>
                    updateItem(setFaqs, idx, "q", e.target.value)
                  }
                />
                <div className="overflow-hidden border rounded-lg border-slate-200">
                  <CustomEditor
                    data={item.a}
                    onChange={(d) => updateItem(setFaqs, idx, "a", d)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(setFaqs, idx)}
                  className="absolute top-2 right-2 btn-delete-small"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-50 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:ml-64">
          <button
            type="submit"
            className="flex items-center gap-3 px-12 py-3 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 hover:-translate-y-1"
          >
            <Save size={24} /> {status || "Update Course"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          background: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #eff6ff;
          color: #2563eb;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          transition: background 0.2s;
        }
        .btn-add:hover {
          background: #dbeafe;
        }
        .btn-delete {
          color: #ef4444;
          padding: 0.5rem;
          background: #fee2e2;
          border-radius: 0.5rem;
        }
        .btn-delete:hover {
          background: #fecaca;
        }
        .btn-delete-small {
          color: #ef4444;
          padding: 0.25rem;
          background: white;
          border-radius: 9999px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .btn-delete-small:hover {
          color: #dc2626;
          background: #fee2e2;
        }
        .repeater-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          transition: border-color 0.2s;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .repeater-card:hover {
          border-color: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
