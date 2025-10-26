// import { React } from 'react'
import Home from './home.jsx';
import './App.css'
// import Register from './registration.jsx';
// import Login from './login.jsx';
import { Route, Routes} from 'react-router-dom';
import About from './about.jsx';
import Contact from './contact.jsx';
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> 
    
     
  );
};

export default App;
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState, useEffect } from 'react'
// import './App.css'
// import Navbar from './Navbar';
// function App() {
//   const [users, setUsers] = useState();

//   const da = async () => {
//     const fetchData = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await fetchData.json();
//     console.log(data);
//     setUsers(data);
//   }
//   useEffect(() => {
//     da();
//   }, [])


//   return (
//     <div>
//       {users && users.map((user) => (
//         <div key={user.id}>
//           <h1>{user.name}</h1>
//           <p>{user.email}</p>
//           <p>{user.username}</p>
//         </div>
//       ))}
//        </div>
//       )
// }

// export default App;