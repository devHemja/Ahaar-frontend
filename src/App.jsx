import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/Dashboard';
import NgoDashboardPage from './pages/ngo/NGODashboardPage';
import DonateFoodPage from './pages/DonateFoodPage';
import NearbyNGOsPage from './pages/NearbyNGOsPage';
import TrackDeliveryPage from './pages/TrackDeliveryPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardLayout from './components/layout/DashboardLayout';
import NGODashboardLayout from './components/layout/NGODashboardLayout';
import ActiveClaimsPage from './pages/ngo/ActiveClaimsPage';
import BrowseFoodPage from './pages/ngo/BrowseFoodPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Standard / Donor Dashboard Layout Routes */}
          <Route element={<RequireAuth role="donor" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/donate-food" element={<DonateFoodPage />} />
              <Route path="/nearby-ngos" element={<NearbyNGOsPage />} />
              <Route path="/track-delivery" element={<TrackDeliveryPage />} />

              {/* Common Pages for Donor */}
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
          </Route>

          {/* NGO Dashboard Layout Routes */}
          <Route element={<RequireAuth role="ngo" />}>
            <Route element={<NGODashboardLayout />}>
              <Route path="/ngo-dashboard" element={<NgoDashboardPage />} />
              <Route path="/ngo/active-claims" element={<ActiveClaimsPage />} />
              <Route path="/ngo/browse-food" element={<BrowseFoodPage />} />

              {/* SHARED Common Pages prefixed for NGO Layout */}
              <Route path="/ngo/notifications" element={<NotificationsPage />} />
              <Route path="/ngo/profile" element={<ProfilePage />} />
              <Route path="/ngo/about" element={<AboutPage />} />
              <Route path="/ngo/contact" element={<ContactPage />} />
            </Route>
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
