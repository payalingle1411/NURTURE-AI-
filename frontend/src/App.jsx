import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import Dashboard from "./pages/Dashboard/dashboard.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Welcome from "./pages/Welcome page/welcome.jsx";
import PersonalInfo from "./pages/Form/PersonalInfo/personalInfo.jsx";
import PregnancyDetails from "./pages/Form/PregnancyDetails/pregnancyDetails.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Components */}
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/pregnancy-details" element={<PregnancyDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;