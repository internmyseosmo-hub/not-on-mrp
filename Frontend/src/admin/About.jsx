import React, { useState } from 'react';

export default function About() {
  const [headline, setHeadline] = useState('About Us');
  const [subheadline, setSubheadline] = useState('Know more about Not On MRP');
  const [description, setDescription] = useState(
    'Manage the content that appears on the About page separately from Blog.'
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Page Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Edit the About section content only.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#FFD147] text-black text-sm font-semibold rounded-md hover:brightness-95 transition-colors">
          Save About
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
            <h3 className="text-sm font-bold text-gray-800">About Content</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Headline</label>
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Subheadline</label>
              <input
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
            <h3 className="text-sm font-bold text-gray-800">Preview</h3>
          </div>
          <div className="p-5">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">About Page</p>
              <h2 className="text-3xl font-black text-gray-900">{headline}</h2>
              <p className="mt-2 text-sm font-semibold text-gray-600">{subheadline}</p>
              <p className="mt-4 text-sm text-gray-500 leading-6">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
