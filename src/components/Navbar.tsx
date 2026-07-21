import React, { useState, useEffect } from 'react';
import { Sun, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onNavigateToBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Packages', href: '#packages' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-md'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sun className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase italic block leading-none">
                M/S Rout Traders
              </span>
              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mt-1 block">
                Solar Energy Solutions
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onNavigateToBooking}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-yellow-400 font-bold uppercase tracking-wider text-xs shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-yellow-400" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToBooking();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-full bg-slate-900 text-yellow-400 font-bold uppercase tracking-wider text-xs shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
