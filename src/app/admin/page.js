"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Trash2,
  Edit,
  Plus,
  Users,
  Eye,
  X,
  Mail,
  Phone,
  Calendar,
  Search,
} from "lucide-react";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("general"); // 'general', 'candidates', 'courses'
  const [loading, setLoading] = useState(true);

  // Data States
  const [generalInquiries, setGeneralInquiries] = useState([]);
  const [courseCandidates, setCourseCandidates] = useState([]);
  const [courses, setCourses] = useState([]);

  // Modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (tabParam === "courses") setActiveTab("courses");
    else if (tabParam === "candidates")
      setActiveTab("candidates"); // Optional third tab
    else setActiveTab("general");
  }, [tabParam]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactRes, appRes, courseRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`),
      ]);
      setGeneralInquiries(await contactRes.json());
      setCourseCandidates(await appRes.json());
      setCourses(await courseRes.json());
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const openCandidateModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const getCandidateCount = (slug) =>
    courseCandidates.filter((c) => c.courseSlug === slug).length;

  if (loading)
    return <div className="p-10 text-slate-400 font-bold">Loading Data...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {activeTab === "courses"
              ? "Manage Courses"
              : "Inquiries & Applications"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {activeTab === "courses"
              ? "Create, update or remove courses."
              : "View who has contacted you."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {activeTab === "courses" && (
            <Link
              href="/admin/create-course"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
            >
              <Plus size={18} /> Create Course
            </Link>
          )}
        </div>
      </div>

      {/* --- TAB 1: GENERAL INQUIRIES --- */}
      {activeTab === "general" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-700">Recent Inquiries</h3>
            <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded">
              {generalInquiries.length} Total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                    Name
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                    Contact
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                    Message
                  </th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {generalInquiries.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 font-bold text-slate-800">
                      {inquiry.name}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} /> {inquiry.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <Phone size={14} /> {inquiry.phone}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 max-w-xs truncate">
                      {inquiry.message}
                    </td>
                    <td className="p-4 text-xs font-bold text-slate-500">
                      {new Date(inquiry.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 2: COURSES --- */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider">
                  {course.category}
                </span>
                <div className="flex gap-1">
                  <Link
                    href={`/admin/edit-course/${course.slug}`}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Batch:{" "}
                <span className="font-semibold text-slate-700">
                  {course.nextBatch}
                </span>
              </p>

              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Users size={16} className="text-blue-500" />
                  {getCandidateCount(course.slug)} Students
                </div>
                <button
                  onClick={() => openCandidateModal(course)}
                  className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  View List <Eye size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Registered Candidates
                </h2>
                <p className="text-sm text-slate-500">
                  Course:{" "}
                  <span className="font-bold text-blue-600">
                    {selectedCourse.title}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-0">
              <table className="w-full text-left">
                <thead className="bg-white sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase text-slate-500 bg-slate-50">
                      Name
                    </th>
                    <th className="p-4 text-xs font-bold uppercase text-slate-500 bg-slate-50">
                      Details
                    </th>
                    <th className="p-4 text-xs font-bold uppercase text-slate-500 bg-slate-50">
                      Experience
                    </th>
                    <th className="p-4 text-xs font-bold uppercase text-slate-500 bg-slate-50">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courseCandidates
                    .filter((c) => c.courseSlug === selectedCourse.slug)
                    .map((candidate) => (
                      <tr key={candidate._id} className="hover:bg-blue-50/50">
                        <td className="p-4 font-bold text-slate-800">
                          {candidate.name}
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-slate-600">
                            {candidate.email}
                          </div>
                          <div className="text-xs text-slate-400">
                            {candidate.phone}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                            {candidate.experience}
                          </span>
                        </td>
                        <td className="p-4 text-xs font-bold text-slate-500">
                          {new Date(candidate.submittedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
