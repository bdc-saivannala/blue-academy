// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
// import dynamic from "next/dynamic";
// import ImageUpload from "@/components/ImageUpload"; // <--- Import the component

// // Dynamic import for CKEditor
// const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
//   ssr: false,
//   loading: () => (
//     <div className="h-32 border rounded-lg bg-slate-50 animate-pulse border-slate-200">
//       Loading Editor...
//     </div>
//   ),
// });

// export default function CreateCourse() {
//   const router = useRouter();
//   const [status, setStatus] = useState("");

//   // --- 1. BASIC INFO STATE ---
//   const [basicInfo, setBasicInfo] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     image: "",
//     rating: "4.8",
//     duration: "6 Months",
//     fee: "₹ 50,000",
//     nextBatch: "",
//     badges: "",
//     heroFeatures: "",
//     skills: "",
//     targetAudience: "",
//     subtitle: "",
//     prerequisites: "",
//   });

//   // --- 2. DYNAMIC LISTS STATE ---
//   const [curriculum, setCurriculum] = useState([{ title: "", details: "" }]);
//   const [instructors, setInstructors] = useState([
//     { name: "", role: "", company: "", image: "" },
//   ]);
//   const [jobRoles, setJobRoles] = useState([
//     { role: "", salary: "", demand: "High" },
//   ]);
//   const [reviews, setReviews] = useState([
//     { name: "", role: "", text: "", image: "" },
//   ]);
//   const [faqs, setFaqs] = useState([{ q: "", a: "" }]);

//   // --- HANDLERS ---
//   const handleBasicChange = (e) =>
//     setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

//   const handleEditorChange = (field, data) =>
//     setBasicInfo((prev) => ({ ...prev, [field]: data }));

//   // Specific handler for Hero Image
//   const handleHeroImageChange = (url) =>
//     setBasicInfo((prev) => ({ ...prev, image: url }));

//   const updateItem = (setFunc, index, field, value) => {
//     setFunc((prev) => {
//       const newData = [...prev];
//       newData[index][field] = value;
//       return newData;
//     });
//   };

//   const addItem = (setFunc, template) => setFunc((prev) => [...prev, template]);
//   const removeItem = (setFunc, index) =>
//     setFunc((prev) => prev.filter((_, i) => i !== index));

//   // --- SUBMIT ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("Creating...");

//     try {
//       const payload = {
//         ...basicInfo,
//         badges: basicInfo.badges
//           .split(",")
//           .map((s) => s.trim())
//           .filter((s) => s),
//         heroFeatures: basicInfo.heroFeatures
//           .split(",")
//           .map((s) => s.trim())
//           .filter((s) => s),
//         skills: basicInfo.skills
//           .split(",")
//           .map((s) => s.trim())
//           .filter((s) => s),
//         targetAudience: basicInfo.targetAudience
//           .split(",")
//           .map((s) => s.trim())
//           .filter((s) => s),
//         curriculum,
//         instructors,
//         jobRoles,
//         reviews,
//         faqs,
//       };

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert("Course Created Successfully!");
//         router.push("/admin");
//       } else {
//         const data = await res.json();
//         alert(`Error: ${data.message}`);
//         setStatus("");
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus("Server Error");
//     }
//   };

//   return (
//     <div className="relative max-w-5xl px-6 pb-32 mx-auto">
//       {/* STICKY HEADER */}
//       <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-6 mb-8 -mx-6 transition-all border-b shadow-sm bg-slate-50/95 backdrop-blur-md border-slate-200">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 font-bold transition-colors text-slate-500 hover:text-blue-600"
//         >
//           <ArrowLeft size={20} /> Cancel
//         </button>
//         <h1 className="text-2xl font-bold text-slate-900">Create New Course</h1>
//         <div className="w-24"></div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-12">
//         {/* --- 1. ESSENTIALS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <h2 className="section-title">1. Course Essentials</h2>
//           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
//             <div className="form-group">
//               <label>
//                 Course Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="title"
//                 onChange={handleBasicChange}
//                 required
//                 className="input-field"
//                 placeholder="e.g. Master React JS"
//               />
//             </div>
//             <div className="form-group">
//               <label>
//                 Slug (URL) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="slug"
//                 onChange={handleBasicChange}
//                 required
//                 className="input-field"
//                 placeholder="e.g. master-react"
//               />
//               <p className="text-[10px] text-slate-400 mt-1">
//                 Must be unique, lowercase, no spaces.
//               </p>
//             </div>
//           </div>

