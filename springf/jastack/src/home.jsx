import { useState, useEffect } from 'react';
import './App.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const da = async () => {
    try {
      const fetchData = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await fetchData.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    da();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
}

// import './App.css'
// export default function Home(){
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
