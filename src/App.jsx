import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./container/Login";
import Signup from "./container/Signup";
import ResetPassword from "./pages/restpass";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/home";  // Main home page or dashboard
import Verifyaccount from './pages/verify';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsLoggedIn(!!token);
  // }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin}/>} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify/:token" element={<Verifyaccount/>}/>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} onLogout={handleLogout} />}>
        <Route path="/" element={<Home />} />
        {/* Add other protected pages inside this */}
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
