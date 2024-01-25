import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';
// import AdminDashboard from './components/admin/AdminDashboard';


function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  console.log(currentUser);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/admin-dashboard"
          element={
            currentUser ? (
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
