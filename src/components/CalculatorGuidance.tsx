import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle, Zap } from 'lucide-react';

interface CalculatorGuidanceProps {
  onSelectPackage: (packageId: string) => void;
}

export const CalculatorGuidance: React.FC<CalculatorGuidanceProps> = ({ onSelectPackage }) => {
  const [roofAreaInput, setRoofAreaInput] = useState<number>(450);

  const getRecommendation = (area: number) => {
    if (area < 400) {
      return {
        packageId: '3 kW',
        name: '3 kW Residential System',
        estGeneration: '360 – 400 Units / Month',
        estSavings: '₹3,000 – ₹4,200 / Month',
        idealBill: '₹2,500 – ₹4,500',
        panels: '6 to 8 Mono PERC Panels',
      };
    } else if (area < 850) {
      return {
        packageId: '5 kW',
        name: '5 kW Executive System',
        estGeneration: '600 – 700 Units / Month',
        estSavings: '₹5,500 – ₹7,800 / Month',
        idealBill: '₹4,500 – ₹8,500',
        panels: '10 to 12 Mono PERC Panels',
      };
    } else {
      return {
        packageId: '10 kW',
        name: '10 kW Commercial System',
        estGeneration: '1,200 – 1,400 Units / Month',
        estSavings: '₹12,000 – ₹16,500 / Month',
        idealBill: '₹9,000 – ₹18,000+',
        panels: '20 to 24 Mono PERC Panels',
      };
    }
  };

  const currentRec = getRecommendation(roofAreaInput);

  return (
    <section id="calculator" className="py-20 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block">
            Self-Selection Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Site Size &amp; Roof Area Sizing Guidance
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            Find the right solar plant capacity based on your available rooftop shade-free area.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Informational Guidance Table */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-slate-900" />
              Rooftop Area Mapping Table
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Shadow-free south or south-west facing roof space is required for optimum annual generation.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                    <th className="py-3 px-2">Roof Area</th>
                    <th className="py-3 px-2">Recommended</th>
                    <th className="py-3 px-2">Avg Monthly Bill</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-100/60">
                    <td className="py-3 px-2 font-medium text-slate-900">~ 300 sq ft</td>
                    <td className="py-3 px-2 font-bold text-slate-900">3 kW System</td>
                    <td className="py-3 px-2">₹2,500 – ₹4,500</td>
                  </tr>
                  <tr className="hover:bg-slate-100/60">
                    <td className="py-3 px-2 font-medium text-slate-900">~ 500 sq ft</td>
                    <td className="py-3 px-2 font-bold text-slate-900">5 kW System</td>
                    <td className="py-3 px-2">₹4,500 – ₹8,000</td>
                  </tr>
                  <tr className="hover:bg-slate-100/60">
                    <td className="py-3 px-2 font-medium text-slate-900">~ 1,000+ sq ft</td>
                    <td className="py-3 px-2 font-bold text-slate-900">10 kW System</td>
                    <td className="py-3 px-2">₹9,000 – ₹18,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-yellow-400/20 border border-yellow-400/30 text-xs text-slate-900 font-medium">
              💡 <strong>Pro Tip:</strong> Don&apos;t worry if you don&apos;t know your exact rooftop dimensions! Our M/S Rout Traders site surveyor will conduct a precise laser measurement during consultation.
            </div>
          </div>

          {/* Interactive Calculator Estimator */}
          <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-yellow-400 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-slate-900" />
                Interactive Rooftop Estimator
              </h3>
              <span className="text-[10px] bg-yellow-400 text-slate-900 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Quick Tool
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Approx. Roof/Site Area:
                  </label>
                  <span className="text-base font-extrabold text-slate-900 font-mono">
                    {roofAreaInput} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="50"
                  value={roofAreaInput}
                  onChange={(e) => setRoofAreaInput(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>200 sq ft</span>
                  <span>750 sq ft</span>
                  <span>1500+ sq ft</span>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
                  Recommended Configuration
                </div>
                <div className="text-xl font-bold text-slate-900">{currentRec.name}</div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">Est. Generation</span>
                    <span className="font-bold text-slate-900 text-xs">{currentRec.estGeneration}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-bold uppercase">Est. Savings</span>
                    <span className="font-bold text-slate-900 text-xs">{currentRec.estSavings}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-700 pt-1">
                  <CheckCircle className="w-4 h-4 text-slate-900 flex-shrink-0" />
                  <span>Modules required: {currentRec.panels}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectPackage(currentRec.packageId)}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-yellow-400 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Select {currentRec.packageId} &amp; Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
