// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
// import dynamic from "next/dynamic";
// import ImageUpload from "@/components/ImageUpload";

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
//     outcomes: "", // Course Outcomes (Rich Text)
//   });

//   // --- 2. DYNAMIC LISTS STATE ---
//   const [curriculum, setCurriculum] = useState([{ title: "", details: "" }]);

//   // NEW: Capstones as a dynamic list like Curriculum
//   const [capstones, setCapstones] = useState([{ title: "", details: "" }]);

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
//         capstones, // Include the new capstones array
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
//           type="button"
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

//         {/* --- 3. HIGHLIGHTS & AUDIENCE --- */}
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

//         {/* --- 4. COURSE OUTCOMES --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <h2 className="section-title">4. Course Outcomes</h2>
//           <p className="mb-4 text-sm text-slate-500">
//             Explain what students will be able to do after completing this
//             course.
//           </p>
//           <div className="editor-wrapper min-h-[200px]">
//             <CustomEditor
//               data={basicInfo.outcomes}
//               onChange={(d) => handleEditorChange("outcomes", d)}
//             />
//           </div>
//         </div>

//         {/* --- 5. CURRICULUM MODULES --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">5. Curriculum Modules</h2>
//             <button
//               type="button"
//               onClick={() => addItem(setCurriculum, { title: "", details: "" })}
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Module
//             </button>
//           </div>
//           <div className="space-y-6">
//             {curriculum.map((item, idx) => (
//               <div key={idx} className="flex flex-col gap-4 p-4 repeater-card">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400">
//                     Module #{idx + 1}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeItem(setCurriculum, idx)}
//                     className="btn-delete"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>

//                 <div className="grid flex-1 gap-3">
//                   <label className="text-xs font-bold uppercase text-slate-500">
//                     Module Title
//                   </label>
//                   <input
//                     placeholder="e.g. Working with Large Language Models"
//                     className="font-bold input-field"
//                     value={item.title}
//                     onChange={(e) =>
//                       updateItem(setCurriculum, idx, "title", e.target.value)
//                     }
//                   />

//                   <label className="text-xs font-bold uppercase text-slate-500">
//                     Topics & Details (Rich Text)
//                   </label>
//                   <div className="editor-wrapper min-h-[150px]">
//                     <CustomEditor
//                       data={item.details}
//                       onChange={(d) =>
//                         updateItem(setCurriculum, idx, "details", d)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 6. CAPSTONE PROJECTS (UPDATED: REPEATER LIKE CURRICULUM) --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">6. Capstone Projects</h2>
//             <button
//               type="button"
//               onClick={() => addItem(setCapstones, { title: "", details: "" })}
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Project
//             </button>
//           </div>
//           <div className="space-y-6">
//             {capstones.map((item, idx) => (
//               <div key={idx} className="flex flex-col gap-4 p-4 repeater-card">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-sm font-bold tracking-wider uppercase text-slate-400">
//                     Project #{idx + 1}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeItem(setCapstones, idx)}
//                     className="btn-delete"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>

//                 <div className="grid flex-1 gap-3">
//                   <label className="text-xs font-bold uppercase text-slate-500">
//                     Project Title
//                   </label>
//                   <input
//                     placeholder="e.g. RAG Application with Interactive UI"
//                     className="font-bold input-field"
//                     value={item.title}
//                     onChange={(e) =>
//                       updateItem(setCapstones, idx, "title", e.target.value)
//                     }
//                   />

//                   <label className="text-xs font-bold uppercase text-slate-500">
//                     Project Details & Requirements
//                   </label>
//                   <div className="editor-wrapper min-h-[150px]">
//                     <CustomEditor
//                       data={item.details}
//                       onChange={(d) =>
//                         updateItem(setCapstones, idx, "details", d)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 7. INSTRUCTORS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">7. Instructors</h2>
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
//                 <div className="w-full p-4 space-y-3">
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

//         {/* --- 8. JOB ROLES --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">8. Career Opportunities</h2>
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

//         {/* --- 9. REVIEWS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">9. Student Reviews</h2>
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

//         {/* --- 10. FAQS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">10. FAQs</h2>
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
//               <div key={idx} className="flex-col items-start p-4 repeater-card">
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
//             className="flex items-center gap-3 px-12 py-3 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg md:-ml-64 rounded-xl hover:bg-blue-700 hover:-translate-y-1"
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
//           background: white;
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
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
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

