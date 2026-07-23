import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { getAdminAuthState } from './lib/bookingsService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Benefits } from './components/Benefits';
import { Packages } from './components/Packages';
import { HowItWorks } from './components/HowItWorks';
import { CalculatorGuidance } from './components/CalculatorGuidance';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { BookingForm } from './components/BookingForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'public' | 'admin-login' | 'admin-dashboard'>('public');
  const [selectedPackage, setSelectedPackage] = useState<string>('3 kW');
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Sync route based on URL path or hash
  const syncRouteFromLocation = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path.includes('/admin/dashboard') || hash.includes('admin/dashboard')) {
      setCurrentRoute('admin-dashboard');
    } else if (path.includes('/admin/login') || hash.includes('admin/login')) {
      setCurrentRoute('admin-login');
    } else {
      setCurrentRoute('public');
    }
  };

  useEffect(() => {
    // 1. Check initial Supabase / local session
    const initAuth = async () => {
      try {
        const isAuthenticated = await getAdminAuthState();
        setSession(isAuthenticated ? { user: { role: 'admin' } } : null);
      } catch (err) {
        console.warn('Auth check notice:', err);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();

    let subscription: any;
    try {
      const res = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setSession(session);
        }
      });
      subscription = res.data?.subscription;
    } catch (err) {
      console.warn('Supabase auth listener notice:', err);
    }

    // 2. Sync routing
    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);

    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, []);

  const navigateTo = (route: 'public' | 'admin-login' | 'admin-dashboard') => {
    setCurrentRoute(route);
    if (route === 'admin-login') {
      window.location.hash = '#/admin/login';
    } else if (route === 'admin-dashboard') {
      window.location.hash = '#/admin/dashboard';
    } else {
      if (window.location.hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  const handleNavigateToBooking = (pkgId?: string) => {
    if (pkgId) {
      setSelectedPackage(pkgId);
    }
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Guard routing for admin dashboard
  if (currentRoute === 'admin-dashboard') {
    if (!authLoading && !session) {
      // Redirect to login if unauthenticated
      return (
        <AdminLogin
          onLoginSuccess={() => navigateTo('admin-dashboard')}
          onGoHome={() => navigateTo('public')}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={() => navigateTo('public')}
        onGoHome={() => navigateTo('public')}
      />
    );
  }

  if (currentRoute === 'admin-login') {
    if (session) {
      return (
        <AdminDashboard
          onLogout={() => navigateTo('public')}
          onGoHome={() => navigateTo('public')}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={() => navigateTo('admin-dashboard')}
        onGoHome={() => navigateTo('public')}
      />
    );
  }

  // Public Landing Page rendering all 13 required sections in order
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-yellow-400 selection:text-slate-900">
      
      {/* 1. Header / Navbar */}
      <Navbar onNavigateToBooking={() => handleNavigateToBooking()} />

      {/* 2. Hero Section */}
      <Hero onNavigateToBooking={() => handleNavigateToBooking()} />

      {/* 3. About Us */}
      <AboutUs />

      {/* 4. Why Go Solar / Benefits */}
      <Benefits />

      {/* 5. Solar Packages */}
      <Packages onSelectPackage={(pkgId) => handleNavigateToBooking(pkgId)} />

      {/* 6. How It Works / Installation Process */}
      <HowItWorks />

      {/* 7. Site Size Calculator Guidance */}
      <CalculatorGuidance onSelectPackage={(pkgId) => handleNavigateToBooking(pkgId)} />

      {/* 8. Gallery */}
      <Gallery />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. FAQ */}
      <FAQ />

      {/* 11. Booking / Consultation Form Section */}
      <BookingForm selectedPackage={selectedPackage} />

      {/* 12. Contact Section */}
      <ContactSection />

      {/* 13. Footer (contains ONLY place for Admin Login link) */}
      <Footer onNavigateToAdmin={() => navigateTo('admin-login')} />

    </div>
  );
}
