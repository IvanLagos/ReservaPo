import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ScrollToTop from "./components/ScrollToTop";
import Business from "./pages/Business";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import Professionals from "./pages/Professionals";
import HowItWorks from "./pages/HowItWorks";
import MyReservations from "./pages/MyReservations";
import JoinProfessionals from "./pages/JoinProfessionals";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import Booking from "./pages/Booking";
import ExportReservations from "./pages/ExportReservations";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <div className="bg-black text-white overflow-x-hidden min-h-screen">

      <ScrollToTop />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* AUTH */}
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* PUBLIC PAGES */}
        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/business/:id"
          element={<Business />}
        />

        <Route
          path="/professionals"
          element={<Professionals />}
        />

        <Route
          path="/professional/:id"
          element={<ProfessionalProfile />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/join-professionals"
          element={<JoinProfessionals />}
        />

        {/* CLIENT ONLY */}
        <Route
          path="/booking/:businessId/:serviceIndex"
          element={
            <ProtectedRoute allowedRole="client">

              <Booking />

            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="client">

              <ClientDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/my-reservations"
          element={
            <ProtectedRoute allowedRole="client">

              <MyReservations />

            </ProtectedRoute>
          }
        />

        {/* BUSINESS ONLY */}
        <Route
          path="/business-dashboard"
          element={
            <ProtectedRoute allowedRole="business">

              <BusinessDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/export-reservations"
          element={
            <ProtectedRoute allowedRole="business">

              <ExportReservations />

            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </div>

  );
}

export default App;