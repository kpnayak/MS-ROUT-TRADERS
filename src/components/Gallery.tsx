import React, { useState } from 'react';
import { MapPin, Maximize2, X } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: '5 kW Residential Rooftop Installation',
      location: 'Patia, Bhubaneswar',
      capacity: '5 kW Mono PERC',
      image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      title: '3 kW Compact House Array',
      location: 'Cuttack Sadar',
      capacity: '3 kW On-Grid',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      title: '10 kW Commercial Roof Setup',
      location: 'Chandaka Industrial Estate',
      capacity: '10 kW Commercial',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 4,
      title: '5 kW Duplex Villa Installation',
      location: 'Jaydev Vihar, Bhubaneswar',
      capacity: '5 kW Hybrid',
      image: 'https://images.unsplash.com/photo-1548611716-300183182189?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 5,
      title: 'High Efficiency Smart Inverter Unit',
      location: 'Khandagiri, Bhubaneswar',
      capacity: 'Smart Net Meter',
      image: 'https://images.unsplash.com/photo-1558441719-670b357022b9?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 6,
      title: '10 kW Residential Solar Plant',
      location: 'Puri District Residence',
      capacity: '10 kW Mono PERC',
      image: 'https://images.unsplash.com/photo-1592833159057-651427233151?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block shadow-xs">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Recent Solar Installation Projects
          </h2>
          <p className="text-slate-600 mt-3 text-sm">
            Take a look at some of M/S Rout Traders&apos; recent residential and commercial solar setups.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.image)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5">
                <div className="inline-block px-2.5 py-0.5 rounded bg-yellow-400/20 text-slate-900 text-[10px] font-bold uppercase tracking-wider mb-2">
                  {item.capacity}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-900 mr-1" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-slate-200 p-2 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900 text-yellow-400 hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={selectedImage} alt="Enlarged solar installation" className="w-full max-h-[80vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
};
