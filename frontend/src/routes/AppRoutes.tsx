import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CustomerDashboard from "../pages/Customer/Dashboard";
import ProviderDashboard from "../pages/Provider/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import MyServices from "../pages/Provider/MyServices";
import AddService from "../pages/Provider/AddService";
import EditService from "../pages/Provider/EditService";
import Services from "../pages/Customer/Services";
import ServiceDetails from "../pages/Customer/ServiceDetails";
import MyBookings from "../pages/Customer/MyBookings";
import Bookings from "../pages/Provider/Bookings";

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
  path="/provider/dashboard"
  element={<ProviderDashboard />}
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
  path="/provider/add-service"
  element={<AddService />}
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
  path="/customer/my-bookings"
  element={<MyBookings />}
/>

<Route
  path="/provider/services"
  element={<MyServices />}
/>

<Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}