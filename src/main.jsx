// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ResetPassword from './pages/restpass';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//       </Routes>
//       <App />
//     </Router>
//   </StrictMode>
// );
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.jsx';
import ResetPassword from './pages/restpass';

function Main() {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/reset-password') ? (
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      ) : (
        <App />
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Main />
    </Router>
  </StrictMode>
);
