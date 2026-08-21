import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Optionally save token to localStorage here
        // localStorage.setItem('adminToken', data.token);
        onLogin();
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-[#1E293B] rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
        
        {/* Header Area */}
        <div className="p-8 text-center border-b border-slate-700/50">
          <div className="text-3xl font-black text-white italic tracking-tighter flex items-center justify-center gap-1.5 mb-2">
             <span className="text-red-500">NOT</span> ON <span className="text-yellow-400">MRP</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Secure Admin Access</p>
        </div>

        {/* Form Area */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white transition-all placeholder:text-slate-600"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white transition-all placeholder:text-slate-600"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/50 text-slate-900 font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1E293B]"
              >
                {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Area */}
        <div className="p-4 text-center bg-slate-900/50">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Not On MRP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
