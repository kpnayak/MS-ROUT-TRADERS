import React from 'react';
import { PiggyBank, Landmark, Wrench, Leaf, TrendingUp, BatteryCharging } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: PiggyBank,
      title: 'Massive Cost Savings',
      description: 'Slash your monthly electricity bills by 70% to 90% and lock in clean energy generation for 25+ years.',
      highlight: 'Up to ₹8,000/mo saved',
    },
    {
      icon: Landmark,
      title: 'Government Subsidy Support',
      description: 'Avail attractive government subsidies (PM Surya Ghar Scheme) directly transferred to your bank account.',
      highlight: 'Up to ₹78,000 Subsidy',
    },
    {
      icon: Wrench,
      title: 'Low Maintenance & Long Life',
      description: 'Solar panels have no moving parts. Periodic rainwater cleaning is all that is needed for optimal generation.',
      highlight: '25-Year Warranty',
    },
    {
      icon: Leaf,
      title: '100% Eco-Friendly & Green',
      description: 'Reduce carbon footprint significantly. A 5 kW solar plant offsets over 6 tons of CO2 emissions per year.',
      highlight: 'Clean Renewable Power',
    },
    {
      icon: TrendingUp,
      title: 'Increased Property Value',
      description: 'Solar-powered residences command premium valuation and attract eco-conscious homebuyers.',
      highlight: 'Instant Asset Upgrade',
    },
    {
      icon: BatteryCharging,
      title: 'Reliable Backup Power Options',
      description: 'Hybrid inverter options with battery storage ensure continuous uninterrupted power during discom outages.',
      highlight: '24x7 Power Security',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block shadow-xs">
            Why Go Solar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Benefits of Installing Rooftop Solar
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            Transform your unutilized roof space into a high-yielding clean power generator.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-yellow-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/20 text-slate-900 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="bg-slate-100 px-2.5 py-1 rounded text-[11px] text-slate-700">{item.highlight}</span>
                  <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
