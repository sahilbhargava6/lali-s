"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, User, BookOpen, Loader2 } from "lucide-react";
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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setBlog(data);
      } catch (err: any) {
        console.error("Failed to load blog post:", err);
        setErrorMsg(err.message || "Failed to load the article.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-28 pb-12">
        <Loader2 className="w-10 h-10 animate-spin text-[#D22027] mb-4" />
        <span className="font-bold text-sm text-slate-500">Loading article...</span>
      </div>
    );
  }

  if (errorMsg || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-28 pb-12 px-4">
        <div className="bg-white border border-slate-100 p-8 rounded-3xl max-w-md w-full shadow-lg text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#111111] mb-2">Article Not Found</h3>
          <p className="text-gray-500 text-sm mb-6">
            The blog post you are looking for does not exist or may have been deleted by the administrator.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 bg-[#D22027] hover:bg-[#b01920] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-lg shadow-red-500/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Navigation Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#D22027] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
          
          {/* Header Image */}
          <div className="h-[300px] md:h-[450px] w-full relative bg-slate-200">
            <img 
              src={blog.image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Meta & Title */}
          <div className="px-6 py-8 md:p-12 border-b border-slate-100">
            <div className="flex flex-wrap gap-4 items-center text-xs font-bold text-gray-500 mb-6 uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span>{blog.author || "Lali's Buildmart Admin"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-[#111111] leading-tight tracking-tight">
              {blog.title}
            </h1>

            <p className="mt-6 text-gray-500 text-lg font-semibold leading-relaxed border-l-4 border-[#D22027] pl-4">
              {blog.summary}
            </p>
          </div>

          {/* Main Body Content */}
          <div className="px-6 py-10 md:p-12">
            <div className="text-slate-700 text-base md:text-lg leading-relaxed whitespace-pre-line font-sans space-y-6">
              {blog.content}
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="px-6 py-8 md:px-12 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800">
            <div>
              <h4 className="font-black text-lg md:text-xl">Need materials for your project?</h4>
              <p className="text-sm text-gray-400 mt-1">Get in touch with Lali's Buildmart for priority bulk order quotes.</p>
            </div>
            <Link 
              href="/contact" 
              className="bg-[#D22027] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#b01920] transition-colors shadow-lg shadow-red-500/20 shrink-0"
            >
              Get Free Quote
            </Link>
          </div>

        </div>

      </div>
    </article>
  );
}
