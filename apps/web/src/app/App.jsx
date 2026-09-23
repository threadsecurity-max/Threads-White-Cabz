import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileBottomBar } from '../components/layout/MobileBottomBar';
import { BookingModal } from '../components/booking/BookingModal';

import { Home } from '../pages/Home';
import { RoutesIndex } from '../pages/RoutesIndex';
import { RouteDetail } from '../pages/RouteDetail';
import { ServicesIndex } from '../pages/ServicesIndex';
import { ServiceDetail } from '../pages/ServiceDetail';
import { FleetPage } from '../pages/FleetPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { BookingTrackPage } from '../pages/BookingTrackPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState({});

  const handleOpenBooking = (data = {}) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-[#FAF8F5] text-slate-800 font-sans selection:bg-brand-gold/30 selection:text-brand-dark overflow-x-hidden">
      {/* Sleek Global Geometric Grid Backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-grid-luxury bg-grid-radial-mask opacity-70" />
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-[#FAF8F5]/80" />

      <ScrollToTop />

      {/* Premium Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Routed Content */}
      <div className="flex-1 relative z-0">
        <Routes>
          <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
          <Route path="/routes" element={<RoutesIndex onOpenBooking={handleOpenBooking} />} />
          <Route path="/routes/:slug" element={<RouteDetail onOpenBooking={handleOpenBooking} />} />
          <Route path="/services" element={<ServicesIndex onOpenBooking={handleOpenBooking} />} />
          <Route path="/services/:slug" element={<ServiceDetail onOpenBooking={handleOpenBooking} />} />
          <Route path="/fleet" element={<FleetPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/track" element={<BookingTrackPage onOpenBooking={handleOpenBooking} />} />
          <Route path="*" element={<Home onOpenBooking={handleOpenBooking} />} />
        </Routes>
      </div>

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialData={bookingInitialData}
      />

      {/* Sticky Mobile Action Bar */}
      <MobileBottomBar onOpenBooking={handleOpenBooking} />

      {/* Rich Footer */}
      <Footer />
    </div>
  );
}

export default App;
