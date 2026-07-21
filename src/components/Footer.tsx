import React from 'react';
import { Sun, Phone, Mail, MapPin, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Solar Packages', href: '#packages' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Sizing Calculator', href: '#calculator' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'Book Consultation', href: '#booking' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Company Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-slate-900 font-bold shadow-md">
                <Sun className="w-5 h-5 fill-slate-900" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white uppercase">
                M/S Rout Traders
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Leading residential and commercial rooftop solar installation vendor. Authorized MNRE empaneled vendor delivering turnkey 3 kW, 5 kW, and 10 kW green energy plants with DISCOM net metering.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 pt-2">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-yellow-400 hover:text-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 transition-colors text-xs font-bold"
                  aria-label={platform}
                  title={platform}
                >
                  {platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider mb-4">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-slate-400 hover:text-yellow-400 transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Summary */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider mb-4">M/S Rout Traders Office</h4>
            <div className="text-xs space-y-2.5 text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Bhubaneswar, Odisha - 751013</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>info@routtraders.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Admin Login Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} M/S Rout Traders. All Rights Reserved.</p>

          <div className="flex items-center space-x-4">
            <span className="text-slate-700">&bull;</span>
            <button
              onClick={onNavigateToAdmin}
              className="text-slate-400 hover:text-yellow-400 text-xs transition-colors flex items-center space-x-1 underline decoration-slate-700 hover:decoration-yellow-400"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
