export interface Booking {
  id?: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  roof_area: number;
  monthly_bill?: number | null;
  package: string;
  consultation_date: string;
  time_slot: string;
  message?: string | null;
  status?: 'New' | 'Contacted' | 'Converted' | 'Closed';
  created_at?: string;
}

export interface PackageSpec {
  id: string;
  name: string;
  capacity: string;
  roofAreaRange: string;
  monthlyBillRange: string;
  idealFor: string;
  panelCount: string;
  estimatedSavings: string;
  description: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  systemSize: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
