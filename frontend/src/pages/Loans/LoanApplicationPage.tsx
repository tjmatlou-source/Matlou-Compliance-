import { useState } from 'react';
import { 
  ArrowLeft, 
  Info, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LoanApplicationPage = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(6);

  const calculateMonthly = () => {
    const interest = 0.15; // 15% for the term
    return Math.round((amount * (1 + interest)) / term);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/borrower" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 font-bold text-sm transition group">
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Progress Header */}
        <div className="bg-slate-900 px-8 py-6 text-white flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">Loan Application</h1>
            <p className="text-slate-400 text-sm">Step {step} of 3</p>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 w-8 rounded-full transition-colors ${s <= step ? 'bg-green-500' : 'bg-slate-700'}`}></div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center">
                  How much do you need?
                </h2>
                <p className="text-slate-500 mb-8">Choose an amount between R1,000 and R50,000</p>
                
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-black text-blue-600 font-heading tracking-tight">R {amount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="50000" 
                    step="500"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold mt-4 uppercase tracking-widest">
                    <span>R 1,000</span>
                    <span>R 50,000</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  Repayment Term
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[3, 6, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTerm(m)}
                      className={`py-4 rounded-2xl font-black transition border-2 ${term === m ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-green-800 opacity-70 uppercase tracking-wider mb-1">Estimated Monthly Payment</p>
                  <p className="text-3xl font-black text-green-900 font-heading">R {calculateMonthly().toLocaleString()}</p>
                </div>
                <Info className="h-6 w-6 text-green-600 opacity-50" />
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center"
              >
                Continue to Purpose <ChevronRight className="ml-2 h-6 w-6" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">What is the loan for?</h2>
              <div className="grid grid-cols-1 gap-4">
                {['Business Stock', 'Education Fees', 'Emergency Expense', 'Home Improvements', 'Debt Consolidation'].map((purpose) => (
                  <label key={purpose} className="flex items-center p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-200 cursor-pointer transition group has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                    <input type="radio" name="purpose" className="hidden" />
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 mr-4 flex items-center justify-center group-hover:border-blue-300">
                      <div className="w-3 h-3 rounded-full bg-blue-600 scale-0 transition-transform"></div>
                    </div>
                    <span className="font-bold text-slate-700">{purpose}</span>
                  </label>
                ))}
              </div>
              <div className="flex space-x-4 pt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition border border-slate-200">Back</button>
                <button onClick={() => setStep(3)} className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg transition">Last Step: Verify ID</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Ready to Submit?</h2>
              <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                By submitting, you agree to allow VeriLend to perform a credit check and verify your bank statements via Stitch.
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-8 text-left border border-slate-100 mt-10">
                <div className="flex justify-between mb-4 pb-4 border-b border-slate-200">
                  <span className="text-slate-500 font-bold">Requested Amount</span>
                  <span className="font-black text-slate-900">R {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Repayment Term</span>
                  <span className="font-black text-slate-900">{term} Months</span>
                </div>
              </div>

              <div className="flex space-x-4 pt-10">
                <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition">Back</button>
                <Link to="/borrower" className="flex-[2] bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-600/20 transition">
                  Submit Application
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-center text-slate-400 text-xs flex items-center justify-center">
        <ShieldCheck className="w-3 h-3 mr-1" /> All data encrypted with bank-level security
      </p>
    </div>
  );
};

export default LoanApplicationPage;
