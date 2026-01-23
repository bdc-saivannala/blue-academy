// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Save,
//   ArrowLeft,
//   Plus,
//   Trash2,
//   ChevronDown,
//   ChevronUp,
//   X,
// } from "lucide-react";
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

// // --- HELPER COMPONENT FOR TAGS ---
// const TagInput = ({ label, name, value, onChange, placeholder }) => {
//   const [input, setInput] = useState("");

//   // Convert comma-string to array for display
//   const tags = value
//     ? value
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean)
//     : [];

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const trimmed = input.trim();
//       if (trimmed && !tags.includes(trimmed)) {
//         const newValue = value ? `${value},${trimmed}` : trimmed;
//         onChange({ target: { name, value: newValue } });
//         setInput("");
//       }
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     const newValue = tags.filter((t) => t !== tagToRemove).join(",");
//     onChange({ target: { name, value: newValue } });
//   };

//   return (
//     <div className="form-group">
//       <label>{label}</label>
//       <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all min-h-[50px]">
//         {tags.map((tag, i) => (
//           <span
//             key={i}
//             className="flex items-center gap-1 px-2 py-1 text-sm font-bold text-blue-700 rounded bg-blue-50"
//           >
//             {tag}
//             <button
//               type="button"
//               onClick={() => removeTag(tag)}
//               className="text-blue-400 hover:text-blue-600"
//             >
//               <X size={14} />
//             </button>
//           </span>
//         ))}
//         <input
//           className="flex-1 bg-transparent outline-none min-w-[120px] text-sm"
//           placeholder={placeholder}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//       </div>
//       <p className="text-[10px] text-slate-400 mt-1">
//         Press Enter or Comma to add
//       </p>
//     </div>
//   );
// };

// export default function EditCourse({ params }) {
//   const router = useRouter();
//   // Unwrap params for Next.js 15+
//   const { slug } = React.use(params);

//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState("");
//   const [courseId, setCourseId] = useState(null); // To store the ID for updates

//   // --- 1. BASIC INFO STATE ---
//   const [basicInfo, setBasicInfo] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     image: "",
//     rating: "",
//     duration: "",
//     fee: "",
//     nextBatch: "",
//     level: "",
//     badges: "",
//     heroFeatures: "",
//     skills: "",
//     targetAudience: "",
//     subtitle: "",
//     prerequisites: "",
//     outcomes: "",
//   });

//   // --- 2. PROGRAM DETAILS STATE ---
//   const [programDetails, setProgramDetails] = useState({
//     type: "",
//     mode: "",
//     smeCriteria: [""],
//     certCriteria: [""],
//   });

//   // --- 3. DYNAMIC LISTS STATE ---
//   const [curriculum, setCurriculum] = useState([]);
//   const [capstones, setCapstones] = useState([]);
//   const [leaders, setLeaders] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [jobRoles, setJobRoles] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [faqs, setFaqs] = useState([]);

//   // --- FETCH DATA ON LOAD ---
//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`
//         );
//         if (!res.ok) throw new Error("Course not found");

//         const data = await res.json();
//         setCourseId(data._id); // Store ID for PUT request

//         // Populate Basic Info (Convert DB Arrays -> Comma Strings for TagInput)
//         setBasicInfo({
//           title: data.title || "",
//           slug: data.slug || "",
//           category: data.category || "",
//           image: data.image || "",
//           bannerImage: data.bannerImage || "",
//           rating: data.rating || "",
//           duration: data.duration || "",
//           fee: data.fee || "",
//           nextBatch: data.nextBatch || "",
//           level: data.level || "",
//           badges: data.badges ? data.badges.join(",") : "",
//           heroFeatures: data.heroFeatures ? data.heroFeatures.join(",") : "",
//           skills: data.skills ? data.skills.join(",") : "",
//           targetAudience: data.targetAudience
//             ? data.targetAudience.join(",")
//             : "",
//           subtitle: data.subtitle || "",
//           prerequisites: data.prerequisites || "",
//           outcomes: data.outcomes || "",
//         });

//         // Populate Program Details
//         setProgramDetails(
//           data.programDetails || {
//             type: "",
//             mode: "",
//             smeCriteria: [""],
//             certCriteria: [""],
//           }
//         );

