
const imagenesStore = require('../db/model/image_model')
const multer = require('multer')


module.exports =  {

obtener: async (req, res) => {
    try {

        const imagenes = await imagenesStore.find()
        console.log(imagenes)
        res.status(200).json(imagenes)
             
        
    } catch (error) {
        console.error('Error al solicitar las imágenes:', error);
        res.status(500).send('Error al solicitar las imágenes');

    }
  
  },

}