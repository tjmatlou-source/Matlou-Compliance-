import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../context/authStore';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const data = await authService.login(email, password);
      setAuth(data.user, data.token);
      
      // Redirect based on role
      if (data.user.role === 'BORROWER') {
        navigate('/borrower');
      } else if (data.user.role === 'LENDER') {
        navigate('/lender');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-bold">Secure Login</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between ml-1 text-sm">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-600 group-hover:text-slate-900 transition">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-blue-600 font-bold hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transition flex items-center justify-center disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>Login to Account <ArrowRight className="ml-2 h-5 w-5" /></>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 font-medium">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') || 'BORROWER').toUpperCase();
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.register(email, password, role);
      // After registration, redirect to login
      navigate(`/login?registered=true&email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Join VeriLend</h2>
          <p className="text-slate-500 mt-2">Start your journey with the healthy mashonisa</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-2xl">
            {error}
          </div>
        )}

        {/* Role Selector */}
        <div className="flex p-1 bg-slate-100 rounded-2xl mb-10">
          <button 
            type="button"
            onClick={() => setRole('BORROWER')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${role === 'BORROWER' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            I'm a Borrower
          </button>
          <button 
            type="button"
            onClick={() => setRole('LENDER')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${role === 'LENDER' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            I'm a Lender
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                  placeholder="082 123 4567"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transition disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Create My Account'}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-slate-600 text-sm">
          By registering, you agree to our <Link to="/terms" className="text-blue-600 font-bold underline">Terms</Link> and <Link to="/privacy" className="text-blue-600 font-bold underline">Privacy Policy</Link>.
        </p>

        <p className="text-center mt-6 text-slate-600 font-medium border-t border-slate-100 pt-6">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
