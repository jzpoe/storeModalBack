

const express = require('express')
const router = express.Router() 
const apicontrollers = require('../controllers/image')
const apiGet = require('../controllers/imageGet')
const multer = require('multer')
const path = require('path');



const storage=  multer.diskStorage({

    destination: function(req, file, cb){
       cb(null, path.join(__dirname, '../public/uploads'))
    },

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }    //permite poder colocarle un nombre a la uimagen al subirla 
})

const upload = multer({storage})

router.get('/upload/imagenes', apiGet.obtener )

router.post('/imagenes',upload.single('file'), apicontrollers.subidaImagen)

module.exports = router

