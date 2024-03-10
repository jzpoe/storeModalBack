
const imagenesStore = require('../db/model/image_model')
const multer = require('multer')


module.exports =  {




  subidaImagen: async (req, res) => {
      
    try {
      console.log(req.file);

      // if (!file) {
      //   return res.status(400).send('no se ha proporionado ninguna imagen')
      // }

    const newImg = new imagenesStore({
      fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            destination: req.file.destination,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
      
    })
     await newImg.save()
     res.status(200).send('imagen subida');

    } catch (error) {
      res.status(500).send('error al subir la imagen', error);
      
    }
    

    

  }

}
