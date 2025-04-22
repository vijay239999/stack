import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Delete() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const payload = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch(`https://vstack.onrender.com/delete/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('User deleted successfully.');
                navigate('/');
            } else {
                const { error } = await response.json();
                setError(error || 'Failed to delete user. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Enter your username"
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './App.css';
// export default function Delete() {
//     const backgroundStyle = {
//       backgroundImage: `url('https://preview.redd.it/alien-romulus-wallpaper-poster-hd-v0-hg1atry5void1.jpg?width=1080&crop=smart&auto=webp&s=e00942a88fbadc121dc96d44427d51ff4dbe3be5')`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       height: '100vh',
//       width: '100vw',
//     };
  
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       setLoading(true);
  
//       const formData = new FormData(event.target);
//       const payload = {
//         username: formData.get('username'),
//         password: formData.get('password'),
//       };
  
//       try {
//         const response = await fetch(`http://localhost:8080/delete/${userId}`, {
//           method: 'DELETE',
//           headers: { 'Content-Type': 'application/json' },
//       });
//         if (response.ok) {
//           navigate('/home');
//         } else {
//           setError('Invalid credentials. Please try again.');
//         }
//       } catch (error) {
//         setError('An error occurred. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     return (
//       <div style={backgroundStyle}>
//         <form onSubmit={handleSubmit}>
//           <label id="name" htmlFor="username">Username:</label>
//           {/* <label htmlFor="username">Username:</label> */}
//           <input
//             type="text"
//             id="username"
//             name="username"
//             required
//             placeholder="Enter your username"
//           />
  
//           <label id="pass" htmlFor="password">Password:</label>
  
//           {/* <label htmlFor="password">Password:</label> */}
//           <input
//             type="password"
//             id="password"
//             name="password"
//             required
//             placeholder="Enter your password"
//           />
  
//           <button id="delete" type="submit" disabled={loading}>
//             {loading ? 'Loading...' : 'Delete'}
//           </button>
//         </form>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </div>
//     );
// }