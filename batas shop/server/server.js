const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
//const { registerUser } = require('./controllers/auth/auth-controller');




mongoose
.connect('mongodb+srv://mserifnas21:1mEsoWzRRbhhU0Mq@batas.6mw8s.mongodb.net/')
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Progma'
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);


app.listen(PORT, ()=> console.log('Server is now running on port ${PORT}'));