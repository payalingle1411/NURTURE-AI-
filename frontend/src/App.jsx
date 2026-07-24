import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import Dashboard from "./pages/Dashboard/dashboard.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Welcome from "./pages/Welcome page/welcome.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;