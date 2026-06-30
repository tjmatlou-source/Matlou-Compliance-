import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';
import LandingPage from './pages/Landing/LandingPage';
import { LoginPage, RegisterPage } from './pages/Auth/AuthPages';
import BorrowerDashboard from './pages/Borrower/BorrowerDashboard';
import LenderDashboard from './pages/Lender/LenderDashboard';
import LoanApplicationPage from './pages/Loans/LoanApplicationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Borrower Routes */}
          <Route element={<ProtectedRoute allowedRoles={['BORROWER']} />}>
            <Route path="borrower">
              <Route index element={<BorrowerDashboard />} />
              <Route path="apply" element={<LoanApplicationPage />} />
            </Route>
          </Route>

          {/* Lender Routes */}
          <Route element={<ProtectedRoute allowedRoles={['LENDER']} />}>
            <Route path="lender">
              <Route index element={<LenderDashboard />} />
            </Route>
          </Route>

          {/* Marketplace */}
          <Route path="marketplace" element={
            <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Marketplace Coming Soon</h2>
              <p>We're currently vetting new loan applications.</p>
            </div>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
