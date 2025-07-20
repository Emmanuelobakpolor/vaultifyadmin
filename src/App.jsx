import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ManageSecurityP from "./pages/AddManageSecurityP.jsx";
import ManageVisitors from "./pages/ManageVisitors.jsx";
import SideBar from "./components/SideBar.jsx";
import TopNav from "./components/TopNav.jsx";
import Announcement from "./pages/Announcement.jsx";
import ManageResidents from "./pages/ManageResidents.jsx";
import ServiceBooking from "./pages/ServiceBooking.jsx";
import SecurityPersonnel from "./pages/SecurityPersonnel.jsx";
import Payment from "./pages/Payment.jsx";
import Residents from "./pages/residents.jsx";
import LostAndFound from "./pages/LostAndFound.jsx";
import Lost from "./pages/Lost.jsx";
import Found from "./pages/Found.jsx";
import Login from "./pages/Login.jsx";
import AddAmin from "./pages/admin/addAmin.jsx";
import RegisterAdmin from "./pages/admin/RegisterAdmin.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "react-query";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Administration from "./pages/Administration.jsx";
import EditAdmins from "./components/EditAdmins.jsx";
import EnterEmail from "./pages/enterEmail.jsx";
import VerificationInput from "./pages/VerificationCode.jsx";
function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  const isONlOGIN = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/enterEmail" || location.pathname === "/verify";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0" />
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-50" />
        </div>

        {/* Navigation */}
        {!isONlOGIN && (
          <>
            <SideBar />
            <TopNav />
          </>
        )}

        {/* Toasts */}
        <ToastContainer />

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enterEmail" element={<EnterEmail />} />
          <Route path="/verify" element={<VerificationInput/>} />

          <Route path="*" element={<Navigate to="/login" />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/AddManageSecurityP" element={<ManageSecurityP />} />
            <Route path="/ManageVisitors" element={<ManageVisitors />} />
            <Route path="/Announcement" element={<Announcement />} />
            <Route path="/AddManageResidents" element={<ManageResidents />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/securityPersonnel" element={<SecurityPersonnel />} />
            <Route path="/service" element={<ServiceBooking />} />
            <Route path="/LostAndFound" element={<LostAndFound />} />
            <Route path="/Lost" element={<Lost />} />
            <Route path="/Found" element={<Found />} />
            <Route path="/Administration" element={<Administration />} />
            <Route path="/AddAmin" element={<AddAmin />} />
            <Route path="/EditAdmins/:id" element={<EditAdmins />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
