const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoute = require('./routes/auth.route.js');
const adminRoute = require('./routes/admin/admin.route.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
dotenv.config();
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Public auth routes
app.use('/api/users', authRoute);

// Admin routes
app.use("/api/admin/users", adminRoute);

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
});
