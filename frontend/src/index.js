import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReactGA from "react-ga4";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages & components
import Home from "./components/home/Home";
import LoginSignup from "./components/LoginSingup/LoginSignup";
import Dashboard from "./components/DashboardProfile/Dashboard.js";
import BookList from "./components/home/BookList/BookList";
import BookDetails from "./components/home/BookList/BookDetails";
import { AppProvider } from "./components/home/Context";
import PaymentForm from "./components/Payments/PaymentForm";
import About from "./components/About/About";
import ProfileForm from "./components/DashboardProfile/ProfileForm";
//import Bookings from "./components/DashboardProfile/Bookings";
import AdminDashBoard from "./components/DashboardProfile/AdminDashBoard/AdminDashBoard.js";
import EmployeeDashboard from "./components/DashboardProfile/EmployeeDashboard/EmployeeDashboard2.js";
import CustomerSupport from "./components/DashboardProfile/CustomerSupport/CustomerSupportDashboard2.js";
import MakePayment from "./components/Payments/MakePayment";
import { AuthProvider } from "./components/LoginSingup/Context.js";
import Logout from "./components/LoginSingup/Logout";
ReactGA.initialize("G-JGE7TDKVZ0");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}>
              <Route path="/book" element={<BookList />} />
              <Route path="/book/:id" element={<BookDetails />} />
            </Route>
            <Route path="/LoginSignup" element={<LoginSignup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/AdminDashboard" element={<AdminDashBoard />} />
            <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
            <Route path="/MakePayment" element={<MakePayment />} />
            <Route path="/Payments" element={<PaymentForm />} />
            <Route path="/About" element={<About />} />
            <Route path="/ProfileForm" element={<ProfileForm />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/CustomerSupport" element={<CustomerSupport />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </AppProvider>
);
