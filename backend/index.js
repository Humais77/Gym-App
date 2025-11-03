const express = require('express');
const app = express();
const authRoute = require('./routes/auth.route.js');
const PORT = 3000;
app.use(express.json());

app.use('/api/user',authRoute);
app.listen(PORT,()=>{
    console.log('Server is running on PORT:',PORT);
})