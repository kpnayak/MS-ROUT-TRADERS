import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle, Send, ShieldCheck, Sun } from 'lucide-react';
import { submitBooking } from '../lib/bookingsService';

interface BookingFormProps {
  selectedPackage?: string;
  onSuccessSubmit?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedPackage }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [pkg, setPkg] = useState('3 kW');
  const [consultationDate, setConsultationDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync selected package prop when updated
  useEffect(() => {
    if (selectedPackage) {
      if (['3 kW', '5 kW', '10 kW'].includes(selectedPackage)) {
        setPkg(selectedPackage);
      } else {
        setPkg('Not Sure — Recommend For Me');
      }
    }
  }, [selectedPackage]);

  // Default consultation date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setConsultationDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone Number is required.';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!address.trim()) {
      newErrors.address = 'Full Address / City is required.';
    }

    if (!roofArea || isNaN(Number(roofArea)) || Number(roofArea) <= 0) {
      newErrors.roofArea = 'Approx. Roof/Site Area is required (valid positive number).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        full_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        roof_area: Number(roofArea),
        monthly_bill: monthlyBill ? Number(monthlyBill) : null,
        package: pkg,
        consultation_date: consultationDate || new Date().toISOString().split('T')[0],
        time_slot: timeSlot,
        message: message.trim() || null,
        status: 'New',
      };

      const result = await submitBooking(payload);

      if (!result.success) {
        setErrorMessage(result.error || 'Unable to submit your booking request at this moment. Please try again.');
      } else {
        setSubmitSuccess(true);
        // Reset form
        setFullName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setRoofArea('');
        setMonthlyBill('');
        setMessage('');
        setErrors({});
      }
    } catch (err) {
      console.error('Unexpected error submitting form:', err);
      setErrorMessage('An unexpected error occurred. Please verify your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full mb-3 inline-block shadow-xs">
            Free On-Site Survey &amp; Quote
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Book Your Free Solar Consultation
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Fill out the form below. Our solar engineering expert from M/S Rout Traders will evaluate your roof and prepare a customized proposal.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Card Wrapper */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {submitSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-500 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Consultation Request Received!</h3>
              <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
                Thank you for choosing <strong className="text-slate-900">M/S Rout Traders</strong>. Our solar project manager will contact you within 24 hours to confirm your consultation schedule.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-3 rounded-full bg-slate-900 text-yellow-400 font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-md"
                >
                  Book Another Consultation
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
                  <div>
                    <span className="font-bold block">Submission Error</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar Mohapatra"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                      errors.fullName ? 'border-rose-500' : 'border-slate-200 focus:border-slate-900'
                    } text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors`}
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Phone Number (10-digit) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 focus:border-slate-900'
                    } text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rajesh@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-slate-900'
                    } text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors`}
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* Approx Roof Area */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Approx. Roof Area (sq ft) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    placeholder="e.g. 450"
                    min="50"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                      errors.roofArea ? 'border-rose-500' : 'border-slate-200 focus:border-slate-900'
                    } text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors`}
                  />
                  {errors.roofArea && <p className="text-[10px] text-rose-500 mt-1">{errors.roofArea}</p>}
                </div>

                {/* Full Address / City */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Full Installation Address / City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Plot No 123, Jaydev Vihar, Bhubaneswar, Odisha"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                      errors.address ? 'border-rose-500' : 'border-slate-200 focus:border-slate-900'
                    } text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors`}
                  />
                  {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
                </div>

                {/* Monthly Bill */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Average Monthly Bill in ₹ (Optional)
                  </label>
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    placeholder="e.g. 4500"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors"
                  />
                </div>

                {/* Preferred Package */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Preferred Solar Package
                  </label>
                  <select
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 text-xs focus:outline-none transition-colors"
                  >
                    <option value="3 kW">3 kW Residential Solar</option>
                    <option value="5 kW">5 kW Executive Solar</option>
                    <option value="10 kW">10 kW Premium / Commercial Solar</option>
                    <option value="Not Sure — Recommend For Me">Not Sure — Recommend For Me</option>
                  </select>
                </div>

                {/* Consultation Date */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Preferred Consultation Date
                  </label>
                  <input
                    type="date"
                    value={consultationDate}
                    onChange={(e) => setConsultationDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 text-xs focus:outline-none transition-colors"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 text-xs focus:outline-none transition-colors"
                  >
                    <option value="Morning">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
                    <option value="Evening">Evening (4:00 PM – 7:00 PM)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Additional Message / Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Looking for battery backup or custom frame structure on roof..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors"
                  ></textarea>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                <div className="flex items-center text-xs text-slate-500 space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-slate-900" />
                  <span>Your information is strictly confidential &amp; zero spam guaranteed.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-yellow-400 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Consultation Request</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
