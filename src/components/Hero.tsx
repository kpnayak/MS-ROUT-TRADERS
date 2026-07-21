import React from 'react';
import { ShieldCheck, Zap, ArrowRight, Award, CheckCircle2, TrendingDown } from 'lucide-react';

interface HeroProps {
  onNavigateToBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToBooking }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Sleek Hero Banner Container */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 opacity-15 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 bg-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest rounded-full">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Verified Solar Installer • 12+ Years Exp</span>
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight">
                Powering <span className="text-yellow-400">Your Future</span> <br className="hidden sm:inline" />
                With Precision Solar Systems
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                M/S Rout Traders delivers government-subsidized, high-efficiency solar solutions. Cut electricity bills up to 90% with turnkey residential & commercial installations.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onNavigateToBooking}
                  className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold uppercase tracking-wider text-xs rounded-full shadow-lg shadow-yellow-400/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#packages"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold uppercase tracking-wider text-xs rounded-full flex items-center justify-center transition-all"
                >
                  Explore Packages
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-800 text-slate-300 text-xs font-semibold">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>25-Yr Performance Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>Subsidy Assistance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>Zero Paperwork Stress</span>
                </div>
              </div>
            </div>

            {/* Right Card / Highlight */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl relative">
                <div className="absolute -top-3 right-6 bg-yellow-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Residential Special
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Why M/S Rout Traders?
                </h3>
                <p className="text-slate-500 text-xs mb-6">
                  Certified solar engineers offering customized 3 kW, 5 kW &amp; 10 kW rooftop solar setups.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="p-2 rounded-lg bg-yellow-400/20 text-slate-900">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Massive Bill Reduction</div>
                      <div className="text-[11px] text-slate-500">Lower grid dependency &amp; locked-in energy prices</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="p-2 rounded-lg bg-yellow-400/20 text-slate-900">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Tier-1 Mono PERC Panels</div>
                      <div className="text-[11px] text-slate-500">High efficiency cell technology for maximum power</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="p-2 rounded-lg bg-yellow-400/20 text-slate-900">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Net Metering Enabled</div>
                      <div className="text-[11px] text-slate-500">Sell surplus solar power back to the grid</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onNavigateToBooking}
                  className="mt-6 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-yellow-400 font-bold text-xs uppercase tracking-wider transition-colors text-center block"
                >
                  Get Custom Solar Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
