import React, { useState, useEffect } from 'react';

export default function Product() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Category Form State
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState(null);
  const [isCatLoading, setIsCatLoading] = useState(false);

  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState(null);
  const [mrp, setMrp] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [isDeal, setIsDeal] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isProdLoading, setIsProdLoading] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Calculated Price
  const calculatedPrice = mrp && discountPercent ? (Number(mrp) - (Number(mrp) * Number(discountPercent) / 100)).toFixed(2) : mrp || 0;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/api/categories/all');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:3000/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setIsCatLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', catName);
      formData.append('description', catDesc);
      if (catImage) formData.append('image', catImage);
      formData.append('isActive', true);
      formData.append('sortOrder', 0);

      const res = await fetch('http://127.0.0.1:3000/api/categories', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert('Category added successfully!');
        setCatName('');
        setCatDesc('');
        setCatImage(null);
        // Reset file input visually
        document.getElementById('catImageInput').value = '';
        fetchCategories();
      } else {
        alert(data.message || 'Failed to add category');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding category');
    } finally {
      setIsCatLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!prodCategory) {
      alert("Please select a category first.");
      return;
    }
    setIsProdLoading(true);
    try {
      const formData = new FormData();
      if (!editingProductId) {
        formData.append('id', Date.now()); // Using timestamp as unique ID
      }
      formData.append('name', prodName);
      formData.append('category', prodCategory);
      formData.append('description', prodDesc);
      if (prodImage) formData.append('image', prodImage);
      formData.append('mrp', mrp);
      formData.append('price', calculatedPrice);
      formData.append('discount', discountPercent);
      formData.append('isDeal', isDeal);
      formData.append('isNewArrival', isNewArrival);
      
      if (!editingProductId) {
        formData.append('inStock', true);
        formData.append('stockCount', 10); // default stock
        formData.append('rating', 0);
      }

      const url = editingProductId 
        ? `http://127.0.0.1:3000/api/products/${editingProductId}` 
        : 'http://127.0.0.1:3000/api/products';
      const method = editingProductId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert(`Product ${editingProductId ? 'updated' : 'added'} successfully!`);
        resetProductForm();
        fetchProducts();
      } else {
        alert(data.message || `Failed to ${editingProductId ? 'update' : 'add'} product`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error ${editingProductId ? 'updating' : 'adding'} product`);
    } finally {
      setIsProdLoading(false);
    }
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProdName('');
    setProdCategory('');
    setProdDesc('');
    setProdImage(null);
    setMrp('');
    setDiscountPercent('');
    setIsDeal(false);
    setIsNewArrival(false);
    const input = document.getElementById('prodImageInput');
    if (input) input.value = '';
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdCategory(product.category);
    setProdDesc(product.description || '');
    setMrp(product.mrp);
    setDiscountPercent(product.discount);
    setIsDeal(!!product.isDeal);
    setIsNewArrival(!!product.isNewArrival);
    setProdImage(null);
    const input = document.getElementById('prodImageInput');
    if (input) input.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:3000/api/products/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        if (editingProductId === id) {
          resetProductForm();
        }
      } else {
        alert(data.message || 'Failed to delete product');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Product Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Category Creation Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm">+</span>
            Add New Category
          </h3>
          <form onSubmit={handleCategorySubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
              <input 
                type="text" 
                required
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                placeholder="e.g., Electronics, Clothing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                placeholder="Brief description of the category..."
                rows="2"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Symbol</label>
              <input 
                id="catImageInput"
                type="file" 
                accept="image/*"
                onChange={(e) => setCatImage(e.target.files[0])}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 transition-colors"
              />
              {catImage && (
                <div className="mt-3 relative w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-white flex items-center justify-center shadow-sm">
                  <img src={URL.createObjectURL(catImage)} alt="Preview" className="w-full h-full object-contain p-1" />
                </div>
              )}
            </div>
            <button 
              type="submit" 
              disabled={isCatLoading}
              className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 mt-2 shadow-sm"
            >
              {isCatLoading ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>

        {/* Product Creation Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm">
                {editingProductId ? '✎' : '+'}
              </span>
              {editingProductId ? 'Edit Product' : 'Upload New Product'}
            </h3>
            {editingProductId && (
              <button 
                type="button" 
                onClick={resetProductForm}
                className="text-sm font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 transition-colors px-3 py-1.5 rounded-lg"
              >
                Cancel Edit
              </button>
            )}
          </div>
          <form onSubmit={handleProductSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input 
                  type="text" 
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select 
                  required
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
              <textarea 
                rows="3"
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors text-sm"
                placeholder="Enter detailed product description..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {editingProductId ? 'Product Image (Leave empty to keep existing)' : 'Product Image *'}
              </label>
              <input 
                id="prodImageInput"
                type="file" 
                accept="image/*"
                required={!editingProductId}
                onChange={(e) => setProdImage(e.target.files[0])}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 transition-colors"
              />
              {prodImage && (
                <div className="mt-3 relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden bg-white flex items-center justify-center shadow-sm">
                  <img src={URL.createObjectURL(prodImage)} alt="Preview" className="w-full h-full object-contain p-1" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Actual Price (₹) *</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  placeholder="e.g. 1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%) *</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  placeholder="e.g. 20"
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-center justify-between">
              <span className="text-yellow-800 font-medium">Calculated Selling Price:</span>
              <span className="text-2xl font-bold text-gray-900">₹{calculatedPrice}</span>
            </div>

            {/* Display Tags Checkboxes */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Display Tags</span>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 select-none">
                  <input 
                    type="checkbox" 
                    checked={isDeal} 
                    onChange={(e) => setIsDeal(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-gray-300 accent-amber-500 cursor-pointer" 
                  />
                  Deals and Offer
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 select-none">
                  <input 
                    type="checkbox" 
                    checked={isNewArrival} 
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-gray-300 accent-amber-500 cursor-pointer" 
                  />
                  New Arrival
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProdLoading}
              className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-yellow-200 mt-2 shadow-sm"
            >
              {isProdLoading ? (editingProductId ? 'Updating...' : 'Uploading...') : (editingProductId ? 'Update Product' : 'Upload Product')}
            </button>
          </form>
        </div>
      </div>

      {/* Products Display Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">All Products</h3>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500 text-center py-12 bg-white rounded-xl border border-gray-100">No products found. Start by adding some!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-gray-100 transition-transform duration-300">
                  {/* Actions Overlay */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => handleEditProduct(product)} className="bg-white p-2 rounded-full shadow hover:bg-yellow-50 text-gray-700 hover:text-yellow-600 transition-colors" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="bg-white p-2 rounded-full shadow hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                  {/* Badges Overlay */}
                  <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1">
                    {product.discount > 0 && (
                      <div className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.isDeal && (
                      <div className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-black shadow-sm">
                        DEAL
                      </div>
                    )}
                    {product.isNewArrival && (
                      <div className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                        NEW ARRIVAL
                      </div>
                    )}
                  </div>
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 z-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 relative z-10">No Image</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-yellow-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1 truncate" title={product.name}>{product.name}</h4>
                  {product.description && (
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2" title={product.description}>
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
                    {product.mrp > product.price && (
                      <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
