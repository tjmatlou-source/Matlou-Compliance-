import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../context/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardPath = user?.role === 'BORROWER' ? '/borrower' : '/lender';

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold font-heading tracking-tight">VeriLend</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="hover:text-blue-200 transition">Marketplace</Link>
            <Link to="/how-it-works" className="hover:text-blue-200 transition">How it Works</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link to={dashboardPath} className="flex items-center space-x-2 hover:text-blue-200 transition">
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">Login</Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700 pb-4 px-4 space-y-2">
          <Link to="/marketplace" className="block py-2 hover:bg-blue-800 rounded px-2">Marketplace</Link>
          <Link to="/how-it-works" className="block py-2 hover:bg-blue-800 rounded px-2">How it Works</Link>
          
          {isAuthenticated ? (
            <>
              <Link to={dashboardPath} className="block py-2 hover:bg-blue-800 rounded px-2">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left py-2 hover:bg-blue-800 rounded px-2 flex items-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="block py-2 bg-white text-blue-600 rounded text-center font-bold">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 px-4 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-6 w-6 text-green-400" />
          <span className="text-xl font-bold text-white uppercase tracking-wider">VeriLend</span>
        </div>
        <p className="text-sm">The healthy mashonisa. Safe, legal, and fair peer-to-peer lending for all South Africans.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Resources</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Contact</h4>
        <p className="text-sm">support@verilend.co.za</p>
        <p className="text-sm">Johannesburg, South Africa</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 text-center text-xs">
      &copy; {new Date().getFullYear()} VeriLend (Pty) Ltd. Registered Credit Provider.
    </div>
  </footer>
);

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
