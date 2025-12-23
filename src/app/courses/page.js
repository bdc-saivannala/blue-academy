"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  Clock,
  ChevronDown,
  ChevronRight,
  Filter,
  Users,
  ArrowRight,
} from "lucide-react";

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FILTER STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  // Add other filter states (Duration, Level) if your backend data supports them

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        if (res.ok) {
          const data = await res.json();
          window.__BDC_PAGE_PAYLOAD__ = {
            type: "course_list",
            status: "ready",
            data,
          };
          setAllCourses(data);
          setFilteredCourses(data);
        }
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // --- 2. EXTRACT DYNAMIC FILTERS ---
  const categories = useMemo(() => {
    return [...new Set(allCourses.map((c) => c.category).filter(Boolean))];
  }, [allCourses]);

  // --- 3. FILTER LOGIC ---
  useEffect(() => {
    let result = allCourses;

    // Search Filter
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter((course) =>
        selectedCategories.includes(course.category)
      );
    }

    // Rating Filter (Logic: Course rating >= Selected rating)
    if (selectedRatings.length > 0) {
      result = result.filter((course) => {
        const courseRating = parseFloat(course.rating || 0);
        return selectedRatings.some((r) => courseRating >= r);
      });
    }

    setFilteredCourses(result);
  }, [allCourses, searchQuery, selectedCategories, selectedRatings]);

  // --- HANDLERS ---
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedRatings([]);
  };

  return (
    <div className="min-h-screen font-sans bg-[#F8F9FC] text-slate-900">
      {/* HEADER SECTION */}
      <div className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="px-6 mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-extrabold text-slate-900">
            Browse Courses
          </h1>
          <p className="max-w-2xl mb-8 text-lg text-slate-500">
            Expand your horizons with our expertly crafted courses. From coding
            basics to advanced system design, find the perfect path for your
            career growth.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-xl">
            <Search
              className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for courses, skills, or instructors..."
              className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white text-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          <aside className="w-full space-y-8 lg:w-64 shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Filters</h3>
              <button
                onClick={handleReset}
                className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="mb-4 text-xs font-bold tracking-wider uppercase text-slate-400">
                Category
              </h4>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        selectedCategories.includes(cat)
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-slate-300 group-hover:border-blue-400"
                      }`}
                    >
                      {selectedCategories.includes(cat) && (
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span
                      className={`text-sm ${
                        selectedCategories.includes(cat)
                          ? "font-bold text-slate-900"
                          : "text-slate-600"
                      }`}
                    >
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="mb-4 text-xs font-bold tracking-wider uppercase text-slate-400">
                Rating
              </h4>
              <div className="space-y-3">
                {[4.5, 4.0, 3.5].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        selectedRatings.includes(rating)
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-slate-300 group-hover:border-blue-400"
                      }`}
                    >
                      {selectedRatings.includes(rating) && (
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleRating(rating)}
                    />
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-sm ${
                          selectedRatings.includes(rating)
                            ? "font-bold text-slate-900"
                            : "text-slate-600"
                        }`}
                      >
                        {rating} & up
                      </span>
                      <Star
                        size={12}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* --- RIGHT SIDE (COURSE GRID) --- */}
          <div className="flex-1">
            {loading ? (
              <div className="py-20 text-center text-slate-400">
                Loading courses...
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                No courses found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Link
                    href={`/courses/${course.slug}`} // Assuming we want it clickable
                    key={course._id}
                    className="group flex flex-col h-full bg-white border rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
                  >
                    {/* 2. IMAGE ON TOP */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={
                          course.image ||
                          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={course.title}
                        className="object-cover w-full h-full p-2 transition-transform duration-500 rounded-2xl group-hover:scale-110"
                      />
                    </div>

                    {/* CONTENT BODY */}
                    <div className="flex flex-col flex-1 p-5">
                      {/* 3. DURATION & ENROLLMENT ROW */}
                      <div className="flex items-center justify-between mb-3 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-400" />
                          <span>{course.duration || "3 Months"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-slate-400" />
                          <span>2.5k Enrolled</span>{" "}
                          {/* Static/Mocked as data might not exist */}
                        </div>
                      </div>

                      {/* 4. COURSE TITLE */}
                      <h3 className="mb-2 text-lg font-bold leading-snug transition-colors text-slate-900 line-clamp-2 group-hover:text-blue-600">
                        {course.title}
                      </h3>

                      {/* 5. COURSE DESCRIPTION */}
                      <div
                        className="mb-2 text-sm leading-relaxed text-slate-600 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            course.subtitle?.replace(/<[^>]+>/g, "") ||
                            "Master the skills needed to launch your tech career.",
                        }}
                      />

                      {/* 6. SKILLS & ARROW ROW */}
                      <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-100">
                        {/* Skills (Left) */}
                        <div className="flex flex-wrap gap-2">
                          {/* Display only the first skill to keep layout clean, or mapping slice */}
                          {course.skills && course.skills.length > 1 ? (
                            <span className="px-2 py-1 text-xs font-medium text-blue-700 rounded bg-blue-50">
                              {course.skills[0]}
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-slate-500">
                              Certificate Program
                            </span>
                          )}
                          {course.skills && course.skills.length > 1 && (
                            <span className="px-1 py-1 text-xs font-medium text-slate-500">
                              +{course.skills.length - 1}
                            </span>
                          )}
                        </div>

                        {/* Right Arrow (Right) */}
                        <div className="flex items-center justify-center w-8 h-8 transition-all rounded-full bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination (Visual Only for now) */}
            {filteredCourses.length > 0 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  className="flex items-center justify-center w-10 h-10 transition-colors border rounded-lg border-slate-200 text-slate-400 hover:bg-white hover:text-slate-600 disabled:opacity-50"
                  disabled
                >
                  <ChevronDown className="rotate-90" size={16} />
                </button>
                <button className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                  1
                </button>
                <button className="flex items-center justify-center w-10 h-10 transition-colors border rounded-lg border-slate-200 text-slate-600 hover:bg-white">
                  2
                </button>
                <button className="flex items-center justify-center w-10 h-10 transition-colors border rounded-lg border-slate-200 text-slate-600 hover:bg-white">
                  3
                </button>
                <button className="flex items-center justify-center w-10 h-10 transition-colors border rounded-lg border-slate-200 text-slate-600 hover:bg-white hover:text-blue-600">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
