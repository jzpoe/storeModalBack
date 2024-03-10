
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const apiRoute = require('./routes/routes');
const apiGet = require('./routes/routes')
//const apiImage = require('./routes/routeGet')
const mongoose = require('./db/mongodb');
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://store-modal.vercel.app', // Permitir solicitudes desde este origen
    methods: 'GET,POST', // Permitir los métodos GET y POST
    optionsSuccessStatus: 200 // Retornar el código de estado 200 para las opciones preflight
  };

  app.use(cors(corsOptions));


  app.use(express.json());



// Montar el enrutador
app.use(apiRoute);
//app.use('/upload', );

app.use('/upload/imagenes', apiGet);


app.listen(port, () => {
    console.log('Listening on port', port);
});

