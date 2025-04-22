import { useState, useEffect } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {

      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token found. Please log in first.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://vstack.onrender.com/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized. Please log in again.');
          }
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
        setError('');
      } catch (err) {
        console.error('Error fetching users:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && users.length === 0 && !error && <p>No users found.</p>}
      {users.map((user) => (
        <div key={user._id} style={{ marginBottom: '10px' }}>
          <p style={{ color: 'red' }}>Email: {user.email}</p>
          <p style={{ color: 'yellow' }}>Name: {user.username}</p>
        </div>
      ))}
    </div>
  );
}


// import {useState, useEffect} from 'react'
// export default function Data(){
//     const [users, setUser] = useState([]);
//     useEffect(() =>{
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then((res) => {
//                 return res.json()
//             })
//             .then((data) => {
//                 console.log(data)
//                 setUser(data)
//             })
//     }, [])
//     return (
//         <> <div><button onclick={setUsers} >
//             {users.map((user) => (
               
//                 <div key={user.id} style={{ marginBottom: '10px' }}>
//               <p style={{ color: 'red' }}>Email: {user.email}</p>
//               <p style={{ color: 'yellow' }}>Name: {user.name}</p>
//               </button>
//             </div>
//         </>
//             //    <> <button key={user.id} onClick={() => alert(user.email)} style={{ color: 'red' }}>Show Email</button>
//             //     <button key={user.id} onClick={() => alert(user.name)} style={{ color: 'yellow' }}>Show Name</button></>// <h3 key={user.id}>{user.email}</h3>
//             ))}
        
//             )
// }
