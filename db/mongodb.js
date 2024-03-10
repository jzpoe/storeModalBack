
require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    // Aquí puedes comenzar a definir tus modelos y realizar otras operaciones
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);

});

module.exports = mongoose