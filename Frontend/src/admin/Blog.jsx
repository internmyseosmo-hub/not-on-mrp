import React, { useState } from 'react';

export default function Blog() {
  const [title, setTitle] = useState('Latest Blog Post');
  const [slug, setSlug] = useState('latest-blog-post');
  const [summary, setSummary] = useState('Write and manage blog content separately from About.');
  const [content, setContent] = useState('Start writing your blog post content here...');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage blog posts only.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors">
          Save Blog
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
            <h3 className="text-sm font-bold text-gray-800">Post Details</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Summary</label>
              <textarea
                rows="3"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Content</label>
              <textarea
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
            <h3 className="text-sm font-bold text-gray-800">Preview</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Blog Post</p>
              <h2 className="text-xl font-black text-gray-900 leading-tight">{title}</h2>
              <p className="mt-2 text-xs text-gray-500">/{slug}</p>
              <p className="mt-4 text-sm text-gray-600">{summary}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Body</p>
              <p className="text-sm text-gray-600 leading-6 whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