//           <div className="mb-6 form-group">
//             <label>Short Description (Subtitle)</label>
//             <div className="editor-wrapper">
//               <CustomEditor
//                 data={basicInfo.subtitle}
//                 onChange={(d) => handleEditorChange("subtitle", d)}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             <div className="form-group">
//               <label>Category</label>
//               <input
//                 name="category"
//                 onChange={handleBasicChange}
//                 required
//                 className="input-field"
//                 placeholder="e.g. Development"
//               />
//             </div>

//             {/* HERO IMAGE UPLOAD */}
//             <div className="form-group">
//               <ImageUpload
//                 label="Hero Image"
//                 value={basicInfo.image}
//                 onChange={handleHeroImageChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* --- 2. PRICING & STATS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <h2 className="section-title">2. Pricing & Stats</h2>
//           <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
//             <div className="form-group">
//               <label>Duration</label>
//               <input
//                 name="duration"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 placeholder="e.g. 6 Months"
//               />
//             </div>
//             <div className="form-group">
//               <label>Fee</label>
//               <input
//                 name="fee"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 placeholder="e.g. ₹ 50,000"
//               />
//             </div>
//             <div className="form-group">
//               <label>Rating</label>
//               <input
//                 name="rating"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 defaultValue="4.8"
//               />
//             </div>
//             <div className="form-group">
//               <label>Next Batch</label>
//               <input
//                 name="nextBatch"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 placeholder="e.g. Jan 20th"
//               />
//             </div>
//           </div>
//         </div>

