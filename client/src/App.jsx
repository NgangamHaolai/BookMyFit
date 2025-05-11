import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/navigation/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Schedule from "./Pages/Schedule";
import Contact from "./Pages/Contact";
import Pricing from "./Pages/Pricing";
import Classes from "./Pages/Classes";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./Pages/Login";
import AdminRoute from "./middleware/AdminRoute.jsx";
import MemberRoute from "./middleware/MemberRoute.jsx";

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith("/admin-dashboard") || location.pathname.startsWith("/user-dashboard");

  return (
    <>
      {!hideHeaderFooter && <NavBar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="classes" element={<Classes />} />
        <Route path="admin-dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
        <Route path="user-dashboard/*" element={<MemberRoute><UserDashboard/></MemberRoute>} />
        <Route path="login" element={<Login />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
      <ScrollToTop />
    </>
  );
}

export default App;
