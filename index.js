const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const auth = require('./auth/routes')

app.use(auth)

mongoose.connect('mongodb://localhost:27017/majorproject')
    .then(()=>{
        console.log('database connected');
    })
    .catch(err=>{
        console.log(err);
    })

   


app.listen(5000,'192.168.1.36' ,()=>{
    console.log('server running')
})