import { React, useState } from 'react';
import './App.css';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Delete from './delete.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom';
// import Home from './home.jsx';
import Register from './registration.jsx';
import Userdash from './userdash.jsx';
import ProfilePage from './profileP.jsx';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const handleLoginClick = () => {
    setShowButtons(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setShowButtons(false);
    navigate('/register');
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setShowButtons(true);
    navigate('/');
  };

  return (
    <div>
      {showButtons && (
        <>
          <button onClick={handleLoginClick} id="login1">Login</button><br />
          <button onClick={handleRegisterClick} id="register">Register</button>
        </>
      )}
      {!showButtons && isLoggedIn && (
        <button onClick={handleLogoutClick} id="logout">Logout</button>
      )}

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ProfilePage replace/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/dash" element={<Userdash />} />
      </Routes>
    </div>
  );
};

export default App;

// import React, { useState } from 'react';
// import './App.css';
// import Login from './login.jsx';
// import Dashboard from './dashboard.jsx';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Home from './home';
// import Register from './registration.jsx';

// const App = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLoginClick = () => {
//     setIsLoggedIn(false);
//     navigate('/login');
//   };
//   const handleRegisterClick = () => {
//         setShowButtons(false);
//         navigate('/register');
//   };
//   return (
//     <div>
//       {!isLoggedIn && (
//         <>
//           <button onClick={() => navigate('/login')} id="login1">Login</button><br />
//           <button onClick={() => navigate('/register')} id="register">Register</button>
//         </>
//       )}
//       {isLoggedIn && (
//         <button onClick={handleLoginClick} id="logout">Logout</button>
//       )}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/register*" element={<Register />} />
//         <Route path="/dashboard/*" element={<Dashboard />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;
