import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Wallet,
  ArrowUpRight,
  History
} from 'lucide-react';

const BorrowerDashboard = () => {
  // Mock data for demo
  const user = { name: "Sipho" };
  const activeLoan = {
    amount: 5000,
    status: 'ACTIVE',
    remaining: 3200,
    nextPayment: '2026-07-01',
    nextAmount: 850
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Sawubona, {user.name} 👋</h1>
          <p className="text-slate-500">Welcome to your VeriLend dashboard.</p>
        </div>
        <Link to="/loans/apply" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/20">
          <PlusCircle className="mr-2 h-5 w-5" /> Apply for New Loan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Loan Summary Card */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center">
                <Wallet className="mr-2 h-6 w-6 text-blue-600" /> Active Loan
              </h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                {activeLoan.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Loan Amount</p>
                <p className="text-4xl font-black text-slate-900">R {activeLoan.amount.toLocaleString()}</p>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500 font-medium">Repayment Progress</span>
                    <span className="text-blue-600 font-bold">R {(activeLoan.amount - activeLoan.remaining).toLocaleString()} paid</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${((activeLoan.amount - activeLoan.remaining) / activeLoan.amount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-1 font-medium">Next Repayment Due</p>
                  <p className="text-2xl font-black text-slate-900">{activeLoan.nextPayment}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1 font-medium">Repayment Amount</p>
                  <p className="text-2xl font-black text-green-600 font-heading tracking-tight">R {activeLoan.nextAmount.toLocaleString()}</p>
                </div>
                <button className="w-full mt-6 bg-slate-900 hover:bg-black text-white py-3 rounded-xl font-bold transition">
                  Pay Now
                </button>
              </div>
            </div>
          </div>

          {/* Vetting Status */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Shield className="mr-2 h-6 w-6 text-green-600" /> Vetting & KYC
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">ID Verification</p>
                    <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Verified via Home Affairs</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold text-sm">Verified</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Employment Proof</p>
                    <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Payslip Uploaded</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold text-sm">Approved</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Bank Statement Check</p>
                    <p className="text-xs text-slate-500 uppercase font-black tracking-widest">In Progress (via Stitch)</p>
                  </div>
                </div>
                <span className="text-blue-600 font-bold text-sm italic">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg shadow-slate-900/20">
            <h3 className="text-lg font-bold mb-4 opacity-70">Credit Profile</h3>
            <div className="flex items-end justify-between mb-6">
              <p className="text-4xl font-black font-heading">680</p>
              <p className="text-green-400 font-bold text-sm flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> Good
              </p>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              Your credit score is based on TransUnion data. Maintaining your repayments on time will improve your score.
            </p>
            <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition text-sm">
              View Full Report
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-6 flex items-center uppercase tracking-wider text-slate-400 text-xs">
              <History className="mr-2 h-4 w-4" /> Recent Activity
            </h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Repayment Sent</p>
                    <p className="text-xs text-slate-500">June {15-i}, 2026</p>
                  </div>
                  <p className="text-sm font-black text-slate-900 font-heading">-R 850</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 text-blue-600 font-bold text-sm hover:underline">
              View all transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
