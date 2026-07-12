import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import CustomerDashboard from "../pages/Customer/Dashboard";
import Services from "../pages/Customer/Services";
import ServiceDetails from "../pages/Customer/ServiceDetails";
import MyBookings from "../pages/Customer/MyBookings";
import LeaveReview from "../pages/Customer/LeaveReview";

import ProviderDashboard from "../pages/Provider/Dashboard";
import MyServices from "../pages/Provider/MyServices";
import AddService from "../pages/Provider/AddService";
import EditService from "../pages/Provider/EditService";
import Bookings from "../pages/Provider/Bookings";
import Reviews from "../pages/Provider/Reviews";
import Profile from "../pages/Customer/Profile";
import NotFound from "../pages/NotFound/NotFound";
import CustomerReviews from "../pages/Customer/Reviews";
import ProviderProfile from "../pages/Provider/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/customer/dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/customer/services"
          element={<Services />}
        />

        <Route
          path="/customer/service/:id"
          element={<ServiceDetails />}
        />

        <Route
  path="/provider/profile"
  element={<ProviderProfile />}
/>

        <Route
          path="/customer/my-bookings"
          element={<MyBookings />}
        />

        <Route
  path="/customer/profile"
  element={<Profile />}
/>

        <Route
          path="/customer/review/:bookingId"
          element={<LeaveReview />}
        />

        <Route
  path="/customer/reviews"
  element={<CustomerReviews />}
/>

        <Route
          path="/provider/dashboard"
          element={<ProviderDashboard />}
        />

        <Route
          path="/provider/services"
          element={<MyServices />}
        />

        <Route
          path="/provider/add-service"
          element={<AddService />}
        />

        <Route
          path="/provider/edit-service/:id"
          element={<EditService />}
        />

        <Route
          path="/provider/bookings"
          element={<Bookings />}
        />

        <Route
          path="/provider/reviews"
          element={<Reviews />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}