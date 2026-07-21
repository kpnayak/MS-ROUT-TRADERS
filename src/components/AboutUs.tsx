import React from 'react';
import { Award, ShieldCheck, MapPin, Building2, CheckCircle } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-3 inline-block">
            About M/S Rout Traders
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Trusted Partner for Clean &amp; Sustainable Energy Solutions
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Company Story & Details */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Empowering Homes &amp; Businesses with High-Yield Rooftop Solar Systems
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              At <strong className="text-slate-900">M/S Rout Traders</strong>, we are committed to accelerating the transition to clean solar power across residential and commercial properties. With over <strong className="text-slate-900">[12+ Years]</strong> of proven engineering excellence, we specialize in complete end-to-end solar solutions—from initial site assessment and structural design to government subsidy assistance and grid connection.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Our certified technicians utilize state-of-the-art Mono PERC solar modules and high-efficiency smart inverters, ensuring maximum unit generation per square foot of rooftop area. We take care of all regulatory approvals and net metering paperwork so you enjoy a seamless, stress-free solar journey.
            </p>

            {/* Service Area & Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 shadow-sm">
                <MapPin className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Service Area</h4>
                  <p className="text-xs font-semibold text-slate-600 mt-1">[Bhubaneswar, Cuttack &amp; Statewide Region]</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 shadow-sm">
                <Building2 className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Installations</h4>
                  <p className="text-xs font-semibold text-slate-600 mt-1">[1,200+ Residential Rooftops Installed]</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-3">Our Certifications &amp; Accreditations</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/20 text-slate-900 text-xs font-bold">
                  <Award className="w-4 h-4 text-slate-900" />
                  <span>[MNRE Empaneled Vendor]</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/20 text-slate-900 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-slate-900" />
                  <span>[ISO 9001:2015 Certified]</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/20 text-slate-900 text-xs font-bold">
                  <CheckCircle className="w-4 h-4 text-slate-900" />
                  <span>[State Discom Approved Installer]</span>
                </span>
              </div>
            </div>

          </div>

          {/* Stats & Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
              <img
                src="https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=800&auto=format&fit=crop"
                alt="Solar Technicians installing solar panels"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

              <div className="absolute bottom-0 inset-x-0 p-6 bg-slate-900 text-white border-t border-slate-800">
                <div className="grid grid-cols-2 gap-4 text-center divide-x divide-slate-800">
                  <div>
                    <div className="text-3xl font-extrabold text-yellow-400">[12+]</div>
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-1">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-yellow-400">[99.8%]</div>
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-1">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
