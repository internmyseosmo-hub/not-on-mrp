import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit2, X, CheckCircle, ImagePlus, RefreshCw, Eye, EyeOff } from 'lucide-react';

const EMPTY_FORM = { title: '', subtitle: '', description: '', content: '', image: '' };

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const fileRef = useRef();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const uploadingImage = saving && Boolean(selectedFile);
  const handleInput = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file)); // instant local preview
  };

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setImagePreview('');
    setSelectedFile(null);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (post) => {
    setForm({ title: post.title, subtitle: post.subtitle || '', description: post.description, content: post.content, image: post.image || '' });
    setImagePreview(post.image || '');
    setSelectedFile(null);
    setEditingId(post._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/blog/${editingId}` : '/api/blog';

      // Use FormData so image file goes through multer on backend
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('subtitle', form.subtitle);
      fd.append('description', form.description);
      fd.append('content', form.content);
      if (selectedFile) {
        fd.append('image', selectedFile); // backend uploads to ImageKit /blog folder
      } else if (form.image) {
        fd.append('image', form.image); // URL paste case
      }

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error('Failed to save');
      setShowForm(false);
      setForm(EMPTY_FORM);
      setSelectedFile(null);
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      setPosts(p => p.filter(x => x._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage blog posts. They appear live on the website.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchPosts} className="inline-flex items-center gap-2 px-3 py-2 bg-white text-gray-600 text-sm font-semibold rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors">
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-800">{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Cover Image</label>
              <div
                onClick={() => fileRef.current.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#FFD147] transition-colors bg-gray-50/50 overflow-hidden"
                style={{ minHeight: imagePreview ? 'auto' : '120px' }}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="preview" className="w-full max-h-56 object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-bold">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-gray-400">
                    {uploadingImage ? <RefreshCw size={28} className="animate-spin mb-2" /> : <ImagePlus size={28} className="mb-2" />}
                    <p className="text-sm font-semibold">{uploadingImage ? 'Uploading...' : 'Click to upload cover image'}</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <p className="mt-1 text-[10px] text-gray-400">Or paste image URL below:</p>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={(e) => { handleInput(e); setImagePreview(e.target.value); }}
                placeholder="https://example.com/image.jpg"
                className="mt-1 w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD147]"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Main Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleInput}
                required
                placeholder="e.g. 10 Must-Have Home Essentials..."
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD147] focus:border-[#FFD147]"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Subtitle</label>
              <input
                name="subtitle"
                value={form.subtitle}
                onChange={handleInput}
                placeholder="e.g. A guide to better living at home"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD147] focus:border-[#FFD147]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Short Description * <span className="normal-case font-normal text-gray-400">(shown on blog card)</span></label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInput}
                required
                rows={2}
                placeholder="Brief summary shown on the blog listing page..."
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD147] focus:border-[#FFD147] resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Full Article Content * <span className="normal-case font-normal text-gray-400">(use blank lines to separate paragraphs)</span></label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleInput}
                required
                rows={10}
                placeholder="Write the full blog post content here...&#10;&#10;Paragraph 2 starts here..."
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFD147] focus:border-[#FFD147] resize-y font-mono"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="flex-[2] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111827] text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-60">
                {saving ? <><RefreshCw size={14} className="animate-spin" /> Saving...</> : <><CheckCircle size={14} /> {editingId ? 'Update Post' : 'Publish Post'}</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <RefreshCw size={28} className="animate-spin text-gray-400" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 font-semibold">No blog posts yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex gap-4 items-start">
              {post.image && (
                <img src={post.image} alt={post.title} className="w-24 h-20 object-cover rounded-lg shrink-0 border border-gray-100" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{post.title}</h3>
                {post.subtitle && <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-1">{post.subtitle}</p>}
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{post.description}</p>
                <p className="text-[10px] text-gray-300 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(post)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(post._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
