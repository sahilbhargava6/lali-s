"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, User, Search, BookOpen, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-24 md:pt-28 pb-16 md:pb-20">
      {/* HEADER SECTION */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-slate-900 text-white relative overflow-hidden mb-10 md:mb-12">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D22027] skew-x-[-15deg] opacity-10 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 sm:w-12 h-1 bg-[#D22027] shrink-0"></div>
            <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#D22027]">Lali's Buildmart</span>
            <div className="w-8 sm:w-12 h-1 bg-[#D22027] shrink-0"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-4 md:mb-6">
            Insights & <span className="text-yellow-400">Industry News</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Stay updated with construction guides, materials selection tips, interior inspirations, and updates from the industry experts.
          </p>
        </div>
      </section>

      {/* BLOG FEED CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 md:mb-16 relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-[#D22027] rounded-full px-6 py-3.5 pl-12 text-slate-800 focus:outline-none transition-all shadow-md focus:shadow-lg"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-[#D22027] mb-4" />
            <span className="font-bold text-sm">Loading articles...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 max-w-lg mx-auto shadow-md">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#111111] mb-2">No articles found</h3>
            <p className="text-gray-500 text-sm">
              We couldn't find any blog posts matching your search query. Try searching for another keyword.
            </p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBlogs.map((blog) => (
              <article 
                key={blog.id} 
                className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-48 sm:h-56 overflow-hidden relative bg-slate-200">
                  <img 
                    src={blog.image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category / Date Tag */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1.5 shadow-sm text-[11px] font-bold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-[#D22027]" />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold mb-3 uppercase tracking-wider">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>{blog.author || "Lali's Buildmart Admin"}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-[#111111] leading-tight mb-3 group-hover:text-[#D22027] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.summary}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#D22027]">BUILDMART INSIGHTS</span>
                    <Link 
                      href={`/blog/${blog.id}`}
                      className="text-[#D22027] group-hover:translate-x-1.5 transition-transform duration-300 font-black text-sm flex items-center gap-1"
                    >
                      Read Post <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
