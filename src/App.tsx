import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Book from './components/Book/Book';
import SearchBar from './components/SearchBar/SearchBar';
import SideBar from './components/Sidebar/Sidebar';
import Login from './components/LoginForm/Login';
import Register from './components/RegisterForm/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          isLoggedIn ? <Navigate to="/" /> : <Register />
        } />
        <Route path="/forgot-password" element={
          <ForgotPassword />
        } />
        <Route path="/" element={
          isLoggedIn ? (
            <div className="app-container">
              <SideBar />
              <div className="header">
                <img src="/icon-site.png" alt="library icon" width="100px" className="header-img" />
                <div className="header-title">
                  <span>Library</span>
                  <span>App</span>
                </div>
              </div>
              <SearchBar />
              <div className="books-grid">
                <Book />
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
