import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact M/S Rout Traders
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            Visit our office or reach out directly for immediate solar consultation and technical support.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-yellow-400/20 text-slate-900">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Office Location</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  M/S Rout Traders<br />
                  Plot No. 452, Jaydev Vihar Road, Near NH 16,<br />
                  Bhubaneswar, Odisha - 751013
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-yellow-400/20 text-slate-900">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Phone &amp; WhatsApp</h3>
                <p className="text-xs text-slate-600">
                  <a href="tel:+919876543210" className="hover:text-yellow-600 font-medium transition-colors">+91 98765 43210</a>
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  <a href="tel:+916742345678" className="hover:text-yellow-600 font-medium transition-colors">Landline: 0674 234 5678</a>
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-yellow-400/20 text-slate-900">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Email Enquiries</h3>
                <p className="text-xs text-slate-600">
                  <a href="mailto:info@routtraders.com" className="hover:text-yellow-600 font-medium transition-colors">info@routtraders.com</a>
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  <a href="mailto:sales@routtraders.com" className="hover:text-yellow-600 font-medium transition-colors">sales@routtraders.com</a>
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-4 shadow-sm">
              <div className="p-2.5 rounded-xl bg-yellow-400/20 text-slate-900">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">Business Hours</h3>
                <p className="text-xs text-slate-600">Monday – Saturday: 9:00 AM – 7:30 PM</p>
                <p className="text-xs text-slate-400 mt-0.5">Sunday: Closed (Emergency On-Call)</p>
              </div>
            </div>

          </div>

          {/* Embedded Google Map Placeholder */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative flex flex-col min-h-[380px] shadow-sm">
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-900" />
                <span>M/S Rout Traders - Solar Service Center Map</span>
              </span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex-1 relative w-full h-full min-h-[320px] bg-slate-100/60 flex items-center justify-center p-6 text-center">
              {/* Map background styling */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              ></div>

              <div className="relative z-10 max-w-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-yellow-400 text-slate-900 border border-yellow-500/30 mx-auto flex items-center justify-center shadow-md">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">M/S Rout Traders Head Office</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jaydev Vihar Road, NH 16 Junction, Bhubaneswar, Odisha
                </p>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-yellow-400 text-xs font-bold shadow-sm"
                  >
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
