const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const app = express();

app.use(express.json());

app.use('/api/v1', authRoutes);

//connecting to database
mongoose.connect("mongodb://localhost:27017/authapp")
.then(()=>console.log("Connected to database"))
.catch((err) => console.log(err));

app.listen(8080, ()=>{
    console.log('listening on port 8080');
})