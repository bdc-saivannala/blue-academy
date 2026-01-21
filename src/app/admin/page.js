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
  ShoppingCart,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  BookOpen,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Data States
  const [generalInquiries, setGeneralInquiries] = useState([]);
  const [courseCandidates, setCourseCandidates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  // Modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (tabParam === "courses") setActiveTab("courses");
    else if (tabParam === "purchases") setActiveTab("purchases");
    else if (tabParam === "inquiries") setActiveTab("inquiries");
    else setActiveTab("overview");
  }, [tabParam]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactRes, appRes, courseRes, enrollRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments`),
      ]);

      setGeneralInquiries(await contactRes.json());
      setCourseCandidates(await appRes.json());
      setCourses(await courseRes.json());

      const enrollData = await enrollRes.json();
      setEnrollments(
        Array.isArray(enrollData) ? enrollData : enrollData.data || [],
      );

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const openCandidateModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // --- STATS CALCULATIONS ---
  const totalRevenue = enrollments
    .filter((e) => e.status === "Paid")
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const totalStudents = enrollments.filter((e) => e.status === "Paid").length;

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Paid Students",
      value: totalStudents,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Active Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Pending Inquiries",
      value: generalInquiries.length,
      icon: MessageSquare,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );

  return (
    <div className="mx-auto space-y-8 max-w-7xl">
      {/* 1. TOP STATS ROW (Always Visible) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-6 transition-shadow bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-md"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 2. PAGE HEADER (Dynamic based on Tab) */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          {activeTab === "overview" && "Dashboard Overview"}
          {activeTab === "purchases" && "Enrollments & Transactions"}
          {activeTab === "courses" && "Course Management"}
          {activeTab === "inquiries" && "Student Inquiries"}
        </h2>

        {/* Action Button for Course Tab */}
        {activeTab === "courses" && (
          <Link
            href="/admin/create-course"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-200"
          >
            <Plus size={18} /> Add New Course
          </Link>
        )}
      </div>

      {/* 3. CONTENT AREA */}

      {/* --- PURCHASES & ENROLLMENTS --- */}
      {(activeTab === "purchases" || activeTab === "overview") && (
        <div className="overflow-hidden bg-white border shadow-sm border-slate-200 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <ShoppingCart size={20} className="text-blue-600" />
              Recent Purchases
            </h3>
            <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">
              {enrollments.length} Records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50 border-slate-200 text-slate-500">
                <tr>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Student
                  </th>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Course
                  </th>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Amount
                  </th>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Status
                  </th>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrollments.length > 0 ? (
                  enrollments.map((enroll) => (
                    <tr
                      key={enroll._id}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      <td className="p-5">
                        <div className="font-bold text-slate-900">
                          {enroll.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {enroll.email}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {enroll.phone}
                        </div>
                      </td>
                      <td className="p-5 text-sm font-medium text-slate-700">
                        {enroll.courseTitle || "Unknown Course"}
                      </td>
                      <td className="p-5 font-bold text-slate-900">
                        ₹{enroll.amount.toLocaleString()}
                      </td>
                      <td className="p-5">
                        {enroll.status === "Paid" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle size={12} /> Paid
                          </span>
                        ) : enroll.status === "Initiated" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                            <Clock size={12} /> Initiated
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                            <XCircle size={12} /> Failed
                          </span>
                        )}
                      </td>
                      <td className="p-5 text-xs font-medium text-slate-500">
                        {new Date(enroll.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-slate-400">
                      No purchases found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- INQUIRIES --- */}
      {(activeTab === "inquiries" || activeTab === "overview") && (
        <div className="overflow-hidden bg-white border shadow-sm border-slate-200 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-slate-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Mail size={20} className="text-blue-600" />
              General Inquiries
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50 border-slate-200 text-slate-500">
                <tr>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    User
                  </th>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Contact
                  </th>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Message
                  </th>
                  <th className="p-5 text-xs font-bold tracking-wider uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {generalInquiries.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="p-5 font-bold text-slate-800">
                      {inquiry.name}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} /> {inquiry.email}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <Phone size={14} /> {inquiry.phone}
                      </div>
                    </td>
                    <td className="max-w-md p-5 text-sm truncate text-slate-600">
                      {inquiry.message}
                    </td>
                    <td className="p-5 text-xs font-bold text-slate-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- COURSES GRID --- */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-lg group"
            >
              {/* Course Image Header */}
              <div className="relative h-40 overflow-hidden bg-slate-100">
                {course.bannerImage ? (
                  <img
                    src={course.bannerImage}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-300">
                    <BookOpen size={40} />
                  </div>
                )}
                <div className="absolute flex gap-2 top-3 right-3">
                  <Link
                    href={`/admin/edit-course/${course.slug}`}
                    className="p-2 transition-colors rounded-lg shadow-sm bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="p-2 transition-colors rounded-lg shadow-sm bg-white/90 backdrop-blur text-slate-600 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold uppercase rounded-full shadow-lg">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Course Body */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="mb-2 text-lg font-bold text-slate-900 line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 mb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    ₹{course.fee}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-600">
                    <span className="text-blue-600">Batch:</span>{" "}
                    {course.nextBatch}
                  </div>
                  {/* View Candidates Button Logic (Optional) */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
