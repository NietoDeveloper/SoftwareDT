require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 

const { userDB, citaDB } = require('./config/dbConn'); 

const corsOptions = require('./config/corsOptions');



app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());







app.use(express.static(path.join(__dirname, 'public')));






Promise.all([

]).then(() => {


}).catch(err => {

});