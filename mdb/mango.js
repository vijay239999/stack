import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tests from './schemas/students.js';


dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.options('*', cors());
// app.use(cors({
//   origin: 'https://vstack-675k.onrender.com',
//   credentials: true,
// }));
const allowedOrigins = [
  'http://localhost:3000',
  'https://vstack-675k.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());

const mongo_url = process.env.MANGO;
mongoose.connect(mongo_url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided or invalid token format' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'zxcvbnm', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

function authenticateRoles(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(401).send('Access denied');
    }
    next();
  };
}

app.get('/profile/:username', async (req, res) => {
  try {
    const user = await tests.findOne({ username: req.params.username }, { password: 0 });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/profile/update', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await tests.findOneAndUpdate(
      { username: req.user.username },
      updates,
      { new: true, projection: { password: 0 } }
    );
    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await tests.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'zxcvbnm', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminUser = await tests.findOne({ username, role: 'admin' });
    if (!adminUser || adminUser.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: adminUser.username, role: adminUser.role }, process.env.JWT_SECRET || 'zxcvbnm', { expiresIn: '1h' });
    res.status(200).json({ message: 'Admin login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during admin login.' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      phone_number,
      bio,
      skills,
      github,
      profileImage,
      resumeLink
    } = req.body;

    const newUser = new tests({
      username,
      password,
      email,
      phone_number,
      bio,
      skills,
      github,
      profileImage,
      resumeLink
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate entry. Use unique values.' });
    }
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

// app.post('/register', async (req, res) => {
//   try {
//     const { username, password, email, phone_number } = req.body;
//     const newUser = new tests({ username, password, email, phone_number });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({ error: 'Duplicate entry. Use unique values.' });
//     }
//     res.status(500).json({ error: 'An error occurred during registration.' });
//   }
// });

app.get('/users', authenticateToken, authenticateRoles(['admin', 'user']), async (req, res) => {
  try {
    const users = await tests.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

app.delete('/delete', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await tests.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    await tests.findOneAndDelete({ username });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during deletion.' });
  }
});
