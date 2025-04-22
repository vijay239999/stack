import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
// import test from './schemas/students.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tests from './schemas/students.js';
dotenv.config();
const PORT = process.env.PORT || 8080;
console.log('Port:', process.env.PORT);
const app = express();
app.use(cors({
    origin: 'https://vstack.onrender.com',
    credentials: true,
  }));
  
app.use(express.json());
const mongo_url = process.env.MANGO;
console.log('Mongo URL:', process.env.MANGO);

// const mongo_url = "mongodb://localhost:27017/test";

mongoose.connect(mongo_url)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Database connection error:', err));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// function authenticateToken(req, res, next) {
//     const token = req.headers[`authorization`];
//     if (!token) return res.sendStatus(401);
//     jwt.verify(token, 'zxcvbnm', (err,user) => {
//         if (err) return res.sendStatus(401);
//         req.user = user;
//         next();
//     });
// };
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided or invalid token format' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'zxcvbnm', (err, user) => {
        if (err) {
            console.error('Token verification failed:', err.message);
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
    }
}

app.post('/login', async (req, res) => {
    try {
        console.log("req recived", req.body)
        const { username, password } = req.body;
        const user = await tests.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }else{
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // const token = jwt.sign({ username: user.username }, 'zxcvbnm', { expiresIn: '30s' });
            console.log("token", token)
            res.status(200).json({ message: 'Login successful', token });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

app.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminUser = await tests.findOne({ username, role: 'admin' });
        if (!adminUser) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        if (adminUser.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ username: adminUser.username, role: adminUser.role }, 'zxcvbnm', { expiresIn: '1h' });
        res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ error: 'An error occurred during admin login.' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password, email, phone_number } = req.body;
        const newTest = new test({ username, password, email, phone_number });
        await newTest.save();
        res.status(201).json({ message: 'User registered successfully', user: newTest });
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate entry detected. Please use unique values.' });
        }
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
});

app.get('/users', authenticateToken, authenticateRoles(['admin', 'user']), async (req, res) => {
// app.get('/users', authenticateToken, authenticateRoles, async (req, res) => {
    try {
        const users = await test.find({}, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Failed to fetch users. Please try again later.' });
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, phone_number, password } = req.body;
    try {
        const updatedUser = await test.findByIdAndUpdate(id,
            { username, email, phone_number, password },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({ error: 'An error occurred during the update.' });
    }
});
app.delete('/delete', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await test.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        await test.findOneAndDelete({ username });
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ error: 'An error occurred during deletion.' });
    }
});