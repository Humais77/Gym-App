const express = require('express');
const dotenv = require('dotenv');
const connentDB = require('./config/db.js');
const authRoute = require('./routes/auth.route.js');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = 3000;
dotenv.config();
connentDB();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/users',authRoute);


app.use((err,req,res,next)=>{
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
app.listen(PORT,()=>{
    console.log('Server is running on PORT:',PORT);
})