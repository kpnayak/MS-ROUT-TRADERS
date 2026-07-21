import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';

export const Testimonials: React.FC = () => {
  const reviews: Testimonial[] = [
    {
      id: '1',
      name: 'Ramesh Chandra Mohanty',
      location: 'Bhubaneswar',
      systemSize: '5 kW Rooftop System',
      rating: 5,
      quote: 'M/S Rout Traders handled our 5 kW installation impeccably. My monthly bill came down from ₹6,800 to under ₹600! The subsidy paperwork was handled completely by their team.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Priyanka Das',
      location: 'Cuttack',
      systemSize: '3 kW Residential System',
      rating: 5,
      quote: 'Excellent professional service! The site engineer explained everything clearly and installed high quality panels in just 2 days. Highly recommended vendor!',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Sanjeev Kumar Swain',
      location: 'Puri Highway',
      systemSize: '10 kW Commercial Plant',
      rating: 5,
      quote: 'We installed a 10 kW plant for our commercial establishment with M/S Rout Traders. The net metering integration was flawless and the generation performance exceeded estimates.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    },
    {
      id: '4',
      name: 'Sunita Nayak',
      location: 'Khurda',
      systemSize: '5 kW Hybrid System',
      rating: 5,
      quote: 'Very clean installation with zero damage to our rooftop waterproofing. The team provided great guidance on selecting the 5 kW hybrid package.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block shadow-xs">
            Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Solar Customers Say
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            Real stories from homeowners and business owners powered by M/S Rout Traders.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between hover:border-yellow-400 transition-all shadow-sm"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    <span>{rev.location}</span> &bull; <span className="text-slate-900 font-bold">{rev.systemSize}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