//         // Populate Curriculum (Convert nested 'tools' array -> string for TagInput)
//         const formattedCurriculum = (data.curriculum || []).map((mod) => ({
//           ...mod,
//           sections: (mod.sections || []).map((sec) => ({
//             ...sec,
//             tools: Array.isArray(sec.tools)
//               ? sec.tools.join(",")
//               : sec.tools || "",
//           })),
//         }));
//         setCurriculum(formattedCurriculum);

//         // Populate Capstones (Convert 'tools' array -> string for TagInput)
//         const formattedCapstones = (data.capstones || []).map((cap) => ({
//           ...cap,
//           tools: Array.isArray(cap.tools)
//             ? cap.tools.join(",")
//             : cap.tools || "",
//         }));
//         setCapstones(formattedCapstones);
//         setLeaders(data.leaders || []);
//         setInstructors(data.instructors || []);
//         setJobRoles(data.jobRoles || []);
//         setReviews(data.reviews || []);
//         setFaqs(data.faqs || []);

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load course data");
//         router.push("/admin");
//       }
//     };

//     if (slug) {
//       fetchCourse();
//     }
//   }, [slug, router]);

//   // --- HANDLERS (Same as CreatePage) ---
//   const handleBasicChange = (e) =>
//     setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

//   const handleEditorChange = (field, data) =>
//     setBasicInfo((prev) => ({ ...prev, [field]: data }));

//   const handleHeroImageChange = (url) =>
//     setBasicInfo((prev) => ({ ...prev, image: url }));

//   const handleBannerImageChange = (url) =>
//     setBasicInfo((prev) => ({ ...prev, bannerImage: url }));

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

//   // --- PROGRAM DETAILS HANDLERS ---
//   const handleProgramChange = (e) => {
//     setProgramDetails({ ...programDetails, [e.target.name]: e.target.value });
//   };

//   const handleProgListChange = (field, index, value) => {
//     const updated = [...programDetails[field]];
//     updated[index] = value;
//     setProgramDetails({ ...programDetails, [field]: updated });
//   };

//   const addProgListItem = (field) => {
//     setProgramDetails((prev) => ({
//       ...prev,
//       [field]: [...prev[field], ""],
//     }));
//   };

//   const removeProgListItem = (field, index) => {
//     const updated = programDetails[field].filter((_, i) => i !== index);
//     setProgramDetails({ ...programDetails, [field]: updated });
//   };

//   // --- COMPLEX CURRICULUM HANDLERS ---
//   const addSection = (modIdx) => {
//     const updated = [...curriculum];
//     if (!updated[modIdx].sections) updated[modIdx].sections = [];
//     updated[modIdx].sections.push({
//       title: "",
//       concepts: "",
//       labs: "",
//       tools: "",
//     });
//     setCurriculum(updated);
//   };

//   const removeSection = (modIdx, secIdx) => {
//     const updated = [...curriculum];
//     updated[modIdx].sections = updated[modIdx].sections.filter(
//       (_, i) => i !== secIdx
//     );
//     setCurriculum(updated);
//   };

//   const updateSection = (modIdx, secIdx, field, value) => {
//     const updated = [...curriculum];
//     updated[modIdx].sections[secIdx][field] = value;
//     setCurriculum(updated);
//   };

//   // --- SUBMIT UPDATE ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("Updating...");

//     try {
//       const payload = {
//         ...basicInfo,
//         // List processing
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

//         // Program Details
//         programDetails: {
//           ...programDetails,
//           smeCriteria: programDetails.smeCriteria.filter((s) => s.trim()),
//           certCriteria: programDetails.certCriteria.filter((s) => s.trim()),
//         },

//         // Convert nested tools string -> Array
//         curriculum: curriculum.map((mod) => ({
//           ...mod,
//           sections: mod.sections.map((sec) => ({
//             ...sec,
//             tools: sec.tools
//               ? sec.tools
//                   .split(",")
//                   .map((s) => s.trim())
//                   .filter(Boolean)
//               : [],
//           })),
//         })),

//         // Convert capstone tools string -> Array
//         capstones: capstones.map((c) => ({
//           ...c,
//           tools: c.tools
//             ? c.tools
//                 .split(",")
//                 .map((s) => s.trim())
//                 .filter(Boolean)
//             : [],
//         })),
//         leaders,
//         instructors,
//         jobRoles,
//         reviews,
//         faqs,
//       };

