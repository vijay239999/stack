import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Login({ setIsLoggedIn }) {
  const backgroundStyle = {
    backgroundImage: `url('https://preview.redd.it/alien-romulus-wallpaper-poster-hd-v0-hg1atry5void1.jpg?width=1080&crop=smart&auto=webp&s=e00942a88fbadc121dc96d44427d51ff4dbe3be5')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
  };

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
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log("login response", response)

        if (response.ok) {
          setIsLoggedIn(true);
          const data = await response.json();
          const token = data.token;
          localStorage.setItem('authToken', token);
        navigate('/dashboard', { state: { user: payload.username } });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={backgroundStyle}>
      <form onSubmit={handleSubmit}>
        <label id="name" htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          placeholder="Enter your username"
        />

        <label id="pass" htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
        />

        <button id="login" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}


// import { React, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './App.css';
// export default function Login() {
//   const backgroundStyle = {
//     backgroundImage: `url('https://preview.redd.it/alien-romulus-wallpaper-poster-hd-v0-hg1atry5void1.jpg?width=1080&crop=smart&auto=webp&s=e00942a88fbadc121dc96d44427d51ff4dbe3be5')`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '100vh',
//     width: '100vw',
// };
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData(event.target);
//     const payload = {
//       username: formData.get('username'),
//       password: formData.get('password'),
//     };

//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         navigate('/dashboard', { state: { user: payload.username } });
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={backgroundStyle}>
//       <form onSubmit={handleSubmit}>
//         <label id="name" htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" required />

//         <label id="pass" htmlFor="password">Password:</label>
//         <input type="password" id="password" name="password" required />

//         <button id="login" type="submit" disabled={loading}>
//           {loading ? 'Loading...' : 'Login'}
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }
