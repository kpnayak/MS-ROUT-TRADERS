import React from 'react';
import { Check, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { PackageSpec } from '../types';

interface PackagesProps {
  onSelectPackage: (packageId: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ onSelectPackage }) => {
  const packages: PackageSpec[] = [
    {
      id: '3 kW',
      name: '3 kW Residential Solar',
      capacity: '3 kW System',
      roofAreaRange: 'approx 300 – 350 sq ft',
      monthlyBillRange: '₹2,500 – ₹4,500 / month (300-400 Units)',
      idealFor: 'Small Homes / 2 BHK Residences',
      panelCount: 'approx 6 – 8 High-Efficiency Panels',
      estimatedSavings: '₹3,000 – ₹4,000 / month savings',
      description: 'Ideal starter rooftop setup for compact urban families looking to drastically lower basic grid bills.',
      badge: 'Popular for 2BHK',
    },
    {
      id: '5 kW',
      name: '5 kW Executive Solar',
      capacity: '5 kW System',
      roofAreaRange: 'approx 500 – 600 sq ft',
      monthlyBillRange: '₹4,500 – ₹8,000 / month (500-700 Units)',
      idealFor: '3 BHK – 4 BHK Duplex / Villa',
      panelCount: 'approx 10 – 12 High-Efficiency Panels',
      estimatedSavings: '₹6,000 – ₹7,500 / month savings',
      description: 'Perfect for medium-to-large families using 2-3 Air Conditioners, refrigerators, and water pumps.',
      badge: 'Most Popular',
    },
    {
      id: '10 kW',
      name: '10 kW Premium / Commercial Solar',
      capacity: '10 kW System',
      roofAreaRange: 'approx 1,000 – 1,200 sq ft',
      monthlyBillRange: '₹9,000 – ₹18,000+ / month (1,000+ Units)',
      idealFor: 'Large Independent Bungalows / Commercial Shops',
      panelCount: 'approx 20 – 24 High-Efficiency Panels',
      estimatedSavings: '₹12,000 – ₹16,000+ / month savings',
      description: 'Maximum generation capacity designed for high energy consumption properties and net-metering revenue.',
      badge: 'Commercial / High Yield',
    },
  ];

  return (
    <section id="packages" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block shadow-xs">
            Solar System Sizes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Residential Solar Packages
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            Select the optimal solar system capacity based on your rooftop area and monthly energy consumption.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {packages.map((pkg) => {
            const isFeatured = pkg.id === '5 kW';
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-white border-2 border-yellow-400 shadow-2xl scale-105 z-10'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.badge && (
                  <div className={`absolute -top-3.5 left-1/2 transform -translate-x-1/2 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center space-x-1 ${
                    isFeatured ? 'bg-yellow-400 text-slate-900' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  <div className="text-center pb-6 border-b border-slate-100">
                    <div className="inline-block p-3 rounded-2xl bg-slate-900 text-yellow-400 mb-3">
                      <Zap className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                    <p className="text-slate-500 text-xs mt-2 font-medium leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Specs List */}
                  <div className="py-6 space-y-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended Roof Area</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{pkg.roofAreaRange}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Monthly Bill</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{pkg.monthlyBillRange}</div>
                    </div>

                    <div className="space-y-2.5 pt-2 text-slate-600">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-slate-900 mr-2 flex-shrink-0" />
                        <span><strong className="text-slate-900">Ideal For:</strong> {pkg.idealFor}</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-slate-900 mr-2 flex-shrink-0" />
                        <span><strong className="text-slate-900">Panel Setup:</strong> {pkg.panelCount}</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-slate-900 mr-2 flex-shrink-0" />
                        <span><strong className="text-slate-900">Est. Savings:</strong> <span className="text-slate-900 font-bold">{pkg.estimatedSavings}</span></span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-slate-900 mr-2 flex-shrink-0" />
                        <span>Tier-1 Mono PERC &amp; On-Grid Inverter</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-slate-900 mr-2 flex-shrink-0" />
                        <span>Govt. Subsidy &amp; Net Metering Docs Included</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                      isFeatured
                        ? 'bg-slate-900 hover:bg-slate-800 text-yellow-400 shadow-lg'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>Get Quote ({pkg.capacity})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
