import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages & components
import Home from "./components/home/Home";
import LoginSignup from "./components/LoginSingup/LoginSignup";
import Dashboard from "./components/dashboard_profile/Dashboard";
import PaymentForm from "./components/Payments/PaymentForm";
import About from "./components/About/About";
import { gapi } from "gapi-script";
import { useEffect } from "react";

function App() {
  const clientId = constants.CLIENT_ID;
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "697032302275-4ghbaj2arfvn1vg02c2mlhsvvd4v8s3c.apps.googleusercontent.com",
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Payments" element={<PaymentForm />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
