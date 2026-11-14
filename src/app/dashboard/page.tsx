"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Edit, Trash2, Eye, LayoutDashboard, FileText, CheckCircle2, 
  AlertCircle, Lock, KeyRound, Loader2, ArrowLeft, RefreshCw, 
  Sparkles, Image as ImageIcon, Upload, X, ExternalLink, Search,
  Calendar, User, ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  image_url: string;
  author: string;
  created_at: string;
}

export default function Dashboard() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState("");

  // Blogs and Form states
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Active tab: 'list' | 'editor'
  const [activeTab, setActiveTab] = useState<"list" | "editor">("list");
  
  // Editor state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("Lali's Buildmart Admin");

  // Image Upload state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adminPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "lali123";

  // Check auth on load
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
      fetchBlogs();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === adminPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      fetchBlogs();
    } else {
      setAuthError("Incorrect passcode. Please verify and try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to load blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setImageUrl("");
    setAuthor("Lali's Buildmart Admin");
    setShowUrlInput(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setSummary(blog.summary);
    setContent(blog.content);
    setImageUrl(blog.image_url || "");
    setAuthor(blog.author || "Lali's Buildmart Admin");
    setShowUrlInput(false);
    setActiveTab("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"? This cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      showNotification("success", "Blog post deleted successfully.");
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete post.");
    }
  };

  // Compress image client-side to ensure lightweight uploads
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/webp", 0.85);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("error", "Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    setIsUploadingImage(true);
    try {
      const compressedDataUrl = await compressImage(file);

      // Attempt upload to Supabase storage if the 'blog-images' bucket is configured
      try {
        const res = await fetch(compressedDataUrl);
        const blob = await res.blob();
        const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.webp`;

        const { data, error } = await supabase.storage
          .from("blog-images")
          .upload(fileName, blob, {
            contentType: "image/webp",
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from("blog-images")
            .getPublicUrl(fileName);
          setImageUrl(publicUrlData.publicUrl);
          showNotification("success", "Cover image uploaded successfully!");
          return;
        }
      } catch {
        // Fallback to storing compressed data URL directly if bucket isn't enabled
      }

      // Seamless fallback: store optimized data URL
      setImageUrl(compressedDataUrl);
      showNotification("success", "Cover image attached successfully!");
    } catch (err: any) {
      showNotification("error", "Failed to process image: " + err.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      showNotification("error", "Please fill in the title, summary, and article content.");
      return;
    }

    setIsSubmitting(true);
    const blogData = {
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      image_url: imageUrl.trim() || null,
      author: author.trim() || "Lali's Buildmart Admin",
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editingId);
        
        if (error) throw error;
        showNotification("success", "Article updated successfully!");
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert([blogData]);

        if (error) throw error;
        showNotification("success", "New article published successfully!");
      }

      resetForm();
      setActiveTab("list");
      fetchBlogs();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to save blog post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.author.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Brand Stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#D22027]"></div>

          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-red-50 border border-red-100 text-[#D22027] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blog Studio</h1>
            <p className="text-slate-500 text-sm mt-1.5 font-medium">Lali's Buildmart Article Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="Enter passcode"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#D22027] focus:bg-white rounded-xl px-4 py-3 pl-11 pr-12 text-slate-900 font-mono text-sm placeholder-slate-400 focus:outline-none transition-all shadow-sm"
                  required
                />
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                >
                  {showPasscode ? "Hide" : "Show"}
                </button>
              </div>
              {authError && (
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {authError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#D22027] hover:bg-[#b01920] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/30 flex items-center justify-center gap-2"
            >
              Access Blog Studio
            </button>
          </form>
          
          <div className="text-center mt-6 pt-6 border-t border-slate-100">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 font-bold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN DASHBOARD INTERFACE
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 md:pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Studio Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 mb-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-[#D22027]">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">Blog Studio</h1>
                <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-[#D22027] px-2 py-0.5 rounded-md">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-500">Create, edit, and organize articles published on Lali's Buildmart</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* View Live Blog Link */}
            <Link
              href="/blog"
              target="_blank"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Live Blog</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            {/* Tab Switcher */}
            <button
              onClick={() => {
                resetForm();
                setActiveTab(activeTab === "list" ? "editor" : "list");
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#D22027] hover:bg-[#b01920] transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              {activeTab === "list" ? (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write New Article</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Articles</span>
                </>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 shadow-sm animate-fade-in ${
            notification.type === "success" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
              : "bg-red-50 border-red-200 text-red-800"
          }`}>
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span className="font-bold text-sm">{notification.message}</span>
          </div>
        )}

        {/* ==================================================== */}
        {/* LIST TAB: PUBLISHED POSTS TABLE                      */}
        {/* ==================================================== */}
        {activeTab === "list" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D22027]" />
                  <span>Published Articles</span>
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {blogs.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Manage, update, or remove existing blog posts</p>
              </div>

              {/* Search filter & refresh */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#D22027] rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-800 focus:outline-none transition-colors"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <button 
                  onClick={fetchBlogs}
                  className="p-2.5 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition-colors"
                  title="Refresh articles"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#D22027]' : ''}`} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-[#D22027] mb-3" />
                <span className="font-bold text-xs uppercase tracking-wider">Loading articles...</span>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl p-6">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No articles found</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto mb-5">
                  {searchFilter 
                    ? "No articles matched your search query. Try clear your search." 
                    : "You haven't published any articles yet. Create your first post!"}
                </p>
                <button
                  onClick={() => setActiveTab("editor")}
                  className="px-5 py-2.5 bg-[#D22027] hover:bg-[#b01920] text-white rounded-xl font-bold text-xs transition-all shadow-sm"
                >
                  Create First Article
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 w-20 hidden sm:table-cell">Image</th>
                      <th className="pb-3">Article Details</th>
                      <th className="pb-3 hidden md:table-cell">Author</th>
                      <th className="pb-3 hidden lg:table-cell">Date</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredBlogs.map((blog) => (
                      <tr key={blog.id} className="group hover:bg-slate-50/70 transition-colors">
                        {/* Thumbnail */}
                        <td className="py-4 pr-3 hidden sm:table-cell">
                          {blog.image_url ? (
                            <img
                              src={blog.image_url}
                              alt={blog.title}
                              className="w-16 h-12 object-cover rounded-lg border border-slate-200"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center text-[9px] font-bold text-slate-400">
                              <FileText className="w-3.5 h-3.5 mb-0.5 opacity-60" />
                              <span>No Image</span>
                            </div>
                          )}
                        </td>

                        {/* Title & Summary */}
                        <td className="py-4 pr-4">
                          <div className="font-bold text-slate-900 group-hover:text-[#D22027] transition-colors line-clamp-1 break-words">
                            {blog.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {blog.summary}
                          </div>
                          {/* Mobile subtext */}
                          <div className="text-[11px] text-slate-400 mt-1 lg:hidden flex items-center gap-2">
                            <span className="md:hidden font-medium">{blog.author}</span>
                            <span>•</span>
                            <span>
                              {new Date(blog.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </td>

                        {/* Author */}
                        <td className="py-4 pr-4 text-xs text-slate-600 font-semibold hidden md:table-cell">
                          {blog.author}
                        </td>

                        {/* Date */}
                        <td className="py-4 pr-4 text-xs text-slate-500 whitespace-nowrap hidden lg:table-cell">
                          {new Date(blog.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-4 text-right">
                          <div className="flex justify-end items-center gap-1.5">
                            <Link
                              href={`/blog/${blog.id}`}
                              target="_blank"
                              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                              title="View live post"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => startEdit(blog)}
                              className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Edit post"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id, blog.title)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* EDITOR TAB: CREATE / EDIT ARTICLE + LIVE PREVIEW    */}
        {/* ==================================================== */}
        {activeTab === "editor" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FORM COLUMN (7 cols) */}
            <form 
              onSubmit={handleSubmit} 
              className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D22027]" />
                  <h2 className="text-lg font-black text-slate-900">
                    {editingId ? "Edit Article" : "Write New Article"}
                  </h2>
                </div>
                {editingId && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                    Editing Mode
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Article Title <span className="text-[#D22027]">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern Plywood Selection Guide for 2026"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#D22027] focus:bg-white rounded-xl px-4 py-3 text-slate-900 font-semibold text-sm focus:outline-none transition-all shadow-sm"
                    required
                  />
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subtitle / Summary <span className="text-[#D22027]">*</span>
                  </label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Short summary displayed on the blog feed card"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#D22027] focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none transition-all shadow-sm"
                    required
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author or organization name"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#D22027] focus:bg-white rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none transition-all shadow-sm"
                  />
                </div>

                {/* ==================================================== */}
                {/* DEDICATED IMAGE UPLOAD SECTION                       */}
                {/* ==================================================== */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Cover Image <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    {imageUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Remove Image
                      </button>
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Image Active Preview or Upload Dropzone */}
                  {imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group">
                      <img
                        src={imageUrl}
                        alt="Article Cover"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold shadow hover:bg-slate-100 transition-all flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" /> Change Photo
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-3.5 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold shadow hover:bg-red-700 transition-all flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#D22027] hover:bg-red-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all group"
                    >
                      {isUploadingImage ? (
                        <div className="flex flex-col items-center justify-center py-4">
                          <Loader2 className="w-8 h-8 animate-spin text-[#D22027] mb-2" />
                          <span className="text-xs font-bold text-slate-600">Processing image...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-12 h-12 bg-slate-100 group-hover:bg-red-50 text-slate-500 group-hover:text-[#D22027] rounded-full flex items-center justify-center mb-3 transition-colors">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-bold text-slate-800">
                            Click to upload cover image
                          </span>
                          <span className="text-xs text-slate-400 mt-1">
                            PNG, JPG, or WebP up to 10MB
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium mt-2 bg-slate-100 px-3 py-1 rounded-full">
                            If no image is uploaded, the article renders cleanly without an empty image box
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Optional Toggle to enter URL manually */}
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline transition-colors"
                    >
                      {showUrlInput ? "Hide image URL input" : "Or enter external image URL"}
                    </button>
                  </div>

                  {showUrlInput && (
                    <div className="mt-2">
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/cover-image.jpg"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#D22027] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Article Content <span className="text-[#D22027]">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Supports standard paragraphs & line breaks</span>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your article here. Use blank lines between paragraphs for clean reading..."
                    rows={12}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#D22027] focus:bg-white rounded-2xl p-4 text-slate-900 text-sm focus:outline-none leading-relaxed transition-all shadow-sm resize-y"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingImage}
                  className="sm:flex-1 bg-[#D22027] hover:bg-[#b01920] disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Article...</span>
                    </>
                  ) : (
                    <span>{editingId ? "Update Article" : "Publish Article"}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab("list");
                  }}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* LIVE FEED PREVIEW COLUMN (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm lg:sticky lg:top-28 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#D22027]" />
                  <span>Live Feed Card Preview</span>
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  How it appears on /blog
                </span>
              </div>

              <p className="text-xs text-slate-500">
                This shows exactly how visitors will see your article on the main blog feed:
              </p>

              {/* Exact Card Preview */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col transition-all">
                {/* Image Section - Only rendered if an image is provided */}
                {imageUrl ? (
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm text-[10px] font-bold text-slate-800">
                      <Calendar className="w-3 h-3 text-[#D22027]" />
                      <span>Today</span>
                    </div>
                  </div>
                ) : null}

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-bold mb-3 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{author || "Lali's Buildmart Admin"}</span>
                    </div>
                    {!imageUrl && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Calendar className="w-3 h-3 text-[#D22027]" />
                        <span>Today</span>
                      </div>
                    )}
                  </div>

                  <h4 className="text-lg font-black text-[#111111] leading-tight mb-2 line-clamp-2">
                    {title || "Untitled Article"}
                  </h4>

                  <p className="text-gray-500 text-xs leading-relaxed mb-5 line-clamp-3">
                    {summary || "Your article subtitle will appear here, giving customers an overview of the topic before opening."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D22027]">BUILDMART INSIGHTS</span>
                    <span className="text-[#D22027] font-black text-xs flex items-center gap-1">
                      Read Post <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {!imageUrl && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No image attached. The card adapts cleanly without any blank image space.</span>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
