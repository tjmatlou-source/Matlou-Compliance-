import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 leading-tight">
              The Healthy <br />
              <span className="text-green-400 italic">Mashonisa</span>
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Safe, legal, and fair loans. We connect hard-working South Africans with local investors who want to grow their money. No traps, just transparency.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register?role=borrower" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-center transition flex items-center justify-center shadow-lg shadow-green-900/20">
                I Need a Loan <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/register?role=lender" className="bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-xl font-bold text-center transition flex items-center justify-center shadow-lg">
                I Want to Invest
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-blue-700 rounded-2xl p-8 border border-blue-500 shadow-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold">VS</div>
                  <div>
                    <div className="font-bold">VeriLend Security</div>
                    <div className="text-xs opacity-70 text-green-400 flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> Fully Vetted</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-blue-800 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-green-400"></div>
                  </div>
                  <div className="flex justify-between text-xs opacity-70">
                    <span>Vetting Progress</span>
                    <span>65% Complete</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-800 p-3 rounded-lg border border-blue-600">
                      <div className="text-xs opacity-60">Interest Rate</div>
                      <div className="text-lg font-bold">2.5% PM</div>
                    </div>
                    <div className="bg-blue-800 p-3 rounded-lg border border-blue-600">
                      <div className="text-xs opacity-60">Term</div>
                      <div className="text-lg font-bold">6 Months</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Why Choose VeriLend?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We're bridging the gap between informal lending and formal banking with a model that works for everyone.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Regulated & Safe</h3>
            <p className="text-slate-600">Registered with the NCR. Your data is protected by POPIA, and every loan is legally binding.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fast Background Checks</h3>
            <p className="text-slate-600">We use Home Affairs and Bank Statement verification to vet borrowers in minutes, not days.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fair Returns</h3>
            <p className="text-slate-600">Investors earn competitive interest rates while helping fellow South Africans build a formal credit history.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-blue-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/register?role=borrower" className="bg-white text-blue-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-lg">
                Apply for a Loan
              </Link>
              <Link to="/register?role=lender" className="bg-green-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-lg">
                Become a Lender
              </Link>
            </div>
            <p className="mt-8 text-blue-300 text-sm italic">Join 10,000+ South Africans building a better financial future.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