//         {/* --- 3. LISTS & AUDIENCE --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <h2 className="section-title">3. Highlights & Audience</h2>
//           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
//             <div className="form-group">
//               <label>Badges (Comma Separated)</label>
//               <input
//                 name="badges"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 placeholder="Admissions Open, Trending"
//               />
//             </div>
//             <div className="form-group">
//               <label>Hero Features (Comma Separated)</label>
//               <input
//                 name="heroFeatures"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 placeholder="Live Classes, 100% Placement"
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
//             <div className="form-group">
//               <label>Skills (Comma Separated)</label>
//               <input
//                 name="skills"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 placeholder="React, Node.js"
//               />
//             </div>
//             <div className="form-group">
//               <label>Target Audience (Comma Separated)</label>
//               <input
//                 name="targetAudience"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 placeholder="Students, Professionals"
//               />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>Prerequisites (Rich Text)</label>
//             <div className="editor-wrapper">
//               <CustomEditor
//                 data={basicInfo.prerequisites}
//                 onChange={(d) => handleEditorChange("prerequisites", d)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* --- 4. CURRICULUM --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">4. Curriculum Modules</h2>
//             <button
//               type="button"
//               onClick={() => addItem(setCurriculum, { title: "", details: "" })}
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Module
//             </button>
//           </div>
//           <div className="space-y-4">
//             {curriculum.map((item, idx) => (
//               <div key={idx} className="flex gap-4 p-3 repeater-card">
//                 <div className="grid flex-1 gap-3">
//                   <input
//                     placeholder="Module Title"
//                     className="font-bold input-field"
//                     value={item.title}
//                     onChange={(e) =>
//                       updateItem(setCurriculum, idx, "title", e.target.value)
//                     }
//                   />
//                   <textarea
//                     placeholder="Topics Covered"
//                     className="input-field min-h-[80px]"
//                     value={item.details}
//                     onChange={(e) =>
//                       updateItem(setCurriculum, idx, "details", e.target.value)
//                     }
//                   ></textarea>
//                 </div>
//                 <div className="flex items-start">
//                   <button
//                     type="button"
//                     onClick={() => removeItem(setCurriculum, idx)}
//                     className="btn-delete"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 5. INSTRUCTORS (With Image Upload) --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">5. Instructors</h2>
//             <button
//               type="button"
//               onClick={() =>
//                 addItem(setInstructors, {
//                   name: "",
//                   role: "",
//                   company: "",
//                   image: "",
//                 })
//               }
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Instructor
//             </button>
//           </div>
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             {instructors.map((item, idx) => (
//               <div key={idx} className="relative pt-8 repeater-card">
//                 <span className="absolute top-2 left-4 text-[10px] font-bold tracking-wider uppercase text-slate-400">
//                   Instructor #{idx + 1}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => removeItem(setInstructors, idx)}
//                   className="absolute top-2 right-2 btn-delete-small"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//                 <div className="w-full space-y-3">
//                   <input
//                     placeholder="Name"
//                     className="input-field"
//                     value={item.name}
//                     onChange={(e) =>
//                       updateItem(setInstructors, idx, "name", e.target.value)
//                     }
//                   />
//                   <input
//                     placeholder="Role"
//                     className="input-field"
//                     value={item.role}
//                     onChange={(e) =>
//                       updateItem(setInstructors, idx, "role", e.target.value)
//                     }
//                   />
//                   <input
//                     placeholder="Company"
//                     className="input-field"
//                     value={item.company}
//                     onChange={(e) =>
//                       updateItem(setInstructors, idx, "company", e.target.value)
//                     }
//                   />

//                   {/* UPLOAD FOR INSTRUCTOR */}
//                   <ImageUpload
//                     label="Photo"
//                     value={item.image}
//                     onChange={(url) =>
//                       updateItem(setInstructors, idx, "image", url)
//                     }
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 6. JOB ROLES --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">6. Career Opportunities</h2>
//             <button
//               type="button"
//               onClick={() =>
//                 addItem(setJobRoles, { role: "", salary: "", demand: "High" })
//               }
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Job
//             </button>
//           </div>
//           <div className="space-y-4">
//             {jobRoles.map((item, idx) => (
//               <div key={idx} className="flex items-center repeater-card">
//                 <div className="grid flex-1 grid-cols-1 gap-2 p-3 md:grid-cols-3">
//                   <input
//                     placeholder="Job Role"
//                     className="input-field"
//                     value={item.role}
//                     onChange={(e) =>
//                       updateItem(setJobRoles, idx, "role", e.target.value)
//                     }
//                   />
//                   <input
//                     placeholder="Salary"
//                     className="input-field"
//                     value={item.salary}
//                     onChange={(e) =>
//                       updateItem(setJobRoles, idx, "salary", e.target.value)
//                     }
//                   />
//                   <select
//                     className="bg-white input-field"
//                     value={item.demand}
//                     onChange={(e) =>
//                       updateItem(setJobRoles, idx, "demand", e.target.value)
//                     }
//                   >
//                     <option>High</option>
//                     <option>Very High</option>
//                     <option>Moderate</option>
//                   </select>
//                 </div>
//                 <div className="flex items-center p-2">
//                   <button
//                     type="button"
//                     onClick={() => removeItem(setJobRoles, idx)}
//                     className="btn-delete"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 7. REVIEWS (With Image Upload) --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">7. Student Reviews</h2>
//             <button
//               type="button"
//               onClick={() =>
//                 addItem(setReviews, { name: "", role: "", text: "", image: "" })
//               }
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Review
//             </button>
//           </div>
//           <div className="space-y-6">
//             {reviews.map((item, idx) => (
//               <div key={idx} className="relative pt-10 repeater-card">
//                 <div className="absolute top-0 left-0 flex items-center justify-between w-full px-4 py-2 border-b rounded-t-lg border-slate-100 bg-slate-50">
//                   <span className="text-xs font-bold uppercase text-slate-500">
//                     Review #{idx + 1}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => removeItem(setReviews, idx)}
//                     className="text-red-400 hover:text-red-600"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//                 <div className="p-4 space-y-4">
//                   <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
//                     <input
//                       placeholder="Student Name"
//                       className="input-field"
//                       value={item.name}
//                       onChange={(e) =>
//                         updateItem(setReviews, idx, "name", e.target.value)
//                       }
//                     />
//                     <input
//                       placeholder="Designation"
//                       className="input-field"
//                       value={item.role}
//                       onChange={(e) =>
//                         updateItem(setReviews, idx, "role", e.target.value)
//                       }
//                     />

//                     {/* UPLOAD FOR REVIEW */}
//                     <div className="md:col-span-1">
//                       <ImageUpload
//                         label="Student Photo"
//                         value={item.image}
//                         onChange={(url) =>
//                           updateItem(setReviews, idx, "image", url)
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="w-full editor-wrapper">
//                     <CustomEditor
//                       data={item.text}
//                       onChange={(d) => updateItem(setReviews, idx, "text", d)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 8. FAQS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">8. FAQs</h2>
//             <button
//               type="button"
//               onClick={() => addItem(setFaqs, { q: "", a: "" })}
//               className="btn-add"
//             >
//               <Plus size={16} /> Add FAQ
//             </button>
//           </div>
//           <div className="space-y-6">
//             {faqs.map((item, idx) => (
//               <div key={idx} className="flex-col items-start p-2 repeater-card">
//                 <div className="flex items-center justify-between w-full mb-4">
//                   <input
//                     placeholder="Question?"
//                     className="text-lg font-bold border-blue-100 input-field"
//                     value={item.q}
//                     onChange={(e) =>
//                       updateItem(setFaqs, idx, "q", e.target.value)
//                     }
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeItem(setFaqs, idx)}
//                     className="ml-4 btn-delete"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//                 <div className="w-full editor-wrapper">
//                   <CustomEditor
//                     data={item.a}
//                     onChange={(d) => updateItem(setFaqs, idx, "a", d)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SUBMIT BUTTON */}
//         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-50 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:ml-64">
//           <button
//             type="submit"
//             className="flex items-center gap-3 px-12 py-3 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg md:-ml-64 jus rounded-xl hover:bg-blue-700 hover:-translate-y-1"
//           >
//             <Save size={24} /> {status || "Publish Course"}
//           </button>
//         </div>
//       </form>

//       {/* STYLES */}
//       <style jsx>{`
//         .section-title {
//           font-size: 1rem;
//           font-weight: 800;
//           color: #2563eb;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           margin-bottom: 1.5rem;
//         }
//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }
//         .form-group label {
//           font-size: 0.75rem;
//           font-weight: 700;
//           color: #475569;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//         }
//         .input-field {
//           width: 100%;
//           padding: 0.75rem 1rem;
//           border: 1px solid #e2e8f0;
//           border-radius: 0.5rem;
//           background: #f8fafc;
//           font-size: 0.95rem;
//           color: #1e293b;
//           transition: all 0.2s;
//           outline: none;
//         }
//         .input-field:focus {
//           background: #ffffff;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
//         }
//         .editor-wrapper {
//           border: 1px solid #e2e8f0;
//           border-radius: 0.5rem;
//           overflow: hidden;
//         }
//         .btn-add {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #eff6ff;
//           color: #2563eb;
//           padding: 0.5rem 1rem;
//           border-radius: 0.5rem;
//           font-size: 0.85rem;
//           font-weight: 700;
//           transition: background 0.2s;
//         }
//         .btn-add:hover {
//           background: #dbeafe;
//         }
//         .repeater-card {
//           background: #ffffff;
//           border: 1px solid #e2e8f0;
//           border-radius: 0.75rem;
//           transition: border-color 0.2s;
//           box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//         }
//         .repeater-card:hover {
//           border-color: #cbd5e1;
//         }
//         .btn-delete {
//           color: #ef4444;
//           padding: 0.5rem;
//           border-radius: 0.5rem;
//           transition: background 0.2s;
//           background: #fee2e2;
//           height: fit-content;
//         }
//         .btn-delete:hover {
//           background: #fecaca;
//         }
//         .btn-delete-small {
//           color: #ef4444;
//           padding: 0.25rem;
//           border-radius: 0.25rem;
//         }
//         .btn-delete-small:hover {
//           background: #fee2e2;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/ImageUpload";

// Dynamic import for CKEditor
const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-32 border rounded-lg bg-slate-50 animate-pulse border-slate-200">
      Loading Editor...
    </div>
  ),
});