//       // USE PUT METHOD
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (res.ok) {
//         alert("Course Updated Successfully!");
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

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl font-bold text-slate-500 animate-pulse">
//           Loading Course Data...
//         </div>
//       </div>
//     );
//   }

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
//         <h1 className="text-2xl font-bold text-slate-900">Edit Course</h1>
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
//                 value={basicInfo.title}
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
//                 value={basicInfo.slug}
//               />
//             </div>
//           </div>

//           <div className="mb-6 form-group">
//             <label>Short Description (Subtitle - HTML)</label>
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
//               <select
//                 name="category"
//                 value={basicInfo.category}
//                 onChange={handleBasicChange}
//                 required
//                 className="bg-white input-field"
//               >
//                 <option value="">Select a Category</option>
//                 <option value="Deep-Tech AI">Deep-Tech AI</option>
//                 <option value="AI for Leadership">AI for Leadership</option>
//                 <option value="Workplace productivity">
//                   Workplace productivity
//                 </option>
//                 <option value="Development">Development</option>
//                 <option value="Data Science & AI">Data Science & AI</option>
//                 <option value="GenAI Engineering">GenAI Engineering</option>
//                 <option value="Cloud & DevOps">Cloud & DevOps</option>
//                 <option value="Cyber Security">Cyber Security</option>
//                 <option value="Design">Design</option>
//                 <option value="Business">Business</option>
//                 <option value="Marketing">Marketing</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <ImageUpload
//                 label="Hero Image"
//                 value={basicInfo.image}
//                 onChange={handleHeroImageChange}
//               />
//             </div>
//             <div className="form-group">
//               <ImageUpload
//                 label="Banner Image"
//                 value={basicInfo.bannerImage}
//                 onChange={handleBannerImageChange}
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
//                 value={basicInfo.duration}
//               />
//             </div>
//             <div className="form-group">
//               <label>Fee</label>
//               <input
//                 name="fee"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 value={basicInfo.fee}
//               />
//             </div>
//             <div className="form-group">
//               <label>Rating</label>
//               <input
//                 name="rating"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 value={basicInfo.rating}
//               />
//             </div>
//             <div className="form-group">
//               <label>Next Batch</label>
//               <input
//                 type="date"
//                 name="nextBatch"
//                 onChange={handleBasicChange}
//                 className="input-field"
//                 value={basicInfo.nextBatch}
//               />
//             </div>
//             <div className="form-group md:col-span-2">
//               <label>Course Level</label>
//               <select
//                 name="level"
//                 value={basicInfo.level}
//                 onChange={handleBasicChange}
//                 className="bg-white input-field"
//               >
//                 <option value="">Select Level</option>
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Advanced">Advanced</option>
//                 <option value="Beginner to Intermediate">
//                   Beginner to Intermediate
//                 </option>
//                 <option value="Intermediate to Advanced">
//                   Intermediate to Advanced
//                 </option>
//                 <option value="Beginner to Advanced">
//                   Beginner to Advanced
//                 </option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* --- 3. HIGHLIGHTS & AUDIENCE --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <h2 className="section-title">3. Highlights & Audience</h2>

//           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
//             <TagInput
//               label="Badges"
//               name="badges"
//               value={basicInfo.badges}
//               onChange={handleBasicChange}
//               placeholder="e.g. Bestseller, New"
//             />
//             <TagInput
//               label="Hero Features (What We'll Provide)"
//               name="heroFeatures"
//               value={basicInfo.heroFeatures}
//               onChange={handleBasicChange}
//               placeholder="e.g. 100% Placement Support"
//             />
//           </div>

//           <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
//             <TagInput
//               label="Skills You Will Learn"
//               name="skills"
//               value={basicInfo.skills}
//               onChange={handleBasicChange}
//               placeholder="e.g. React, Node.js"
//             />
//             <TagInput
//               label="Target Audience"
//               name="targetAudience"
//               value={basicInfo.targetAudience}
//               onChange={handleBasicChange}
//               placeholder="e.g. learners, Professionals"
//             />
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

//         {/* --- 4. OUTCOMES --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <h2 className="section-title">4. Course Outcomes</h2>
//           <p className="mb-4 text-sm text-slate-500">
//             Explain what learners will be able to do after completing this
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
//               onClick={() =>
//                 addItem(setCurriculum, { title: "", details: "", sections: [] })
//               }
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Module
//             </button>
//           </div>

//           <div className="space-y-8">
//             {curriculum.map((module, mIdx) => (
//               <div
//                 key={mIdx}
//                 className="flex flex-col gap-4 p-6 border bg-slate-50 border-slate-200 rounded-xl"
//               >
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-sm font-bold tracking-wider text-blue-600 uppercase">
//                     Module #{mIdx + 1}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeItem(setCurriculum, mIdx)}
//                     className="btn-delete"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>

//                 <div className="grid gap-3">
//                   <input
//                     placeholder="Module Title"
//                     className="text-lg font-bold input-field"
//                     value={module.title}
//                     onChange={(e) =>
//                       updateItem(setCurriculum, mIdx, "title", e.target.value)
//                     }
//                   />
//                 </div>

//                 <div className="pl-4 mt-4 space-y-6 border-l-2 border-slate-200">
//                   <label className="text-xs font-bold uppercase text-slate-500">
//                     Sections within Module
//                   </label>

//                   {module.sections &&
//                     module.sections.map((section, sIdx) => (
//                       <div
//                         key={sIdx}
//                         className="relative p-6 bg-white border rounded-lg shadow-sm border-slate-200"
//                       >
//                         <button
//                           type="button"
//                           onClick={() => removeSection(mIdx, sIdx)}
//                           className="absolute text-red-300 top-4 right-4 hover:text-red-500"
//                         >
//                           <Trash2 size={18} />
//                         </button>

//                         <div className="pr-8 mb-6">
//                           <label className="block mb-1 text-xs font-bold uppercase text-slate-400">
//                             Section Title
//                           </label>
//                           <input
//                             className="font-semibold input-field"
//                             value={section.title}
//                             onChange={(e) =>
//                               updateSection(mIdx, sIdx, "title", e.target.value)
//                             }
//                           />
//                         </div>

//                         <div className="grid grid-cols-1 gap-6">
//                           <div>
//                             <label className="block mb-2 text-xs font-bold uppercase text-slate-400">
//                               Core Concepts
//                             </label>
//                             <div className="editor-wrapper min-h-[150px]">
//                               <CustomEditor
//                                 data={section.concepts}
//                                 onChange={(d) =>
//                                   updateSection(mIdx, sIdx, "concepts", d)
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="block mb-2 text-xs font-bold uppercase text-slate-400">
//                               Hands-on Labs
//                             </label>
//                             <div className="editor-wrapper min-h-[150px]">
//                               <CustomEditor
//                                 data={section.labs}
//                                 onChange={(d) =>
//                                   updateSection(mIdx, sIdx, "labs", d)
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <TagInput
//                               label="Tools & Software Used"
//                               name="tools"
//                               value={section.tools}
//                               onChange={(e) =>
//                                 updateSection(
//                                   mIdx,
//                                   sIdx,
//                                   "tools",
//                                   e.target.value
//                                 )
//                               }
//                               placeholder="e.g. Python, Gemini API"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     ))}

//                   <button
//                     type="button"
//                     onClick={() => addSection(mIdx)}
//                     className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
//                   >
//                     <Plus size={16} /> Add Section
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 6. CAPSTONE PROJECTS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">6. Capstone Projects</h2>
//             <button
//               type="button"
//               onClick={() =>
//                 addItem(setCapstones, { title: "", details: "", tools: "" })
//               }
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
//                     className="font-bold input-field"
//                     value={item.title}
//                     onChange={(e) =>
//                       updateItem(setCapstones, idx, "title", e.target.value)
//                     }
//                   />
//                   <TagInput
//                     label="Tools Used"
//                     name="tools"
//                     value={item.tools}
//                     onChange={(e) =>
//                       updateItem(setCapstones, idx, "tools", e.target.value)
//                     }
//                     placeholder="e.g. Python, LangChain"
//                   />
//                   <label className="text-xs font-bold uppercase text-slate-500">
//                     Project Details
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

//         {/* ---7. PROGRAM LEADERS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 text-lg font-bold tracking-wide text-blue-600 uppercase">
//               7. Program Leaders
//             </h2>
//             <button
//               type="button"
//               onClick={() =>
//                 addItem(setLeaders, {
//                   name: "",
//                   company: "",
//                   image: "",
//                 })
//               }
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Leader
//             </button>
//           </div>
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             {leaders.map((item, idx) => (
//               <div key={idx} className="relative pt-10 repeater-card">
//                 {/* STATIC ROLE LABEL based on Index */}
//                 <span className="absolute top-0 left-0 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase bg-slate-800 rounded-br-lg">
//                   {idx === 0
//                     ? "Program Director"
//                     : idx === 1
//                     ? "Program Manager"
//                     : `Leader #${idx + 1}`}
//                 </span>

//                 <button
//                   type="button"
//                   onClick={() => removeItem(setLeaders, idx)}
//                   className="absolute top-2 right-2 btn-delete-small"
//                 >
//                   <Trash2 size={14} />
//                 </button>

//                 <div className="w-full p-4 space-y-3">
//                   {/* INPUT: Name */}
//                   <input
//                     placeholder="Full Name"
//                     className="input-field"
//                     value={item.name}
//                     onChange={(e) =>
//                       updateItem(setLeaders, idx, "name", e.target.value)
//                     }
//                   />

//                   {/* INPUT: Company */}
//                   <input
//                     placeholder="Company / Credentials"
//                     className="input-field"
//                     value={item.company}
//                     onChange={(e) =>
//                       updateItem(setLeaders, idx, "company", e.target.value)
//                     }
//                   />

//                   {/* INPUT: Image */}
//                   <ImageUpload
//                     label="Profile Photo"
//                     value={item.image}
//                     onChange={(url) =>
//                       updateItem(setLeaders, idx, "image", url)
//                     }
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- 8. INSTRUCTORS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">8. Instructors</h2>
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

//         {/* --- 9. JOB ROLES --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">9. Career Opportunities</h2>
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

//         {/* --- 10. REVIEWS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">10. Student Reviews</h2>
//             <button
//               type="button"
//               onClick={() =>
//                 addItem(setReviews, {
//                   name: "",
//                   role: "",
//                   text: "",
//                   image: "",
//                 })
//               }
//               className="btn-add"
//             >
//               <Plus size={16} /> Add Review
//             </button>
//           </div>
//           <div className="space-y-6">
//             {reviews.map((item, idx) => (
//               <div key={idx} className="relative pt-10 repeater-card">
//                 <button
//                   type="button"
//                   onClick={() => removeItem(setReviews, idx)}
//                   className="absolute top-2 right-2 btn-delete-small"
//                 >
//                   <Trash2 size={16} />
//                 </button>
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
//                   <div className="overflow-hidden border rounded-lg border-slate-200">
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

//         {/* --- 11. FAQS --- */}
//         <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
//           <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//             <h2 className="mb-0 section-title">11. FAQs</h2>
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
//               <div
//                 key={idx}
//                 className="relative p-6 border bg-slate-50 rounded-xl border-slate-100"
//               >
//                 <input
//                   placeholder="Question?"
//                   className="w-full mb-4 font-bold input-field"
//                   value={item.q}
//                   onChange={(e) =>
//                     updateItem(setFaqs, idx, "q", e.target.value)
//                   }
//                 />
//                 <div className="overflow-hidden border rounded-lg border-slate-200">
//                   <CustomEditor
//                     data={item.a}
//                     onChange={(d) => updateItem(setFaqs, idx, "a", d)}
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => removeItem(setFaqs, idx)}
//                   className="absolute top-2 right-2 btn-delete-small"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SUBMIT BUTTON */}
//         <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-50 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:ml-64">
//           <button
//             type="submit"
//             className="flex items-center gap-3 px-12 py-3 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 hover:-translate-y-1"
//           >
//             <Save size={24} /> {status || "Update Course"}
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
//           background: #ffffff;
//           font-size: 0.95rem;
//           outline: none;
//           transition: all 0.2s;
//         }
//         .input-field:focus {
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
//         }
//         .btn-add {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #eff6ff;
//           color: #2563eb;
//           padding: 0.5rem 1rem;
//           border-radius: 0.5rem;
//           font-size: 0.8rem;
//           font-weight: 700;
//           transition: background 0.2s;
//         }
//         .btn-add:hover {
//           background: #dbeafe;
//         }
//         .btn-delete {
//           color: #ef4444;
//           padding: 0.5rem;
//           background: #fee2e2;
//           border-radius: 0.5rem;
//         }
//         .btn-delete:hover {
//           background: #fecaca;
//         }
//         .btn-delete-small {
//           color: #ef4444;
//           padding: 0.25rem;
//           border-radius: 0.25rem;
//           background: white;
//           box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//         }
//         .btn-delete-small:hover {
//           background: #fee2e2;
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
//         .editor-wrapper {
//           border: 1px solid #e2e8f0;
//           border-radius: 0.5rem;
//           overflow: hidden;
//           background: white;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
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
        const newValue = value ? `${value},${trimmed}` : trimmed;
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

export default function EditCourse({ params }) {
  const router = useRouter();
  // Unwrap params for Next.js 15+
  const { slug } = React.use(params);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [courseId, setCourseId] = useState(null);

  // --- 1. BASIC INFO STATE ---
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    slug: "",
    category: "",
    image: "",
    rating: "",
    duration: "",
    fee: "",
    discount: "0", // NEW: Discount Percentage
    nextBatch: "",
    level: "",
    badges: "",
    heroFeatures: "",
    skills: "",
    targetAudience: "",
    subtitle: "",
    prerequisites: "",
    outcomes: "",
  });

  // --- 2. PROGRAM DETAILS STATE ---
  const [programDetails, setProgramDetails] = useState({
    type: "",
    mode: "",
    smeCriteria: [""],
    certCriteria: [""],
  });

  // --- 3. DYNAMIC LISTS STATE ---
  const [curriculum, setCurriculum] = useState([]);
  const [capstones, setCapstones] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`
        );
        if (!res.ok) throw new Error("Course not found");

        const data = await res.json();
        setCourseId(data._id);

        setBasicInfo({
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "",
          image: data.image || "",
          bannerImage: data.bannerImage || "",
          rating: data.rating || "",
          duration: data.duration || "",
          fee: data.fee ? data.fee.toString().replace(/[^0-9]/g, "") : "", // Clean Fee
          discount: data.discount ? data.discount.toString() : "0", // Load Discount
          nextBatch: data.nextBatch || "",
          level: data.level || "",
          badges: data.badges ? data.badges.join(",") : "",
          heroFeatures: data.heroFeatures ? data.heroFeatures.join(",") : "",
          skills: data.skills ? data.skills.join(",") : "",
          targetAudience: data.targetAudience
            ? data.targetAudience.join(",")
            : "",
          subtitle: data.subtitle || "",
          prerequisites: data.prerequisites || "",
          outcomes: data.outcomes || "",
        });

        setProgramDetails(
          data.programDetails || {
            type: "",
            mode: "",
            smeCriteria: [""],
            certCriteria: [""],
          }
        );

        const formattedCurriculum = (data.curriculum || []).map((mod) => ({
          ...mod,
          sections: (mod.sections || []).map((sec) => ({
            ...sec,
            tools: Array.isArray(sec.tools)
              ? sec.tools.join(",")
              : sec.tools || "",
          })),
        }));
        setCurriculum(formattedCurriculum);

        const formattedCapstones = (data.capstones || []).map((cap) => ({
          ...cap,
          tools: Array.isArray(cap.tools)
            ? cap.tools.join(",")
            : cap.tools || "",
        }));
        setCapstones(formattedCapstones);
        setLeaders(data.leaders || []);
        setInstructors(data.instructors || []);
        setJobRoles(data.jobRoles || []);
        setReviews(data.reviews || []);
        setFaqs(data.faqs || []);

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load course data");
        router.push("/admin");
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug, router]);

  // --- HANDLERS ---
  const handleBasicChange = (e) =>
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

  const handleEditorChange = (field, data) =>
    setBasicInfo((prev) => ({ ...prev, [field]: data }));

  const handleHeroImageChange = (url) =>
    setBasicInfo((prev) => ({ ...prev, image: url }));

  const handleBannerImageChange = (url) =>
    setBasicInfo((prev) => ({ ...prev, bannerImage: url }));

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

  const addSection = (modIdx) => {
    const updated = [...curriculum];
    if (!updated[modIdx].sections) updated[modIdx].sections = [];
    updated[modIdx].sections.push({
      title: "",
      concepts: "",
      labs: "",
      tools: "",
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

  // --- HELPERS FOR PRICING PREVIEW ---
  const calculatePricing = () => {
    const original = parseInt(basicInfo.fee.replace(/[^0-9]/g, "")) || 0;
    const discPercent = parseInt(basicInfo.discount) || 0;
    const finalPrice = Math.round(original * (1 - discPercent / 100));
    // Based on your frontend logic: Application fee is 5% of the Final (Discounted) Price
    const appFee = Math.round(finalPrice * 0.05);
    return { original, finalPrice, appFee };
  };
  const pricingData = calculatePricing();

  // --- SUBMIT UPDATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Updating...");

    try {
      const payload = {
        ...basicInfo,
        fee: basicInfo.fee.toString().replace(/[^0-9]/g, ""),
        discount: basicInfo.discount,

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
              ? sec.tools
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [],
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
        leaders,
        instructors,
        jobRoles,
        reviews,
        faqs,
      };

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
        setStatus("");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server Error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold text-slate-500 animate-pulse">
          Loading Course Data...
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-slate-900">Edit Course</h1>
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
                value={basicInfo.title}
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
                value={basicInfo.slug}
              />
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
                <option value="Deep-Tech AI">Deep-Tech AI</option>
                <option value="AI for Leadership">AI for Leadership</option>
                <option value="Workplace productivity">
                  Workplace productivity
                </option>
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
            <div className="form-group">
              <ImageUpload
                label="Banner Image"
                value={basicInfo.bannerImage}
                onChange={handleBannerImageChange}
              />
            </div>
          </div>
        </div>

        {/* --- 2. PRICING & STATS (UPDATED WITH DISCOUNT LOGIC) --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">2. Pricing & Stats</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Row 1 */}
            <div className="form-group">
              <label>Original Fee (₹)</label>
              <input
                name="fee"
                type="number"
                onChange={handleBasicChange}
                className="input-field"
                placeholder="e.g. 50000"
                value={basicInfo.fee}
              />
            </div>

            <div className="form-group">
              <label>Discount (%)</label>
              <select
                name="discount"
                value={basicInfo.discount}
                onChange={handleBasicChange}
                className="bg-white input-field"
              >
                <option value="0">0% (No Discount)</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30">30%</option>
                <option value="40">40%</option>
                <option value="50">50%</option>
              </select>
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                name="duration"
                onChange={handleBasicChange}
                className="input-field"
                value={basicInfo.duration}
              />
            </div>

            {/* LIVE PREVIEW BOX */}
            <div className="p-4 border border-blue-100 rounded-lg md:col-span-3 bg-blue-50">
              <h4 className="mb-3 text-xs font-bold tracking-widest text-blue-600 uppercase">
                Pricing Preview (Live Calculation)
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block text-slate-500">Original Fee</span>
                  <span className="text-lg font-bold line-through text-slate-400">
                    ₹{pricingData.original.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500">
                    Final Student Fee
                  </span>
                  <span className="text-xl font-bold text-slate-900">
                    ₹{pricingData.finalPrice.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500">
                    Application Fee (5%)
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{pricingData.appFee.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-group">
              <label>Rating</label>
              <input
                name="rating"
                onChange={handleBasicChange}
                className="input-field"
                value={basicInfo.rating}
              />
            </div>

            <div className="form-group">
              <label>Next Batch</label>
              <input
                type="date"
                name="nextBatch"
                onChange={handleBasicChange}
                className="input-field"
                value={basicInfo.nextBatch}
              />
            </div>

            <div className="form-group">
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

        {/* --- 3. HIGHLIGHTS & AUDIENCE --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">3. Highlights & Audience</h2>

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
              placeholder="e.g. React, Node.js"
            />
            <TagInput
              label="Target Audience"
              name="targetAudience"
              value={basicInfo.targetAudience}
              onChange={handleBasicChange}
              placeholder="e.g. learners, Professionals"
            />
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

        {/* --- 4. OUTCOMES --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <h2 className="section-title">4. Course Outcomes</h2>
          <p className="mb-4 text-sm text-slate-500">
            Explain what learners will be able to do after completing this
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
                            value={section.title}
                            onChange={(e) =>
                              updateSection(mIdx, sIdx, "title", e.target.value)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label className="block mb-2 text-xs font-bold uppercase text-slate-400">
                              Core Concepts
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
                          <div>
                            <label className="block mb-2 text-xs font-bold uppercase text-slate-400">
                              Hands-on Labs
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
                              placeholder="e.g. Python, Gemini API"
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

        {/* ... (REMAINING SECTIONS: CAPSTONES, LEADERS, INSTRUCTORS, JOB ROLES, REVIEWS, FAQS ARE THE SAME) ... */}
        {/* --- 6. CAPSTONE PROJECTS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">6. Capstone Projects</h2>
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
                  <label className="text-xs font-bold uppercase text-slate-500">
                    Project Title
                  </label>
                  <input
                    className="font-bold input-field"
                    value={item.title}
                    onChange={(e) =>
                      updateItem(setCapstones, idx, "title", e.target.value)
                    }
                  />
                  <TagInput
                    label="Tools Used"
                    name="tools"
                    value={item.tools}
                    onChange={(e) =>
                      updateItem(setCapstones, idx, "tools", e.target.value)
                    }
                    placeholder="e.g. Python, LangChain"
                  />
                  <label className="text-xs font-bold uppercase text-slate-500">
                    Project Details
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

        {/* ---7. PROGRAM LEADERS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 text-lg font-bold tracking-wide text-blue-600 uppercase">
              7. Program Leaders
            </h2>
            <button
              type="button"
              onClick={() =>
                addItem(setLeaders, {
                  name: "",
                  company: "",
                  image: "",
                })
              }
              className="btn-add"
            >
              <Plus size={16} /> Add Leader
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {leaders.map((item, idx) => (
              <div key={idx} className="relative pt-10 repeater-card">
                <span className="absolute top-0 left-0 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase bg-slate-800 rounded-br-lg">
                  {idx === 0
                    ? "Program Director"
                    : idx === 1
                    ? "Program Manager"
                    : `Leader #${idx + 1}`}
                </span>

                <button
                  type="button"
                  onClick={() => removeItem(setLeaders, idx)}
                  className="absolute top-2 right-2 btn-delete-small"
                >
                  <Trash2 size={14} />
                </button>

                <div className="w-full p-4 space-y-3">
                  <input
                    placeholder="Full Name"
                    className="input-field"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(setLeaders, idx, "name", e.target.value)
                    }
                  />
                  <input
                    placeholder="Company / Credentials"
                    className="input-field"
                    value={item.company}
                    onChange={(e) =>
                      updateItem(setLeaders, idx, "company", e.target.value)
                    }
                  />
                  <ImageUpload
                    label="Profile Photo"
                    value={item.image}
                    onChange={(url) =>
                      updateItem(setLeaders, idx, "image", url)
                    }
                  />
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

        {/* --- 10. REVIEWS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">10. Student Reviews</h2>
            <button
              type="button"
              onClick={() =>
                addItem(setReviews, {
                  name: "",
                  role: "",
                  text: "",
                  image: "",
                })
              }
              className="btn-add"
            >
              <Plus size={16} /> Add Review
            </button>
          </div>
          <div className="space-y-6">
            {reviews.map((item, idx) => (
              <div key={idx} className="relative pt-10 repeater-card">
                <button
                  type="button"
                  onClick={() => removeItem(setReviews, idx)}
                  className="absolute top-2 right-2 btn-delete-small"
                >
                  <Trash2 size={16} />
                </button>
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

        {/* --- 11. FAQS --- */}
        <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <h2 className="mb-0 section-title">11. FAQs</h2>
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

        {/* SUBMIT BUTTON */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-50 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:ml-64">
          <button
            type="submit"
            className="flex items-center gap-3 px-12 py-3 text-lg font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 hover:-translate-y-1"
          >
            <Save size={24} /> {status || "Update Course"}
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
          background: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
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
          border-radius: 0.25rem;
          background: white;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .btn-delete-small:hover {
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
        .editor-wrapper {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          overflow: hidden;
          background: white;
        }
      `}</style>
    </div>
  );
}