import React, { useEffect, useState } from 'react';
import { LogOut, Search, RefreshCw, Filter, ArrowUpDown, Sun, Calendar, Phone, Mail, MapPin, CheckCircle2, AlertCircle, Eye, X } from 'lucide-react';
import { fetchAllBookings, updateBookingStatus, logoutAdminSession } from '../../lib/bookingsService';
import { Booking } from '../../types';

interface AdminDashboardProps {
  onLogout: () => void;
  onGoHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onGoHome }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'created_at' | 'consultation_date' | 'full_name' | 'roof_area'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Detail Modal state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Status updating indicator per ID
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetchAllBookings();
      if (res.error) {
        setErrorMsg(res.error);
      }
      setBookings(res.bookings || []);
    } catch (err) {
      console.error('Unexpected error fetching bookings:', err);
      setErrorMsg('An unexpected error occurred while querying the database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string | undefined, newStatus: 'New' | 'Contacted' | 'Converted' | 'Closed') => {
    if (!bookingId) return;

    setUpdatingId(bookingId);

    try {
      await updateBookingStatus(bookingId, newStatus);
      // Optimistic state update
      setBookings((prev) =>
        prev.map((item) => (item.id === bookingId ? { ...item, status: newStatus } : item))
      );
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    } catch (err) {
      console.error('Exception updating status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = async () => {
    await logoutAdminSession();
    onLogout();
  };

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter((b) => {
      const matchesSearch =
        b.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.phone?.includes(searchTerm) ||
        b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.package?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (sortField === 'roof_area') {
        const numA = Number(aVal) || 0;
        const numB = Number(bVal) || 0;
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'New':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Contacted':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'Converted':
        return 'bg-emerald-100 border-emerald-300 text-emerald-800';
      case 'Closed':
        return 'bg-slate-100 border-slate-300 text-slate-600';
      default:
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    }
  };

  const counts = {
    total: bookings.length,
    new: bookings.filter((b) => b.status === 'New' || !b.status).length,
    contacted: bookings.filter((b) => b.status === 'Contacted').length,
    converted: bookings.filter((b) => b.status === 'Converted').length,
    closed: bookings.filter((b) => b.status === 'Closed').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-slate-900 font-bold shadow-sm">
              <Sun className="w-6 h-6 fill-slate-900" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 leading-tight">
                M/S Rout Traders &bull; Admin Console
              </h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Live Supabase Booking Management</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onGoHome}
              className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors hidden sm:block border border-slate-200"
            >
              Public Site
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        {/* KPI Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Bookings</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{counts.total}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-yellow-300 shadow-sm">
            <div className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider">New Requests</div>
            <div className="text-2xl font-black text-yellow-600 mt-1">{counts.new}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-sm">
            <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Contacted</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{counts.contacted}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm">
            <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Converted</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{counts.converted}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Closed</div>
            <div className="text-2xl font-black text-slate-600 mt-1">{counts.closed}</div>
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, phone, email, package or address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 placeholder-slate-400 text-xs focus:outline-none"
              />
            </div>

            {/* Actions: Refresh & Sort */}
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchBookings}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-colors"
                title="Refresh Table"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500 pl-1 font-medium">Sort:</span>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as any)}
                  className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="created_at">Submitted On</option>
                  <option value="consultation_date">Consultation Date</option>
                  <option value="full_name">Customer Name</option>
                  <option value="roof_area">Roof Area</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 text-slate-900 hover:text-slate-700"
                  title="Toggle Ascending/Descending"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Status Tabs Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-700" />
              Filter Status:
            </span>
            {['All', 'New', 'Contacted', 'Converted', 'Closed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  statusFilter === st
                    ? 'bg-yellow-400 text-slate-900 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

        {/* Bookings Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          {errorMsg && (
            <div className="p-4 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {loading ? (
            <div className="p-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-500 text-xs">Loading bookings from Supabase...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <Sun className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-slate-900 font-bold text-sm">No Bookings Found</p>
              <p className="text-slate-500 text-xs">
                {searchTerm || statusFilter !== 'All'
                  ? 'Try clearing your search or status filter.'
                  : 'No consultation booking submissions exist in the database yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200 tracking-wider">
                    <th className="py-3.5 px-4">Name</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Package</th>
                    <th className="py-3.5 px-4">Site Area</th>
                    <th className="py-3.5 px-4">Preferred Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Submitted On</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredBookings.map((b) => (
                    <tr key={b.id || Math.random()} className="hover:bg-slate-50 transition-colors">
                      {/* Name */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div>{b.full_name}</div>
                        <div className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]">{b.address}</div>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                        <a href={`tel:${b.phone}`} className="hover:underline">{b.phone}</a>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        <a href={`mailto:${b.email}`} className="hover:underline">{b.email}</a>
                      </td>

                      {/* Package */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-900 font-bold text-[10px] border border-slate-200">
                          {b.package}
                        </span>
                      </td>

                      {/* Site Area */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-900 font-bold">
                        {b.roof_area} sq ft
                      </td>

                      {/* Preferred Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{b.consultation_date || 'N/A'}</div>
                        <div className="text-[10px] text-slate-500">{b.time_slot}</div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={b.status || 'New'}
                          disabled={updatingId === b.id}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-full border text-[10px] font-bold cursor-pointer focus:outline-none transition-colors ${getStatusBadgeClass(
                            b.status
                          )}`}
                        >
                          <option value="New" className="bg-white text-slate-900">New</option>
                          <option value="Contacted" className="bg-white text-slate-900">Contacted</option>
                          <option value="Converted" className="bg-white text-slate-900">Converted</option>
                          <option value="Closed" className="bg-white text-slate-900">Closed</option>
                        </select>
                      </td>

                      {/* Submitted On */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-slate-500 font-mono">
                        {b.created_at ? new Date(b.created_at).toLocaleDateString() : 'Just now'}
                      </td>

                      {/* View Details Modal Button */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 rounded-full bg-slate-100 hover:bg-yellow-400 hover:text-slate-900 text-slate-700 transition-colors border border-slate-200"
                          title="View Full Booking Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center font-bold shadow-sm">
                <Sun className="w-5 h-5 fill-slate-900" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{selectedBooking.full_name}</h3>
                <span className="text-xs text-slate-500 font-bold">{selectedBooking.package} Consultation</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Phone Number</span>
                  <span className="font-bold text-slate-900">{selectedBooking.phone}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Email Address</span>
                  <span className="font-bold text-slate-900">{selectedBooking.email}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Installation Address / City</span>
                <span className="font-medium text-slate-800">{selectedBooking.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Roof Area</span>
                  <span className="font-bold text-slate-900">{selectedBooking.roof_area} sq ft</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Monthly Bill</span>
                  <span className="font-bold text-slate-900">
                    {selectedBooking.monthly_bill ? `₹${selectedBooking.monthly_bill}` : 'Not specified'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Preferred Date &amp; Slot</span>
                  <span className="font-bold text-slate-900">
                    {selectedBooking.consultation_date} ({selectedBooking.time_slot})
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Current Status</span>
                  <select
                    value={selectedBooking.status || 'New'}
                    onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value as any)}
                    className="mt-1 font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="New" className="bg-white">New</option>
                    <option value="Contacted" className="bg-white">Contacted</option>
                    <option value="Converted" className="bg-white">Converted</option>
                    <option value="Closed" className="bg-white">Closed</option>
                  </select>
                </div>
              </div>

              {selectedBooking.message && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-bold uppercase block">Customer Message</span>
                  <p className="text-slate-700 italic mt-1">{selectedBooking.message}</p>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 rounded-full bg-yellow-400 text-slate-900 font-bold text-xs hover:bg-yellow-300 transition-colors shadow-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
