const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv=require("dotenv");
const connectDB=require("./models/_db");
dotenv.config();

const apiRoutes = require('./routes');  
const app = express();

app.use('/api', apiRoutes); 


