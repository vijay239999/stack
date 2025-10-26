import React from 'react';
import './App.css';
import Contact from './contact.jsx';
import Product from './product.jsx';
import Data from './users.jsx';
import Delete from './delete.jsx';
import Mirraudio from './update.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `url('https://preview.redd.it/alien-romulus-wallpaper-poster-hd-v0-hg1atry5void1.jpg?width=1080&crop=smart&auto=webp&s=e00942a88fbadc121dc96d44427d51ff4dbe3be5')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
  };

  return (
    <div style={backgroundStyle}>
      <h1>
        <span className="scroll-text">Welcome to the Dashboard</span>
      </h1>
      <button onClick={() => navigate('/dashboard/contact')}>Contact</button>
      <button onClick={() => navigate('/dashboard/product')}>Product</button>
      <button onClick={() => navigate('/dashboard/users')}>Users</button>
      <button onClick={() => navigate('/dashboard/mirraudio')}>Mirraudio</button>

      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/users" element={<Data />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/mirraudio" element={<Mirraudio />} />
      </Routes>
    </div>
  );
}

// import React from 'react';
// import './App.css';
// import Contact from './contact.jsx';
// import Product from './product.jsx';
// import Data from './users.jsx';
// import Delete from './delete.jsx'
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import { getNgrokUrl } from './utils/getNgrokUrl';
// import Mirraudio from './update.jsx';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const handleContactClick = async () => {
//     const ngrokUrl = await getNgrokUrl();
//     console.log('Live Ngrok URL:', ngrokUrl); 
//     navigate('/dashboard/mirraudio');
//   };

//   const backgroundStyle = {
//     backgroundImage: `url('https://preview.redd.it/alien-romulus-wallpaper-poster-hd-v0-hg1atry5void1.jpg?width=1080&crop=smart&auto=webp&s=e00942a88fbadc121dc96d44427d51ff4dbe3be5')`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '100vh',
//     width: '100vw',
//   };

//   return (
//     <div style={backgroundStyle}>
//       <h1>
//         <span className="scroll-text">Welcome to the Dashboard</span>
//       </h1>
//       <button onClick={() => navigate('/dashboard/contact')}>Contact</button>
//       <button onClick={() => navigate('/dashboard/product')}>Product</button>
//       <button onClick={() => navigate('/dashboard/users')}>Users</button>
//       <button onClick={handleContactClick}>mirraudio</button>
//       <Routes>
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/users" element={<Data />} />
//         <Route path="/delete" element={<Delete />} />
//         <Route path="/mirraudio" element={<Mirraudio />} />
//       </Routes>
//     </div>
//   );
// }
