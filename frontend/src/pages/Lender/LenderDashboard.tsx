import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  PieChart, 
  Search, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  BarChart3,
  Filter
} from 'lucide-react';

const LenderDashboard = () => {
  const stats = [
    { label: 'Total Invested', value: 'R 25,000', change: '+12%', color: 'blue' },
    { label: 'Total Earned', value: 'R 3,450', change: '+R 420', color: 'green' },
    { label: 'Active Loans', value: '14', change: '0 Defaults', color: 'purple' },
  ];

  const availableLoans = [
    { id: 1, borrower: "Thabo M.", amount: 5000, rate: 18, term: 6, purpose: "Business Stock", risk: "LOW" },
    { id: 2, borrower: "Lerato K.", amount: 12000, rate: 22, term: 12, purpose: "Education", risk: "MED" },
    { id: 3, borrower: "Sipho S.", amount: 3500, rate: 15, term: 3, purpose: "Emergency", risk: "LOW" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Investor Portal</h1>
          <p className="text-slate-500">Managing your P2P lending portfolio.</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition hover:bg-slate-50">
            Deposit Funds
          </button>
          <Link to="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/20">
            Find Loans
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}></div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mb-2 font-heading">{stat.value}</p>
            <p className={`text-sm font-bold text-${stat.color}-600 flex items-center`}>
              <TrendingUp className="h-4 w-4 mr-1" /> {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Marketplace Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center">
                <Zap className="mr-2 h-6 w-6 text-yellow-500 fill-yellow-500" /> New Opportunities
              </h2>
              <Link to="/marketplace" className="text-blue-600 font-bold text-sm hover:underline flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {availableLoans.map((loan) => (
                <div key={loan.id} className="p-8 hover:bg-slate-50 transition group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-500">
                        {loan.borrower.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-black text-slate-900">{loan.borrower}</h4>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${loan.risk === 'LOW' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {loan.risk} RISK
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{loan.purpose}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8 text-center md:text-left">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Amount</p>
                        <p className="font-black text-slate-900 font-heading">R {loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Return</p>
                        <p className="font-black text-green-600 font-heading">{loan.rate}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Term</p>
                        <p className="font-black text-slate-900 font-heading">{loan.term}mo</p>
                      </div>
                    </div>

                    <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition whitespace-nowrap shadow-lg shadow-slate-900/10">
                      Invest Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Sidebar */}
        <div className="space-y-8">
          <div className="bg-blue-600 text-white rounded-3xl p-8 shadow-xl shadow-blue-600/20">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <PieChart className="mr-2 h-5 w-5" /> Portfolio Mix
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="opacity-70 font-medium">Business Loans</span>
                <span className="font-black">65%</span>
              </div>
              <div className="h-2 w-full bg-blue-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[65%]"></div>
              </div>
              
              <div className="flex justify-between text-sm mb-1 pt-2">
                <span className="opacity-70 font-medium">Personal/Education</span>
                <span className="font-black">35%</span>
              </div>
              <div className="h-2 w-full bg-blue-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 w-[35%]"></div>
              </div>
            </div>
            <button className="w-full mt-8 bg-white text-blue-600 py-3 rounded-xl font-bold transition hover:bg-blue-50">
              Full Portfolio Analysis
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-6 flex items-center text-slate-900 uppercase tracking-wider text-xs">
              <BarChart3 className="mr-2 h-4 w-4 text-slate-400" /> Investment Tips
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-900 mb-1">Diversify your risk</p>
                <p className="text-xs text-slate-500 leading-relaxed">Splitting your R5000 across 5 loans is safer than putting it all in one.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-900 mb-1">Reinvest earnings</p>
                <p className="text-xs text-slate-500 leading-relaxed">Turn on auto-invest to keep your money working as soon as repayments land.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderDashboard;