export default function CreateCourse() {
  const router = useRouter();
  const [status, setStatus] = useState("");

  // --- 1. BASIC INFO STATE ---
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    slug: "",
    category: "",
    image: "",
    rating: "4.8",
    duration: "6 Months",
    fee: "₹ 50,000",
    nextBatch: "",
    badges: "",
    heroFeatures: "",
    skills: "",
    targetAudience: "",
    subtitle: "",
    prerequisites: "",
    outcomes: "", // Course Outcomes (Rich Text)
  });

  // --- 2. DYNAMIC LISTS STATE ---
  const [curriculum, setCurriculum] = useState([{ title: "", details: "" }]);

  // NEW: Capstones as a dynamic list like Curriculum
  const [capstones, setCapstones] = useState([{ title: "", details: "" }]);

  const [instructors, setInstructors] = useState([
    { name: "", role: "", company: "", image: "" },
  ]);
  const [jobRoles, setJobRoles] = useState([
    { role: "", salary: "", demand: "High" },
  ]);
  const [reviews, setReviews] = useState([
    { name: "", role: "", text: "", image: "" },
  ]);
  const [faqs, setFaqs] = useState([{ q: "", a: "" }]);

  // --- HANDLERS ---
  const handleBasicChange = (e) =>
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

  const handleEditorChange = (field, data) =>
    setBasicInfo((prev) => ({ ...prev, [field]: data }));

  // Specific handler for Hero Image
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

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Creating...");

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
        capstones, // Include the new capstones array
        instructors,
        jobRoles,
        reviews,
        faqs,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Course Created Successfully!");
        router.push("/admin");
      } else {
        const data = await res.json();
        alert(`Error: ${data.message}`);
        setStatus("");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server Error");
    }
  };

  return (
    <div className="relative max-w-5xl px-6 pb-32 mx-auto">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-6 mb-8 -mx-6 transition-all border-b shadow-sm bg-slate-50/95 backdrop-blur-md border-slate-200">
        <button
          onClick={() => router.back()}
          type="button"
          className="flex items-center gap-2 font-bold transition-colors text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={20} /> Cancel
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Create New Course</h1>
        <div className="w-24"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* --- 1. ESSENTIALS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">1. Course Essentials</h2>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="form-group">
              <label>
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                onChange={handleBasicChange}
                required
                className="input-field"
                placeholder="e.g. Master React JS"
              />
            </div>
            <div className="form-group">
              <label>
                Slug (URL) <span className="text-red-500">*</span>
              </label>
              <input
                name="slug"
                onChange={handleBasicChange}
                required
                className="input-field"
                placeholder="e.g. master-react"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Must be unique, lowercase, no spaces.
              </p>
            </div>
          </div>

          <div className="mb-6 form-group">
            <label>Short Description (Subtitle)</label>
            <div className="editor-wrapper">
              <CustomEditor
                data={basicInfo.subtitle}
                onChange={(d) => handleEditorChange("subtitle", d)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="form-group">
              <label>Category</label>
              <input
                name="category"
                onChange={handleBasicChange}
                required
                className="input-field"
                placeholder="e.g. Development"
              />
            </div>

            {/* HERO IMAGE UPLOAD */}
            <div className="form-group">
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
          <h2 className="section-title">2. Pricing & Stats</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="form-group">
              <label>Duration</label>
              <input
                name="duration"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="e.g. 6 Months"
              />
            </div>
            <div className="form-group">
              <label>Fee</label>
              <input
                name="fee"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="e.g. ₹ 50,000"
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                name="rating"
                onChange={handleBasicChange}
                className="input-field"
                defaultValue="4.8"
              />
            </div>
            <div className="form-group">
              <label>Next Batch</label>
              <input
                name="nextBatch"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="e.g. Jan 20th"
              />
            </div>
          </div>
        </div>

        {/* --- 3. HIGHLIGHTS & AUDIENCE --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">3. Highlights & Audience</h2>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="form-group">
              <label>Badges (Comma Separated)</label>
              <input
                name="badges"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="Admissions Open, Trending"
              />
            </div>
            <div className="form-group">
              <label>Hero Features (Comma Separated)</label>
              <input
                name="heroFeatures"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="Live Classes, 100% Placement"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="form-group">
              <label>Skills (Comma Separated)</label>
              <input
                name="skills"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="React, Node.js"
              />
            </div>
            <div className="form-group">
              <label>Target Audience (Comma Separated)</label>
              <input
                name="targetAudience"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="Students, Professionals"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Prerequisites (Rich Text)</label>
            <div className="editor-wrapper">
              <CustomEditor
                data={basicInfo.prerequisites}
                onChange={(d) => handleEditorChange("prerequisites", d)}
              />
            </div>
          </div>
        </div>

        {/* --- 4. COURSE OUTCOMES --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">4. Course Outcomes</h2>
          <p className="mb-4 text-sm text-slate-500">
            Explain what students will be able to do after completing this
            course.
          </p>
          <div className="editor-wrapper min-h-[200px]">
            <CustomEditor
              data={basicInfo.outcomes}
              onChange={(d) => handleEditorChange("outcomes", d)}
            />
          </div>
        </div>

        {/* --- 5. CURRICULUM MODULES --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">5. Curriculum Modules</h2>
            <button
              type="button"
              onClick={() => addItem(setCurriculum, { title: "", details: "" })}
              className="btn-add"
            >
              <Plus size={16} /> Add Module
            </button>
          </div>
          <div className="space-y-6">
            {curriculum.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4 p-4 repeater-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400">
                    Module #{idx + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeItem(setCurriculum, idx)}
                    className="btn-delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid flex-1 gap-3">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Module Title
                  </label>
                  <input
                    placeholder="e.g. Working with Large Language Models"
                    className="font-bold input-field"
                    value={item.title}
                    onChange={(e) =>
                      updateItem(setCurriculum, idx, "title", e.target.value)
                    }
                  />

                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Topics & Details (Rich Text)
                  </label>
                  <div className="editor-wrapper min-h-[150px]">
                    <CustomEditor
                      data={item.details}
                      onChange={(d) =>
                        updateItem(setCurriculum, idx, "details", d)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 6. CAPSTONE PROJECTS (UPDATED: REPEATER LIKE CURRICULUM) --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">6. Capstone Projects</h2>
            <button
              type="button"
              onClick={() => addItem(setCapstones, { title: "", details: "" })}
              className="btn-add"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
          <div className="space-y-6">
            {capstones.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4 p-4 repeater-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400">
                    Project #{idx + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeItem(setCapstones, idx)}
                    className="btn-delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid flex-1 gap-3">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Project Title
                  </label>
                  <input
                    placeholder="e.g. RAG Application with Interactive UI"
                    className="font-bold input-field"
                    value={item.title}
                    onChange={(e) =>
                      updateItem(setCapstones, idx, "title", e.target.value)
                    }
                  />

                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Project Details & Requirements
                  </label>
                  <div className="editor-wrapper min-h-[150px]">
                    <CustomEditor
                      data={item.details}
                      onChange={(d) =>
                        updateItem(setCapstones, idx, "details", d)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 7. INSTRUCTORS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">7. Instructors</h2>
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
                <div className="w-full space-y-3 p-4">
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

                  {/* UPLOAD FOR INSTRUCTOR */}
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

        {/* --- 8. JOB ROLES --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">8. Career Opportunities</h2>
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
              <div key={idx} className="flex items-center repeater-card">
                <div className="grid flex-1 grid-cols-1 gap-2 p-3 md:grid-cols-3">
                  <input
                    placeholder="Job Role"
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
                <div className="flex items-center p-2">
                  <button
                    type="button"
                    onClick={() => removeItem(setJobRoles, idx)}
                    className="btn-delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 9. REVIEWS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">9. Student Reviews</h2>
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
                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
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
                  <div className="w-full editor-wrapper">
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

        {/* --- 10. FAQS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">10. FAQs</h2>
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
              <div key={idx} className="flex-col items-start p-4 repeater-card">
                <div className="flex items-center justify-between w-full mb-4">
                  <input
                    placeholder="Question?"
                    className="text-lg font-bold border-blue-100 input-field"
                    value={item.q}
                    onChange={(e) =>
                      updateItem(setFaqs, idx, "q", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(setFaqs, idx)}
                    className="ml-4 btn-delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="w-full editor-wrapper">
                  <CustomEditor
                    data={item.a}
                    onChange={(d) => updateItem(setFaqs, idx, "a", d)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-50 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:ml-64">
          <button
            type="submit"
            className="flex items-center gap-3 px-12 py-3 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg md:-ml-64 rounded-xl hover:bg-blue-700 hover:-translate-y-1"
          >
            <Save size={24} /> {status || "Publish Course"}
          </button>
        </div>
      </form>

      {/* STYLES */}
      <style jsx>{`
        .section-title {
          font-size: 1rem;
          font-weight: 800;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          background: #f8fafc;
          font-size: 0.95rem;
          color: #1e293b;
          transition: all 0.2s;
          outline: none;
        }
        .input-field:focus {
          background: #ffffff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .editor-wrapper {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          overflow: hidden;
          background: white;
        }
        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #eff6ff;
          color: #2563eb;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          transition: background 0.2s;
        }
        .btn-add:hover {
          background: #dbeafe;
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
        .btn-delete {
          color: #ef4444;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background 0.2s;
          background: #fee2e2;
          height: fit-content;
        }
        .btn-delete:hover {
          background: #fecaca;
        }
        .btn-delete-small {
          color: #ef4444;
          padding: 0.25rem;
          border-radius: 0.25rem;
        }
        .btn-delete-small:hover {
          background: #fee2e2;
        }
      `}</style>
    </div>
  );
}