// --- HELPER COMPONENT FOR TAGS ---
const TagInput = ({ label, name, value, onChange, placeholder }) => {
  const [input, setInput] = useState("");

  // Convert comma-string to array for display
  const tags = value
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !tags.includes(trimmed)) {
        // Add new tag to the existing comma-separated string
        const newValue = value ? `${value},${trimmed}` : trimmed;
        // Fake an event to reuse your existing handleBasicChange
        onChange({ target: { name, value: newValue } });
        setInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const newValue = tags.filter((t) => t !== tagToRemove).join(",");
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all min-h-[50px]">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-1 text-sm font-bold text-blue-700 rounded bg-blue-50"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-400 hover:text-blue-600"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          className="flex-1 bg-transparent outline-none min-w-[120px] text-sm"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <p className="text-[10px] text-slate-400 mt-1">
        Press Enter or Comma to add
      </p>
    </div>
  );
};

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
    level: "Beginner to Intermediate", // NEW
    badges: "",
    heroFeatures: "",
    skills: "",
    targetAudience: "",
    subtitle: "",
    prerequisites: "",
    outcomes: "", // Course Outcomes (Rich Text)
  });

  // --- 2. PROGRAM DETAILS STATE (NEW) ---
  const [programDetails, setProgramDetails] = useState({
    type: "",
    mode: "",
    smeCriteria: [""],
    certCriteria: [""],
  });

  // --- 3. DYNAMIC LISTS STATE ---
  // Updated Curriculum Structure for Nesting
  const [curriculum, setCurriculum] = useState([
    {
      title: "",
      details: "",
      sections: [{ title: "", concepts: "", labs: "", tools: "" }], // Strings, not arrays
    },
  ]);

  const [capstones, setCapstones] = useState([
    { title: "", details: "", tools: "" },
  ]); // Added tools string

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

  // --- PROGRAM DETAILS HANDLERS ---
  const handleProgramChange = (e) => {
    setProgramDetails({ ...programDetails, [e.target.name]: e.target.value });
  };

  const handleProgListChange = (field, index, value) => {
    const updated = [...programDetails[field]];
    updated[index] = value;
    setProgramDetails({ ...programDetails, [field]: updated });
  };

  const addProgListItem = (field) => {
    setProgramDetails((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeProgListItem = (field, index) => {
    const updated = programDetails[field].filter((_, i) => i !== index);
    setProgramDetails({ ...programDetails, [field]: updated });
  };

  // --- COMPLEX CURRICULUM HANDLERS ---
  const addSection = (modIdx) => {
    const updated = [...curriculum];
    if (!updated[modIdx].sections) updated[modIdx].sections = [];
    updated[modIdx].sections.push({
      title: "",
      concepts: [""],
      labs: [""],
      tools: [""],
    });
    setCurriculum(updated);
  };

  const removeSection = (modIdx, secIdx) => {
    const updated = [...curriculum];
    updated[modIdx].sections = updated[modIdx].sections.filter(
      (_, i) => i !== secIdx
    );
    setCurriculum(updated);
  };

  const updateSection = (modIdx, secIdx, field, value) => {
    const updated = [...curriculum];
    updated[modIdx].sections[secIdx][field] = value;
    setCurriculum(updated);
  };

  // Handler for deep nested lists (Concepts, Labs, Tools inside Sections)
  const updateSectionList = (modIdx, secIdx, listName, itemIdx, value) => {
    const updated = [...curriculum];
    updated[modIdx].sections[secIdx][listName][itemIdx] = value;
    setCurriculum(updated);
  };

  const addSectionListItem = (modIdx, secIdx, listName) => {
    const updated = [...curriculum];
    updated[modIdx].sections[secIdx][listName].push("");
    setCurriculum(updated);
  };

  const removeSectionListItem = (modIdx, secIdx, listName, itemIdx) => {
    const updated = [...curriculum];
    updated[modIdx].sections[secIdx][listName] = updated[modIdx].sections[
      secIdx
    ][listName].filter((_, i) => i !== itemIdx);
    setCurriculum(updated);
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Creating...");

    try {
      const payload = {
        ...basicInfo,
        // List processing
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

        // New Program Details
        programDetails: {
          ...programDetails,
          smeCriteria: programDetails.smeCriteria.filter((s) => s.trim()),
          certCriteria: programDetails.certCriteria.filter((s) => s.trim()),
        },

        curriculum: curriculum.map((mod) => ({
          ...mod,
          sections: mod.sections.map((sec) => ({
            ...sec,
            tools: sec.tools
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean), // Convert string to array for backend
          })),
        })),
        capstones: capstones.map((c) => ({
          ...c,
          tools: c.tools
            ? c.tools
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        })),
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
            <label>Short Description (Subtitle - HTML)</label>
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
              <select
                name="category"
                value={basicInfo.category}
                onChange={handleBasicChange}
                required
                className="bg-white input-field"
              >
                <option value="">Select a Category</option>
                <option value="Development">Development</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="GenAI Engineering">GenAI Engineering</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
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

            {/* CHANGED: Date Picker for Next Batch */}
            <div className="form-group">
              <label>Next Batch</label>
              <input
                type="date"
                name="nextBatch"
                onChange={handleBasicChange}
                className="input-field"
              />
            </div>

            {/* CHANGED: Select Option for Course Level */}
            <div className="form-group md:col-span-2">
              <label>Course Level</label>
              <select
                name="level"
                value={basicInfo.level}
                onChange={handleBasicChange}
                className="bg-white input-field"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Beginner to Intermediate">
                  Beginner to Intermediate
                </option>
                <option value="Intermediate to Advanced">
                  Intermediate to Advanced
                </option>
                <option value="Beginner to Advanced">
                  Beginner to Advanced
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* --- 3. PROGRAM DETAILS (NEW) --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">3. Program Details</h2>
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div className="form-group">
              <label>Program Type</label>
              <input
                name="type"
                value={programDetails.type}
                onChange={handleProgramChange}
                className="input-field"
                placeholder="e.g. Technical Hands-On Training"
              />
            </div>
            <div className="form-group">
              <label>Delivery Mode</label>
              <input
                name="mode"
                value={programDetails.mode}
                onChange={handleProgramChange}
                className="input-field"
                placeholder="e.g. Instructor-led, lab-heavy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* SME Criteria List */}
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
                Trainer Eligibility
              </label>
              {programDetails.smeCriteria.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className="py-2 input-field"
                    value={item}
                    onChange={(e) =>
                      handleProgListChange("smeCriteria", i, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeProgListItem("smeCriteria", i)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addProgListItem("smeCriteria")}
                className="flex items-center gap-1 text-sm font-bold text-blue-600"
              >
                + Add Criteria
              </button>
            </div>

            {/* Certification Criteria List */}
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
                Certification Eligibility
              </label>
              {programDetails.certCriteria.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className="py-2 input-field"
                    value={item}
                    onChange={(e) =>
                      handleProgListChange("certCriteria", i, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeProgListItem("certCriteria", i)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addProgListItem("certCriteria")}
                className="flex items-center gap-1 text-sm font-bold text-blue-600"
              >
                + Add Criteria
              </button>
            </div>
          </div>
        </div>

        {/* --- 4. HIGHLIGHTS & AUDIENCE --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">4. Highlights & Audience</h2>

          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <TagInput
              label="Badges"
              name="badges"
              value={basicInfo.badges}
              onChange={handleBasicChange}
              placeholder="e.g. Bestseller, New"
            />
            <TagInput
              label="Hero Features (What We'll Provide)"
              name="heroFeatures"
              value={basicInfo.heroFeatures}
              onChange={handleBasicChange}
              placeholder="e.g. 100% Placement Support"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <TagInput
              label="Skills You Will Learn"
              name="skills"
              value={basicInfo.skills}
              onChange={handleBasicChange}
              placeholder="e.g. React, Node.js, System Design"
            />
            <TagInput
              label="Target Audience"
              name="targetAudience"
              value={basicInfo.targetAudience}
              onChange={handleBasicChange}
              placeholder="e.g. Students, Professionals"
            />
          </div>

          {/* PREREQUISITES (UNCHANGED) */}
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

        {/* --- 5. COURSE OUTCOMES --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">5. Course Outcomes</h2>
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

        {/* --- 6. CURRICULUM MODULES (With Editor & Tags) --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">6. Curriculum Modules</h2>
            <button
              type="button"
              onClick={() =>
                addItem(setCurriculum, { title: "", details: "", sections: [] })
              }
              className="btn-add"
            >
              <Plus size={16} /> Add Module
            </button>
          </div>

          <div className="space-y-8">
            {curriculum.map((module, mIdx) => (
              <div
                key={mIdx}
                className="flex flex-col gap-4 p-6 border bg-slate-50 border-slate-200 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
                    Module #{mIdx + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeItem(setCurriculum, mIdx)}
                    className="btn-delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Module Inputs */}
                <div className="grid gap-3">
                  <input
                    placeholder="Module Title"
                    className="text-lg font-bold input-field"
                    value={module.title}
                    onChange={(e) =>
                      updateItem(setCurriculum, mIdx, "title", e.target.value)
                    }
                  />
                </div>

                {/* Nested Sections */}
                <div className="pl-4 mt-4 space-y-6 border-l-2 border-slate-200">
                  <label className="text-xs font-bold uppercase text-slate-500">
                    Sections within Module
                  </label>

                  {module.sections &&
                    module.sections.map((section, sIdx) => (
                      <div
                        key={sIdx}
                        className="relative p-6 bg-white border rounded-lg shadow-sm border-slate-200"
                      >
                        <button
                          type="button"
                          onClick={() => removeSection(mIdx, sIdx)}
                          className="absolute text-red-300 top-4 right-4 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="pr-8 mb-6">
                          <label className="block mb-1 text-xs font-bold uppercase text-slate-400">
                            Section Title
                          </label>
                          <input
                            className="font-semibold input-field"
                            placeholder="e.g. 1.1 Core Concepts & Foundations"
                            value={section.title}
                            onChange={(e) =>
                              updateSection(mIdx, sIdx, "title", e.target.value)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {/* Core Concepts Editor */}
                          <div>
                            <label className="block mb-2 text-xs font-bold uppercase text-slate-400">
                              Core Concepts (Rich Text)
                            </label>
                            <div className="editor-wrapper min-h-[150px]">
                              <CustomEditor
                                data={section.concepts}
                                onChange={(d) =>
                                  updateSection(mIdx, sIdx, "concepts", d)
                                }
                              />
                            </div>
                          </div>

                          {/* Hands-on Labs Editor */}
                          <div>
                            <label className="block mb-2 text-xs font-bold uppercase text-slate-400">
                              Hands-on Labs (Rich Text)
                            </label>
                            <div className="editor-wrapper min-h-[150px]">
                              <CustomEditor
                                data={section.labs}
                                onChange={(d) =>
                                  updateSection(mIdx, sIdx, "labs", d)
                                }
                              />
                            </div>
                          </div>

                          {/* Tools Used Tag Input */}
                          <div>
                            <TagInput
                              label="Tools & Software Used"
                              name="tools"
                              value={section.tools}
                              onChange={(e) =>
                                updateSection(
                                  mIdx,
                                  sIdx,
                                  "tools",
                                  e.target.value
                                )
                              }
                              placeholder="e.g. Python, Gemini API, LangChain"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                  <button
                    type="button"
                    onClick={() => addSection(mIdx)}
                    className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
                  >
                    <Plus size={16} /> Add Section
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 7. CAPSTONE PROJECTS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">7. Capstone Projects</h2>
            <button
              type="button"
              onClick={() =>
                addItem(setCapstones, { title: "", details: "", tools: "" })
              }
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
                  {/* PROJECT TITLE */}
                  <label className="text-xs font-bold uppercase text-slate-500">
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

                  {/* TOOLS USED - NOW USING TAG INPUT */}
                  <TagInput
                    label="Tools Used"
                    name="tools"
                    value={item.tools}
                    onChange={(e) =>
                      updateItem(setCapstones, idx, "tools", e.target.value)
                    }
                    placeholder="e.g. Python, LangChain, Streamlit"
                  />

                  {/* PROJECT DETAILS (Rich Text) */}
                  <label className="text-xs font-bold uppercase text-slate-500">
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

        {/* --- 8. INSTRUCTORS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">8. Instructors</h2>
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
                <div className="w-full p-4 space-y-3">
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

        {/* --- 9. JOB ROLES --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">9. Career Opportunities</h2>
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
