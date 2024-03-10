
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const apiRoute = require('./routes/routes');
const apiGet = require('./routes/routes')
//const apiImage = require('./routes/routeGet')
const mongoose = require('./db/mongodb');
const path = require('path')


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());



// Montar el enrutador
app.use(apiRoute);
//app.use('/upload', );

app.use('/upload/imagenes', apiGet);


app.listen(port, () => {
    console.log('Listening on port', port);
});

