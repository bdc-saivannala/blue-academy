import React from "react";
import {
  Target,
  Eye,
  Users,
  Award,
  Globe,
  Linkedin,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/Navbar"; // Ensure you have the Navbar imported

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO HEADER */}
      <section className="bg-[#0B1120] text-white pt-32 pb-20 text-center px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="block mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase">
            Since 2025
          </span>
          <h1 className="mb-6 text-4xl font-extrabold md:text-5xl">
            About Blue Academy
          </h1>
          <p className="text-lg leading-relaxed text-slate-300">
            We are building the workforce of tomorrow through innovation,
            excellence, and industry-aligned education.
          </p>
        </div>
      </section>

      {/* 2. ABOUT BLUE ACADEMY (Who We Are) */}
      <section className="px-6 py-20 mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image / Graphic */}
          <div className="relative">
            <div className="relative overflow-hidden shadow-2xl aspect-square bg-slate-200 rounded-3xl">
              {/* Replace with actual office or team image */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Blue Academy Team"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-blue-900/20"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute max-w-xs p-6 bg-white border shadow-xl -bottom-6 -right-6 rounded-xl border-slate-100">
              <p className="mb-1 text-4xl font-extrabold text-blue-600">100%</p>
              <p className="text-sm font-medium text-slate-600">
                Commitment to Student Success
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-900">
              Who We Are
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                Blue Academy is a premier EdTech institution dedicated to
                bridging the gap between academic learning and industry
                requirements. Established with a passion for technology and
                teaching, we focus on hands-on, practical skill development.
              </p>
              <p>
                We partner with top-tier technology companies to design
                curriculums that are relevant today and future-proof for
                tomorrow. From Data Science to Full Stack Development, our
                programs are rigorous, result-oriented, and recognized globally.
              </p>
            </div>

            {/* Key Stats (Other Details) */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-slate-200">
              <div>
                <span className="block text-2xl font-bold text-slate-900">
                  15k+
                </span>
                <span className="text-xs tracking-wide uppercase text-slate-500">
                  Students
                </span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-slate-900">
                  50+
                </span>
                <span className="text-xs tracking-wide uppercase text-slate-500">
                  Instructors
                </span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-slate-900">
                  4.9
                </span>
                <span className="text-xs tracking-wide uppercase text-slate-500">
                  Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Cards) */}
      <section className="px-6 py-20 bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mission Card */}
            <div className="p-10 transition-colors border bg-slate-800/50 border-slate-700 rounded-3xl hover:bg-slate-800 group">
              <div className="flex items-center justify-center mb-6 transition-transform bg-blue-600 w-14 h-14 rounded-2xl group-hover:scale-110">
                <Target className="text-white w-7 h-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Our Mission
              </h3>
              <p className="leading-relaxed text-slate-400">
                To democratize high-quality tech education and provide
                accessible, industry-relevant training to students worldwide,
                bridging the gap between academia and industry
                requirements[cite: 70].
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-10 transition-colors border bg-slate-800/50 border-slate-700 rounded-3xl hover:bg-slate-800 group">
              <div className="flex items-center justify-center mb-6 transition-transform bg-purple-600 w-14 h-14 rounded-2xl group-hover:scale-110">
                <Eye className="text-white w-7 h-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Our Vision</h3>
              <p className="leading-relaxed text-slate-400">
                To be the global leader in skill development, empowering 1
                million professionals by 2030 to create sustainable and
                innovative technology solutions[cite: 71].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAM DETAILS (Leadership) */}
      <section className="px-6 py-24 mx-auto text-center max-w-7xl">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Meet Our Leadership
          </h2>
          <p className="text-slate-600">
            Guided by industry veterans and visionary leaders committed to
            transforming education.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Team Member 1 */}
          <div className="p-6 transition-all bg-white border shadow-sm group rounded-2xl border-slate-100 hover:shadow-xl hover:-translate-y-1">
            <div className="w-32 h-32 mx-auto mb-6 overflow-hidden border-4 rounded-full border-blue-50">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="CEO"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Alex Johnson</h3>
            <p className="mb-4 text-sm font-medium text-blue-600">
              Founder & CEO
            </p>
            <p className="mb-6 text-sm text-slate-500">
              Ex-Google Engineer with 15+ years in EdTech and System
              Architecture.
            </p>
            <div className="flex justify-center gap-4 text-slate-400">
              <Linkedin
                size={20}
                className="transition-colors cursor-pointer hover:text-blue-700"
              />
              <Twitter
                size={20}
                className="transition-colors cursor-pointer hover:text-blue-400"
              />
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="p-6 transition-all bg-white border shadow-sm group rounded-2xl border-slate-100 hover:shadow-xl hover:-translate-y-1">
            <div className="w-32 h-32 mx-auto mb-6 overflow-hidden border-4 rounded-full border-blue-50">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="CTO"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Sarah Williams</h3>
            <p className="mb-4 text-sm font-medium text-blue-600">
              Head of Curriculum
            </p>
            <p className="mb-6 text-sm text-slate-500">
              PhD in Data Science from MIT. Passionate about AI ethics and
              research.
            </p>
            <div className="flex justify-center gap-4 text-slate-400">
              <Linkedin
                size={20}
                className="transition-colors cursor-pointer hover:text-blue-700"
              />
              <Twitter
                size={20}
                className="transition-colors cursor-pointer hover:text-blue-400"
              />
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="p-6 transition-all bg-white border shadow-sm group rounded-2xl border-slate-100 hover:shadow-xl hover:-translate-y-1">
            <div className="w-32 h-32 mx-auto mb-6 overflow-hidden border-4 rounded-full border-blue-50">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                alt="COO"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">David Chen</h3>
            <p className="mb-4 text-sm font-medium text-blue-600">
              Director of Partnerships
            </p>
            <p className="mb-6 text-sm text-slate-500">
              Former Strategy Lead at Microsoft. Expert in corporate relations.
            </p>
            <div className="flex justify-center gap-4 text-slate-400">
              <Linkedin
                size={20}
                className="transition-colors cursor-pointer hover:text-blue-700"
              />
              <Twitter
                size={20}
                className="transition-colors cursor-pointer hover:text-blue-400"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
