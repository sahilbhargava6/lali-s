"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Edit, Trash2, Eye, LayoutDashboard, FileText, CheckCircle2, 
  AlertCircle, Lock, KeyRound, Loader2, ArrowLeft, RefreshCw, Sparkles, Image as ImageIcon
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

const PRESET_IMAGES = [
  { name: "Modern Construction", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { name: "Plywood & Timber", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" },
  { name: "Tools & Workbench", url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80" },
  { name: "Blueprints", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
  { name: "Interior Kitchen", url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" },
];

export default function Dashboard() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Blogs and Form states
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setAuthError("Incorrect passcode. Please try again.");
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
  };

  const startEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setSummary(blog.summary);
    setContent(blog.content);
    setImageUrl(blog.image_url || "");
    setAuthor(blog.author || "Lali's Buildmart Admin");
    setActiveTab("editor");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      showNotification("success", "Blog post deleted successfully!");
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete blog post.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) {
      showNotification("error", "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const blogData = {
      title,
      summary,
      content,
      image_url: imageUrl || PRESET_IMAGES[0].url,
      author,
    };

    try {
      if (editingId) {
        // Update
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", editingId);
        
        if (error) throw error;
        showNotification("success", "Blog post updated successfully!");
      } else {
        // Create
        const { error } = await supabase
          .from("blogs")
          .insert([blogData]);

        if (error) throw error;
        showNotification("success", "Blog post created successfully!");
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#D22027] rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-yellow-500 rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-[#D22027] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Console</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your passcode to manage Lali's Buildmart Blogs</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Admin Passcode</label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError("");
                  }}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-white/10 focus:border-[#D22027] rounded-xl px-4 py-3 pl-11 text-white font-mono placeholder-slate-600 focus:outline-none transition-colors"
                  required
                />
                <KeyRound className="w-5 h-5 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {authError && (
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {authError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#D22027] hover:bg-[#b01920] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2"
            >
              Access Dashboard
            </button>
          </form>
          
          <div className="text-center mt-6">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 font-bold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-12 px-4 md:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D22027] rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-6 h-6 text-[#D22027]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#D22027]">Console</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Blog Dashboard</h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                resetForm();
                setActiveTab(activeTab === "list" ? "editor" : "list");
              }}
              className="px-5 py-2.5 rounded-full font-bold text-sm bg-white text-slate-950 hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              {activeTab === "list" ? (
                <>
                  <Plus className="w-4 h-4" /> Create New Post
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4" /> View All Posts
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-full font-bold text-sm bg-white/5 border border-white/15 hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 max-w-2xl animate-fade-in ${
            notification.type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}>
            {notification.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span className="font-bold text-sm">{notification.message}</span>
          </div>
        )}

        {/* List Tab */}
        {activeTab === "list" && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" /> Published Posts ({blogs.length})
              </h2>
              <button 
                onClick={fetchBlogs}
                className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Refresh list"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-10 h-10 animate-spin text-[#D22027] mb-4" />
                <span className="font-bold text-sm">Fetching your blogs...</span>
              </div>
            ) : blogs.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-gray-400 font-medium mb-4">No blog posts found. Create your first post!</p>
                <button
                  onClick={() => setActiveTab("editor")}
                  className="px-5 py-2.5 bg-[#D22027] hover:bg-[#b01920] text-white rounded-full font-bold text-sm transition-all"
                >
                  Create Post
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <th className="pb-4 w-24">Image</th>
                      <th className="pb-4">Title</th>
                      <th className="pb-4">Author</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 pr-4">
                          <img
                            src={blog.image_url || PRESET_IMAGES[0].url}
                            alt={blog.title}
                            className="w-16 h-12 object-cover rounded-lg border border-white/10"
                          />
                        </td>
                        <td className="py-4 pr-4">
                          <div className="font-bold text-white group-hover:text-[#D22027] transition-colors line-clamp-1">{blog.title}</div>
                          <div className="text-xs text-gray-400 line-clamp-1 mt-1">{blog.summary}</div>
                        </td>
                        <td className="py-4 text-sm text-gray-300 font-semibold">{blog.author}</td>
                        <td className="py-4 text-sm text-gray-400">
                          {new Date(blog.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/blog/${blog.id}`}
                              target="_blank"
                              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                              title="Preview post"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => startEdit(blog)}
                              className="p-2 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg text-yellow-400 transition-colors"
                              title="Edit post"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
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

        {/* Editor Tab */}
        {activeTab === "editor" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Editor Form */}
            <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                {editingId ? "Edit Blog Post" : "Create New Blog Post"}
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full bg-slate-950 border border-white/10 focus:border-[#D22027] rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Summary */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Summary / Subtitle *</label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief description showing on listings"
                    className="w-full bg-slate-950 border border-white/10 focus:border-[#D22027] rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Author & Image grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                      className="w-full bg-slate-950 border border-white/10 focus:border-[#D22027] rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Cover Image URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Paste unsplash or external image URL"
                      className="w-full bg-slate-950 border border-white/10 focus:border-[#D22027] rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Presets */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Quick Presets (Click to use)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImageUrl(img.url)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                          imageUrl === img.url 
                            ? "bg-[#D22027] border-[#D22027] text-white" 
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {img.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Content (Supports simple HTML or Markdown spacing) *</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your article content here..."
                    rows={12}
                    className="w-full bg-slate-950 border border-white/10 focus:border-[#D22027] rounded-xl px-4 py-3 text-white focus:outline-none font-sans leading-relaxed transition-colors resize-y"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#D22027] hover:bg-[#b01920] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Publish Post"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab("list");
                  }}
                  className="px-6 py-3.5 bg-white/5 border border-white/15 rounded-xl font-bold transition-all hover:bg-white/10 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Live Preview Panel */}
            <div className="bg-slate-900/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 sticky top-28 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-4 text-gray-400">
                <Eye className="w-5 h-5 text-gray-400" /> Live Feed Preview
              </h2>

              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300">
                <div className="h-56 relative bg-slate-900 flex items-center justify-center overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-500 font-bold flex flex-col items-center gap-2">
                      <ImageIcon className="w-8 h-8 opacity-45" />
                      <span className="text-xs">No image provided</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-[#D22027] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    Preview
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <span>{author || "Author"}</span>
                    <span>•</span>
                    <span>Just Now</span>
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight line-clamp-2">
                    {title || "Untitled Blog Post"}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {summary || "Your blog post summary will appear here. This subtitle gives readers a quick overview of the topic before they open the article."}
                  </p>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>LALI'S BUILDMART</span>
                    <span className="text-[#D22027] hover:underline cursor-pointer flex items-center gap-1">Read Full Article →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
