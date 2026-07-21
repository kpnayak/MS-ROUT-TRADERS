import React from 'react';
import { ClipboardCheck, Compass, FileText, HardHat, PlugZap } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: ClipboardCheck,
      title: 'Site Visit & Survey',
      description: 'Our solar engineer performs an on-site rooftop measurement, shadow analysis, and evaluates your home electricity meter load.',
    },
    {
      number: '02',
      icon: Compass,
      title: 'Custom 3D Design',
      description: 'We generate a customized 3D solar array layout optimized for seasonal sun angles and structural wind resistance.',
    },
    {
      number: '03',
      icon: FileText,
      title: 'Subsidy Paperwork',
      description: 'We submit all mandatory DISCOM net-metering applications and government subsidy paperwork on your behalf.',
    },
    {
      number: '04',
      icon: HardHat,
      title: 'Installation',
      description: 'Our certified installation team erects high-strength galvanized mounting structures and connects Mono PERC modules.',
    },
    {
      number: '05',
      icon: PlugZap,
      title: 'Grid Net-Metering',
      description: 'DISCOM inspects the plant, installs the bi-directional Net Meter, and turns on your clean solar power generator!',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block">
            Hassle-Free Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works: From Survey to Solar Power
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            A transparent 5-step journey to zero-hassle green energy for your home.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline Desktop & Mobile */}
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 hover:border-yellow-400 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-black text-slate-900 font-mono">
                        {step.number}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-slate-900 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <span>Step {index + 1} of 5</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
